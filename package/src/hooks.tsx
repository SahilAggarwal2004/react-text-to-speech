import React, { cloneElement, isValidElement, PropsWithChildren, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { defaults, directiveRegex, spaceDelimiter, specialSymbol } from "./constants.js";
import { StripDirectives } from "./modules/directiveUtils.js";
import { addToQueue, clearQueue, clearQueueHook, clearQueueUnload, dequeue, emit, removeFromQueue, speakFromQueue, subscribe } from "./modules/queue.js";
import { setState, state } from "./modules/state.js";
import {
  calculateOriginalTextLength,
  cancel,
  findCharIndex,
  getIndex,
  isMobile,
  isParent,
  NodeToKey,
  NodeToWords,
  parent,
  parse,
  sanitize,
  shouldHighlightNextPart,
  splitNode,
  TextToChunks,
  ToText,
} from "./modules/utils.js";
import {
  DirectiveEvent,
  SpeakingWord,
  SpeakProps,
  SpeechStatus,
  SpeechSynthesisEventName,
  SpeechSynthesisUtteranceProps,
  SpeechUtterancesQueue,
  State,
  UseSpeakOptions,
  UseSpeechOptions,
} from "./types.js";

export function useQueue() {
  const [queue, setQueue] = useState<SpeechUtterancesQueue>([]);

  useEffect(() => subscribe(setQueue), []);

  return { queue, dequeue, clearQueue: clearQueueHook };
}

export function useSpeak(options?: UseSpeakOptions) {
  const [speechProps, setSpeechProps] = useState<SpeakProps>({ text: "" });
  const { start, ...speechInterface } = useSpeech({ ...speechProps, ...options, autoPlay: false });

  const speak = useCallback((text: ReactNode, options: SpeechSynthesisUtteranceProps = {}) => setSpeechProps({ text, ...options }), []);

  useEffect(() => {
    if (speechProps.text) start();
  }, [speechProps]);

  return { speak, start, ...speechInterface };
}

export function useSpeech({
  text,
  pitch = defaults.pitch,
  rate = defaults.rate,
  volume = defaults.volume,
  lang = defaults.lang,
  voiceURI = defaults.voice,
  autoPlay = false,
  preserveUtteranceQueue = false,
  highlightText = false,
  showOnlyHighlightedText = false,
  highlightMode = "word",
  highlightProps,
  enableDirectives = false,
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
  const { utteranceRef, updateProps } = useSpeechSynthesisUtterance();
  const directiveRef = useRef<{ event: DirectiveEvent; delay: number; abortDelay?: Function }>({ event: null, delay: 0 });

  const key = useMemo(() => NodeToKey(text), [text]);
  const stringifiedVoices = useMemo(() => JSON.stringify(voiceURI), [voiceURI]);
  const { sanitizedText, strippedText, words } = useMemo(() => {
    const strippedText = enableDirectives ? StripDirectives(text) : text;
    const words = NodeToWords(strippedText);
    return { sanitizedText: `${spaceDelimiter}${sanitize(ToText(enableDirectives ? text : words))}`, strippedText, words };
  }, [enableDirectives, key]);
  const chunks = useMemo(() => TextToChunks(sanitizedText, maxChunkSize, enableDirectives), [enableDirectives, maxChunkSize, sanitizedText]);

  const reactContent = useMemo(() => highlightedText(strippedText), [speakingWord, highlightText, showOnlyHighlightedText, strippedText]);
  const Text = useCallback(() => reactContent, [reactContent]);

  function reset(event: DirectiveEvent = null) {
    directiveRef.current.abortDelay?.();
    directiveRef.current = { event, delay: 0 };
  }

  function resumeEventHandler() {
    setSpeechStatus("started");
    onResume?.();
  }

  function pauseEventHandler() {
    setSpeechStatus("paused");
    onPause?.();
  }

  function start() {
    const synth = window.speechSynthesis;
    if (!synth) return onError(new Error("Browser not supported! Try some other browser."));
    if (speechStatusRef.current === "paused") {
      if (directiveRef.current.event === "pause") speakFromQueue();
      return synth.resume();
    }
    if (speechStatusRef.current === "queued") return;
    let currentChunk = 0;
    let currentText = chunks[currentChunk] || "";
    let processedTextLength = -spaceDelimiter.length;
    const utterance = utteranceRef.current!;
    utterance.text = currentText.trimStart();
    let offset = processedTextLength + currentText.length - utterance.text.length;
    updateProps({ pitch, rate, volume, lang, voiceURI });

    function handleDirectives() {
      let skip = false;
      while (currentChunk < chunks.length) {
        const match = directiveRegex.exec(currentText);
        if (!match) {
          if (!skip) return true;
          processedTextLength += calculateOriginalTextLength(currentText);
        } else {
          const key = match[1];
          const value = parse(match[2]);
          switch (key) {
            case "delay":
              directiveRef.current.delay += value as number;
              break;
            case "pitch":
            case "rate":
            case "volume":
            case "lang":
            case "voice":
              updateProps({ [key]: value === "default" ? defaults[key] : value });
              break;
            case "skip":
              if (typeof value === "boolean") skip = value;
              break;
          }
        }
        currentText = chunks[++currentChunk];
      }

      return false;
    }

    async function stopEventHandler() {
      if (state.stopReason === "auto" && currentChunk < chunks.length - 1) {
        let continueSpeech = !enableDirectives;
        processedTextLength += calculateOriginalTextLength(currentText);
        currentText = chunks[++currentChunk];
        if (enableDirectives) continueSpeech = handleDirectives();
        if (continueSpeech) {
          utterance.text = currentText.trimStart();
          offset = processedTextLength + currentText.length - utterance.text.length;
          if (speechStatusRef.current === "paused") return reset("pause");
          const { delay } = directiveRef.current;
          directiveRef.current.event = "change";
          if (!delay) return speakFromQueue();
          const timeout = setTimeout(speakFromQueue, delay);
          directiveRef.current.abortDelay = () => clearTimeout(timeout);
          return;
        }
      }
      if (state.stopReason === "change") {
        if (speakingWordRef.current) {
          const currentLength = utterance.text.length;
          utterance.text = utterance.text.slice(speakingWordRef.current.charIndex).trimStart();
          offset += currentLength - utterance.text.length;
          setSpeakingWord(null);
        }
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
      onStop?.();
    }

    utterance.onstart = () => {
      window.addEventListener("beforeunload", clearQueueUnload);
      setState({ stopReason: "auto" });
      if (!directiveRef.current.delay) {
        if (!directiveRef.current.event) return onStart?.();
        if (directiveRef.current.event === "pause") resumeEventHandler();
      }
      reset();
    };
    utterance.onresume = resumeEventHandler;
    utterance.onpause = pauseEventHandler;
    utterance.onend = stopEventHandler;
    utterance.onerror = stopEventHandler;
    utterance.onboundary = (event) => {
      const { charIndex, charLength, name } = event as SpeechSynthesisEvent & { name: SpeechSynthesisEventName };
      const isSpecialSymbol = +(utterance.text[charIndex + charLength] === specialSymbol);
      const index = findCharIndex(words, offset + charIndex - isSpecialSymbol);
      if (shouldHighlightNextPart(highlightMode, name, utterance, charIndex) || parent(index) !== parent(speakingWordRef.current?.index))
        setSpeakingWord({ index, charIndex: isSpecialSymbol ? charIndex + charLength + 1 : charIndex, length: isSpecialSymbol || charLength });
      if (isSpecialSymbol) offset -= charLength + 1;
      onBoundary?.();
    };

    if (!preserveUtteranceQueue) clearQueue();
    addToQueue({ text: StripDirectives(sanitizedText) as string, utterance, setSpeechStatus }, onQueueChange);
    setSpeechStatus("started");
    if (!synth.speaking) return speakFromQueue();
    if (preserveUtteranceQueue && speechStatus !== "started") return setSpeechStatus("queued");
    cancel();
  }

  function pause() {
    if (isMobile(false) || speechStatusRef.current === "queued") return stop();
    if (speechStatusRef.current === "started") {
      if (!directiveRef.current.delay) return window.speechSynthesis?.pause();
      reset("pause");
      pauseEventHandler();
    }
  }

  function stop({ status = speechStatusRef.current, stopReason }: { status?: SpeechStatus; stopReason?: State["stopReason"] } = {}) {
    if (status === "stopped") return;
    if (status === "queued") {
      removeFromQueue(utteranceRef.current!, onQueueChange);
      return setSpeechStatus("stopped");
    }
    if (directiveRef.current.delay || directiveRef.current.event === "pause") {
      reset();
      speakFromQueue();
    }
    cancel(stopReason);
  }

  function highlightedText(node: ReactNode, parentIndex = ""): ReactNode {
    if (!highlightText || !isParent(parentIndex, speakingWord?.index)) return !showOnlyHighlightedText && node;
    switch (typeof node) {
      case "number":
        node = String(node);
      case "string":
        if (!highlightText || !speakingWord) return node;
        const { index } = speakingWord;
        if (highlightMode === "paragraph")
          return (
            <mark key={index} {...highlightProps}>
              {node}
            </mark>
          );
        const [before, highlighted, after] = splitNode(highlightMode, node as string, speakingWord);
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
    if (Array.isArray(node)) return node.map((child, index) => highlightedText(child, getIndex(parentIndex, index)));
    if (isValidElement<PropsWithChildren>(node)) return cloneElement(node, { children: highlightedText(node.props.children, parentIndex) });
    return !showOnlyHighlightedText && node;
  }

  useEffect(() => {
    if (autoPlay) start();
    return () => stop({ status: speechStatusRef.current });
  }, [autoPlay, enableDirectives, key]);

  useEffect(() => {
    if (speechStatusRef.current !== "started") return;
    const timeout = setTimeout(() => {
      updateProps({ pitch, rate, volume, lang, voiceURI });
      if (directiveRef.current.delay) return;
      stop({ stopReason: "change" });
      emit(onQueueChange);
    }, 500);
    return () => clearTimeout(timeout);
  }, [pitch, rate, volume, lang, stringifiedVoices]);

  return {
    Text,
    speechStatus,
    isInQueue: speechStatus === "started" || speechStatus === "queued",
    start,
    pause,
    stop: () => stop(),
  };
}

function useSpeechSynthesisUtterance() {
  const utteranceRef = useRef<SpeechSynthesisUtterance>(typeof window === "undefined" || !window.speechSynthesis ? null : new SpeechSynthesisUtterance());
  const { voices } = useVoices();

  function updateProps({ pitch, rate, volume, lang, voiceURI }: SpeechSynthesisUtteranceProps) {
    const utterance = utteranceRef.current;
    if (!utterance) return;
    if (pitch !== undefined) utterance.pitch = pitch;
    if (rate !== undefined) utterance.rate = rate;
    if (volume !== undefined) utterance.volume = volume;
    if (lang !== undefined) utterance.lang = lang;
    if (voiceURI === undefined) return;
    if (!voiceURI) {
      utterance.voice = null;
      return;
    }
    if (!Array.isArray(voiceURI)) voiceURI = [voiceURI];
    for (let i = 0; i < voiceURI.length; i++) {
      const uri = voiceURI[i];
      const voice = voices.find((voice) => voice.voiceURI === uri);
      if (voice) {
        utterance.voice = voice;
        if (!lang) utterance.lang = voice.lang;
        return;
      }
    }
  }

  return { utteranceRef, updateProps };
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
