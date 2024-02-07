import React, { DetailedHTMLProps, Fragment, HTMLAttributes, ReactNode, cloneElement, isValidElement, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { HiMiniStop, HiVolumeOff, HiVolumeUp } from "./icons.js";

export type Button = JSX.Element | string | null;

export type SpeechStatus = "started" | "paused" | "stopped";

export type ChildrenOptions = {
  speechStatus?: SpeechStatus;
  start?: Function;
  pause?: Function;
  stop?: Function;
};

export type Children = (childrenOptions: ChildrenOptions) => ReactNode;

export type SpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type SpeechProps = {
  text: string | JSX.Element;
  id?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
  lang?: string;
  voiceURI?: string | string[];
  startBtn?: Button;
  pauseBtn?: Button;
  stopBtn?: Button;
  useStopOverPause?: boolean;
  highlightText?: boolean;
  highlightProps?: SpanProps;
  onError?: Function;
  props?: DivProps;
  children?: Children;
};

export type { IconProps } from "./icons.js";

function JSXToText(element: ReactNode): ReactNode[] {
  if (isValidElement(element)) {
    const { children } = element.props;
    if (Array.isArray(children)) return (children as ReactNode[]).map((child) => JSXToText(child));
    return JSXToText(children);
  }
  if (typeof element === "string") return element.split(" ");
  if (typeof element === "number") return [element.toString()];
  return [];
}

function findWordIndex(words: string[], index: number) {
  let currentIndex = 0;
  function recursiveSearch(subArray: ReactNode[], parentIndex: number | null): string | null {
    for (let i = 0; i < subArray.length; i++) {
      const element = subArray[i];
      if (Array.isArray(element)) {
        const result = recursiveSearch(element, i);
        if (result !== null) return `${parentIndex === null ? "" : parentIndex + "-"}${result}`;
      } else if (element) {
        currentIndex += (element as string).length + 1; // +1 for space between words
        if (currentIndex > index) return `${parentIndex === null ? "" : parentIndex + "-"}${i}`;
      }
    }
    return null;
  }
  return recursiveSearch(words, null);
}

export default function Speech({
  text,
  id,
  pitch = 1,
  rate = 1,
  volume = 1,
  lang,
  voiceURI,
  startBtn = <HiVolumeUp />,
  pauseBtn = <HiVolumeOff />,
  stopBtn = <HiMiniStop />,
  useStopOverPause,
  highlightText = false,
  highlightProps = { style: { fontWeight: "bold" } },
  onError = () => alert("Browser not supported! Try some other browser."),
  props = {},
  children,
}: SpeechProps) {
  const [speechStatus, setSpeechStatus] = useState<SpeechStatus>("stopped");
  const [useStop, setUseStop] = useState<boolean>();
  const words = useMemo(() => JSXToText(text) as string[], [text]);
  const [highlightedIndex, setHighlightedIndex] = useState<string | null>(null);
  const [highlightContainer, setHighlightContainer] = useState<HTMLDivElement | null>(null);

  const pause = () => speechStatus !== "paused" && window.speechSynthesis?.pause();
  const stop = () => speechStatus !== "stopped" && window.speechSynthesis?.cancel();

  function start() {
    const synth = window.speechSynthesis;
    if (!synth) return onError();
    setSpeechStatus("started");
    if (speechStatus === "paused") return synth.resume();
    if (synth.speaking) synth.cancel();
    const utterance = new window.SpeechSynthesisUtterance(words.join(" ").replace(/\s|,/g, " "));
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;
    if (lang) utterance.lang = lang;
    if (voiceURI) {
      if (!Array.isArray(voiceURI)) voiceURI = [voiceURI];
      const voices = synth.getVoices();
      for (let i = 0; i < voiceURI.length; i++) {
        const uri = voiceURI[i];
        const voice = voices.find((voice) => voice.voiceURI === uri);
        if (voice) {
          utterance.voice = voice;
          break;
        }
      }
    }
    function setStopped() {
      setSpeechStatus("stopped");
      setHighlightedIndex(null);
      utterance.onpause = null;
      utterance.onend = null;
      utterance.onerror = null;
      utterance.onboundary = null;
      if (synth.paused) synth.cancel();
    }
    utterance.onpause = () => setSpeechStatus("paused");
    utterance.onend = setStopped;
    utterance.onerror = setStopped;
    if (highlightText) utterance.onboundary = (event) => setHighlightedIndex(findWordIndex(words, event.charIndex));
    synth.speak(utterance);
  }

  function highlightedText(element: ReactNode, parentIndex = ""): ReactNode {
    if (!highlightedIndex?.startsWith(parentIndex)) return element;
    if (Array.isArray(element)) return element.map((child, index) => highlightedText(child, parentIndex === "" ? `${index}` : `${parentIndex}-${index}`));
    if (isValidElement(element)) return cloneElement(element, { key: element.key ?? Math.random().toString() }, highlightedText(element.props.children, parentIndex));
    if (typeof element === "string" || typeof element === "number") {
      const words = String(element).split(" ");
      const index = +(highlightedIndex as any).split("-").at(-1);
      return (
        <Fragment key={highlightedIndex}>
          {words.slice(0, index).join(" ") + " "}
          <span {...highlightProps}>{words[index]}</span>
          {" " + words.slice(index + 1).join(" ")}
        </Fragment>
      );
    }
    return element;
  }

  useEffect(() => {
    setUseStop(useStopOverPause ?? ((navigator as any).userAgentData?.mobile || false));
    window.speechSynthesis?.cancel();
  }, []);

  useEffect(() => {
    if (highlightText) setHighlightContainer(document.getElementById(`rtts-${id}`) as HTMLDivElement);
    else setHighlightContainer(null);
  }, [highlightText]);

  return typeof children === "function" ? (
    children({ speechStatus, start, pause, stop })
  ) : (
    <div style={{ display: "flex", columnGap: "1rem" }} {...props}>
      {speechStatus !== "started" ? (
        <span role="button" onClick={start}>
          {startBtn}
        </span>
      ) : useStop === false ? (
        <span role="button" onClick={pause}>
          {pauseBtn}
        </span>
      ) : (
        <span role="button" onClick={stop}>
          {stopBtn}
        </span>
      )}
      {useStop === false && stopBtn && (
        <span role="button" onClick={stop}>
          {stopBtn}
        </span>
      )}
      {highlightContainer && createPortal(highlightedText(text), highlightContainer)}
    </div>
  );
}

export function HighlightedText({ id, children, ...props }: DivProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div id={`rtts-${id}`} {...props}>
      {loading && children}
    </div>
  );
}
