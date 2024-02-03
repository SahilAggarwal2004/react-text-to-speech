import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, useEffect, useState } from "react";
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

export type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type SpeechProps = {
  text: string;
  pitch?: number;
  rate?: number;
  volume?: number;
  lang?: string;
  voiceURI?: string;
  startBtn?: Button;
  pauseBtn?: Button;
  stopBtn?: Button;
  useStopOverPause?: boolean;
  onError?: Function;
  children?: Children;
  props?: Props;
};

export type { IconProps } from "./icons.js";

export default function Speech({
  text,
  pitch = 1,
  rate = 1,
  volume = 1,
  voiceURI = "Microsoft Zira - English (United States)",
  lang = "",
  startBtn = <HiVolumeUp />,
  pauseBtn = <HiVolumeOff />,
  stopBtn = <HiMiniStop />,
  useStopOverPause,
  onError = () => alert("Browser not supported! Try some other browser."),
  children,
  props = {},
}: SpeechProps) {
  const [speechStatus, setSpeechStatus] = useState<SpeechStatus>("stopped");
  const [useStop, setUseStop] = useState<boolean>();

  const pause = () =>
    speechStatus !== "paused" && window.speechSynthesis?.pause();
  const stop = () =>
    speechStatus !== "stopped" && window.speechSynthesis?.cancel();

  function start() {
    const synth = window.speechSynthesis;
    if (!synth) return onError();
    setSpeechStatus("started");
    if (speechStatus === "paused") return synth.resume();
    if (synth.speaking) synth.cancel();
    const utterance = new window.SpeechSynthesisUtterance(
      text?.replace(/\s/g, " ")
    );
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;
    utterance.lang = lang;
    const isVoicePresent = synth
      .getVoices()
      .find((voice) => voice.voiceURI === voiceURI);
    const voice = isVoicePresent
      ? synth.getVoices().find((voice) => voice.voiceURI === voiceURI)
      : synth.getVoices()[0];
    utterance.voice = voice ? voice : synth.getVoices()[0];
    function setStopped() {
      setSpeechStatus("stopped");
      utterance.onpause = null;
      utterance.onend = null;
      utterance.onerror = null;
      if (synth.paused) synth.cancel();
    }
    utterance.onpause = () => setSpeechStatus("paused");
    utterance.onend = setStopped;
    utterance.onerror = setStopped;
    synth.speak(utterance);
  }

  useEffect(() => {
    setUseStop(
      useStopOverPause ?? ((navigator as any).userAgentData?.mobile || false)
    );
    window.speechSynthesis?.cancel();
  }, []);

  return typeof children === "function" ? (
    children({ speechStatus, start, pause, stop })
  ) : (
    <div style={{ display: "flex", columnGap: "1rem" }} {...props}>
      {speechStatus !== "started"
        ? <span role="button" onClick={start}>
          {startBtn}
        </span>
        : useStop === false
        ? <span role="button" onClick={pause}>
          {pauseBtn}
        </span>
        : <span role="button" onClick={stop}>
          {stopBtn}
        </span>}
      {useStop === false && stopBtn && (
        <span role="button" onClick={stop}>
          {stopBtn}
        </span>
      )}
    </div>
  );
}
