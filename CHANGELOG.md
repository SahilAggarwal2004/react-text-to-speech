# Changelog

## [5.1.2](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v5.1.1...v5.1.2) (2025-12-26)

### Chores

* **deps:** Update @release-it/conventional-changelog and @types/node.  ([fcc5e3f](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/fcc5e3fd122b6391b51b1631fd92cd8219e2d78d))
* **deps:** Update release-it.  ([f1d0460](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/f1d0460834a819b0e6ae6519e7e781e926a3a407))

### Performance Improvements

* Stabilize default props reference to avoid unnecessary rerenders.  ([64aa2a7](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/64aa2a762b1364658841a96ab55ca288eb85dcaa))

### Documentation

* Update README with latest usage examples for `useSpeech` hook and `<Speech>` component.  ([e748a31](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/e748a318436d9732990e7337a5939e44f39c4b7e))

## [5.1.1](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v5.1.0...v5.1.1) (2025-12-16)

### Bug Fixes

* Fix broken compare links in release-it changelog.  ([e40e785](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/e40e7854b79cdf8b70d15ecd4f5c4dd8b53707b5))
* Stop speech immediately on content key change.  ([de81515](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/de815153bf301aac62487442c3a667f57c083608))

### Code Refactoring

* Move utility files from src/modules to src/lib.  ([bdb9d12](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/bdb9d1279015d4237efe7dc77d9a11ef1aaf2870))

## [5.1.0](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v5.0.5...v5.1.0) (2025-12-15)

### Chores

* **deps:** Update prettier, @types/react, @release-it/conventional-changelog.  ([a378e3a](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/a378e3a4008250aa8452fd75c2ef7fe174922299))
* **deps:** Update release-it, prettier, react and react-remarkify.  ([239d6dd](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/239d6dd56edc805f9bb162e1d23499912df7ec5e))

### Features

* Add `stableText` option to skip unnecessary key calculation and improve performance.  ([1c3470a](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/1c3470a2f0108de934ba3bddfb3f1dd8ef593047))

## [5.0.5](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v5.0.4...v5.0.5) (2025-11-14)

### Chores

* **deps:** Update tsup, tailwind and @types/node.  ([4865812](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/486581228666f29f2746e5d2ebe4f4db4c5df008))

### Bug Fixes

* Ensure onBoundary is always fired after onStart.  ([e99ae89](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/e99ae89063894bb8f810693b74f1720471ad9662))

## [5.0.4](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v5.0.3...v5.0.4) (2025-11-13)

### Chores

* Sync npm and GitHub versions.  ([060841b](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/060841b912097329d86e5ace94a8ee6e189858af))

## [5.0.3](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v5.0.2...v5.0.3) (2025-11-13)

### Chores

* **deps:** Update release-it, @types/react and @types/react-dom.  ([5baa7f6](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/5baa7f6ef0fba7061628a653325c1863d064844e))

### Bug Fixes

* Manually handle speech pause/resume to fix locale-specific event firing issues.  ([39b9d4d](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/39b9d4d213d190e3939386c6d5f5aab462d7f094))

## [5.0.2](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v5.0.1...v5.0.2) (2025-11-01)

### Chores

* **deps:** Update react-remarkify, Tailwind, and @types/node.  ([81269da](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/81269da1fc42d4993e15455a5dbf67c8abaff03c))

### Bug Fixes

* Ensure `throttle` mode in `useStableValue` performs a trailing update to prevent missing the final value update.  ([716e8ff](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/716e8ffd4979bce09e74cfbde6bb578a3847c9d0))

## [5.0.1](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v5.0.0...v5.0.1) (2025-10-19)

### Chores

* **demo:** Add debounce to useSpeech input.  ([611199e](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/611199eed18e18d4f86c4cec39c2af7006e752c4))
* **deps:** Update @types/react-dom, @types/node, and Docusaurus.  ([8268ef2](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/8268ef235ff97abaf89b9715096b0f2eafa2f98f))

