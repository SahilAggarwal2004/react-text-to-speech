# react-text-to-speech

An easy to use react component for the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

It is as easy as to import a React component!

## Features

- Text-to-speech
- Easy to use
- Stops speech instance on page reload.
- Highlights words as they are read.
- Handles multiple speech instances easily. See [Advanced Usage](#advanced-usage)
- Fully Customizable. See [usage with FaC](#full-customization)

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

When you use the `<Speech>` component of `react-text-to-speech`, initially the user will see the `startBtn` and when the user clicks on it, the speech instance will start and the user will see the `pauseBtn` which can be used to pause the speech instance. The user will also see the `stopBtn` which can be used to stop the speech instance at any moment.

#### Basic Usage

```jsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  return <Speech text="This library is awesome!" />;
}
```

#### Advanced Usage

Let's assume that you fetch news from any News API and the API returns 3 news in response as shown below. Now if the user clicks on `startBtn` of #1 news (assuming # as id) and then clicks on `startBtn` on #2 news before the speech instance of #1 news ends, then `react-text-to-speech` will not just stop the #1 news speech instance and start the #2 news speech instance, but will also convert the `pauseBtn` of #1 news to `startBtn`, thus avoiding any inconsistency.

```jsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  // 'news' holds response from some News API
  const news = [
    { id: "1", title: "First random title", desc: "First random description" },
    { id: "2", title: "Second random title", desc: "Second random description" },
    { id: "3", title: "Third random title", desc: "Third random description" },
  ];

  return (
    <>
      {news.map(({ id, title, desc }) => (
        <div key={id}>
          <h4>{title}</h4>
          <div>{desc}</div>
          <Speech text={`${title}. ${desc}`} />
        </div>
      ))}
    </>
  );
}
```

#### Highlight Text

If `highlightText` prop to `true`, the words in the text will be highlighted as they are spoken. `<HighlightedText>` component exported by `react-text-to-speech` can be used to accomplish this purpose.

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
      <Speech id="unique-id" text={text} highlightText={true} highlightProps={{ style: { color: "white", backgroundColor: "blue" } }} />
      <HighlightedText id="unique-id">{text}</HighlightedText>
    </>
  );
}
```

#### Partial Customization

Use props provided by `<Speech>` component to customize it.

```jsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  const startBtn = <button className="my-start-btn">Start Speech</button>;
  const pauseBtn = <button className="my-pause-btn">Pause Speech</button>;
  const stopBtn = <button className="my-stop-btn">Stop Speech</button>;

  return (
    <Speech
      text="This is a partially customized speech component."
      pitch={1.5}
      rate={2}
      volume={0.5}
      voiceURI="Microsoft Heera - English (India)"
      startBtn={startBtn}
      pauseBtn={pauseBtn}
      stopBtn={stopBtn}
      props={{ title: "React Text-To-Speech Component" }}
      onError={() => console.error("Browser not supported!")}
    />
  );
}
```

#### Full Customization

Use Function as Children(FaC) to fully customize the `<Speech>` component.

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
      {({ speechStatus, start, pause, stop }) => (
        <YourCustomComponent>
          {speechStatus !== "started" && (
            <button className="my-start-btn" onClick={start}>
              Start Speech
            </button>
          )}
          {speechStatus === "started" && (
            <button className="my-pause-btn" onClick={pause}>
              Pause Speech
            </button>
          )}
          <button className="my-stop-btn" onClick={stop}>
            Stop Speech
          </button>
        </YourCustomComponent>
      )}
    </Speech>
  );
}
```

## Speech Component API Reference

Here is the full API for the `<Speech>` component, these properties can be set on an instance of Speech:
| Parameter | Type | Required | Default | Description |
| - | - | - | - | - |
| `text` | `string \| JSX.Element` | Yes | - | It contains the text to be spoken when `startBtn` is clicked. |
| `pitch` | `number (0 to 2)` | No | 1 | The pitch at which the utterance will be spoken. |
| `rate` | `number (0.1 to 10)` | No | 1 | The speed at which the utterance will be spoken. |
| `volume` | `number (0 to 1)` | No | 1 | The volume at which the utterance will be spoken. |
| `lang` | `string` | No | - | The language in which the utterance will be spoken. |
| `voiceURI` | `string \| string[]` | No | - | The voice using which the utterance will be spoken. If provided an array, further voices will be used as fallback if initial voices are not found. See possible values [here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices). |
| `startBtn` | [`Button`](#button) | No | `<HiVolumeUp />` | Button to start the speech instance. |
| `pauseBtn` | [`Button`](#button) | No | `<HiVolumeOff />` | Button to pause the speech instance. |
| `stopBtn` | [`Button`](#button) | No | `<HiMiniStop />` | Button to stop the speech instance. |
| `useStopOverPause` | `boolean` | No | `navigator.userAgentData.mobile` | Whether the controls should display `stopBtn` instead of `pauseBtn`. In Android devices, `SpeechSynthesis.pause()` behaves like `SpeechSynthesis.cancel()`. See [details](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/pause) |
| `highlightText` | `boolean` | No | `false` | Whether the words in the text should be highlighted as they are read or not. |
| `highlightProps` | `React.DetailedHTMLProps` | No | `{ style: { fontWeight: "bold" } }` | Props to customise the highlighted word. |
| `onError` | `Function` | No | `() => alert('Browser not supported! Try some other browser.')` | Function to be executed if browser doesn't support `Web Speech API`. |
| `props` | `React.DetailedHTMLProps` | No | - | Props to customize the `<Speech>` component. |
| `children` | [`Children`](#children) | No | - | See [usage with FaC](#full-customization) |

### Types

#### Button

```typescript
type Button = JSX.Element | string | null;
```

#### Children

```typescript
import { ReactNode } from "react";
type SpeechStatus = "started" | "paused" | "stopped";
type ChildrenOptions = {
  speechStatus?: SpeechStatus;
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
