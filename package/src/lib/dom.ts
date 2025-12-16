import { DivProps, HighlightProps } from "../types.js";

export const composeClass = (id: string, props: DivProps) => `${id}${props?.className ? " " + props.className : ""}`;

export const composeProps = (id: string, props: DivProps) => ({ ...props, className: composeClass(id, props) });

export function createElementWithProps<K extends keyof HTMLElementTagNameMap>(tag: K, props: HighlightProps = {}): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  (Object.keys(props) as (keyof HighlightProps)[]).forEach((key) => {
    const value = props[key];
    if (value == null) return;

    if (key === "style" && typeof value === "object") Object.assign(element.style, value);
    else element[key] = value as string;
  });

  return element;
}

export function hideElement(element: HTMLElement) {
  if (!element.dataset.originalDisplay) element.dataset.originalDisplay = element.style.display || getComputedStyle(element).display || "block";
  Object.assign(element.style, { display: "none" });
}

export function showElement(element: HTMLElement) {
  const display = element.dataset.originalDisplay;
  if (display) Object.assign(element.style, { display });
}
