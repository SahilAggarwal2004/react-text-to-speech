import { ReactNode, isValidElement } from "react";

export type Index = string | number;

export type StringArray = string | StringArray[];

export const getIndex = (parentIndex: Index, index: Index) => `${parentIndex === "" ? "" : parentIndex + "-"}${index}`;

export const sanitize = (text: string) => text.replace(/[;<>]/g, (match) => (match === ">" ? ")" : "("));

export function JSXToArray(element: ReactNode): StringArray {
  if (isValidElement(element)) {
    const { children } = element.props;
    if (Array.isArray(children)) return (children as ReactNode[]).map(JSXToArray);
    return JSXToArray(children);
  }
  return typeof element === "string" ? element : typeof element === "number" ? String(element) : "";
}

export function ArrayToText(element: StringArray): string {
  if (typeof element === "string") return element;
  return element.map(ArrayToText).join(" ") + " ";
}

export function findCharIndex(words: StringArray, index: number) {
  let currentIndex = 0;
  function recursiveSearch(stringArray: StringArray, parentIndex: Index = ""): string {
    if (typeof stringArray === "string") {
      const elementIndex = index - currentIndex;
      return (currentIndex += stringArray.length) + 1 > index ? getIndex(parentIndex, elementIndex) : "";
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
