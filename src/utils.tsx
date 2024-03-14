import { ReactNode, isValidElement } from "react";

export type Index = string | number;

export type StringArray = string[] | StringArray[];

export function sanitize(text: string) {
  return text.replace(/[;<>]/g, (match) => {
    switch (match) {
      case ";":
        return "(";
      default:
        return " ";
    }
  });
}

export function JSXToArray(element: ReactNode): StringArray {
  if (isValidElement(element)) {
    const { children } = element.props;
    if (Array.isArray(children)) return (children as ReactNode[]).map((child) => JSXToArray(child));
    return JSXToArray(children);
  }
  return typeof element === "string" ? sanitize(element).split("") : typeof element === "number" ? [element.toString()] : [];
}

export function JSXToText(element: ReactNode): string {
  if (isValidElement(element)) {
    const { children } = element.props;
    if (Array.isArray(children)) return (children as ReactNode[]).map((child) => JSXToText(child)).join(" ") + " ";
    return JSXToText(children);
  }
  return typeof element === "string" ? sanitize(element) : typeof element === "number" ? element.toString() : "";
}

export function isParent(index: string | undefined, parentIndex: string) {
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

export const getIndex = (parentIndex: Index, index: Index) => `${parentIndex === "" ? "" : parentIndex + "-"}${index}`;

export function findCharIndex(characters: StringArray, index: number) {
  let currentIndex = 0;
  function recursiveSearch(array: StringArray, parentIndex: Index = ""): string {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (Array.isArray(element)) {
        const result = recursiveSearch(element, i);
        if (result) return getIndex(parentIndex, result);
      } else {
        currentIndex++;
        if (currentIndex > index) return getIndex(parentIndex, i);
      }
    }
    currentIndex++;
    return "";
  }
  return recursiveSearch(characters);
}
