# react-text-to-speech

An easy-to-use React.js component that leverages the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API" target="_blank">Web Speech API</a> to convert text to speech.

## Features

- Text-to-speech
- Easy to use
- Highlights words as they are read. See highlighting text using <a href="https://rtts.vercel.app/docs/usage/useSpeech#highlight-text" target="_blank">useSpeech Hook</a> and <a href="https://rtts.vercel.app/docs/usage/speech#highlight-text" target="_blank">Speech Component</a>
- Provides API to handle errors and events. See <a href="https://rtts.vercel.app/docs/usage/useSpeech#handling-errors-and-events" target="_blank">Handling Errors and Events</a>
- Handles multiple speech instances easily. See handling using <a href="https://rtts.vercel.app/docs/usage/useSpeech#multiple-instance-usage" target="_blank">useSpeech Hook</a> and <a href="https://rtts.vercel.app/docs/usage/speech#multiple-instance-usage" target="_blank">Speech Component</a>
- Fully Customizable. See <a href="https://rtts.vercel.app/docs/usage/useSpeech" target="_blank">useSpeech Hook Usage</a> and <a href="https://rtts.vercel.app/docs/usage/speech#full-customization" target="_blank">usage with FaC</a>
- Stops speech instance on component unmount.

## Installation

To install `react-text-to-speech`:

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

**react-text-to-speech** offers two main ways to integrate text-to-speech functionality into your React.js applications through the `useSpeech` hook and the `<Speech>` component.

### useSpeech hook

#### Basic Usage

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

#### Detailed Usage

For detailed usage of `useSpeech` hook, <a href="https://rtts.vercel.app/docs/usage/useSpeech" target="_blank">refer here</a>

### Speech Component

#### Basic Usage

```tsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  return <Speech text="This library is awesome!" />;
}
```

#### Detailed Usage

For detailed usage of `<Speech>` component, <a href="https://rtts.vercel.app/docs/usage/speech" target="_blank">refer here</a>

## Demo

<a href="https://rtts.vercel.app/demo" target="_blank">A Demo is worth a thousand words</a>

## Documentation

Check the <a href="https://rtts.vercel.app/docs" target="_blank">documentation</a> to get you started!

## Contribute

Show your ❤️ and support by giving a ⭐. Any suggestions are welcome! Take a look at the <a href="https://github.com/SahilAggarwal2004/react-text-to-speech/blob/master/CONTRIBUTING.md" target="_blank">contributing guide</a>.
