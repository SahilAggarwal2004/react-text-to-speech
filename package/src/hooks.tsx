import React, { cloneElement, forwardRef, isValidElement, ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { defaults, directiveRegex, idPrefix, spaceDelimiter, specialSymbol } from "./constants.js";
import { composeProps, createElementWithProps } from "./lib/dom.js";
import { addToQueue, clearQueue, clearQueueHook, clearQueueUnload, dequeue, emit, removeFromQueue, speakFromQueue, subscribe } from "./lib/queue.js";
import { findCharIndex, getIndex, indexText, isParent, isSetStateFunction, nodeToKey, nodeToWords, parent, stripDirectives, toText } from "./lib/react.js";
import { setState, state } from "./lib/state.js";
import { cancel, getProgress, isMobile, parse, sanitize, shouldHighlightNextPart, splitNode, textToChunks } from "./lib/utils.js";
import {
  DirectiveEvent,
  DivProps,
  NodeProps,
  SpeakingWord,
  SpeakProps,
  SpeechStatus,
  SpeechSynthesisEventName,
  SpeechSynthesisUtteranceProps,
  SpeechUtterancesQueue,
  State,
  UpdateMode,
  UseSpeakOptions,
  UseSpeechOptions,
  UseSpeechOptionsInternal,
  VoidFunction,
} from "./types.js";

function useStableValue<T>(value: T, mode: UpdateMode, delay: number) {
  const [stableValue, setStableValue] = useState(value);
  const lastUpdated = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (mode === "immediate" || delay <= 0) timeout = setTimeout(() => setStableValue(value), 0);
    else if (mode === "debounce") timeout = setTimeout(() => setStableValue(value), delay);
    else if (mode === "throttle") {
      const now = Date.now();
      const elapsed = now - lastUpdated.current;
      timeout = setTimeout(
        () => {
          setStableValue(value);
          lastUpdated.current = Date.now();
        },
        Math.max(0, delay - elapsed),
      );
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [value, mode, delay]);

  return stableValue;
}

export function useQueue() {
  const [queue, setQueue] = useState<SpeechUtterancesQueue>([]);

  useEffect(() => subscribe(setQueue), []);

  return { queue, dequeue, clearQueue: clearQueueHook };
}

export function useSpeak(options?: UseSpeakOptions) {
  const [speechProps, setSpeechProps] = useState<SpeakProps>({ text: "" });
  const { start, ...speechInterface } = useSpeech({ ...speechProps, ...options, stableText: true, autoPlay: false });

  const speak = useCallback((text: ReactNode, options: SpeechSynthesisUtteranceProps = {}) => setSpeechProps({ text, ...options }), []);

  useEffect(() => {
    if (speechProps.text) start();
  }, [speechProps]);

  return { speak, start, ...speechInterface };
}

export function useSpeech(speechProps: UseSpeechOptions) {
  const { uniqueId, normalizedText, reactContent, ...speechInterface } = useSpeechInternal(speechProps);

  return speechInterface;
}

/** @internal */
export function useSpeechInternal({
  id,
  text,
  stableText = false,
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
  highlightContainerProps,
  enableDirectives = false,
  updateMode = "immediate",
  updateDelay = 0,
  maxChunkSize,
  onError = console.error,
  onStart,
  onResume,
  onPause,
  onStop,
  onBoundary,
  onQueueChange,
}: UseSpeechOptionsInternal) {
  const [speechStatus, speechStatusRef, setSpeechStatus] = useStateRef<SpeechStatus>("stopped");
  const [speakingWord, speakingWordRef, setSpeakingWord] = useStateRef<SpeakingWord>(null);
  const { utteranceRef, updateProps } = useSpeechSynthesisUtterance();
  const highlightRef = useRef(false);
  const directiveRef = useRef<{ event: DirectiveEvent; delay: number; abortDelay?: VoidFunction }>({ event: null, delay: 0 });

  const uniqueId = useMemo(() => `${idPrefix}${id ?? crypto.randomUUID()}`, [id]);
  const key = useMemo(() => (stableText ? text : nodeToKey(text)), [text, stableText]);
  const stableKey = useStableValue(key, updateMode, updateDelay);
  const stringifiedVoices = useMemo(() => voiceURI.toString(), [voiceURI]);
  const normalizedText = useMemo(() => (isValidElement(text) ? [text] : text), [stableKey]);
  const { indexedText, sanitizedText, speechText, words } = useMemo(() => {
    const strippedText = enableDirectives ? stripDirectives(normalizedText) : normalizedText;
    const words = nodeToWords(strippedText);
    const sanitizedText = `${spaceDelimiter}${sanitize(toText(enableDirectives ? normalizedText : words))}`;
    const speechText = (stripDirectives(sanitizedText) as string).trimStart();
    return { indexedText: indexText(strippedText, uniqueId), sanitizedText, speechText, words };
  }, [enableDirectives, normalizedText]);
  const chunks = useMemo(() => textToChunks(sanitizedText, maxChunkSize, enableDirectives), [enableDirectives, maxChunkSize, sanitizedText]);

  const reactContent = useMemo(() => (showOnlyHighlightedText ? highlightedText(indexedText) : indexedText), [speakingWord, showOnlyHighlightedText, highlightMode, indexedText]);
  const Text = useCallback(
    forwardRef<HTMLDivElement, DivProps>((props, ref) => (
      <div ref={ref} {...composeProps(uniqueId, props)}>
        {reactContent}
      </div>
    )),
    [reactContent],
  );

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
      synth.resume();
      return resumeEventHandler();
    }
    if (speechStatusRef.current === "queued") return;
    let currentChunk = 0;
    let currentText = chunks[currentChunk] || "";
    let processedTextLength = -spaceDelimiter.length;
    const utterance = utteranceRef.current!;
    utterance.text = currentText.trimStart();
    let offset = processedTextLength + currentText.length - utterance.text.length;
    let specialSymbolOffset = 0;
    updateProps({ pitch, rate, volume, lang, voiceURI });

    function handleDirectives() {
      let skip = false;
      while (currentChunk < chunks.length) {
        const match = directiveRegex.exec(currentText);
        if (!match) {
          if (!skip) return true;
          processedTextLength += currentText.length;
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

    function startEventHandler() {
      window.addEventListener("beforeunload", clearQueueUnload);
      setState({ stopReason: "auto" });
      highlightRef.current = true;
      if (directiveRef.current.event || directiveRef.current.delay) reset();
      else onStart?.();
      onBoundary?.({ progress: getProgress(offset, speechText.length) });
    }

    async function stopEventHandler() {
      if (state.stopReason === "auto" && currentChunk < chunks.length - 1) {
        processedTextLength += currentText.length;
        currentText = chunks[++currentChunk];
        const continueSpeech = !enableDirectives || handleDirectives();
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
      if (state.stopReason === "auto") onBoundary?.({ progress: 100 });
      if (synth.paused) cancel();
      window.removeEventListener("beforeunload", clearQueueUnload);
      setSpeechStatus("stopped");
      setSpeakingWord(null);
      utterance.onstart = null;
      utterance.onend = null;
      utterance.onerror = null;
      utterance.onboundary = null;
      removeFromQueue(utterance, onQueueChange);
      speakFromQueue();
      onStop?.();
    }

    function boundaryEventHandler(event: SpeechSynthesisEvent) {
      const { charIndex, charLength, name } = event as SpeechSynthesisEvent & { name: SpeechSynthesisEventName };
      if (name === "word") {
        const isSpecialSymbol = +(utterance.text[charIndex + charLength] === specialSymbol);
        const index = findCharIndex(words, offset + specialSymbolOffset + charIndex - isSpecialSymbol);
        if (shouldHighlightNextPart(highlightMode, utterance, charIndex) || parent(index) !== parent(speakingWordRef.current?.index))
          setSpeakingWord({ index, charIndex: isSpecialSymbol ? charIndex + charLength + 1 : charIndex, length: isSpecialSymbol || charLength });
        if (isSpecialSymbol) specialSymbolOffset -= charLength + 1;
      }
      onBoundary?.({ progress: getProgress(offset + charIndex + charLength, speechText.length) });
    }

    utterance.onstart = startEventHandler;
    utterance.onend = stopEventHandler;
    utterance.onerror = stopEventHandler;
    utterance.onboundary = boundaryEventHandler;

    if (!preserveUtteranceQueue) clearQueue();
    addToQueue({ text: speechText, utterance, setSpeechStatus }, onQueueChange);
    setSpeechStatus("started");
    if (!synth.speaking) return speakFromQueue();
    if (preserveUtteranceQueue && speechStatus !== "started") return setSpeechStatus("queued");
    cancel();
  }

  function pause() {
    if (isMobile(false) || speechStatusRef.current === "queued") return stop();
    if (speechStatusRef.current === "started") {
      if (directiveRef.current.delay) reset("pause");
      else window.speechSynthesis?.pause();
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

  function highlightedText(node: ReactNode, index = ""): ReactNode {
    if (!highlightText || !isParent(index, speakingWord?.index)) return;
    switch (typeof node) {
      case "number":
        node = String(node);
      case "string":
        const highlighted = splitNode(highlightMode, node as string, speakingWord)[1];
        return (
          <span {...highlightContainerProps}>
            <mark {...highlightProps}>{highlighted}</mark>
          </span>
        );
    }
    if (Array.isArray(node)) return node.map((child, i) => highlightedText(child, getIndex(index, i)));
    if (isValidElement<NodeProps>(node)) return cloneElement(node, { children: highlightedText(node.props.children, index) });
  }

  useEffect(() => {
    return () => stop({ status: speechStatusRef.current });
  }, [enableDirectives, key]);

  useLayoutEffect(() => {
    highlightRef.current = false;
    if (autoPlay) start();
  }, [autoPlay, enableDirectives, normalizedText]);

  useLayoutEffect(() => {
    if (!highlightText || !highlightRef.current || showOnlyHighlightedText || !speakingWord) return;

    const parts = speakingWord.index.split("-");
    const parentIndex = parts.slice(0, -1).join("-");

    const elements = Array.from(document.getElementsByClassName(`${uniqueId}${parentIndex}`));
    const elementSnapshots = elements.map((element) => {
      const originalTextContent = element.textContent;
      const [before, highlighted, after] = splitNode(highlightMode, element.textContent, speakingWord);

      const container = createElementWithProps("span", highlightContainerProps);
      const mark = createElementWithProps("mark", highlightProps);
      mark.textContent = highlighted;

      if (before) container.appendChild(document.createTextNode(before));
      container.appendChild(mark);
      if (after) container.appendChild(document.createTextNode(after));

      element.textContent = "";
      element.appendChild(container);

      return [element, originalTextContent] as const;
    });

    return () => {
      if (highlightRef.current) elementSnapshots.forEach(([element, originalTextContent]) => (element.textContent = originalTextContent));
    };
  }, [speakingWord, highlightText, showOnlyHighlightedText, highlightMode]);

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
    uniqueId,
    normalizedText,
    reactContent,
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
    setState((prev) => {
      const next = isSetStateFunction(value) ? value(prev) : value;
      ref.current = next;
      return next;
    });
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
