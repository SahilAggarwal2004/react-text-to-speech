import { cloneElement, isValidElement, PropsWithChildren, ReactNode } from "react";

import { directiveRegexGlobal } from "../constants.js";
import { chunkBySizeWithDelimiters, cloneRegex } from "./utils.js";

export function StripDirectives(node: ReactNode): ReactNode {
  if (typeof node === "string") return node.replace(directiveRegexGlobal, "");
  if (typeof node === "number") return node;
  if (Array.isArray(node)) return node.map(StripDirectives);
  if (isValidElement<PropsWithChildren>(node)) return cloneElement(node, { children: StripDirectives(node.props.children) });
  return null;
}

export function TextToChunksDirective(text: string, size: number) {
  const chunks: string[] = [];
  let currentIndex = 0;
  let match: RegExpExecArray | null;
  const directiveRegexClone = cloneRegex(directiveRegexGlobal);
  while ((match = directiveRegexClone.exec(text)) !== null) {
    const directiveIndex = match.index;
    if (directiveIndex > currentIndex) {
      const preDirectiveText = text.slice(currentIndex, directiveIndex);
      chunks.push(...chunkBySizeWithDelimiters(preDirectiveText, size));
    }
    chunks.push(match[0]);
    currentIndex = directiveRegexClone.lastIndex;
  }
  if (currentIndex < text.length) {
    const remainingText = text.slice(currentIndex);
    chunks.push(...chunkBySizeWithDelimiters(remainingText, size));
  }
  return chunks;
}
