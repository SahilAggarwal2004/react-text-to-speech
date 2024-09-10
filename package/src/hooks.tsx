import React, { cloneElement, isValidElement, ReactNode, useEffect, useMemo, useRef, useState } from "react";

import { addToQueue, clearQueue, clearQueueHook, clearQueueUnload, dequeue, removeFromQueue, speakFromQueue, subscribe } from "./queue.js";
import { SpeechStatus, SpeechSynthesisEventHandler, SpeechUtterancesQueue, useSpeechProps } from "./types.js";
import { ArrayToText, cancel, findCharIndex, getIndex, isMobile, isParent, JSXToArray, sanitize, TextToChunks } from "./utils.js";

export function useQueue() {
  const [queue, setQueue] = useState<SpeechUtterancesQueue>([]);

  useEffect(() => subscribe(setQueue), []);

  return { queue, dequeue, clearQueue: clearQueueHook };
}

export function useSpeech({
  text,
  pitch = 1,
  rate = 1,
  volume = 1,
  lang,
  voiceURI,
  highlightText = false,
  highlightProps,
  preserveUtteranceQueue = false,
  maxChunkSize,
  onError = console.error,
  onStart,
  onResume,
  onPause,
  onStop,
  onBoundary,
  onQueueChange,
}: useSpeechProps) {
  const [speechStatus, speechStatusRef, setSpeechStatus] = useStateRef<SpeechStatus>("stopped");
  const [speakingWord, setSpeakingWord] = useState<{ index: string; length: number } | null>();
  const utteranceRef = useRef<SpeechSynthesisUtterance>();
  const { voices } = useVoices();

  const [words, stringifiedWords] = useMemo(() => {
    const words = JSXToArray(text);
    return [words, JSON.stringify(words)];
  }, [text]);

  function start() {
    const synth = window.speechSynthesis;
    if (!synth) return onError(new Error("Browser not supported! Try some other browser."));
    if (speechStatus === "paused") return synth.resume();
    if (speechStatus === "queued") return;
    const chunks = TextToChunks(sanitize(ArrayToText(words)), maxChunkSize);
    const numChunks = chunks.length;
    let currentChunk = 0,
      offset = 0;
    const utterance = new SpeechSynthesisUtterance(chunks[currentChunk]);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;
    if (lang) utterance.lang = lang;
    if (voiceURI) {
      if (!Array.isArray(voiceURI)) voiceURI = [voiceURI];
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
      if (event.type === "end" && currentChunk < numChunks - 1) {
        offset += chunks[currentChunk].length;
        utterance.text = chunks[++currentChunk];
        return speakFromQueue();
      }
      if (synth.paused) cancel();
      window.removeEventListener("beforeunload", clearQueueUnload);
      setSpeechStatus("stopped");
      setSpeakingWord(null);
      utterance.onstart = null;
      utterance.onresume = null;
      utterance.onpause = null;
      utterance.onend = null;
      utterance.onerror = null;
      utterance.onboundary = null;
      removeFromQueue(utterance, onQueueChange);
      speakFromQueue();
      onStop?.(event);
    };
    utterance.onstart = (event) => {
      window.addEventListener("beforeunload", clearQueueUnload);
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
      setSpeakingWord({ index: findCharIndex(words, offset + event.charIndex), length: event.charLength });
      onBoundary?.(event);
    };
    if (!preserveUtteranceQueue) clearQueue();
    addToQueue({ utterance, setSpeechStatus }, onQueueChange);
    if (synth.speaking) {
      if (preserveUtteranceQueue && speechStatus !== "started") {
        utteranceRef.current = utterance;
        return setSpeechStatus("queued");
      } else cancel();
    } else speakFromQueue();
    setSpeechStatus("started");
  }

  function pause() {
    if (isMobile(false) || speechStatus === "queued") return stop();
    if (speechStatus === "started") window.speechSynthesis?.pause();
  }

  function stop(status = speechStatus) {
    if (status === "stopped") return;
    if (status !== "queued") return cancel();
    removeFromQueue(utteranceRef.current!, onQueueChange);
    setSpeechStatus("stopped");
  }

  function highlightedText(element: ReactNode, parentIndex = ""): ReactNode {
    if (!highlightText || !isParent(parentIndex, speakingWord?.index)) return element;
    if (Array.isArray(element)) return element.map((child, index) => highlightedText(child, getIndex(parentIndex, index)));
    if (isValidElement(element)) return cloneElement(element, { key: element.key ?? Math.random() }, highlightedText(element.props.children, parentIndex));
    if (typeof element === "string" || typeof element === "number") {
      element = String(element);
      const { index, length } = speakingWord!;
      const before = (element as string).slice(0, +index.split("-").at(-1)!).length;
      return (
        <span key={index}>
          {(element as string).slice(0, before)}
          <mark {...highlightProps}>{(element as string).slice(before, before + length)}</mark>
          {(element as string).slice(before + length)}
        </span>
      );
    }
    return element;
  }

  useEffect(() => {
    return () => stop(speechStatusRef.current);
  }, [stringifiedWords]);

  return {
    Text: () => highlightedText(text),
    speechStatus,
    isInQueue: speechStatus === "started" || speechStatus === "queued",
    start,
    pause,
    stop: () => stop(),
  };
}

function useStateRef<T>(init: T) {
  const [state, setState] = useState(init);
  const ref = useRef(init);

  function setStateRef(value: T) {
    ref.current = value;
    setState(value);
  }

  return [state, ref, setStateRef] as const;
}

export function useVoices() {
  const [languages, setLanguages] = useState<string[]>([]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  function setData(voices: SpeechSynthesisVoice[]) {
    setLanguages([...new Set(voices.map(({ lang }) => lang))]);
    setVoices(voices);
  }

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const voices = synth.getVoices();
    if (voices.length) setData(voices);
    else {
      const onVoicesChanged = () => setData(synth.getVoices());
      synth.addEventListener("voiceschanged", onVoicesChanged);
      return () => synth.removeEventListener("voiceschanged", onVoicesChanged);
    }
  }, []);

  return { languages, voices };
}
