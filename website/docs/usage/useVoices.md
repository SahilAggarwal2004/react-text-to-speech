# useVoices Hook

`useVoices` hook returns an array of [languages](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice/lang) and [voices](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice) supported by Web Speech API.

```tsx
import React, { useState } from "react";
import { useSpeech, useVoices } from "react-text-to-speech";

export default function App() {
  const { languages, voices } = useVoices();
  const [lang, setLang] = useState("");
  const [voiceURI, setVoiceURI] = useState("");
  const { Text, speechStatus, start, pause, stop } = useSpeech({ text: "This library is awesome!", lang, voiceURI });

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <Text />
      <div>
        <label htmlFor="lang">Language: </label>
        <select
          id="lang"
          value={lang}
          onChange={(e) => {
            setLang(e.target.value);
            setVoiceURI("");
          }}
        >
          <option value="">Choose a language</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="voice">Voice: </label>
        <select id="voice" value={voiceURI} onChange={(e) => setVoiceURI(e.target.value)}>
          <option value="">Choose a voice</option>
          {voices
            .filter((voice) => !lang || voice.lang === lang)
            .map(({ voiceURI }) => (
              <option key={voiceURI} value={voiceURI}>
                {voiceURI}
              </option>
            ))}
        </select>
      </div>
      <div style={{ display: "flex", columnGap: "0.5rem" }}>
        {speechStatus !== "started" ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
        <button onClick={stop}>Stop</button>
      </div>
    </div>
  );
}
```
