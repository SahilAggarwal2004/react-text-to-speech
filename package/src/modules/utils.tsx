import { isValidElement, PropsWithChildren, ReactNode } from "react";

import {
  chunkDelimiters,
  desktopChunkSize,
  lineDelimiter,
  minChunkSize,
  mobileChunkSize,
  sanitizedRegex,
  sanitizeRegex,
  sentenceDelimiters,
  spaceDelimiter,
  specialSymbol,
  symbolMapping,
} from "../constants.js";
import { HighlightMode, Index, SpeakingWord, SpeechSynthesisEventName, State, Words } from "../types.js";
import { TextToChunksDirective } from "./directiveUtils.js";
import { setState } from "./state.js";

export function NodeToWords(node: ReactNode): Words {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(NodeToWords);
  if (isValidElement<PropsWithChildren>(node)) return NodeToWords(node.props.children);
  return "";
}

export function NodeToKey(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(NodeToKey).join("");
  if (isValidElement<PropsWithChildren>(node)) {
    const nodeType = typeof node.type === "string" ? node.type : "Component";
    const { children, ...props } = node.props;
    const propsKey = JSON.stringify(props);
    const childrenKey = NodeToKey(children);
    return `${nodeType}(${propsKey})[${childrenKey}]`;
  }
  return "";
}

export function TextToChunks(text: string, size?: number, enableDirectives?: boolean) {
  size = size ? Math.max(size, minChunkSize) : isMobile() ? mobileChunkSize : desktopChunkSize;
  return enableDirectives ? TextToChunksDirective(text, size) : chunkBySizeWithDelimiters(text, size);
}

export function ToText(node: ReactNode | Words): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(ToText).join(spaceDelimiter) + spaceDelimiter;
  if (isValidElement<PropsWithChildren>(node)) return ToText(node.props.children);
  return "";
}

export const calculateOriginalTextLength = (sanitizedText: string) => sanitizedText.replace(sanitizedRegex, " ").length;

export function cancel(stopReason: State["stopReason"] = "manual") {
  if (typeof window === "undefined") return;
  setState({ stopReason });
  window.speechSynthesis?.cancel();
}

export function chunkBySizeWithDelimiters(text: string, size: number) {
  const length = text.length;
  const result: string[] = [];
  let startIndex = 0;
  while (startIndex < length) {
    let endIndex = Math.min(startIndex + size, length);
    if (endIndex < length && text[endIndex] !== lineDelimiter)
      for (const delimiter of chunkDelimiters) {
        const delimiterIndex = text.lastIndexOf(delimiter, endIndex) + delimiter.length - 1;
        if (delimiterIndex > startIndex) {
          endIndex = delimiterIndex;
          break;
        }
      }
    result.push(text.slice(startIndex, endIndex));
    startIndex = endIndex;
  }
  return result;
}

export const cloneRegex = (regex: RegExp) => new RegExp(regex.source, regex.flags);

export function findCharIndex(words: Words, index: number) {
  let currentIndex = 0;
  function recursiveSearch(currentWords: Words, parentIndex: Index = ""): string {
    if (typeof currentWords === "string") {
      const elementIndex = index - currentIndex;
      return (currentIndex += currentWords.length + 1) > index ? getIndex(parentIndex, elementIndex) : "";
    }
    for (let i = 0; i < currentWords.length; i++) {
      const result = recursiveSearch(currentWords[i], i);
      if (result) return getIndex(parentIndex, result);
    }
    currentIndex++;
    return "";
  }
  return recursiveSearch(words);
}

export const getIndex = (parentIndex: Index, index: Index) => `${parentIndex === "" ? "" : parentIndex + "-"}${index}`;

export function isMobile(iOS = true) {
  let result = (navigator as any).userAgentData?.mobile as boolean | undefined;
  result ??= /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (iOS && /iPhone|iPad|iPod/i.test(navigator.userAgent));
  return result;
}

export function isParent(parentIndex: string, index?: string) {
  if (!index?.startsWith(parentIndex)) return false;
  if (parentIndex) {
    const indexParts = index.split("-");
    const parentIndexParts = parentIndex.split("-");
    for (let i = 0; i < parentIndexParts.length; i++) {
      if (indexParts[i] !== parentIndexParts[i]) return false;
    }
  }
  return true;
}

export function parent(index?: string) {
  if (!index) return "";
  const lastIndex = index.lastIndexOf("-");
  return lastIndex === -1 ? "" : index.slice(0, lastIndex);
}

export function parse(value: string): number | boolean | string {
  if (value === "true") return true;
  if (value === "false") return false;
  const number = +value;
  if (!isNaN(number) && value !== "") return number;
  return value;
}

export const sanitize = (text: string) =>
  text.replace(sanitizeRegex, (match, group) => (group ? group + ")" : ` ${symbolMapping[match as keyof typeof symbolMapping]}${specialSymbol}`));

export function shouldHighlightNextPart(highlightMode: HighlightMode, name: SpeechSynthesisEventName, utterance: SpeechSynthesisUtterance, charIndex: number) {
  if (name === "word" && (highlightMode === "word" || !charIndex)) return true;
  const text = utterance.text
    .slice(0, charIndex)
    .replace(/[ \t]+$/, spaceDelimiter)
    .slice(-2);
  if (highlightMode === "sentence" && (text[1] === lineDelimiter || (sentenceDelimiters.includes(text[0]) && text[1] === spaceDelimiter))) return true;
  if (highlightMode === "line" && (text[1] === lineDelimiter || (text[0] === lineDelimiter && text[1] === spaceDelimiter))) return true;
  if (highlightMode === "paragraph" && name === "sentence") return true;
  return false;
}

export function splitNode(highlightMode: HighlightMode, node: string, speakingWord: SpeakingWord): [string, string, string] {
  const { index, length } = speakingWord!;
  const beforeIndex = +index.split("-").at(-1)!;
  const before = node.slice(0, beforeIndex);
  if (highlightMode === "word") return [before, node.slice(beforeIndex, beforeIndex + length), node.slice(beforeIndex + length)];
  node = node.slice(beforeIndex);
  const regex = highlightMode === "sentence" ? /(.*?)(\n|[.!?]\s)(.*)/ : /(.*?)(\n)(.*)/;
  const match = node.match(regex);
  if (!match) return [before, node, ""];
  const sentence = match[1] + match[2].trimEnd();
  return [before, sentence, node.slice(sentence.length)];
}
