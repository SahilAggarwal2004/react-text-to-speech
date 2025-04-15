# react-text-to-speech

An easy-to-use React.js component that leverages the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) to convert text to speech.

## Features

- **Text-to-Speech:** Converts text to speech using the Web Speech API.
- **Text Highlighting:** Highlights text as it’s read aloud using the [`useSpeech` hook](https://rtts.vercel.app/docs/usage/useSpeech#highlight-text) or [`Speech` component](https://rtts.vercel.app/docs/usage/speech#highlight-text).
- **Error and Event Handling:** Provides APIs for managing errors and events via [`useSpeech` hook](https://rtts.vercel.app/docs/usage/useSpeech#handling-errors-and-events) or [`Speech` component](https://rtts.vercel.app/docs/usage/speech#handling-errors-and-events).
- **Multiple Speech Instances:** Supports multiple speech instances using [`useSpeech` hook](https://rtts.vercel.app/docs/usage/useSpeech#multiple-instance-usage) or [`Speech` component](https://rtts.vercel.app/docs/usage/speech#multiple-instance-usage).
- **Customization:** Fully customizable through the [`useSpeech` hook](https://rtts.vercel.app/docs/usage/useSpeech) or [`Speech` component](https://rtts.vercel.app/docs/usage/speech#full-customization).
- **Directives:** Control playback behavior inline through special text syntax using [Directives](https://rtts.vercel.app/docs/usage/directives).
- **Dynamic Controls:** Programmatically adjust `pitch`, `rate`, `volume`, `lang`, and `voiceURI` during speech.
- **Unlimited Text Input:** Overcomes the [Web Speech API’s text length limit](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/text) for continuous speech.
- **Auto Cleanup:** Automatically stops speech when the component unmounts.

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
    isInQueue, // Indicates whether the speech is currently playing or waiting in the queue
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
