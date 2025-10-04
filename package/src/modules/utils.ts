import {
  chunkDelimiters,
  desktopChunkSize,
  directiveRegex,
  iosRegex,
  lineDelimiter,
  lineSplitRegex,
  minChunkSize,
  mobileChunkSize,
  mobileRegex,
  sanitizeRegex,
  sentenceDelimiters,
  sentenceSplitRegex,
  spaceDelimiter,
  specialSymbol,
  symbolMapping,
  trailingSpacesRegex,
  wordBoundarySeparator,
} from "../constants.js";
import { HighlightMode, SpeakingWord, SpeechSynthesisEventName, State } from "../types.js";
import { setState } from "./state.js";

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

export const getProgress = (current: number, total: number) => total && Math.floor((current / total) * 100);

export function isMobile(iOS = true) {
  let result = (navigator as any).userAgentData?.mobile as boolean | undefined;
  result ??= mobileRegex.test(navigator.userAgent) || (iOS && iosRegex.test(navigator.userAgent));
  return result;
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
  const text = utterance.text.slice(0, charIndex).replace(trailingSpacesRegex, spaceDelimiter).slice(-2);
  if (highlightMode === "sentence" && (text[1] === lineDelimiter || (sentenceDelimiters.includes(text[0]) && text[1] === spaceDelimiter))) return true;
  if (highlightMode === "line" && (text[1] === lineDelimiter || (text[0] === lineDelimiter && text[1] === spaceDelimiter))) return true;
  if (highlightMode === "paragraph" && name === "sentence") return true;
  return false;
}

export function splitNode(highlightMode: HighlightMode, node: string, speakingWord: SpeakingWord): [string, string, string] {
  if (highlightMode === "paragraph") return ["", node, ""];
  const { index, length } = speakingWord!;
  const beforeIndex = +index.split("-").at(-1)!;
  const before = node.slice(0, beforeIndex);
  if (highlightMode === "word") return [before, node.slice(beforeIndex, beforeIndex + length), node.slice(beforeIndex + length)];
  node = node.slice(beforeIndex);
  const match = node.match(highlightMode === "sentence" ? sentenceSplitRegex : lineSplitRegex);
  if (!match) return [before, node, ""];
  const sentence = match[1] + match[2].trimEnd();
  return [before, sentence, node.slice(sentence.length)];
}

export function textToChunks(text: string, size?: number, enableDirectives?: boolean) {
  size = size ? Math.max(size, minChunkSize) : isMobile() ? mobileChunkSize : desktopChunkSize;
  const regex = new RegExp(`${enableDirectives ? directiveRegex.source + "|" : ""}${wordBoundarySeparator}`, "g");
  const chunks: string[] = [];
  let currentIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const directiveIndex = match.index;
    if (directiveIndex > currentIndex) {
      const preDirectiveText = text.slice(currentIndex, directiveIndex);
      chunks.push(...chunkBySizeWithDelimiters(preDirectiveText, size));
    }
    if (match[0] !== wordBoundarySeparator) chunks.push(match[0]);
    currentIndex = regex.lastIndex;
  }
  if (currentIndex < text.length) {
    const remainingText = text.slice(currentIndex);
    chunks.push(...chunkBySizeWithDelimiters(remainingText, size));
  }
  return chunks;
}
