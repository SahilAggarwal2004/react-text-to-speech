import React, { DetailedHTMLProps, Fragment, HTMLAttributes, ReactNode, cloneElement, isValidElement, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { JSXToArray, JSXToText, findWordIndex, splitElement } from "./utils.js";
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

export type { StringArray } from "./utils.js";

export type { IconProps } from "./icons.js";

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
  highlightProps = { style: { backgroundColor: "yellow" } },
  onError = () => alert("Browser not supported! Try some other browser."),
  props = {},
  children,
}: SpeechProps) {
  const [speechStatus, setSpeechStatus] = useState<SpeechStatus>("stopped");
  const [useStop, setUseStop] = useState<boolean>();
  const [speakingWord, setSpeakingWord] = useState<{ index: string | null; length: number }>();
  const [highlightContainer, setHighlightContainer] = useState<HTMLDivElement | null>(null);
  const words = useMemo(() => JSXToArray(text), [text]);

  const pause = () => speechStatus !== "paused" && window.speechSynthesis?.pause();
  const stop = () => speechStatus !== "stopped" && window.speechSynthesis?.cancel();

  function start() {
    const synth = window.speechSynthesis;
    if (!synth) return onError();
    setSpeechStatus("started");
    if (speechStatus === "paused") return synth.resume();
    if (synth.speaking) synth.cancel();
    const utterance = new window.SpeechSynthesisUtterance(JSXToText(text));
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
      setSpeakingWord(undefined);
      utterance.onpause = null;
      utterance.onend = null;
      utterance.onerror = null;
      utterance.onboundary = null;
      if (synth.paused) synth.cancel();
    }
    utterance.onpause = () => setSpeechStatus("paused");
    utterance.onend = setStopped;
    utterance.onerror = setStopped;
    if (highlightText) utterance.onboundary = ({ charIndex, charLength }) => setSpeakingWord({ index: findWordIndex(words, charIndex), length: charLength });
    synth.speak(utterance);
  }

  function highlightedText(element: ReactNode, parentIndex = ""): ReactNode {
    if (!speakingWord?.index?.startsWith(parentIndex)) return element;
    if (Array.isArray(element)) return element.map((child, index) => highlightedText(child, parentIndex === "" ? `${index}` : `${parentIndex}-${index}`));
    if (isValidElement(element)) return cloneElement(element, { key: element.key ?? Math.random().toString() }, highlightedText(element.props.children, parentIndex));
    if (typeof element === "string" || typeof element === "number") {
      element = element.toString();
      const index = +(speakingWord.index as any).split("-").at(-1);
      const before = index
        ? splitElement(element as string)
            .slice(0, index)
            .join("").length
        : 0;
      return (
        <Fragment key={speakingWord.index}>
          {(element as string).slice(0, before)}
          <span {...highlightProps}>{(element as string).slice(before, before + speakingWord.length)}</span>
          {(element as string).slice(before + speakingWord.length)}
        </Fragment>
      );
    }
    return element;
  }

  useEffect(() => {
    setUseStop(useStopOverPause ?? ((navigator as any).userAgentData?.mobile || false));
    return () => window.speechSynthesis?.cancel();
  }, []);

  useEffect(() => {
    if (highlightText) setHighlightContainer(document.getElementById(`rtts-${id}`) as HTMLDivElement);
    else setHighlightContainer(null);
  }, [highlightText]);

  return (
    <>
      {typeof children === "function" ? (
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
        </div>
      )}
      {highlightContainer && createPortal(highlightedText(text), highlightContainer)}
    </>
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
