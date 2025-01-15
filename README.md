# react-text-to-speech

An easy-to-use React.js component that leverages the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) to convert text to speech.

## Features

- Converts text to speech using the Web Speech API.
- Highlights words as they are read aloud. See:
  - [Highlighting text with the `useSpeech` hook](https://rtts.vercel.app/docs/usage/useSpeech#highlight-text).
  - [Highlighting text with the `Speech` component](https://rtts.vercel.app/docs/usage/speech#highlight-text).
- Provides an API for handling errors and events:
  - [Handling errors and events with the `useSpeech` hook](https://rtts.vercel.app/docs/usage/useSpeech#handling-errors-and-events).
  - [Handling errors and events with the `Speech` component](https://rtts.vercel.app/docs/usage/speech#handling-errors-and-events).
- Manages multiple speech instances:
  - [Multiple instances with the `useSpeech` hook](https://rtts.vercel.app/docs/usage/useSpeech#multiple-instance-usage).
  - [Multiple instances with the `Speech` component](https://rtts.vercel.app/docs/usage/speech#multiple-instance-usage).
- Fully customizable for various use cases:
  - [Using the `useSpeech` hook](https://rtts.vercel.app/docs/usage/useSpeech).
  - [Customizing the `Speech` component](https://rtts.vercel.app/docs/usage/speech#full-customization).
- Overcomes the [Web Speech API's text length limit](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/text), enabling infinite text input.
- Automatically stops speech instances when the component unmounts.

## Installation

Install `react-text-to-speech` using your preferred package manager:

```bash
# Using npm:
npm install react-text-to-speech --save

# Using Yarn:
yarn add react-text-to-speech

# Using pnpm:
pnpm add react-text-to-speech

# Using Bun:
bun add react-text-to-speech
```

## Usage

**react-text-to-speech** provides two primary methods to integrate text-to-speech functionality into your React.js applications: the `useSpeech` hook and the `<Speech>` component.

### `useSpeech` Hook

#### Basic Usage

```tsx
import React from "react";
import { useSpeech } from "react-text-to-speech";

export default function App() {
  const {
    Text, // Component that renders the processed text
    speechStatus, // Current speech status
    isInQueue, // Indicates if the speech is active or queued
    start, // Starts or queues the speech
    pause, // Pauses the speech
    stop, // Stops or removes the speech from the queue
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

For more details on using the `useSpeech` hook, [refer to the documentation](https://rtts.vercel.app/docs/usage/useSpeech).

### `<Speech>` Component

#### Basic Usage

```tsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  return <Speech text="This library is awesome!" />;
}
```

#### Detailed Usage

For more details on using the `<Speech>` component, [refer to the documentation](https://rtts.vercel.app/docs/usage/speech).

## Demo

[Check out the live demo](https://rtts.vercel.app/demo) to see it in action.

## Documentation

Explore the [documentation](https://rtts.vercel.app/docs/) to get started quickly.

## Contribute

Show your ❤️ and support by giving a ⭐ on [GitHub](https://github.com/SahilAggarwal2004/react-text-to-speech). You can also support the project by upvoting and sharing it on [Product Hunt](https://www.producthunt.com/posts/react-text-to-speech). Any suggestions are welcome! Take a look at the [contributing guide](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
