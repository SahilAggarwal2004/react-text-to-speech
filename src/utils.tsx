import { ReactNode, isValidElement } from "react";

export type SpeechUtterancesQueue = SpeechSynthesisUtterance[];

export type Index = string | number;

export type StringArray = string[] | StringArray[];

export class ExtendedSpeechSynthesis {
  static queue: SpeechUtterancesQueue = [];
  static addToQueue(utterance: SpeechSynthesisUtterance) {
    this.queue.push(utterance);
  }
  static removeFromQueue(utterance?: SpeechSynthesisUtterance) {
    if (!utterance) return this.queue.shift();
    this.queue = this.queue.filter((queuedUtterance) => queuedUtterance !== utterance);
  }
  static clearQueue() {
    this.queue = [];
  }
  static speakFromQueue() {
    const utterance = this.queue[0];
    if (utterance) speechSynthesis.speak(utterance);
  }
}

export const getIndex = (parentIndex: Index, index: Index) => `${parentIndex === "" ? "" : parentIndex + "-"}${index}`;

export const sanitize = (text: string) => text.replace(/[;<>]/g, (match) => (match === ">" ? ")" : "("));

export function JSXToArray(element: ReactNode): StringArray {
  if (isValidElement(element)) {
    const { children } = element.props;
    if (Array.isArray(children)) return (children as ReactNode[]).map((child) => JSXToArray(child));
    return JSXToArray(children);
  }
  return typeof element === "string" ? element.split("") : typeof element === "number" ? [element.toString()] : [];
}

export function JSXToText(element: ReactNode): string {
  if (isValidElement(element)) {
    const { children } = element.props;
    if (Array.isArray(children)) return (children as ReactNode[]).map((child) => JSXToText(child)).join(" ") + " ";
    return JSXToText(children);
  }
  return typeof element === "string" ? element : typeof element === "number" ? element.toString() : "";
}

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
