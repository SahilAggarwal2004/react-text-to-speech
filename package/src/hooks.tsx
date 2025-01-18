import React, { cloneElement, isValidElement, PropsWithChildren, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { specialSymbol } from "./constants.js";
import { addToQueue, clearQueue, clearQueueHook, clearQueueUnload, dequeue, removeFromQueue, speakFromQueue, subscribe } from "./queue.js";
import { setState, state } from "./state.js";
import { SpeakingWord, SpeechStatus, SpeechSynthesisEventHandler, SpeechSynthesisEventName, SpeechUtterancesQueue, UseSpeechOptions } from "./types.js";
import {
  cancel,
  cloneUtterance,
  findCharIndex,
  getIndex,
  isMobile,
  isParent,
  NodeToKey,
  NodeToWords,
  parent,
  sanitize,
  shouldHighlightNextPart,
  splitNode,
  TextToChunks,
  WordsToText,
} from "./utils.js";

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
  autoPlay = false,
  preserveUtteranceQueue = false,
  highlightText = false,
  showOnlyHighlightedText = false,
  highlightMode = "word",
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
  const [speakingWord, speakingWordRef, setSpeakingWord] = useStateRef<SpeakingWord>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance>(null);
  const { voices } = useVoices();

  const key = useMemo(() => NodeToKey(text), [text]);
  const words = useMemo(() => NodeToWords(text), [key]);
  const reactContent = useMemo(() => highlightedText(text), [speakingWord, words, highlightText, showOnlyHighlightedText]);
  const Text = useCallback(() => reactContent, [reactContent]);

  function start() {
    const synth = window.speechSynthesis;
    if (!synth) return onError(new Error("Browser not supported! Try some other browser."));
    if (speechStatus === "paused") return synth.resume();
    if (speechStatus === "queued") return;
    const sanitizedText = sanitize(WordsToText(words));
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
      const { charIndex, charLength, name } = event as SpeechSynthesisEvent & { name: SpeechSynthesisEventName };
      const isSpecialSymbol = +(utterance.text[charIndex + charLength] === specialSymbol);
      const index = findCharIndex(words, offset + charIndex - isSpecialSymbol);
      if (shouldHighlightNextPart(highlightMode, name, utterance, charIndex) || parent(index) !== parent(speakingWordRef.current?.index))
        setSpeakingWord({ index, length: isSpecialSymbol || charLength });
      if (isSpecialSymbol) offset -= charLength + 1;
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
    if (!highlightText || !isParent(parentIndex, speakingWord?.index)) return !showOnlyHighlightedText && node;
    if (Array.isArray(node)) return node.map((child, index) => highlightedText(child, getIndex(parentIndex, index)));
    if (isValidElement<PropsWithChildren>(node)) return cloneElement(node, { key: node.key ?? Math.random() }, highlightedText(node.props.children, parentIndex));
    if (typeof node === "string" || typeof node === "number") {
      const { index } = speakingWord!;
      if (highlightMode === "paragraph")
        return (
          <mark key={index} {...highlightProps}>
            {node}
          </mark>
        );
      const [before, highlighted, after] = splitNode(highlightMode, String(node), speakingWord!);
      if (showOnlyHighlightedText)
        return (
          <mark key={index} {...highlightProps}>
            {highlighted}
          </mark>
        );
      return (
        <span key={index}>
          {before}
          <mark {...highlightProps}>{highlighted}</mark>
          {after}
        </span>
      );
    }
    return !showOnlyHighlightedText && node;
  }

  useEffect(() => {
    if (autoPlay) start();
    return () => stop(speechStatusRef.current);
  }, [autoPlay, key]);

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
