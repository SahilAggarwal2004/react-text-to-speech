# Changelog

## [3.1.1](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v3.1.0...v3.1.1) (2025-10-04)

### Bug Fixes

* Ensure consistent `onBoundary` progress reporting across utterance events.  ([a5c4ff5](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/a5c4ff55fee6955ef20388dacca0c927466ab5a6))

## [3.1.0](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v3.0.1...v3.1.0) (2025-10-03)

### Chores

* **deps:** Bump React.js.  ([0a208ed](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/0a208ed7b3309dbebb93976180947ff052ac901a))

### Features

* Add speech progress tracking for speech synthesis.  ([55b68b4](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/55b68b43cc37af9939e7869b678f68f6c121864e))

## [3.0.1](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v3.0.0...v3.0.1) (2025-10-01)

### Chores

* **deps:** Update TypeScript, TailwindCSS.  ([e338b2f](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/e338b2f0aa22cd84ea2fee9e7d3ef9b14361cc79))
* **release-it:** Update `after:release` hook to run deploy and publish.  ([02b343a](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/02b343a52d6fc0318ad3d97d6cb40d70ea95f05b))

### Bug Fixes

* **demo:** Align copied code with `<Text>` wrapper update from v3.0.0.  ([3935b7a](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/3935b7a597ade2fc7dc53a32fc4ad474b14bb4a9))
* **react-utils:** Skip empty strings when normalizing React children.  ([7aaf184](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/7aaf184fc5ff1022dd9a6155958964445aaebb40))

## [3.0.0](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v2.1.2...v3.0.0) (2025-09-30)

### ⚠ BREAKING CHANGES

* Wrap `Text` prop in `<div>` instead of rendering directly.

### Chores

* **deps:** bump @ianvs/prettier-plugin-sort-imports, prettier-plugin-tailwindcss, @types/node.  ([84a09d5](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/84a09d59db185cc63f49ceec5298b45c7f1e335d))
* **deps:** Bump Docusaurus, TailwindCSS.  ([05eb22b](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/05eb22bc69ae8002fc6bc5801ea7822b9608b6ac))
* **release:** Upgrade release-it setup with custom changelog transform.  ([61b9333](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/61b9333c3a7c7a68009eeea57e296b1cb2f1795b))

### Features

* Add `highlightContainerProps` prop in `useSpeech` hook and `<Speech>` component.  ([b2ea68e](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/b2ea68edb67a768dd48ad75c6f4381914afa6090))

### Documentation

* clarify `useSpeak` vs `useSpeech`.  ([7899e9f](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/7899e9fe767f4141086cfd5c2862ceafddd1b733))

### Code Refactoring

* Reorganized internal modules for better modularity and maintainability.  ([3eb9b2a](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/3eb9b2aa3017d2cfb70946c03e1fa0cc1d434b5d))
* Wrap `Text` prop in `<div>` instead of rendering directly. This may affect existing styles or DOM expectations. Highlighting logic now directly manipulates the DOM, improving performance for large `text` inputs when JSX is passed. Add `enableConditionalHighlight` prop in `<Speech>` component. ([27184d7](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/27184d78291ec94087fb3c869ea7efd48ad3760a))

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
