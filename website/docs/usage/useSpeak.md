# useSpeak Hook

The `useSpeak` hook is an imperative wrapper around the `useSpeech` hook. Unlike `useSpeech`, which takes `text` and speech-related props via the hook itself, `useSpeak` exposes a `speak` function to handle speech dynamically at runtime.

## Key Difference from `useSpeech`

- `useSpeech` is **declarative**: you pass `text` and other props to the hook directly.
- `useSpeak` is **imperative**: you call `speak(text, options)` to trigger speech.

This makes `useSpeak` ideal for cases where speech content and configuration change frequently or are only known at runtime.

## Example

```tsx
import React from "react";
import { useSpeak } from "react-text-to-speech";

export default function App() {
  const {
    speak, // Function to start speech with provided text and options
    Text, // Component that returns the modified text property
    speechStatus, // String that stores current speech status
    isInQueue, // Indicates whether the speech is currently playing or waiting in the queue
    start, // Function to start the speech or put it in queue
    pause, // Function to pause the speech
    stop, // Function to stop the speech or remove it from queue
  } = useSpeak();

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <div style={{ display: "flex", columnGap: "0.5rem" }}>
        <button
          onClick={() => {
            speak("Hello from useSpeak!", {
              rate: 1.2,
              lang: "en-US",
              pitch: 1,
              volume: 0.9,
              voiceURI: "Google US English",
            });
          }}
        >
          Speak
        </button>
        <button onClick={pause}>Pause</button>
        <button onClick={stop}>Stop</button>
      </div>
      <Text />
    </div>
  );
}
```

## All Other Behavior is Identical to `useSpeech`

The `useSpeak` hook supports everything `useSpeech` does — highlighting, directives, event handlers, queueing, etc. — it just moves configuration out of the hook and into the `speak()` function.

> For detailed usage of speech options, text highlighting, event handlers, and queueing, refer to the [useSpeech documentation](/docs/usage/useSpeech).
