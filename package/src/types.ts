import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

// hooks.tsx
export type SpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export type SpeechStatus = "started" | "paused" | "stopped" | "queued";

export type SpeechSynthesisErrorHandler = (error: Error) => any;

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
  maxChunkSize?: number;
  onError?: SpeechSynthesisErrorHandler;
  onStart?: SpeechSynthesisEventHandler;
  onResume?: SpeechSynthesisEventHandler;
  onPause?: SpeechSynthesisEventHandler;
  onStop?: SpeechSynthesisEventHandler;
  onBoundary?: SpeechSynthesisEventHandler;
  onQueueChange?: QueueChangeEventHandler;
};

// icons.tsx
export type IconProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

// index.tsx
export type Button = JSX.Element | string | null;

export type Children = (childrenOptions: ChildrenOptions) => ReactNode;

export type ChildrenOptions = {
  speechStatus?: SpeechStatus;
  isInQueue?: boolean;
  start?: Function;
  pause?: Function;
  stop?: Function;
};

export type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type SpeechProps = useSpeechProps & {
  id?: string;
  startBtn?: Button;
  pauseBtn?: Button;
  stopBtn?: Button;
  useStopOverPause?: boolean;
  props?: DivProps;
  children?: Children;
};

// queue.tsx
export type QueueChangeEventHandler = (queue: SpeechUtterancesQueue) => any;

export type SpeechQueueItem = { utterance: SpeechSynthesisUtterance; setSpeechStatus: SpeechStatusUpdater };

export type SpeechQueue = SpeechQueueItem[];

export type SpeechStatusUpdater = (newStatus: SpeechStatus) => void;

export type SpeechUtterancesQueue = SpeechSynthesisUtterance[];

// utils.tsx
export type Index = string | number;

export type StringArray = string | StringArray[];
