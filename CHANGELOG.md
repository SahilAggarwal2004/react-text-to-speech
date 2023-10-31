# 0.6.2 (31-10-2023)
- **fixed:** a bug where speech won't start again if speech was paused just when it was about to end.
## 0.6.1 (30-10-2023)
- **fixed:** `speechStatus` reactivity when `startBtn` is clicked.
## 0.6.0 (30-10-2023)
- **added:** `useStopOverPause` prop in `<Speech>` component. See [Speech Component API Reference](https://www.npmjs.com/package/react-text-to-speech#speech-component-api-reference)
- **fixed:** `pauseBtn` behaving as `stopBtn` in android devices (see [details](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/pause)) with the help of `useStopOverPause` prop
## 0.5.2 (14-10-2023)
- **fixed:** sync issues when using multiple `<Speech>` instances. See [Advanced Usage](https://www.npmjs.com/package/react-text-to-speech#advanced-usage)
## 0.5.1 (14-10-2023)
- **fixed:** `stopBtn` on any `<Speech>` instance was stopping the speech. See [Advanced Usage](https://www.npmjs.com/package/react-text-to-speech#advanced-usage)
## 0.5.0 (14-10-2023)
- **added:** `pauseBtn` prop in `<Speech>` component. See [Speech Component API Reference](https://www.npmjs.com/package/react-text-to-speech#speech-component-api-reference)
- **added:** Full customization using FoC. See [usage with FoC](https://www.npmjs.com/package/react-text-to-speech#full-customization)