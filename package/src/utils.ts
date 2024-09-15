import { isValidElement, ReactNode } from "react";

import { desktopChunkSize, minChunkSize, mobileChunkSize, specialSymbol, symbolMapping } from "./constants.js";
import { setState } from "./state.js";
import { Index, StringArray } from "./types.js";

export function ArrayToText(element: StringArray): string {
  if (typeof element === "string") return element;
  return element.map(ArrayToText).join(" ") + " ";
}

export function JSXToArray(element: ReactNode): StringArray {
  if (isValidElement(element)) {
    const { children } = element.props;
    if (Array.isArray(children)) return children.map(JSXToArray);
    return JSXToArray(children);
  }
  return typeof element === "string" ? element : typeof element === "number" ? String(element) : "";
}

export function cancel() {
  if (typeof window === "undefined") return;
  setState({ stopReason: "manual" });
  window.speechSynthesis?.cancel();
}

export function TextToChunks(text: string, size?: number) {
  size = size ? Math.max(size, minChunkSize) : isMobile() ? mobileChunkSize : desktopChunkSize;
  const length = text.length;
  const result = [];
  let startIndex = 0;
  while (startIndex < length) {
    let endIndex = Math.min(startIndex + size, length);
    if (endIndex < length && text[endIndex] !== " ") {
      const spaceIndex = text.lastIndexOf(" ", endIndex);
      if (spaceIndex > startIndex) endIndex = spaceIndex;
    }
    result.push(text.slice(startIndex, endIndex));
    startIndex = endIndex;
  }
  return result;
}

export function findCharIndex(words: StringArray, index: number) {
  let currentIndex = 0;
  function recursiveSearch(stringArray: StringArray, parentIndex: Index = ""): string {
    if (typeof stringArray === "string") {
      const elementIndex = index - currentIndex;
      return (currentIndex += stringArray.length + 1) > index ? getIndex(parentIndex, elementIndex) : "";
    }
    for (let i = 0; i < stringArray.length; i++) {
      const element = stringArray[i];
      const result = recursiveSearch(element, i);
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

export const sanitize = (text: string) =>
  text.replace(/[<>]|(&[^\s;]+);/g, (match, group) => (group ? group + ")" : ` ${specialSymbol}${symbolMapping[match as keyof typeof symbolMapping]} `));
