import React, { cloneElement, Fragment, isValidElement, ReactNode, SetStateAction } from "react";

import { directiveRegexGlobal, nonWhitespaceRegex, wordBoundarySeparator } from "../constants";
import type { Index, NodeProps, Words } from "../types";
import { composeClass } from "./dom";

export function findCharIndex(words: Words, index: number): string {
  let currentIndex = 0;
  function recursiveSearch(currentWords: Words, parentIndex: Index = ""): string {
    if (typeof currentWords === "string") {
      const elementIndex = index - currentIndex;
      return (currentIndex += currentWords.length) > index ? getIndex(parentIndex, elementIndex) : "";
    }
    for (let i = 0; i < currentWords.length; i++) {
      const result = recursiveSearch(currentWords[i], i);
      if (result) return getIndex(parentIndex, result);
    }
    return "";
  }
  return recursiveSearch(words);
}

export const getIndex = (parentIndex: Index, index: Index): string => `${parentIndex === "" ? "" : parentIndex + "-"}${index}`;

export function indexText(node: ReactNode, id: string, index = ""): ReactNode {
  if (typeof node == "string" || typeof node == "number") return node;
  if (Array.isArray(node)) return node.map((child, i) => indexText(child, id, getIndex(index, i)));
  if (isValidElement<NodeProps>(node)) {
    const props: NodeProps = { key: node.key ?? index, children: indexText(normalizeChildren(node.props.children), id, index) };
    if (node.type !== Fragment) props.className = composeClass(`${id}${index}`, node.props);
    return cloneElement(node, props);
  }
  return node;
}

export function isParent(parentIndex: string, index?: string): boolean {
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

export function isSetStateFunction<T>(v: SetStateAction<T>): v is (old: T) => T {
  return typeof v === "function";
}

export function nodeToKey(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToKey).join("");
  if (isValidElement<NodeProps>(node)) {
    const nodeType = typeof node.type === "string" ? node.type : "Component";
    const { children, ...props } = node.props;
    const propsKey = JSON.stringify(props);
    const childrenKey = nodeToKey(children);
    return `${nodeType}(${propsKey})[${childrenKey}]`;
  }
  return "";
}

export function nodeToWords(node: ReactNode): Words {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToWords);
  if (isValidElement<NodeProps>(node)) return nodeToWords(normalizeChildren(node.props.children));
  return "";
}

export function normalizeChildren(node: ReactNode): ReactNode {
  if (Array.isArray(node))
    return node.map((element, i) => {
      if (typeof element === "number" || (typeof element === "string" && nonWhitespaceRegex.test(element))) return <span key={i}>{element}</span>;
      return element;
    });
  if (isValidElement<NodeProps>(node)) return [node];
  return node;
}

export function parent(index?: string): string {
  if (!index) return "";
  const lastIndex = index.lastIndexOf("-");
  return lastIndex === -1 ? "" : index.slice(0, lastIndex);
}

export function stripDirectives(node: ReactNode): ReactNode {
  if (typeof node === "string") return node.replace(directiveRegexGlobal, "");
  if (typeof node === "number") return node;
  if (Array.isArray(node)) return node.map(stripDirectives);
  if (isValidElement<NodeProps>(node)) return cloneElement(node, { children: stripDirectives(node.props.children) });
  return null;
}

export function toText(node: ReactNode | Words): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join(wordBoundarySeparator);
  if (isValidElement<NodeProps>(node)) return toText(node.props.children);
  return "";
}
