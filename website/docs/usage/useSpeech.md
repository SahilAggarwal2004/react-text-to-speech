# useSpeech Hook

## Basic Usage

```tsx
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

## Highlight Text

The `highlightText` & `highlightProps` props, available in both `useSpeech` hook and `<Speech>` component, can be used to highlight text and modify its styling.

Here, you may want to pass a `JSX.Element` instead of a plain string as `text` property for better presentation and ease of use, and **react-text-to-speech** supports it!

**NOTE:** It is recommended to memoize the `JSX.Element` first before passing it to `text` property for performance optimizations.

```tsx
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

## Handling Errors and Events

```tsx
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

## Multiple Instance Usage

The `preserveUtteranceQueue` prop, available in both `useSpeech` hook and `<Speech>` component, facilitates handling multiple speech instances conveniently.\
If set to `false`, any currently speaking speech utterance will be stopped immediately upon initiating a new utterance. The new utterance will be spoken without waiting for the previous one to finish.\
If set to `true`, new speech utterances will be added to a queue. They will be spoken once the previous speech instances are completed. This allows for sequential delivery of speech content, maintaining order and avoiding overlapping utterances.

The `useQueue` hook can be used to keep track of the queue as well as change the queue as shown below. The `onQueueChange` event handler used [above](#handling-errors-and-events) can also be used to keep track of queue updates.

```tsx
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

## API Reference

Check the [API Reference](/docs/api/useSpeech) for more details.
