import { ReactNode, isValidElement } from "react";

export type Index = string | number;

export type StringArray = string[] | StringArray[];

export const getIndex = (parentIndex: Index, index: Index) => `${parentIndex === "" ? "" : parentIndex + "-"}${index}`;

export function JSXToText(element: ReactNode): string {
  if (isValidElement(element)) {
    const { children } = element.props;
    if (Array.isArray(children)) return (children as ReactNode[]).map((child) => JSXToText(child)).join(" ") + " ";
    return JSXToText(children);
  }
  return typeof element === "string" ? element : typeof element === "number" ? element.toString() : "";
}

export function JSXToArray(element: ReactNode): StringArray {
  if (isValidElement(element)) {
    const { children } = element.props;
    if (Array.isArray(children)) return (children as ReactNode[]).map((child) => JSXToArray(child));
    return JSXToArray(children);
  }
  return typeof element === "string" ? element.split("") : typeof element === "number" ? [element.toString()] : [];
}

export function findWordIndex(words: StringArray, index: number) {
  let currentIndex = 0;
  function recursiveSearch(array: StringArray, parentIndex: Index = ""): string | null {
    if (array.length)
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (Array.isArray(element)) {
          const result = recursiveSearch(element, i);
          if (result !== null) return getIndex(parentIndex, result);
        } else {
          currentIndex++;
          if (currentIndex > index) return getIndex(parentIndex, i);
        }
      }
    currentIndex++;
    return null;
  }
  return recursiveSearch(words);
}