### Bug Fixes

* Add forwardRef to `Text` component to correctly forward ref to DOM node.  ([a196655](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/a196655a134324c5ebe7fd79b47a5a19ccc6be37))

## [5.0.0](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v4.1.1...v5.0.0) (2025-10-11)

### ⚠ BREAKING CHANGES

* Replace `debounceDelay` with `updateMode` and `updateDelay` in `useSpeech` hook and `<Speech>` component to support throttling and debouncing of text updates

### Chores

* **deps:** Update react-remarkify.  ([27a9090](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/27a9090787d6c86d062e4a4988d3049e28b72391))

### Features

* Replace `debounceDelay` with `updateMode` and `updateDelay` in `useSpeech` hook and `<Speech>` component to support throttling and debouncing of text updates.  ([e7db234](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/e7db234f99d79c13baa336f797da5fbd87d6c1bb))

## [4.1.1](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v4.1.0...v4.1.1) (2025-10-11)

### Chores

* **deps:** Update react-remarkify.  ([30a2e98](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/30a2e988ecc56ca59d19cc68c3180af3c428752b))

### Bug Fixes

* Debounce `key` instead of `text` in `useSpeechInternal` to prevent starvation.  ([2994e2b](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/2994e2bd5d2a01471d3ead3f61f4e61f84f796aa))
* Ensure `useDebounce` follows React.js rules of hooks.  ([61545a7](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/61545a7059b945cadd41d1c759fbe02cd84e02a6))

### Code Refactoring

* Rename `parentIndex` to `index` in `indexText` and `highlightedText` for clarity.  ([8853d7e](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/8853d7e7e19d7c2259e42075578392bca73cc4f4))

## [4.1.0](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v4.0.0...v4.1.0) (2025-10-10)

### Features

* Add `debounceDelay` option to reduce redundant text processing during rapid updates.  ([c7dd3f7](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/c7dd3f7f5c06ca556c35fa59c5ead5d1a55dff21))

### Bug Fixes

* Ensure immediate word highlights when `showOnlyHighlightedText` is toggled from true to false.  ([5f76e9a](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/5f76e9a5729533b7143bf38265ac6683e2709b62))

### Documentation

* Update HighlightProps type and document Highlight Text limitations in `<Speech>` component.  ([599db3d](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/599db3dbb6f9722a68943847ddb21ce346148e81))

## [4.0.0](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v3.1.2...v4.0.0) (2025-10-08)

### ⚠ BREAKING CHANGES

* Narrow HighlightProps types for significant bundle size reduction

### Chores

* **deps:** Update @types/react, @types/node.  ([db662ec](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/db662ec75600dd2a7a8d774cb678054d8df08469))

### Bug Fixes

* Normalize React text nodes before processing to prevent inconsistencies with single element inputs.  ([f44d015](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/f44d0153a6b7e34502219592503f5f96eb4ed285))

### Code Refactoring

* Narrow HighlightProps types for significant bundle size reduction.  ([7719716](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/7719716da967af99345f40e72387b9c48dd2afb9))
* Optimize `<Speech>` component to cut the bundle size.  ([2401dd8](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/2401dd899ef35f8e305a63c700b5dfd37fa7dfeb))
* Simplify onboundary handling by processing only `word` events.  ([b1378ec](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/b1378ec8d2af566aace5223c9c041d2d98c57fe1))

## [3.1.2](https://github.com/SahilAggarwal2004/react-text-to-speech/compare/v3.1.1...v3.1.2) (2025-10-04)

### Bug Fixes

* **react-utils:** Preserve whitespace strings to maintain layout.  ([5382347](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/538234778523d5ae074969293e83902fcd83a47e))

### Documentation

* Improve demo layout and TailwindCSS prose styling.  ([4471402](https://github.com/SahilAggarwal2004/react-text-to-speech/commit/44714029cbdf66537e136d45fbd152cdc4dfd65c))

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
