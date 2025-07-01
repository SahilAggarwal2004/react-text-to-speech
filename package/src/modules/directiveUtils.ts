import { cloneElement, isValidElement, PropsWithChildren, ReactNode } from "react";

import { directiveRegexGlobal } from "../constants.js";

export function StripDirectives(node: ReactNode): ReactNode {
  if (typeof node === "string") return node.replace(directiveRegexGlobal, "");
  if (typeof node === "number") return node;
  if (Array.isArray(node)) return node.map(StripDirectives);
  if (isValidElement<PropsWithChildren>(node)) return cloneElement(node, { key: node.key ?? Math.random(), children: StripDirectives(node.props.children) });
  return null;
}
