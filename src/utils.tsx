import { ReactNode, isValidElement } from "react";

export type StringArray = string[] | StringArray[];

export const splitElement = (element: string) => element.split(/\b/);

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
  return typeof element === "string" ? splitElement(element) : typeof element === "number" ? [element.toString()] : [];
}

export function findWordIndex(words: StringArray, index: number) {
  let currentIndex = 0;
  function recursiveSearch(array: StringArray, parentIndex?: number): string | null {
    if (array.length)
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (Array.isArray(element)) {
          const result = recursiveSearch(element, i);
          if (result !== null) return `${parentIndex === undefined ? "" : parentIndex + "-"}${result}`;
        } else {
          currentIndex += element.length;
          if (currentIndex > index) return `${parentIndex === undefined ? "" : parentIndex + "-"}${i}`;
        }
      }
    currentIndex++;
    return null;
  }
  return recursiveSearch(words);
}
