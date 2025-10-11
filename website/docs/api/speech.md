# Speech Component

## API Reference

Here is the full API for the `<Speech>` component, these properties can be set on an instance of `<Speech>`:

| Parameter                    | Type                                                                          | Required | Default           | Description                                                                                                                                                                                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------- | -------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`                       | `React.ReactNode`                                                             | Yes      | -                 | It contains the text to be spoken by **Web Speech API**.                                                                                                                                                                                                   |
| `id`                         | `string`                                                                      | No       | `auto`            | A unique identifier for the `<Speech>` instance. Must match the `id` of the corresponding `<HighlightedText>` component to link them together.                                                                                                             |
| `pitch`                      | `number (0.1 to 2)`                                                           | No       | `1`               | The pitch at which the utterance will be spoken.                                                                                                                                                                                                           |
| `rate`                       | `number (0.1 to 10)`                                                          | No       | `1`               | The speed at which the utterance will be spoken.                                                                                                                                                                                                           |
| `volume`                     | `number (0 to 1)`                                                             | No       | `1`               | The volume at which the utterance will be spoken.                                                                                                                                                                                                          |
| `lang`                       | `string`                                                                      | No       | -                 | The language in which the utterance will be spoken.                                                                                                                                                                                                        |
| `voiceURI`                   | `string \| string[]`                                                          | No       | -                 | The voice using which the utterance will be spoken. If provided an array, further voices will be used as fallback if initial voices are not found. See possible values [here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices). |
| `autoPlay`                   | `boolean`                                                                     | No       | `false`           | Automatically starts speech when the component loads or when `text` changes, if set to true.                                                                                                                                                               |
| `preserveUtteranceQueue`     | `boolean`                                                                     | No       | `false`           | Whether to maintain a queue of speech utterances (true) or clear previous utterances (false).                                                                                                                                                              |
| `highlightText`              | `boolean`                                                                     | No       | `false`           | Whether the words in the text should be highlighted as they are read or not.                                                                                                                                                                               |
| `showOnlyHighlightedText`    | `boolean`                                                                     | No       | `false`           | If `true`, returns only the currently highlighted text.                                                                                                                                                                                                    |
| `highlightMode`              | [`HighlightMode`](#highlightmode)                                             | No       | `word`            | Defines the level of text highlighting: `word`, `sentence` (highlights until `.`, `?`, `!`, or `\n`), `line` (splits only at `\n`), or `paragraph`.                                                                                                        |
| `highlightProps`             | [`HighlightProps`](#highlightprops)                                           | No       | -                 | Props to customize the highlighted word, typically applied to the `<mark>` tag.                                                                                                                                                                            |
| `highlightContainerProps`    | [`HighlightProps`](#highlightprops)                                           | No       | -                 | Props applied to the container wrapping highlighted words typically applied to the `<span>` tag.                                                                                                                                                           |
| `enableDirectives`           | `boolean`                                                                     | No       | `false`           | If `true`, enables inline processing controls for dynamically adjusting pitch, rate, volume, and other speech parameters, or inserting pauses directly within your text content. See [Directives](/docs/usage/directives).                                 |
| `updateMode`                 | [`UpdateMode`](#updatemode)                                                   | No       | `immediate`       | Controls how text changes are processed: `immediate` (updates instantly), `throttle` (updates at most every `updateDelay` ms, ideal for AI streaming), or `debounce` (waits `updateDelay` ms after changes stop, ideal for user typing).                   |
| `updateDelay`                | `number (ms)`                                                                 | No       | 0                 | Delay for `updateMode` = `throttle` or `debounce`. Has no effect when `updateMode` is `immediate`.                                                                                                                                                         |
| `maxChunkSize`               | `number (minimum 50)`                                                         | No       | 250               | Specifies the maximum size of each text chunk when dividing the text. This helps manage the Web Speech API's text limit, avoiding issues related to large text inputs.                                                                                     |
| `startBtn`                   | [`Button`](#button)                                                           | No       | `<HiVolumeUp />`  | Button to start the speech instance.                                                                                                                                                                                                                       |
| `pauseBtn`                   | [`Button`](#button)                                                           | No       | `<HiVolumeOff />` | Button to pause the speech instance.                                                                                                                                                                                                                       |
| `stopBtn`                    | [`Button`](#button)                                                           | No       | `<HiMiniStop />`  | Button to stop the speech instance.                                                                                                                                                                                                                        |
| `useStopOverPause`           | `boolean`                                                                     | No       | `false`           | Whether the controls should display `stopBtn` instead of `pauseBtn`. In Android devices, `SpeechSynthesis.pause()` behaves like `SpeechSynthesis.cancel()`. See [details](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/pause)          |
| `enableConditionalHighlight` | `boolean`                                                                     | No       | `false`           | If `true`, allows `<Speech>` to correctly render speech markup even when the corresponding `<HighlightedText>` is conditionally mounted or unmounted. May impact performance in large applications.                                                        |
| `props`                      | [DivProps](#divprops)                                                         | No       | -                 | Props passed directly to the wrapper `<div>` rendered by `<Speech>`.                                                                                                                                                                                       |
| `children`                   | [`Children`](#children)                                                       | No       | -                 | See [usage with FaC](/docs/usage/speech#full-customization)                                                                                                                                                                                                |
| `onError`                    | [`SpeechSynthesisErrorHandler`](#speechsynthesiserrorhandler)                 | No       | `console.error`   | Function to be executed if browser doesn't support **Web Speech API**.                                                                                                                                                                                     |
| `onStart`                    | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler)                 | No       | -                 | Function to be executed when speech utterance is started.                                                                                                                                                                                                  |
| `onResume`                   | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler)                 | No       | -                 | Function to be executed when speech utterance is resumed.                                                                                                                                                                                                  |
| `onPause`                    | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler)                 | No       | -                 | Function to be executed when speech utterance is paused.                                                                                                                                                                                                   |
| `onStop`                     | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler)                 | No       | -                 | Function to be executed when speech utterance is stopped.                                                                                                                                                                                                  |
| `onBoundary`                 | [`SpeechSynthesisBoundaryEventHandler`](#speechsynthesisboundaryeventhandler) | No       | -                 | Function to be executed during speech synthesis that provides progress updates. Fires at the start (0%), at word/sentence boundaries during speech (1-99%), and at completion (100%).                                                                      |
| `onQueueChange`              | [`QueueChangeEventHandler`](#queuechangeeventhandler)                         | No       | -                 | Function to be executed whenever `queue` changes.                                                                                                                                                                                                          |

## Types

### Button

```typescript
import { JSX } from "react";

