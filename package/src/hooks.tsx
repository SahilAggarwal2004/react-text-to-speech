import React, { cloneElement, isValidElement, PropsWithChildren, ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { specialSymbol } from "./constants.js";
import { addToQueue, clearQueue, clearQueueHook, clearQueueUnload, dequeue, removeFromQueue, speakFromQueue, subscribe } from "./queue.js";
import { setState, state } from "./state.js";
import { SpeechStatus, SpeechSynthesisEventHandler, SpeechUtterancesQueue, UseSpeechOptions } from "./types.js";
import { ArrayToText, cancel, cloneUtterance, findCharIndex, getIndex, isMobile, isParent, JSXToArray, sanitize, TextToChunks } from "./utils.js";

export function useQueue() {
  const [queue, setQueue] = useState<SpeechUtterancesQueue>([]);

  useLayoutEffect(() => subscribe(setQueue), []);

  return { queue, dequeue, clearQueue: clearQueueHook };
}

export function useSpeech({
  text,
  pitch = 1,
  rate = 1,
  volume = 1,
  lang,
  voiceURI,
  autoPlay = false,
  preserveUtteranceQueue = false,
  highlightText = false,
  highlightProps,
  maxChunkSize,
  onError = console.error,
  onStart,
  onResume,
  onPause,
  onStop,
  onBoundary,
  onQueueChange,
}: UseSpeechOptions) {
  const [speechStatus, speechStatusRef, setSpeechStatus] = useStateRef<SpeechStatus>("stopped");
  const [speakingWord, setSpeakingWord] = useState<{ index: string; length: number } | null>();
  const utteranceRef = useRef<SpeechSynthesisUtterance>(null);
  const { voices } = useVoices();

  const [words, stringifiedWords] = useMemo(() => {
    const words = JSXToArray(text);
    return [words, JSON.stringify(words)];
  }, [text]);
  const reactContent = useMemo(() => highlightedText(text), [speakingWord?.index, highlightText, stringifiedWords]);
  const Text = useCallback(() => reactContent, [reactContent]);

  function start() {
    const synth = window.speechSynthesis;
    if (!synth) return onError(new Error("Browser not supported! Try some other browser."));
    if (speechStatus === "paused") return synth.resume();
    if (speechStatus === "queued") return;
    const sanitizedText = sanitize(ArrayToText(words));
    const chunks = TextToChunks(sanitizedText, maxChunkSize);
    const numChunks = chunks.length;
    let currentChunk = 0;
    let currentText = chunks[currentChunk] || "";
    const utterance = new SpeechSynthesisUtterance(currentText.trimStart());
    let offset = currentText.length - utterance.text.length;
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
      if (state.stopReason === "auto" && currentChunk < numChunks - 1) {
        offset += utterance.text.length;
        currentText = chunks[++currentChunk];
        utterance.text = currentText.trimStart();
        offset += currentText.length - utterance.text.length;
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
      setState({ stopReason: "auto" });
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
      const { charIndex, charLength, name } = event;
      if (name === "sentence") setSpeakingWord(null);
      else if (utterance.text[charIndex + charLength] === specialSymbol) {
        setSpeakingWord({ index: findCharIndex(words, offset + charIndex - 1), length: 1 });
        offset -= charLength + 1;
      } else setSpeakingWord({ index: findCharIndex(words, offset + charIndex), length: charLength });
      onBoundary?.(event);
    };
    if (!preserveUtteranceQueue) clearQueue();
    addToQueue({ utterance, displayUtterance: cloneUtterance(utterance, sanitizedText), setSpeechStatus }, onQueueChange);
    setSpeechStatus("started");
    if (synth.speaking) {
      if (preserveUtteranceQueue && speechStatus !== "started") {
        utteranceRef.current = utterance;
        return setSpeechStatus("queued");
      } else cancel();
    } else speakFromQueue();
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

  function highlightedText(node: ReactNode, parentIndex = ""): ReactNode {
    if (!highlightText || !isParent(parentIndex, speakingWord?.index)) return node;
    if (Array.isArray(node)) return node.map((child, index) => highlightedText(child, getIndex(parentIndex, index)));
    if (isValidElement<PropsWithChildren>(node)) return cloneElement(node, { key: node.key ?? Math.random() }, highlightedText(node.props.children, parentIndex));
    if (typeof node === "string" || typeof node === "number") {
      node = String(node);
      const { index, length } = speakingWord!;
      const before = (node as string).slice(0, +index.split("-").at(-1)!).length;
      return (
        <span key={index}>
          {(node as string).slice(0, before)}
          <mark {...highlightProps}>{(node as string).slice(before, before + length)}</mark>
          {(node as string).slice(before + length)}
        </span>
      );
    }
    return node;
  }

  useEffect(() => {
    if (autoPlay) start();
    return () => stop(speechStatusRef.current);
  }, [autoPlay, stringifiedWords]);

  return {
    Text,
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
