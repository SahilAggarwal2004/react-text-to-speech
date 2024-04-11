# react-text-to-speech

An easy to use react component for the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

It is as easy as to import a React component!

## Features

- Text-to-speech
- Easy to use
- Highlights words as they are read. See highlighting text using [useSpeech Hook](#highlight-text) and [Speech Component](#highlight-text-1)
- Provides API to handle errors and events. See [Handling Errors and Events](#handling-errors-and-events)
- Handles multiple speech instances easily. See handling using [useSpeech Hook](#multiple-instance-usage) and [Speech Component](#multiple-instance-usage-1)
- Fully Customizable. See [useSpeech Hook Usage](#usespeech-hook) and [usage with FaC](#full-customization)
- Stops speech instance on component unmount.

## Installation

To install react-text-to-speech

```bash
  # with npm:
  npm install react-text-to-speech --save

  # with yarn:
  yarn add react-text-to-speech

  # with pnpm:
  pnpm add react-text-to-speech

  # with bun:
  bun add react-text-to-speech
```

## Usage

The `react-text-to-speech` package offers two main ways to integrate text-to-speech functionality into your React applications through the `useSpeech` hook and the `<Speech>` component.

### useSpeech Hook

#### Basic Usage

```jsx
import React from "react";
import { useSpeech } from "react-text-to-speech";

export default function App() {
  const {
    Text, // Component that returns the modified text property
    speechStatus, // String that stores current speech status
    isInQueue, // Boolean that stores whether a speech utterance is either being spoken or present in queue
    start, // Function to start the speech or put it in queue
    pause, // Function to pause the speech
    stop, // Function to stop the speech or remove it from queue
  } = useSpeech({ text: "This library is awesome!" });

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <Text />
      <div style={{ display: "flex", columnGap: "0.5rem" }}>
        {speechStatus !== "started" ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
        <button onClick={stop}>Stop</button>
      </div>
    </div>
  );
}
```

#### Highlight Text

The `highlightText` & `highlightProps` props, available in both `useSpeech` hook and `<Speech>` component, can be used to highlight text and modify its styling.

Here, you may want to pass a `JSX.Element` instead of a plain string as `text` property for better presentation and ease of use, and `react-text-to-speech` supports it!

`NOTE`: It is recommended to memoize the `JSX.Element` first before passing it to `text` property for performance optimizations.

```jsx
import React, { useMemo, useState } from "react";
import { useSpeech } from "react-text-to-speech";

export default function App() {
  const [highlightText, setHighlightText] = useState(true);
  const text = useMemo(
    () => (
      <div>
        <span>This library is awesome!</span>
        <div>
          <div>
            <span>It can also read and highlight </span>
            <span>nested text... </span>
            <span>
              <span>upto </span>
              <span>
                any
                <span> level.</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    ),
    []
  );
  const { Text, speechStatus, start, pause, stop } = useSpeech({
    text,
    highlightText,
    highlightProps: { style: { color: "white", backgroundColor: "blue" } },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <Text />
      <div style={{ display: "flex", columnGap: "0.5rem" }}>
        {speechStatus !== "started" ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
        <button onClick={stop}>Stop</button>
        <button onClick={() => setHighlightText(!highlightText)}>Toggle Highlight Text</button>
      </div>
    </div>
  );
}
```

#### Handling Errors and Events

```jsx
import React from "react";
import { useSpeech } from "react-text-to-speech";

export default function App() {
  const { Text, speechStatus, start, pause, stop } = useSpeech({
    text: "This library can handle different speech events!",
    onError: (error) => {
      alert(error.message);
    },
    onStart: (event) => {
      console.log("Speech Started:", event);
    },
    onResume: (event) => {
      console.log("Speech Resumed:", event);
    },
    onPause: (event) => {
      console.log("Speech Paused:", event);
    },
    onStop: (event) => {
      console.log("Speech Stopped:", event);
    },
    onBoundary: (event) => {
      console.log("Boundary:", event);
    },
    onQueueChange: (queue) => {
      console.log("Queue updated:", queue);
    },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <Text />
      <div style={{ display: "flex", columnGap: "0.5rem" }}>
        {speechStatus !== "started" ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
        <button onClick={stop}>Stop</button>
      </div>
    </div>
  );
}
```

#### Multiple Instance Usage

The `preserveUtteranceQueue` prop, available in both `useSpeech` hook and `<Speech>` component, facilitates handling multiple speech instances simultaneously.\
If set to `false`, any currently speaking speech utterance will be stopped immediately upon initiating a new utterance. The new utterance will be spoken without waiting for the previous one to finish.\
If set to `true`, new speech utterances will be added to a queue. They will be spoken once the previous speech instances are completed. This allows for sequential delivery of speech content, maintaining order and avoiding overlapping utterances.

The `useQueue` hook can be used to keep track of the queue as well as change the queue as shown below. The `onQueueChange` event handler used [above](#handling-errors-and-events) can also be used to keep track of queue updates.

```jsx
import React, { useMemo } from "react";
import { useQueue, useSpeech } from "../components/dist";

function NewsItem({ title, desc }) {
  const text = useMemo(
    () => (
      <>
        <h4 style={{ margin: 0 }}>{title}</h4>
        <div style={{ marginBottom: "0.5rem" }}>{desc}</div>
      </>
    ),
    [title, desc]
  );
  const { Text, speechStatus, isInQueue, start, stop } = useSpeech({ text, preserveUtteranceQueue: true });

  return (
    <div>
      <Text />
      <div style={{ display: "flex", columnGap: "0.5rem" }}>{!isInQueue ? <button onClick={start}>Start</button> : <button onClick={stop}>Stop</button>}</div>
    </div>
  );
}

export default function App() {
  // 'news' holds response from some News API
  const news = [
    { id: "1", title: "First random title.", desc: "First random description." },
    { id: "2", title: "Second random title.", desc: "Second random description." },
    { id: "3", title: "Third random title.", desc: "Third random description." },
  ];
  const {
    queue, // Queue that stores all the speech utterances
    clearQueue, // Function to clear the queue
    dequeue, // Function to remove a speech utterance from the queue at a specific index
  } = useQueue();

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
        {news.map(({ id, title, desc }) => (
          <NewsItem key={id} title={title} desc={desc} />
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem", marginBlock: "2rem" }}>
        {queue.length ? (
          queue.map(({ text }, i) => (
            <div key={i}>
              <button onClick={() => dequeue(i)}>Dequeue</button>
              <span style={{ marginLeft: "1rem" }}>{text}</span>
            </div>
          ))
        ) : (
          <div>Queue is Empty</div>
        )}
      </div>
      <button onClick={clearQueue}>Clear Queue</button>
    </div>
  );
}
```

### Speech Component

#### Basic Usage

```jsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  return <Speech text="This library is awesome!" />;
}
```

#### Highlight Text

For `<Speech>` component, `<HighlightedText>` component exported by `react-text-to-speech` can be used to display the highlighted text.

`NOTE`: `id` of both `<Speech>` and `<HighlightedText>` should be same to link them together. Additionally, `text` should be included as children within the `<HighlightedText>` component as demonstrated below. This helps prevent initial [layout shift](https://web.dev/articles/cls) issues that may arise while `react-reorder-list` links both components based on their respective `id`. It's important to note that the children added in this manner are temporary and will be replaced once the components are successfully linked.

```jsx
import React, { useMemo } from "react";
import Speech, { HighlightedText } from "react-text-to-speech";

export default function App() {
  const text = useMemo(
    () => (
      <div>
        <span>This library is awesome!</span>
        <div>
          <div>
            <span>It can also read and highlight </span>
            <span>nested text... </span>
            <span>
              <span>upto </span>
              <span>
                any
                <span> level.</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    ),
    []
  );

  return (
    <>
      <Speech id="unique-id" text={text} highlightText={true} />
      <HighlightedText id="unique-id">{text}</HighlightedText>
    </>
  );
}
```

#### Multiple Instance Usage

```jsx
import React, { useMemo } from "react";
import Speech from "react-text-to-speech";

function NewsItem({ title, desc }) {
  const text = useMemo(
    () => (
      <>
        <h4 style={{ margin: 0 }}>{title}</h4>
        <div style={{ marginBottom: "0.5rem" }}>{desc}</div>
      </>
    ),
    [title, desc]
  );
  return (
    <div>
      {text}
      <Speech text={text} />
    </div>
  );
}

export default function App() {
  // 'news' holds response from some News API
  const news = [
    { id: "1", title: "First random title.", desc: "First random description." },
    { id: "2", title: "Second random title.", desc: "Second random description." },
    { id: "3", title: "Third random title.", desc: "Third random description." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      {news.map(({ id, title, desc }) => (
        <NewsItem key={id} title={title} desc={desc} />
      ))}
    </div>
  );
}
```

#### Full Customization

Using Function as Children(FaC) in the `<Speech>` component.

```jsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  return (
    <Speech text="This is a fully customized speech component." pitch={1.5} rate={2} volume={0.5} voiceURI="Microsoft Heera - English (India)">
      {({ speechStatus, isInQueue, start, pause, stop }) => (
        <div style={{ display: "flex", columnGap: "0.5rem" }}>
          {speechStatus !== "started" ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
          <button onClick={stop}>Stop</button>
        </div>
      )}
    </Speech>
  );
}
```

## API Reference

### useSpeech Hook

Here is the full API for the `useSpeech` hook, these options can be passed as paramerters to the hook:
| Parameter | Type | Required | Default | Description |
| - | - | - | - | - |
| `text` | `string \| JSX.Element` | Yes | - | It contains the text to be spoken by `Web Speech API`. |
| `pitch` | `number (0 to 2)` | No | 1 | The pitch at which the utterance will be spoken. |
| `rate` | `number (0.1 to 10)` | No | 1 | The speed at which the utterance will be spoken. |
| `volume` | `number (0 to 1)` | No | 1 | The volume at which the utterance will be spoken. |
| `lang` | `string` | No | - | The language in which the utterance will be spoken. |
| `voiceURI` | `string \| string[]` | No | - | The voice using which the utterance will be spoken. If provided an array, further voices will be used as fallback if initial voices are not found. See possible values [here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices). |
| `highlightText` | `boolean` | No | `false` | Whether the words in the text should be highlighted as they are read or not. |
| `highlightProps` | `React.DetailedHTMLProps` | No | - | Props to customize the highlighted word, typically applied to the `<mark>` tag. |
| `preserveUtteranceQueue` | `boolean` | No | `false` | Whether to maintain a queue of speech utterances (true) or clear previous utterances (false). |
| `onError` | [`SpeechSynthesisErrorHandler`](#speechsynthesiserrorhandler) | No | `console.error` | Function to be executed if browser doesn't support `Web Speech API`. |
| `onStart` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed when speech utterance is started. |
| `onResume` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed when speech utterance is resumed. |
| `onPause` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed when speech utterance is paused. |
| `onStop` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed when speech utterance is stopped. |
| `onBoundary` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed at specified boundaries during speech synthesis. |
| `onQueueChange` | [`QueueChangeEventHandler`](#queuechangeeventhandler) | No | - | Function to be executed whenever `queue` changes. |

### Speech Component

Here is the full API for the `<Speech>` component, these properties can be set on an instance of `<Speech>`. It contains all the parameters that are listed in [useSpeech Hook API Reference](#usespeech-hook-1) along with the following parameters:
| Parameter | Type | Required | Default | Description |
| - | - | - | - | - |
| `startBtn` | [`Button`](#button) | No | `<HiVolumeUp />` | Button to start the speech instance. |
| `pauseBtn` | [`Button`](#button) | No | `<HiVolumeOff />` | Button to pause the speech instance. |
| `stopBtn` | [`Button`](#button) | No | `<HiMiniStop />` | Button to stop the speech instance. |
| `useStopOverPause` | `boolean` | No | `false` | Whether the controls should display `stopBtn` instead of `pauseBtn`. In Android devices, `SpeechSynthesis.pause()` behaves like `SpeechSynthesis.cancel()`. See [details](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/pause) |
| `props` | `React.DetailedHTMLProps` | No | - | Props to customize the `<Speech>` component. |
| `children` | [`Children`](#children) | No | - | See [usage with FaC](#full-customization) |

### Types

#### SpeechSynthesisErrorHandler

```typescript
type SpeechSynthesisErrorHandler = (error: Error) => any;
```

#### SpeechSynthesisEventHandler

```typescript
type SpeechSynthesisEventHandler = (event: SpeechSynthesisEvent) => any;
```

#### QueueChangeEventHandler

```typescript
type SpeechUtterancesQueue = SpeechSynthesisUtterance[];
type QueueChangeEventHandler = (queue: SpeechUtterancesQueue) => any;
```

#### Button

```typescript
type Button = JSX.Element | string | null;
```

#### Children

```typescript
import { ReactNode } from "react";
type SpeechStatus = "started" | "paused" | "stopped" | "queued";
type ChildrenOptions = {
  speechStatus?: SpeechStatus;
  isInQueue?: boolean;
  start?: Function;
  pause?: Function;
  stop?: Function;
};
type Children = (childrenOptions: ChildrenOptions) => ReactNode;
```

## Author

[Sahil Aggarwal](https://www.github.com/SahilAggarwal2004)

### Contributors

- [Akshay Srivastava](https://github.com/akshaypx)
