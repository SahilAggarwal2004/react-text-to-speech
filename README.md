# react-text-to-speech

[![npm version](https://img.shields.io/npm/v/react-text-to-speech)](https://www.npmjs.com/package/react-text-to-speech)
[![npm downloads](https://img.shields.io/npm/dm/react-text-to-speech)](https://www.npmjs.com/package/react-text-to-speech)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-text-to-speech)](https://bundlephobia.com/package/react-text-to-speech)
[![license](https://img.shields.io/npm/l/react-text-to-speech)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A React.js text-to-speech library with **real-time text highlighting**, **dynamic speech controls**, and **unlimited text length**, powered by the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Features

**🔊 Text-to-Speech**
Converts text to speech using the browser's built-in Web Speech API. No external API keys or services required.

**🖊️ Text Highlighting**
Highlights text in real time as it is spoken. Works with both the `useSpeech` hook and the `<Speech>` component. ([docs](https://rtts.vercel.app/docs/usage/useSpeech#highlight-text))

**🎛️ Dynamic Controls**
Adjust `pitch`, `rate`, `volume`, `lang`, and `voiceURI` programmatically, even while speech is already playing.

**♾️ Unlimited Text Input**
The Web Speech API has a hard limit on utterance length. This library automatically splits long text into chunks and stitches the speech back together seamlessly. ([MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/text))

**📋 Directives**
Embed inline playback instructions directly in your text to pause, stop, or modify behavior mid-utterance without touching your component code. ([docs](https://rtts.vercel.app/docs/usage/directives))

**🔁 Multiple Instances**
Run multiple independent speech instances at the same time, each with its own queue and controls. ([docs](https://rtts.vercel.app/docs/usage/useSpeech#multiple-instance-usage))

**🧹 Auto Cleanup**
Speech is cancelled automatically when the component unmounts. No lingering audio, no memory leaks.

**⚠️ Error and Event Handling**
Exposes speech lifecycle events and error callbacks so you can respond to interruptions, failures, and state changes. ([docs](https://rtts.vercel.app/docs/usage/useSpeech#handling-errors-and-events))

## Installation

```bash
# npm
npm install react-text-to-speech --save

# yarn
yarn add react-text-to-speech

# pnpm
pnpm add react-text-to-speech

# bun
bun add react-text-to-speech
```

## Usage

### `useSpeech` Hook

Use the hook when you want to build your own UI around speech state and controls.

```tsx
import React from "react";
import { useSpeech } from "react-text-to-speech";

export default function App() {
  const {
    Text,          // Component that renders speech text in a <div>; supports standard HTML div props
    speechStatus,  // "started" | "paused" | "stopped"
    isInQueue,     // true when speech is playing or waiting in queue
    start,         // Start speech or add to queue
    pause,         // Pause current speech
    stop,          // Stop speech or remove from queue
  } = useSpeech({ text: "This library is awesome!", stableText: true });

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <Text />
      <div style={{ display: "flex", columnGap: "0.5rem" }}>
        {speechStatus !== "started" ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={pause}>Pause</button>
        )}
        <button onClick={stop}>Stop</button>
      </div>
    </div>
  );
}
```

For more details, refer to the [useSpeech hook documentation](https://rtts.vercel.app/docs/usage/useSpeech).

### `<Speech>` Component

Use the component when you want speech playback in JSX with minimal setup.

```tsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  return <Speech text="This library is awesome!" stableText={true} />;
}
```

For more details, refer to the [Speech component documentation](https://rtts.vercel.app/docs/usage/speech).

## Documentation

Full documentation with all props, hook return values, advanced examples, and edge cases:

**[rtts.vercel.app/docs](https://rtts.vercel.app/docs/)**

## Demo

See all features in action on the live demo page:

**[rtts.vercel.app/demo](https://rtts.vercel.app/demo)**

## Contributing

Contributions, bug reports, and feature requests are welcome!

- ⭐ [Star this repo](https://github.com/SahilAggarwal2004/react-text-to-speech) if you find it useful
- 🐛 [Open an issue](https://github.com/SahilAggarwal2004/react-text-to-speech/issues) for bugs or unexpected behavior
- 💡 [Start a discussion](https://github.com/SahilAggarwal2004/react-text-to-speech/discussions) for feature ideas or questions
- 🔧 [Read the contributing guide](CONTRIBUTING.md) before submitting a pull request
- 📣 [Upvote on Product Hunt](https://www.producthunt.com/posts/react-text-to-speech) to help spread the word

## License

[MIT](LICENSE) © [Sahil Aggarwal](https://github.com/SahilAggarwal2004)