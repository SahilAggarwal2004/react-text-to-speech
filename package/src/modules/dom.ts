import { DivProps } from "../types.js";

export const composeClass = (id: string, props: DivProps) => `${id}${props?.className ? " " + props.className : ""}`;

export const composeProps = (id: string, props: DivProps) => ({ ...props, className: composeClass(id, props) });

export function hideElement(element: HTMLElement) {
  if (!element.dataset.originalDisplay) element.dataset.originalDisplay = element.style.display || getComputedStyle(element).display || "block";
  Object.assign(element.style, { display: "none" });
}

export function showElement(element: HTMLElement) {
  const display = element.dataset.originalDisplay;
  if (display) Object.assign(element.style, { display });
}
