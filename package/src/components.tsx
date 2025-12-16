import React, { useLayoutEffect, useRef } from "react";

import { highlightedTextIdSuffix, idPrefix } from "./constants.js";
import { useSpeechInternal } from "./hooks.js";
import { HiMiniStop, HiVolumeOff, HiVolumeUp } from "./icons.js";
import { composeProps, hideElement, showElement } from "./lib/dom.js";
import { HighlightedTextProps, SpeechProps } from "./types.js";

export function HighlightedText({ id, children, ...props }: HighlightedTextProps) {
  const uniqueId = `${idPrefix}${id}`;

  return (
    <>
      <div {...composeProps(uniqueId, props)} />
      <div {...composeProps(`${uniqueId}${highlightedTextIdSuffix}`, props)} />
    </>
  );
}

export default function Speech({
  startBtn = <HiVolumeUp />,
  pauseBtn = <HiVolumeOff />,
  stopBtn = <HiMiniStop />,
  useStopOverPause = false,
  enableConditionalHighlight = false,
  props = {},
  children,
  ...hookProps
}: SpeechProps) {
  const { uniqueId, normalizedText, reactContent, Text, speechStatus, ...childrenOptions } = useSpeechInternal(hookProps);
  const { isInQueue, start, pause, stop } = childrenOptions;
  const sourceRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const containers = Array.from(document.getElementsByClassName(uniqueId)).filter((container) => container !== sourceRef.current) as HTMLDivElement[];
    if (!containers.length) return;

    const sourceHTML = sourceRef.current!.innerHTML;
    containers.forEach((container) => (container.innerHTML = sourceHTML));

    if (!enableConditionalHighlight) return;

    const observer = new MutationObserver(() => {
      const observedContainers = Array.from(document.getElementsByClassName(uniqueId)) as HTMLDivElement[];
      observedContainers.forEach((container) => {
        if (!container.innerHTML) container.innerHTML = sourceHTML;
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [normalizedText, uniqueId]);

  useLayoutEffect(() => {
    const containers = Array.from(document.getElementsByClassName(uniqueId)).filter((container) => container !== sourceRef.current) as HTMLDivElement[];
    if (!containers.length) return;

    const highlightedTextContainers = Array.from(document.getElementsByClassName(`${uniqueId}${highlightedTextIdSuffix}`)) as HTMLDivElement[];
    if (hookProps.showOnlyHighlightedText) {
      const sourceHTML = sourceRef.current!.innerHTML;
      containers.forEach(hideElement);
      highlightedTextContainers.forEach((container) => {
        container.innerHTML = sourceHTML;
        showElement(container);
      });
    } else {
      highlightedTextContainers.forEach(hideElement);
      containers.forEach(showElement);
    }
  }, [reactContent, uniqueId]);

  return typeof children === "function" ? (
    children(childrenOptions)
  ) : (
    <div style={{ display: "flex", columnGap: "1rem" }} {...props}>
      {!isInQueue ? (
        <span role="button" onClick={start}>
          {startBtn}
        </span>
      ) : useStopOverPause ? (
        <span role="button" onClick={stop}>
          {stopBtn}
        </span>
      ) : (
        <span role="button" onClick={pause}>
          {pauseBtn}
        </span>
      )}
      {!useStopOverPause && stopBtn && (
        <span role="button" onClick={stop}>
          {stopBtn}
        </span>
      )}
      <Text ref={sourceRef} style={{ display: "none" }} />
    </div>
  );
}
