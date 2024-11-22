# react-text-to-speech

An easy-to-use React.js component that leverages the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) to convert text to speech.

## Features

- Text-to-speech functionality
- Easy to use
- Highlights words as they are read (see highlighting text using [useSpeech Hook](/docs/usage/useSpeech#highlight-text) and [Speech Component](/docs/usage/speech#highlight-text)).
- Provides API to handle errors and events (see [Handling Errors and Events](/docs/usage/useSpeech#handling-errors-and-events)).
- Handles multiple speech instances easily (see handling using [useSpeech Hook](/docs/usage/useSpeech#multiple-instance-usage) and [Speech Component](/docs/usage/speech#multiple-instance-usage)).
- Fully Customizable (see [useSpeech Hook Usage](/docs/usage/useSpeech) and [usage with FaC](/docs/usage/speech#full-customization)).
- Overcomes the [Web Speech API's text limit](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/text), allowing for infinite text input.
- Automatically stops speech instances on component unmount.

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

For detailed usage of `useSpeech` hook, [refer here](https://rtts.vercel.app/docs/usage/useSpeech)

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

For detailed usage of `<Speech>` component, [refer here](https://rtts.vercel.app/docs/usage/speech)

## Demo

[A Demo is worth a thousand words](https://rtts.vercel.app/demo)

## Documentation

Check the [documentation](https://rtts.vercel.app/docs/) to get you started!

## Contribute

Show your ❤️ and support by giving a ⭐. Any suggestions are welcome! Take a look at the [contributing guide](https://github.com/SahilAggarwal2004/react-text-to-speech/blob/master/CONTRIBUTING.md).
