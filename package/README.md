# react-text-to-speech

[![npm version](https://img.shields.io/npm/v/react-text-to-speech)](https://www.npmjs.com/package/react-text-to-speech)
[![npm downloads](https://img.shields.io/npm/dm/react-text-to-speech)](https://www.npmjs.com/package/react-text-to-speech)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-text-to-speech)](https://bundlephobia.com/package/react-text-to-speech)
[![license](https://img.shields.io/npm/l/react-text-to-speech)](https://github.com/SahilAggarwal2004/react-text-to-speech/blob/master/LICENSE)

A React.js text-to-speech library with **real-time text highlighting**, **dynamic speech controls**, and **unlimited text length**, powered by the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

## Install

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

## Quick Start

Two ways to add speech to your React app. Pick whichever fits your use case.

### Option 1 - `useSpeech` hook (full control)

```tsx
import React from "react";
import { useSpeech } from "react-text-to-speech";

export default function App() {
  const { Text, speechStatus, start, pause, stop } = useSpeech({
    text: "This library is awesome!",
    stableText: true,
  });

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

### Option 2 - `<Speech>` component (minimal setup)

```tsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  return <Speech text="This library is awesome!" stableText={true} />;
}
```

## What's Included

| Feature | Details |
|---|---|
| 🔊 Text-to-Speech | Powered by the Web Speech API |
| 🖊️ Text Highlighting | Highlights text as it's spoken |
| 🎛️ Dynamic Controls | Adjust `pitch`, `rate`, `volume`, `lang`, `voiceURI` mid-speech |
| ♾️ Unlimited Input | Bypasses the Web Speech API's built-in text length limit |
| 📋 Directives | Inline playback control via special text syntax |
| 🔁 Multiple Instances | Run several speech instances simultaneously |
| 🧹 Auto Cleanup | Speech stops automatically on component unmount |
| ⚠️ Error Handling | Built-in APIs for speech errors and events |

## Links

- 📖 [Full Documentation](https://rtts.vercel.app/docs/)
- 🎮 [Live Demo](https://rtts.vercel.app/demo)
- 🐛 [GitHub Issues](https://github.com/SahilAggarwal2004/react-text-to-speech/issues)
- 💬 [GitHub Discussions](https://github.com/SahilAggarwal2004/react-text-to-speech/discussions)

## License

[MIT](https://github.com/SahilAggarwal2004/react-text-to-speech/blob/master/LICENSE)