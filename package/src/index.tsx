import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useQueue, useSpeak, useSpeech, useVoices } from "./hooks.js";
import { HiMiniStop, HiVolumeOff, HiVolumeUp } from "./icons.js";
import { DivProps, SpeechProps } from "./types.js";

export function HighlightedText({ id, children, ...props }: DivProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div id={`rtts-${id}`} {...props}>
      {loading && (typeof children === "string" ? <span>{children}</span> : children)}
    </div>
  );
}

export default function Speech({
  id,
  startBtn = <HiVolumeUp />,
  pauseBtn = <HiVolumeOff />,
  stopBtn = <HiMiniStop />,
  useStopOverPause = false,
  props = {},
  children,
  ...hookProps
}: SpeechProps) {
  const [highlightContainer, setHighlightContainer] = useState<HTMLDivElement | null>(null);
  const { Text, ...childrenOptions } = useSpeech(hookProps);
  const { isInQueue, start, pause, stop } = childrenOptions;

  useEffect(() => {
    if (hookProps.highlightText) setHighlightContainer(document.getElementById(`rtts-${id}`) as HTMLDivElement);
    else setHighlightContainer(null);
  }, [hookProps.highlightText]);

  return (
    <>
      {typeof children === "function" ? (
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
      )}
      {highlightContainer && createPortal(<Text />, highlightContainer)}
    </>
  );
}

export { useQueue, useSpeak, useSpeech, useVoices };
