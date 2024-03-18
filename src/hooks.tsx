import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from "react";
import { ExtendedSpeechSynthesis, JSXToArray, JSXToText, findCharIndex, getIndex, isParent, sanitize } from "./utils.js";

export type SpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export type useSpeechProps = {
  text: string | JSX.Element;
  pitch?: number;
  rate?: number;
  volume?: number;
  lang?: string;
  voiceURI?: string | string[];
  preserveUtteranceQueue?: boolean;
  highlightText?: boolean;
  highlightProps?: SpanProps;
  onError?: Function;
};

export type SpeechStatus = "started" | "paused" | "stopped" | "queued";

export function useSpeech({
  text,
  pitch = 1,
  rate = 1,
  volume = 1,
  lang,
  voiceURI,
  preserveUtteranceQueue = false,
  highlightText = false,
  highlightProps = { style: { backgroundColor: "yellow" } },
  onError = () => alert("Browser not supported! Try some other browser."),
}: useSpeechProps) {
  const [speechStatus, setSpeechStatus] = useState<SpeechStatus>("stopped");
  const [speakingWord, setSpeakingWord] = useState<{ index: string; length: number }>();
  const utteranceRef = useRef<SpeechSynthesisUtterance>();
  const characters = useMemo(() => JSXToArray(text), [text]);

  const cancel = () => window.speechSynthesis?.cancel();
  const pause = () => speechStatus !== "paused" && window.speechSynthesis?.pause();

  function start() {
    const synth = window.speechSynthesis;
    if (!synth) return onError();
    if (speechStatus === "paused") return synth.resume();
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
    function onStop() {
      setSpeechStatus("stopped");
      setSpeakingWord(undefined);
      utterance.onstart = null;
      utterance.onresume = null;
      utterance.onpause = null;
      utterance.onend = null;
      utterance.onerror = null;
      utterance.onboundary = null;
      if (synth.paused) cancel();
      ExtendedSpeechSynthesis.removeFromQueue();
      ExtendedSpeechSynthesis.speakFromQueue();
    }
    utterance.onstart = () => setSpeechStatus("started");
    utterance.onresume = () => setSpeechStatus("started");
    utterance.onpause = () => setSpeechStatus("paused");
    utterance.onend = onStop;
    utterance.onerror = onStop;
    if (highlightText) utterance.onboundary = ({ charIndex, charLength }) => setSpeakingWord({ index: findCharIndex(characters, charIndex), length: charLength });
    if (!preserveUtteranceQueue) ExtendedSpeechSynthesis.clearQueue();
    ExtendedSpeechSynthesis.addToQueue(utterance);
    if (synth.speaking) {
      if (preserveUtteranceQueue) return setSpeechStatus("queued");
      cancel();
    }
    ExtendedSpeechSynthesis.speakFromQueue();
  }

  function stop() {
    if (speechStatus === "stopped") return;
    if (speechStatus !== "queued") return cancel();
    setSpeechStatus("stopped");
    ExtendedSpeechSynthesis.removeFromQueue(utteranceRef.current);
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
    cancel();
    return cancel;
  }, []);

  return { Text: () => highlightedText(text), speechStatus, start, pause, stop };
}
