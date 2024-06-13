## 0.15.2 (13-06-2024)

- **fixed:** A bug where speech wouldn't start again if speech was paused just when it was about to end.

## 0.15.1 (11-06-2024)

- **added:** Exporting icons and types from library

## 0.14.7 (29-05-2024)

- **added:** Separate documentation website available at [https://rtts.vercel.app/](https://rtts.vercel.app/)
- **changed:** Repository structure updated to a monorepo.
- **changed:** Switched from [bun](https://bun.sh/) to [pnpm](https://pnpm.io/)

## 0.14.6 (05-05-2024)

- **added:** Code of Conduct, Contributing guide, Security policy, and Issue templates.

## 0.14.4 (11-04-2024)

- **improved:** `highlightText` prop can now be toggled dynamically while a speech utterance is being spoken.

## 0.14.3 (07-04-2024)

- **improved:** Better sanitization of `text` before passing to **Web Speech API**.

## 0.14.0 (05-04-2024)

- **added:** `useQueue` hook. See usage [here](https://rtts.vercel.app/docs/usage/useSpeech#multiple-instance-usage).

## 0.13.5 (02-04-2024)

- **improved:** Major performance optimization.

## 0.13.3 (02-04-2024)

- **changed:** Switched from [pnpm](https://pnpm.io/) to [bun](https://bun.sh/).

## 0.13.0 (31-03-2024)

- **added:** `onQueueChange` prop in `useSpeech` hook and `<Speech>` component. See [useSpeech Hook API Reference](https://rtts.vercel.app/docs/api/useSpeech).

## 0.12.8 (26-03-2024)

- **fixed:** A bug where speech didn't stop when the start function of `useSpeech` hook was called but the component was unmounted before speech actually started.

## 0.12.4 (23-03-2024)

- **fixed:** A bug where unmounting one `<Speech>` instance would stop the speech utterance of another instance.

## 0.12.1 (22-03-2024)

- **fixed:** Speech stops automatically when the `text` prop changes.

## 0.12.0 (19-03-2024)

- **added:** `onBoundary` prop in `useSpeech` hook and `<Speech>` component. See [useSpeech Hook API Reference](https://rtts.vercel.app/docs/api/useSpeech).

## 0.11.0 (19-03-2024)

- **added:** `onStart`, `onResume`, `onPause`, and `onStop` props in `useSpeech` hook and `<Speech>` component. See [useSpeech Hook API Reference](https://rtts.vercel.app/docs/api/useSpeech).
- **added:** `isInQueue` state value returned by `useSpeech` hook.

## 0.10.0 (18-03-2024)

- **added:** `preserveUtteranceQueue` prop in `useSpeech` hook and `<Speech>` component. See [useSpeech Hook API Reference](https://rtts.vercel.app/docs/api/useSpeech).

## 0.9.5 (14-03-2024)

- **fixed:** A bug where the `stop` function of `useSpeech` hook did not work if start was called multiple times.
- **fixed:** A bug where HTML tags and entities were ignored by **Web Speech API**.

## 0.9.4 (11-03-2024)

- **fixed:** A bug where multiple highlight boxes appeared in the case of 10 or more children.

## 0.9.2 (11-03-2024)

- **fixed:** A bug where the highlight text feature wouldn't work if `<HighlightedText>` was placed after `<Speech>`.

## 0.9.0 (14-02-2024)

- **added:** `useSpeech` hook. See [useSpeech Hook API Reference](https://rtts.vercel.app/docs/api/useSpeech).
- **changed:** Default value of `useStopOverPause` prop. See [Speech Component API Reference](https://rtts.vercel.app/docs/api/speech).
- **docs:** Restructured and refined documentation.

## 0.8.15 (14-02-2024)

- **improved:** Minor performance optimization.

## 0.8.14 (12-02-2024)

- **fixed:** Minor bugs in the algorithm used to highlight words.

## 0.8.11 (09-02-2024)

- **changed:** Default value of `highlightProps` prop of `<Speech>` component. See [Speech Component API Reference](https://rtts.vercel.app/docs/api/speech).
- **fixed:** Minor bugs in the algorithm used to highlight words.

## 0.8.5 (08-02-2024)

- **fixed:** A bug where speech was stopping at mount instead of unmount of `<Speech>` component.

## 0.8.2 (08-02-2024)

- **fixed:** A bug where `<HighlightedText>` wasn't rendering when FaC was used in `<Speech>` component. See [Highlight Text Usage](https://rtts.vercel.app/docs/usage/speech#highlight-text) and [usage with FaC](https://rtts.vercel.app/docs/usage/speech#full-customization).

## 0.8.1 (07-02-2024)

- **added:** `children` in `<HighlightedText>` component. See [Highlight Text Usage](https://rtts.vercel.app/docs/usage/speech#highlight-text).

## 0.8.0 (04-02-2024)

- **added:** `highlightText` and `highlightProps` props in `<Speech>` component. See [Speech Component API Reference](https://rtts.vercel.app/docs/api/speech).
- **added:** `<HighlightedText>` component. See [Highlight Text Usage](https://rtts.vercel.app/docs/usage/speech#highlight-text).
- **improved:** `text` prop in `<Speech>` component can now be `JSX`. See [Speech Component API Reference](https://rtts.vercel.app/docs/api/speech).

## 0.7.0 (03-02-2024)

- **added:** `voiceURI` prop in `<Speech>` component. See [Speech Component API Reference](https://rtts.vercel.app/docs/api/speech). Thanks [@akshaypx](https://github.com/akshaypx)!

## 0.6.6 (19-01-2024)

- **improved:** Default icons.

## 0.6.5 (27-11-2023)

- **docs:** Fixed typo.

## 0.6.4 (13-11-2023)

- **fixed:** Button rendering method.

## 0.6.3 (31-10-2023)

- **fixed:** A bug where speech wouldn't start in multiple `<Speech>` instances due to a patch in [v0.6.2].

## 0.6.2 (31-10-2023)

- **fixed:** A bug where speech wouldn't start again if speech was paused just when it was about to end.

## 0.6.1 (30-10-2023)

- **fixed:** `speechStatus` reactivity when `startBtn` is clicked.

## 0.6.0 (30-10-2023)

- **added:** `useStopOverPause` prop in `<Speech>` component. See [Speech Component API Reference](https://rtts.vercel.app/docs/api/speech).
- **fixed:** `pauseBtn` behaving as `stopBtn` on Android devices (see [details](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/pause)) with the help of the `useStopOverPause` prop.

## 0.5.2 (14-10-2023)

- **fixed:** Sync issues when using multiple `<Speech>` instances. See [Multiple Instance Usage](https://rtts.vercel.app/docs/usage/speech#multiple-instance-usage).

## 0.5.1 (14-10-2023)

- **fixed:** `stopBtn` on any `<Speech>` instance was stopping the speech. See [Multiple Instance Usage](https://rtts.vercel.app/docs/usage/speech#multiple-instance-usage).

## 0.5.0 (14-10-2023)

- **added:** `pauseBtn` prop in `<Speech>` component. See [Speech Component API Reference](https://rtts.vercel.app/docs/api/speech).
- **added:** Full customization using FaC. See [usage with FaC](https://rtts.vercel.app/docs/usage/speech#full-customization).
