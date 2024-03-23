## 0.12.4 (23-03-2024)

- **fixed:** a bug where unmount of one `<Speech>` instance used to stop the speech utterance of other instance.

## 0.12.1 (22-03-2024)

- **fixed:** speech stops automatically when `text` prop changes

## 0.12.0 (19-03-2024)

- **added:** `onBoundary` prop in `useSpeech` hook and `<Speech>` component. See [useSpeech Hook API Reference](https://www.npmjs.com/package/react-text-to-speech#usespeech-hook-1)

## 0.11.0 (19-03-2024)

- **added:** `onStart`, `onResume`, `onPause` and `onStop` props in `useSpeech` hook and `<Speech>` component. See [useSpeech Hook API Reference](https://www.npmjs.com/package/react-text-to-speech#usespeech-hook-1)
- **added:** `isInQueue` state value returned by `useSpeech` hook.

## 0.10.0 (18-03-2024)

- **added:** `preserveUtteranceQueue` prop in `useSpeech` hook and `<Speech>` component. See [useSpeech Hook API Reference](https://www.npmjs.com/package/react-text-to-speech#usespeech-hook-1)

## 0.9.5 (14-03-2024)

- **fixed:** a bug where `stop` function of `useSpeech` hook did not work if start was called multiple times.
- **fixed:** a bug where html tags and entities were ignored by `Web Speech API`.

## 0.9.4 (11-03-2024)

- **fixed:** a bug where multiple highlight boxes appeared in case of 10 or more children.

## 0.9.2 (11-03-2024)

- **fixed:** a bug where highlight text feature won't work if `<HighlightedText>` is placed after `<Speech>`.

## 0.9.0 (14-02-2024)

- **added:** `useSpeech` hook. See [useSpeech Hook API Reference](https://www.npmjs.com/package/react-text-to-speech#usespeech-hook-1)
- **changed:** default value of `useStopOverPause` prop. See [Speech Component API Reference](https://www.npmjs.com/package/react-text-to-speech#speech-component-1)
- **docs:** restructed and refined

## 0.8.15 (14-02-2024)

- **improved:** minor performance optimisation.

# 0.8.14 (12-02-2024)

- **fixed:** minor bugs in algorithm used to highlight words.

## 0.8.11 (09-02-2024)

- **changed:** default value of `highlightProps` prop of `<Speech>` component. See [Speech Component API Reference](https://www.npmjs.com/package/react-text-to-speech#usespeech-hook-1)
- **fixed:** minor bugs in algorithm used to highlight words.

## 0.8.5 (08-02-2024)

- **fixed:** a bug where speech was stopping at mount instead of unmount of `<Speech>` component.

## 0.8.2 (08-02-2024)

- **fixed:** a bug where `<HighlightedText>` wasn't rendering when FaC was used in `<Speech>` component. See [Highlight Text Usage](https://www.npmjs.com/package/react-text-to-speech#highlight-text) and [usage with FaC](https://www.npmjs.com/package/react-text-to-speech#full-customization)

## 0.8.1 (07-02-2024)

- **added:** `children` in `<HighlightedText>` component. See [Highlight Text Usage](https://www.npmjs.com/package/react-text-to-speech#highlight-text-1)

## 0.8.0 (04-02-2024)

- **added:** `highlightText` and `highlightProps` props in `<Speech>` component. See [Speech Component API Reference](https://www.npmjs.com/package/react-text-to-speech#usespeech-hook-1)
- **added:** `<HighlightedText>` component. See [Highlight Text Usage](https://www.npmjs.com/package/react-text-to-speech#highlight-text-1)
- **improved:** `text` prop in `<Speech>` component can now be `JSX`. See [Speech Component API Reference](https://www.npmjs.com/package/react-text-to-speech#usespeech-hook-1)

## 0.7.0 (03-02-2024)

- **added:** `voiceURI` prop in `<Speech>` component. See [Speech Component API Reference](https://www.npmjs.com/package/react-text-to-speech#usespeech-hook-1). Thanks [@akshaypx](https://github.com/akshaypx)!

## 0.6.6 (19-01-2024)

- **improved:** default icons

## 0.6.5 (27-11-2023)

- **docs:** fixed typo

## 0.6.4 (13-11-2023)

- **fixed:** button rendering method

## 0.6.3 (31-10-2023)

- **fixed:** a bug where speech won't start in multiple `<Speech>` instances occured due to patch in [`v0.6.2`]

## 0.6.2 (31-10-2023)

- **fixed:** a bug where speech won't start again if speech was paused just when it was about to end.

## 0.6.1 (30-10-2023)

- **fixed:** `speechStatus` reactivity when `startBtn` is clicked.

## 0.6.0 (30-10-2023)

- **added:** `useStopOverPause` prop in `<Speech>` component. See [Speech Component API Reference](https://www.npmjs.com/package/react-text-to-speech#speech-component-1)
- **fixed:** `pauseBtn` behaving as `stopBtn` in android devices (see [details](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/pause)) with the help of `useStopOverPause` prop

## 0.5.2 (14-10-2023)

- **fixed:** sync issues when using multiple `<Speech>` instances. See [Multiple Instance Usage](https://www.npmjs.com/package/react-text-to-speech#multiple-instance-usage-1)

## 0.5.1 (14-10-2023)

- **fixed:** `stopBtn` on any `<Speech>` instance was stopping the speech. See [Multiple Instance Usage](https://www.npmjs.com/package/react-text-to-speech#multiple-instance-usage-1)

## 0.5.0 (14-10-2023)

- **added:** `pauseBtn` prop in `<Speech>` component. See [Speech Component API Reference](https://www.npmjs.com/package/react-text-to-speech#speech-component-1)
- **added:** Full customization using FaC. See [usage with FaC](https://www.npmjs.com/package/react-text-to-speech#full-customization)
