# 1.0.0 (06-12-2024)

- **feat:** Support for React.js v19 to ensure compatibility with the latest features.
- **feat:** A logo to enhance branding and visual identity.

## 0.19.2 (16-09-2024)

- **fix:** Resolved text highlight issues in Firefox caused by `>` and `<` symbols by replacing the special symbol `\u200E` with `\u00A0`.

## 0.19.1 (16-09-2024)

- **feat:** Speech utterance now starts when `autoPlay` is set to `true` and stops when `autoPlay` is set to `false`, based on the React state.
- **fix:** Incorrect queue details (stale data).
- **refactor:** Code refactor.

## 0.19.0 (15-09-2024)

- **feat:** `autoPlay` prop in `useSpeech` hook and `<Speech>` component.
- **fix:** Multiple issues in Firefox, including incorrect text highlighting and the `stop` function not working correctly.
- **fix:** Typo in documentation.
- **refactor:** Improved internal code for better maintainability.

## 0.18.0 (14-09-2024)

- **feat:** Support for `<` and `>` characters to be spoken as "less-than" and "greater-than".

## 0.17.0 (10-09-2024)

- **feat:** `maxChunkSize` prop in `useSpeech` hook and `<Speech>` component.

## 0.16.3 (09-09-2024)

- **fix:** Speech wouldn’t start for large `text` inputs.
- **fix:** Pause event issues on Android.

## 0.16.0 (15-06-2024)

- **feat:** `useVoices` hook.

## 0.15.3 (13-06-2024)

- **fix:** Speech wouldn’t resume if paused near the end of a sentence.

## 0.15.1 (11-06-2024)

- **feat:** Exporting icons and types from library.

## 0.14.7 (29-05-2024)

- **feat:** Separate documentation website available at [https://rtts.vercel.app/](https://rtts.vercel.app/).
- **change:** Updated to monorepo structure and switched to `pnpm`.

## 0.14.6 (05-05-2024)

- **feat:** Code of Conduct, Contributing guide, Security policy, and Issue templates.

## 0.14.4 (11-04-2024)

- **improve:** `highlightText` prop can now be dynamically toggled during speech.

## 0.14.3 (07-04-2024)

- **improve:** Enhanced sanitization of `text` before passing to **Web Speech API**.

## 0.14.0 (05-04-2024)

- **feat:** `useQueue` hook.

## 0.13.5 (02-04-2024)

- **improve:** Major performance optimization.

## 0.13.3 (02-04-2024)

- **change:** Switched from `pnpm` to `bun`.

## 0.13.0 (31-03-2024)

- **feat:** `onQueueChange` prop in `useSpeech` hook and `<Speech>` component.

## 0.12.8 (26-03-2024)

- **fix:** Speech did not stop when the `start` function of the `useSpeech` hook was called if the component was unmounted before the speech actually began.

## 0.12.4 (23-03-2024)

- **fix:** Unmounting one `<Speech>` instance would stop the speech utterance of another instance.

## 0.12.1 (22-03-2024)

- **fix:** Speech stops automatically when the `text` prop changes.

## 0.12.0 (19-03-2024)

- **feat:** `onBoundary` prop in `useSpeech` hook and `<Speech>` component.

## 0.11.0 (19-03-2024)

- **feat:** `onStart`, `onResume`, `onPause`, and `onStop` props in `useSpeech` hook and `<Speech>` component.
- **feat:** `isInQueue` state value returned by `useSpeech` hook.

## 0.10.0 (18-03-2024)

- **feat:** `preserveUtteranceQueue` prop in `useSpeech` hook and `<Speech>` component.

## 0.9.5 (14-03-2024)

- **fix:** `stop` function of `useSpeech` hook did not work if start was called multiple times.
- **fix:** HTML tags and entities were ignored by Web Speech API.

## 0.9.4 (11-03-2024)

- **fix:** A bug where multiple highlight boxes appeared where there were 10 or more children.

## 0.9.2 (11-03-2024)

- **fix:** Highlight text feature didn't work if `<HighlightedText>` was placed after `<Speech>`.

## 0.9.0 (14-02-2024)

- **feat:** `useSpeech` hook.
- **change:** Default value of `useStopOverPause` prop.
- **docs:** Restructured and refined documentation.

## 0.8.15 (14-02-2024)

- **improve:** Minor performance optimization.

## 0.8.14 (12-02-2024)

- **fix:** Minor bugs in the algorithm used to highlight words.

## 0.8.11 (09-02-2024)

- **change:** Default value of `highlightProps` prop of `<Speech>` component.
- **fix:** Minor bugs in the algorithm used to highlight words.

## 0.8.5 (08-02-2024)

- **fix:** A bug where speech was stopping at mount instead of unmount of `<Speech>` component.

## 0.8.2 (08-02-2024)

- **fix:** A bug where `<HighlightedText>` wasn't rendering when FaC was used in `<Speech>` component.

## 0.8.1 (07-02-2024)

- **feat:** `children` in `<HighlightedText>` component.

## 0.8.0 (04-02-2024)

- **feat:** `highlightText` and `highlightProps` props in `<Speech>` component.
- **feat:** `<HighlightedText>` component.
- **improve:** `text` prop in `<Speech>` component can now be `JSX`.

## 0.7.0 (03-02-2024)

- **feat:** `voiceURI` prop in `<Speech>` component.

## 0.6.6 (19-01-2024)

- **improve:** Default icons.

## 0.6.5 (27-11-2023)

- **docs:** Fixed typo.

## 0.6.4 (13-11-2023)

- **fix:** Button rendering method.

## 0.6.3 (31-10-2023)

- **fix:** A bug where speech wouldn't start in multiple `<Speech>` instances due to a patch in [v0.6.2].

## 0.6.2 (31-10-2023)

- **fix:** A bug where speech wouldn't start again if speech was paused just when it was about to end.

## 0.6.1 (30-10-2023)

- **fix:** `speechStatus` reactivity when `startBtn` is clicked.

## 0.6.0 (30-10-2023)

- **feat:** `useStopOverPause` prop in `<Speech>` component.
- **fix:** `pauseBtn` behaving as `stopBtn` on Android devices.

## 0.5.2 (14-10-2023)

- **fix:** Sync issues when using multiple `<Speech>` instances.

## 0.5.1 (14-10-2023)

- **fix:** `stopBtn` on any `<Speech>` instance was stopping the speech.

## 0.5.0 (14-10-2023)

- **feat:** `pauseBtn` prop in `<Speech>` component.
- **feat:** Full customization using FaC.
