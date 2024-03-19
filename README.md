# react-text-to-speech

An easy to use react component for the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

It is as easy as to import a React component!

## Features

- Text-to-speech
- Easy to use
- Highlights words as they are read. See highlighting text using [useSpeech Hook](#highlight-text) and [Speech Component](#highlight-text-1)
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
  const { Text, speechStatus, start, pause, stop } = useSpeech({ text: "This library is awesome!" });

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

The `preserveUtteranceQueue` prop, available in both `useSpeech` and `<Speech>` components, facilitates handling multiple speech instances simultaneously.

If set to `false`, any currently speaking speech utterance will be stopped immediately upon initiating a new utterance. The new utterance will be spoken without waiting for the previous one to finish.

If set to `true`, new speech utterances will be added to a queue. They will be spoken once the previous speech instances are completed. This allows for sequential delivery of speech content, maintaining order and avoiding overlapping utterances.

```jsx
import React from "react";
import { useSpeech } from "../components/dist";

function NewsItem({ title, desc }) {
  const text = (
    <>
      <h4 style={{ margin: 0 }}>{title}</h4>
      <div style={{ marginBottom: "0.5rem" }}>{desc}</div>
    </>
  );
  const { Text, speechStatus, start, stop, isInQueue } = useSpeech({ text, preserveUtteranceQueue: true });

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

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      {news.map(({ id, title, desc }) => (
        <NewsItem key={id} title={title} desc={desc} />
      ))}
    </div>
  );
}
```

#### Highlight Text

```jsx
import React from "react";
import { useSpeech } from "react-text-to-speech";

export default function App() {
  const { Text, speechStatus, start, pause, stop, isInQueue } = useSpeech({
    text: (
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
    highlightText: true,
    highlightProps: { style: { color: "white", backgroundColor: "blue" } },
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

### Speech Component

#### Basic Usage

```jsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  return <Speech text="This library is awesome!" />;
}
```

#### Multiple Instance Usage

```jsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  // 'news' holds response from some News API
  const news = [
    { id: "1", title: "First random title.", desc: "First random description." },
    { id: "2", title: "Second random title.", desc: "Second random description." },
    { id: "3", title: "Third random title.", desc: "Third random description." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      {news.map(({ id, title, desc }) => {
        const text = (
          <>
            <h4 style={{ margin: 0 }}>{title}</h4>
            <div style={{ marginBottom: "0.5rem" }}>{desc}</div>
          </>
        );
        return (
          <div key={id}>
            {text}
            <Speech text={text} />
          </div>
        );
      })}
    </div>
  );
}
```

#### Highlight Text

If `highlightText` prop is set to `true`, the words in the text will be highlighted as they are spoken. `<HighlightedText>` component exported by `react-text-to-speech` can be used to accomplish this purpose.

NOTE: `id` of both `<Speech>` and `<HighlightedText>` should be same to link them together. Additionally, `text` should be included as children within the `<HighlightedText>` component as demonstrated below. This helps prevent initial [layout shift](https://web.dev/articles/cls) issues that may arise while `react-reorder-list` links both components based on their respective `id`. It's important to note that the children added in this manner are temporary and will be replaced once the components are successfully linked.

```jsx
import React from "react";
import Speech, { HighlightedText } from "react-text-to-speech";

export default function App() {
  const text = (
    <div>
      <span>This library is awesome!</span>
      <div>
        <div>
          <span>It can also read and highlight </span>
          <span>nested text... </span>
          <span>
            <span>upto </span>
            <span>
              <span>any level.</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Speech id="unique-id" text={text} highlightText={true} />
      <HighlightedText id="unique-id">{text}</HighlightedText>
    </>
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
    <Speech
      text="This is a fully customized speech component."
      pitch={1.5}
      rate={2}
      volume={0.5}
      voiceURI="Microsoft Heera - English (India)"
      onError={() => console.error("Browser not supported!")}
    >
      {({ speechStatus, start, pause, stop, isInQueue }) => (
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
| `preserveUtteranceQueue` | `boolean` | No | `false` | Whether to maintain a queue of speech utterances (true) or clear previous utterances (false). |
| `highlightText` | `boolean` | No | `false` | Whether the words in the text should be highlighted as they are read or not. |
| `highlightProps` | `React.DetailedHTMLProps` | No | `{ style: { backgroundColor: "yellow" } }` | Props to customise the highlighted word. |
| `onError` | `Function` | No | `() => alert('Browser not supported! Try some other browser.')` | Function to be executed if browser doesn't support `Web Speech API`. |
| `onStart` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed when speech utterance is started. |
| `onResume` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed when speech utterance is resumed. |
| `onPause` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed when speech utterance is paused. |
| `onStop` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed when speech utterance is stopped. |

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

#### SpeechSynthesisEventHandler

```typescript
type SpeechSynthesisEventHandler = (event: SpeechSynthesisEvent) => any;
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
  start?: Function;
  pause?: Function;
  stop?: Function;
  isInQueue?: boolean;
};
type Children = (childrenOptions: ChildrenOptions) => ReactNode;
```

## Author

[Sahil Aggarwal](https://www.github.com/SahilAggarwal2004)

### Contributors

- [Akshay Srivastava](https://github.com/akshaypx)
