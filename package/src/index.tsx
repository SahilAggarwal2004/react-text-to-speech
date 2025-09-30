import React, { useLayoutEffect } from "react";
import { renderToString } from "react-dom/server";

import { highlightedTextIdSuffix, idPrefix } from "./constants.js";
import { useQueue, useSpeak, useSpeech, useSpeechInternal, useVoices } from "./hooks.js";
import { HiMiniStop, HiVolumeOff, HiVolumeUp } from "./icons.js";
import { composeProps, hideElement, showElement } from "./modules/dom.js";
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
  const { Text, uniqueId, reactContent, indexedText, speechStatus, ...childrenOptions } = useSpeechInternal(hookProps);
  const { isInQueue, start, pause, stop } = childrenOptions;

  useLayoutEffect(() => {
    const containers = Array.from(document.getElementsByClassName(uniqueId)) as HTMLDivElement[];
    const renderedString = renderToString(indexedText);

    containers.forEach((container) => (container.innerHTML = renderedString));

    if (!enableConditionalHighlight) return;

    const observer = new MutationObserver(() => {
      const newContainers = Array.from(document.getElementsByClassName(uniqueId)) as HTMLDivElement[];
      newContainers.forEach((container) => {
        if (!container.innerHTML) container.innerHTML = renderedString;
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [indexedText, uniqueId]);

  useLayoutEffect(() => {
    const containers = Array.from(document.getElementsByClassName(uniqueId)) as HTMLDivElement[];
    if (!containers.length) return;

    const highlightedTextContainers = Array.from(document.getElementsByClassName(`${uniqueId}${highlightedTextIdSuffix}`)) as HTMLDivElement[];
    if (hookProps.showOnlyHighlightedText) {
      const renderedString = renderToString(reactContent);
      containers.forEach(hideElement);
      highlightedTextContainers.forEach((container) => {
        showElement(container);
        container.innerHTML = renderedString;
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
    </div>
  );
}

export { useQueue, useSpeak, useSpeech, useVoices };
