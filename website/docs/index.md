# Introduction

`react-text-to-speech` is an easy to use react component for the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). It is as easy as to import a React component!

## Features

- Text-to-speech
- Easy to use
- Highlights words as they are read. See highlighting text using [useSpeech Hook](/docs/usage/useSpeech#highlight-text) and [Speech Component](/docs/usage/speech#highlight-text)
- Provides API to handle errors and events. See [Handling Errors and Events](/docs/usage/useSpeech#handling-errors-and-events)
- Handles multiple speech instances easily. See handling using [useSpeech Hook](/docs/usage/useSpeech#multiple-instance-usage) and [Speech Component](/docs/usage/speech#multiple-instance-usage)
- Fully Customizable. See [useSpeech Hook Usage](/docs/usage/useSpeech) and [usage with FaC](/docs/usage/speech#full-customization)
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

The `react-text-to-speech` package offers two main ways to integrate text-to-speech functionality into your React applications.

- [`useSpeech` hook](/docs/usage/useSpeech)
- [`<Speech>` component](/docs/usage/speech)
