import { isValidElement, PropsWithChildren, ReactNode } from "react";

import {
  chunkDelimiters,
  desktopChunkSize,
  lineDelimiter,
  minChunkSize,
  mobileChunkSize,
  sanitizeRegex,
  sentenceDelimiters,
  spaceDelimiter,
  specialSymbol,
  symbolMapping,
  utterancePropertiesAndEvents,
} from "./constants.js";
import { setState } from "./state.js";
import { HighlightMode, Index, SpeakingWord, SpeechSynthesisEventName, SpeechSynthesisUtteranceKey, StringArray } from "./types.js";

export function ArrayToText(node: StringArray): string {
  if (typeof node === "string") return node;
  return node.map(ArrayToText).join(spaceDelimiter) + spaceDelimiter;
}

export function JSXToArray(node: ReactNode): StringArray {
  if (isValidElement<PropsWithChildren>(node)) {
    const { children } = node.props;
    if (Array.isArray(children)) return children.map(JSXToArray);
    return JSXToArray(children);
  }
  return typeof node === "string" ? node : typeof node === "number" ? String(node) : "";
}

export function TextToChunks(text: string, size?: number) {
  size = size ? Math.max(size, minChunkSize) : isMobile() ? mobileChunkSize : desktopChunkSize;
  const length = text.length;
  const result = [];
  let startIndex = 0;
  while (startIndex < length) {
    let endIndex = Math.min(startIndex + size, length);
    if (endIndex < length && text[endIndex] !== lineDelimiter)
      for (const delimiter of chunkDelimiters) {
        let delimiterIndex = text.lastIndexOf(delimiter, endIndex) + delimiter.length - 1;
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

export function cancel() {
  if (typeof window === "undefined") return;
  setState({ stopReason: "manual" });
  window.speechSynthesis?.cancel();
}

export function cloneUtterance(utterance: SpeechSynthesisUtterance, text: string) {
  const newUtterance = new SpeechSynthesisUtterance(text);
  utterancePropertiesAndEvents.forEach((property) => ((newUtterance[property] as SpeechSynthesisUtterance[SpeechSynthesisUtteranceKey]) = utterance[property]));
  return newUtterance;
}

export function findCharIndex(words: StringArray, index: number) {
  let currentIndex = 0;
  function recursiveSearch(stringArray: StringArray, parentIndex: Index = ""): string {
    if (typeof stringArray === "string") {
      const elementIndex = index - currentIndex;
      return (currentIndex += stringArray.length + 1) > index ? getIndex(parentIndex, elementIndex) : "";
    }
    for (let i = 0; i < stringArray.length; i++) {
      const node = stringArray[i];
      const result = recursiveSearch(node, i);
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
