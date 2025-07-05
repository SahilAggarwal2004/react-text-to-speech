## 2.1.2 (2025-07-01)

- **fix:** Resolve incorrect word highlighting when using both directives and JSX.

## 2.1.0 (2025-06-19)

- **feat:** `useSpeak` hook.

## 2.0.0 (2025-04-18)

- **breaking:** Removed the `event` parameter from all event handlers (`onStart`, `onResume`, `onPause`, `onStop`, `onBoundary`).
- **feat:** Added support for `default` values in directives.
- **fix:** Resolved an issue where the `[[delay]]` directive was not functioning properly on mobile devices.

## 1.5.0 (2025-04-15)

- **feat:** Support for inline `Directives` to control playback behavior directly within the text.

## 1.4.1 (2025-03-07)

- **fix:** Ensure `utterance.voice` is set to `null` when `voiceURI` is not set, preventing unintended voice retention.

## 1.4.0 (2025-03-03)

- **feat:** Allow dynamic adjustment of `lang`, and `voiceURI` during speech.

## 1.3.1 (2025-03-02)

- **fix:** Reset `speakingWord` when resuming speech after pitch, rate, or volume change to prevent out-of-sync issues.

## 1.3.0 (2025-03-01)

- **feat:** Allow dynamic adjustment of `pitch`, `rate`, and `volume` during speech.

## 1.2.4 (2025-02-17)

- **chore:** Replaced `tsc` with `tsup` for faster and optimized bundling.

## 1.2.3 (2025-01-18)

- **refactor:** Optimized `words` and `key` computation by separating dependencies, improving memoization behavior.
- **refactor:** Renamed `StringArray` type to `Words` for better clarity and consistency.

## 1.2.2 (2025-01-17)

- **fix:** Resolve re-render issues by replacing stringifiedWords with JSXKey in memoization.

## 1.2.0 (2025-01-06)

- **feat:** Support for `ReactNode` in `text` prop in `useSpeech` hook and `<Speech>` component.

## 1.1.1 (2024-12-29)

- **fix:** Corrected sentence and line highlighting logic.

## 1.1.0 (2024-12-28)

- **feat:** `showOnlyHighlightedText` and `highlightMode` props in `useSpeech` hook and `<Speech>` component.

## 1.0.3 (2024-12-25)

- **perf:** Improved performance with memoization.

## 1.0.2 (2024-12-23)

- **perf:** Improved performance with memoization.
- **docs:** Replaced react-markdown with react-remarkify in `Usage with Markdown` section.

## 1.0.0 (2024-12-06)

- **feat:** Support for React.js v19 to ensure compatibility with the latest features.
- **feat:** A logo to enhance branding and visual identity.

## 0.19.2 (2024-09-16)

- **fix:** Resolved text highlight issues in Firefox caused by `>` and `<` symbols by replacing the special symbol `\u200E` with `\u00A0`.

## 0.19.1 (2024-09-16)

- **feat:** Speech utterance now starts when `autoPlay` is set to `true` and stops when `autoPlay` is set to `false`, based on the React state.
- **fix:** Incorrect queue details (stale data).
- **refactor:** Code refactor.

## 0.19.0 (2024-09-15)

- **feat:** `autoPlay` prop in `useSpeech` hook and `<Speech>` component.
- **fix:** Multiple issues in Firefox, including incorrect text highlighting and the `stop` function not working correctly.
- **fix:** Typo in documentation.
- **refactor:** Improved internal code for better maintainability.

## 0.18.0 (2024-09-14)

- **feat:** Support for `<` and `>` characters to be spoken as "less-than" and "greater-than".

## 0.17.0 (2024-09-10)

- **feat:** `maxChunkSize` prop in `useSpeech` hook and `<Speech>` component.

## 0.16.3 (2024-09-09)

- **fix:** Speech wouldn’t start for large `text` inputs.
- **fix:** Pause event issues on Android.

## 0.16.0 (2024-06-15)

- **feat:** `useVoices` hook.

## 0.15.3 (2024-06-13)

- **fix:** Speech wouldn’t resume if paused near the end of a sentence.

## 0.15.1 (2024-06-11)

- **feat:** Exporting icons and types from library.

## 0.14.7 (2024-05-29)