type Button = JSX.Element | string | null;
```

### Children

```typescript
import { ReactNode } from "react";

type SpeechStatus = "started" | "paused" | "stopped" | "queued";
type VoidFunction = () => void;
type ChildrenOptions = {
  speechStatus?: SpeechStatus;
  isInQueue?: boolean;
  start?: VoidFunction;
  pause?: VoidFunction;
  stop?: VoidFunction;
};
type Children = (childrenOptions: ChildrenOptions) => ReactNode;
```

### DivProps

```typescript
import { DetailedHTMLProps, HTMLAttributes } from "react";

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
```

### HighlightMode

```typescript
type HighlightMode = "word" | "sentence" | "line" | "paragraph";
```

### HighlightProps

```typescript
import { CSSProperties } from "react";

type HighlightProps = {
  className?: string;
  id?: string;
  style?: CSSProperties;
  title?: string;
};
```

### QueueChangeEventHandler

```typescript
type SpeechUtterancesQueue = Partial<SpeechSynthesisUtterance>[];
type QueueChangeEventHandler = (queue: SpeechUtterancesQueue) => void;
```

### SpeechSynthesisBoundaryEventHandler

```typescript
type SpeechSynthesisBoundaryEvent = { progress: number };
type SpeechSynthesisBoundaryEventHandler = (event: SpeechSynthesisBoundaryEvent) => void;
```

### SpeechSynthesisErrorHandler

```typescript
type SpeechSynthesisErrorHandler = (error: Error) => void;
```

### SpeechSynthesisEventHandler

```typescript
type SpeechSynthesisEventHandler = () => void;
```

### UpdateMode

```typescript
type UpdateMode = "immediate" | "throttle" | "debounce";
```
