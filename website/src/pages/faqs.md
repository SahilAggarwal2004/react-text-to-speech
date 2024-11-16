# FAQs

<br />

<details>
<summary>Why is text inside child components not spoken?</summary>
<p>This happens because <a href="https://react.dev/reference/react/Children#children-map-caveats" target="_blank">`Children.map`</a> does not traverse the children of React elements.</p>
<blockquote>
<p><strong>React elements and their children aren't rendered or traversed.</strong></p>
</blockquote>
<p>To resolve this, pass the text directly as a prop or as a child of the `<Speech>` component (or when using the `useSpeech` hook).</p>
</details>

<details>
<summary>Why does `highlightText` sometimes highlight the wrong word?</summary>
<p>The <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/boundary_event">`SpeechSynthesisUtterance` boundary event</a> may provide inaccurate word boundaries for certain combinations of `text`, `lang`, or `voice`. This causes the highlight to mismatch the spoken word.</p>
<p>To fix this, try different voices or languages to find the most compatible option for your text.</p>
</details>

<details>
<summary>Why does `highlightText` not work on Chrome for Android or Linux?</summary>
<p>Chrome on Android and Linux lacks support for the `boundary` event when using network-based voices. This is a known limitation documented by the Chromium team, and they have <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=521666#c7" target="_blank">no plans to fix it</a>.</p>
<p>Consider using a different browser or operating system where `boundary` events are supported.</p>
</details>

<details>
<summary>Why can't I pause audio on Android/mobile devices?</summary>
<p>The <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/pause#browser_compatibility" target="_blank">`SpeechSynthesis.pause()`</a> function does not work as expected on mobile devices. On these platforms, calling `pause()` ends the current utterance, behaving like `cancel()`.</p>
<p>If you're using the `<Speech>` component, set the `useStopOverPause` prop to `true` for mobile devices. For custom controls with the `useSpeech` hook, avoid exposing a pause option and provide only stop functionality instead.</p>
</details>

<details>
<summary>Can I use this library with React Native?</summary>
<p>No, this library is not compatible with React Native because it relies on the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API" target="_blank">`WebSpeechAPI`</a>, which is only available in browsers.</p>
<p>For React Native applications, explore alternative TTS libraries available on npm to find one that fits your requirements.</p>
</details>