- **feat:** Separate documentation website available at [https://rtts.vercel.app/](https://rtts.vercel.app/).
- **change:** Updated to monorepo structure and switched to `pnpm`.

## 0.14.6 (2024-05-05)

- **feat:** Code of Conduct, Contributing guide, Security policy, and Issue templates.

## 0.14.4 (2024-04-11)

- **improve:** `highlightText` prop can now be dynamically toggled during speech.

## 0.14.3 (2024-04-07)

- **improve:** Enhanced sanitization of `text` before passing to **Web Speech API**.

## 0.14.0 (2024-04-05)

- **feat:** `useQueue` hook.

## 0.13.5 (2024-04-02)

- **improve:** Major performance optimization.

## 0.13.3 (2024-04-02)

- **change:** Switched from `pnpm` to `bun`.

## 0.13.0 (2024-03-31)

- **feat:** `onQueueChange` prop in `useSpeech` hook and `<Speech>` component.

## 0.12.8 (2024-03-26)

- **fix:** Speech did not stop when the `start` function of the `useSpeech` hook was called if the component was unmounted before the speech actually began.

## 0.12.4 (2024-03-23)

- **fix:** Unmounting one `<Speech>` instance would stop the speech utterance of another instance.

## 0.12.1 (2024-03-22)

- **fix:** Speech stops automatically when the `text` prop changes.

## 0.12.0 (2024-03-19)

- **feat:** `onBoundary` prop in `useSpeech` hook and `<Speech>` component.

## 0.11.0 (2024-03-19)

- **feat:** `onStart`, `onResume`, `onPause`, and `onStop` props in `useSpeech` hook and `<Speech>` component.
- **feat:** `isInQueue` state value returned by `useSpeech` hook.

## 0.10.0 (2024-03-18)

- **feat:** `preserveUtteranceQueue` prop in `useSpeech` hook and `<Speech>` component.

## 0.9.5 (2024-03-14)

- **fix:** `stop` function of `useSpeech` hook did not work if start was called multiple times.
- **fix:** HTML tags and entities were ignored by Web Speech API.

## 0.9.4 (2024-03-11)

- **fix:** A bug where multiple highlight boxes appeared where there were 10 or more children.

## 0.9.2 (2024-03-11)

- **fix:** Highlight text feature didn't work if `<HighlightedText>` was placed after `<Speech>`.

## 0.9.0 (2024-02-14)

- **feat:** `useSpeech` hook.
- **change:** Default value of `useStopOverPause` prop.
- **docs:** Restructured and refined documentation.

## 0.8.15 (2024-02-14)

- **improve:** Minor performance optimization.

## 0.8.14 (2024-02-12)

- **fix:** Minor bugs in the algorithm used to highlight words.

## 0.8.11 (2024-02-09)

- **change:** Default value of `highlightProps` prop of `<Speech>` component.
- **fix:** Minor bugs in the algorithm used to highlight words.

## 0.8.5 (2024-02-08)

- **fix:** A bug where speech was stopping at mount instead of unmount of `<Speech>` component.

## 0.8.2 (2024-02-08)

- **fix:** A bug where `<HighlightedText>` wasn't rendering when FaC was used in `<Speech>` component.

## 0.8.1 (2024-02-07)

- **feat:** `children` in `<HighlightedText>` component.

## 0.8.0 (2024-02-04)

- **feat:** `highlightText` and `highlightProps` props in `<Speech>` component.
- **feat:** `<HighlightedText>` component.
- **improve:** `text` prop in `<Speech>` component can now be `JSX`.

## 0.7.0 (2024-02-03)

- **feat:** `voiceURI` prop in `<Speech>` component.

## 0.6.6 (2024-01-19)

- **improve:** Default icons.

## 0.6.5 (2023-11-27)

- **docs:** Fixed typo.

## 0.6.4 (2023-11-13)

- **fix:** Button rendering method.

## 0.6.3 (2023-10-31)

- **fix:** A bug where speech wouldn't start in multiple `<Speech>` instances due to a patch in [v0.6.2].

## 0.6.2 (2023-10-31)

- **fix:** A bug where speech wouldn't start again if speech was paused just when it was about to end.

## 0.6.1 (2023-10-30)

- **fix:** `speechStatus` reactivity when `startBtn` is clicked.

## 0.6.0 (2023-10-30)

- **feat:** `useStopOverPause` prop in `<Speech>` component.
- **fix:** `pauseBtn` behaving as `stopBtn` on Android devices.

## 0.5.2 (2023-10-14)

- **fix:** Sync issues when using multiple `<Speech>` instances.

## 0.5.1 (2023-10-14)

- **fix:** `stopBtn` on any `<Speech>` instance was stopping the speech.

## 0.5.0 (2023-10-14)

- **feat:** `pauseBtn` prop in `<Speech>` component.
- **feat:** Full customization using FaC.
