import { isValidElement, ReactNode } from "react";

import { Index, StringArray } from "./types.js";

export function ArrayToText(element: StringArray): string {
  if (typeof element === "string") return element;
  return element.map(ArrayToText).join(" ") + " ";
}

export function JSXToArray(element: ReactNode): StringArray {
  if (isValidElement(element)) {
    const { children } = element.props;
    if (Array.isArray(children)) return (children as ReactNode[]).map(JSXToArray);
    return JSXToArray(children);
  }
  return typeof element === "string" ? element : typeof element === "number" ? String(element) : "";
}

export function cancel() {
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
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

export const sanitize = (text: string) => text.replace(/[<>]|(&[^\s;]+);/g, (match, group) => (match === "<" ? "(" : (group || "") + ")"));
