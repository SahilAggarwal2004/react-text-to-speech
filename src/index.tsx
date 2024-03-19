import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SpeechStatus, useSpeech, useSpeechProps } from "./hooks.js";
import { HiMiniStop, HiVolumeOff, HiVolumeUp } from "./icons.js";

export { useSpeechProps };

export type Button = JSX.Element | string | null;

export type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type { SpeechStatus };

export type ChildrenOptions = {
  speechStatus?: SpeechStatus;
  start?: Function;
  pause?: Function;
  stop?: Function;
};

export type Children = (childrenOptions: ChildrenOptions) => ReactNode;

export type SpeechProps = useSpeechProps & {
  id?: string;
  startBtn?: Button;
  pauseBtn?: Button;
  stopBtn?: Button;
  useStopOverPause?: boolean;
  props?: DivProps;
  children?: Children;
};

export type { SpanProps } from "./hooks.js";

export type { IconProps } from "./icons.js";

export type { Index, SpeechUtterancesQueue, StringArray } from "./utils.js";

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
  const { Text, ...childrenOptions } = useSpeech(hookProps);
  const { start, pause, stop, isInQueue } = childrenOptions;
  const [highlightContainer, setHighlightContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hookProps.highlightText) setTimeout(() => setHighlightContainer(document.getElementById(`rtts-${id}`) as HTMLDivElement), 1);
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

export function HighlightedText({ id, children, ...props }: DivProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1);
  }, []);

  return (
    <div id={`rtts-${id}`} {...props}>
      {loading && children}
    </div>
  );
}

export { useSpeech };
