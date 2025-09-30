import { DetailedHTMLProps, HTMLAttributes, JSX, PropsWithChildren, ReactNode } from "react";

// hooks.tsx
export type DirectiveEvent = "change" | "pause" | null;

export type HighlightMode = "word" | "sentence" | "line" | "paragraph";

export type HighlightProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export type NodeProps = PropsWithChildren<{ key?: string; className?: string }>;

export type SpeakingWord = { index: string; charIndex: number; length: number } | null;

export type SpeakProps = SpeechSynthesisUtteranceProps & { text: ReactNode };

export type SpeechStatus = "started" | "paused" | "stopped" | "queued";

export type SpeechSynthesisErrorHandler = (error: Error) => any;

export type SpeechSynthesisEventHandler = () => any;

export type SpeechSynthesisEventName = "word" | "sentence";

export type SpeechSynthesisUtteranceProps = {
  pitch?: number;
  rate?: number;
  volume?: number;
  lang?: string;
  voiceURI?: string | string[];
};

export type UseSpeakOptions = {
  preserveUtteranceQueue?: boolean;
  highlightText?: boolean;
  showOnlyHighlightedText?: boolean;
  highlightMode?: HighlightMode;
  highlightProps?: HighlightProps;
  enableDirectives?: boolean;
  maxChunkSize?: number;
  onError?: SpeechSynthesisErrorHandler;
  onStart?: SpeechSynthesisEventHandler;
  onResume?: SpeechSynthesisEventHandler;
  onPause?: SpeechSynthesisEventHandler;
  onStop?: SpeechSynthesisEventHandler;
  onBoundary?: SpeechSynthesisEventHandler;
  onQueueChange?: QueueChangeEventHandler;
};

export type UseSpeechOptions = SpeakProps & UseSpeakOptions & { autoPlay?: boolean };

export type UseSpeechOptionsInternal = UseSpeechOptions & { id?: string };

// icons.tsx
export type IconProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

// index.tsx
export type Button = JSX.Element | string | null;

export type Children = (childrenOptions: ChildrenOptions) => ReactNode;

export type ChildrenOptions = {
  speechStatus?: SpeechStatus;
  isInQueue?: boolean;
  start?: VoidFunction;
  pause?: VoidFunction;
  stop?: VoidFunction;
};

export type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type HighlightedTextProps = DivProps & { id: string };

export type SpeechProps = UseSpeechOptionsInternal & {
  startBtn?: Button;
  pauseBtn?: Button;
  stopBtn?: Button;
  useStopOverPause?: boolean;
  enableConditionalHighlight?: boolean;
  props?: DivProps;
  children?: Children;
};

export type VoidFunction = () => void;

// queue.ts
export type QueueChangeEventHandler = (queue: SpeechUtterancesQueue) => any;

export type SpeechQueue = SpeechQueueItem[];

export type SpeechQueueItem = { text: string; utterance: SpeechSynthesisUtterance; setSpeechStatus: SpeechStatusUpdater };

export type SpeechStatusUpdater = (newStatus: SpeechStatus) => void;

export type SpeechUtterancesQueue = Partial<SpeechSynthesisUtterance>[];

// utils.tsx
export type Index = string | number;

export type State = { stopReason: "auto" | "change" | "manual" };

export type Words = string | Words[];
