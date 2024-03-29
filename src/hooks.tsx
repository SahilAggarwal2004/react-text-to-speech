import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from "react";
import { ExtendedSpeechSynthesis, JSXToArray, JSXToText, findCharIndex, getIndex, isParent, sanitize } from "./utils.js";

export type SpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export type SpeechSynthesisEventHandler = (event: SpeechSynthesisEvent) => any;

export type useSpeechProps = {
  text: string | JSX.Element;
  pitch?: number;
  rate?: number;
  volume?: number;
  lang?: string;
  voiceURI?: string | string[];
  highlightText?: boolean;
  highlightProps?: SpanProps;
  preserveUtteranceQueue?: boolean;
  onError?: Function;
  onStart?: SpeechSynthesisEventHandler;
  onResume?: SpeechSynthesisEventHandler;
  onPause?: SpeechSynthesisEventHandler;
  onStop?: SpeechSynthesisEventHandler;
  onBoundary?: SpeechSynthesisEventHandler;
};

export type SpeechStatus = "started" | "paused" | "stopped" | "queued";

function useStateRef<T>(init: T) {
  const [state, setState] = useState(init);
  const ref = useRef(init);

  function setStateRef(value: T) {
    ref.current = value;
    setState(value);
  }

  return [state, ref, setStateRef] as const;
}

export function useSpeech({
  text,
  pitch = 1,
  rate = 1,
  volume = 1,
  lang,
  voiceURI,
  highlightText = false,
  highlightProps = { style: { backgroundColor: "yellow" } },
  preserveUtteranceQueue = false,
  onError = () => alert("Browser not supported! Try some other browser."),
  onStart,
  onResume,
  onPause,
  onStop,
  onBoundary,
}: useSpeechProps) {
  const [speechStatus, speechStatusRef, setSpeechStatus] = useStateRef<SpeechStatus>("stopped");
  const [speakingWord, setSpeakingWord] = useState<{ index: string; length: number }>();
  const utteranceRef = useRef<SpeechSynthesisUtterance>();

  const cancel = () => window.speechSynthesis?.cancel();

  const [characters, stringifiedCharacters] = useMemo(() => {
    const characters = JSXToArray(text);
    return [characters, JSON.stringify(characters)];
  }, [text]);

  function start() {
    const synth = window.speechSynthesis;
    if (!synth) return onError();
    if (speechStatus === "paused") return synth.resume();
    if (speechStatus === "queued") return;
    const utterance = (utteranceRef.current = new SpeechSynthesisUtterance(sanitize(JSXToText(text))));
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
    const stopEventHandler: SpeechSynthesisEventHandler = (event) => {
      window.removeEventListener("beforeunload", cancel);
      setSpeechStatus("stopped");
      setSpeakingWord(undefined);
      utterance.onstart = null;
      utterance.onresume = null;
      utterance.onpause = null;
      utterance.onend = null;
      utterance.onerror = null;
      utterance.onboundary = null;
      ExtendedSpeechSynthesis.removeFromQueue();
      ExtendedSpeechSynthesis.speakFromQueue();
      onStop?.(event);
    };
    utterance.onstart = (event) => {
      window.addEventListener("beforeunload", cancel);
      setSpeechStatus("started");
      onStart?.(event);
    };
    utterance.onresume = (event) => {
      setSpeechStatus("started");
      onResume?.(event);
    };
    utterance.onpause = (event) => {
      setSpeechStatus("paused");
      onPause?.(event);
    };
    utterance.onend = stopEventHandler;
    utterance.onerror = stopEventHandler;
    utterance.onboundary = (event) => {
      if (highlightText) setSpeakingWord({ index: findCharIndex(characters, event.charIndex), length: event.charLength });
      onBoundary?.(event);
    };
    if (!preserveUtteranceQueue) ExtendedSpeechSynthesis.clearQueue();
    ExtendedSpeechSynthesis.addToQueue(utterance);
    if (synth.speaking) {
      if (preserveUtteranceQueue && speechStatus !== "started") setSpeechStatus("queued");
      else cancel();
      if (preserveUtteranceQueue) return;
    }
    ExtendedSpeechSynthesis.speakFromQueue();
    setSpeechStatus("started");
  }

  function pause() {
    if (speechStatus === "started") return window.speechSynthesis?.pause();
    if (speechStatus === "queued") stop();
  }

  function stop(status = speechStatus) {
    if (status === "stopped") return;
    if (status !== "queued") return cancel();
    ExtendedSpeechSynthesis.removeFromQueue(utteranceRef.current);
    setSpeechStatus("stopped");
  }

  function highlightedText(element: ReactNode, parentIndex = ""): ReactNode {
    if (!isParent(speakingWord?.index, parentIndex)) return element;
    if (Array.isArray(element)) return element.map((child, index) => highlightedText(child, getIndex(parentIndex, index)));
    if (isValidElement(element)) return cloneElement(element, { key: element.key ?? Math.random() }, highlightedText(element.props.children, parentIndex));
    if (typeof element === "string" || typeof element === "number") {
      element = element.toString();
      const { index, length } = speakingWord!;
      const before = (element as string).slice(0, +index.split("-").at(-1)!).length;
      return (
        <span key={index}>
          {(element as string).slice(0, before)}
          <span {...highlightProps}>{(element as string).slice(before, before + length)}</span>
          {(element as string).slice(before + length)}
        </span>
      );
    }
    return element;
  }

  useEffect(() => {
    return () => stop(speechStatusRef.current);
  }, [stringifiedCharacters]);

  return {
    Text: () => highlightedText(text),
    speechStatus,
    isInQueue: speechStatus === "started" || speechStatus === "queued",
    start,
    pause,
    stop: () => stop(),
  };
}
