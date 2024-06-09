import Layout from "@theme/Layout";
import React, { useEffect, useState } from "react";
import Speech, { HighlightedText } from "react-text-to-speech";
import { ToastContainer, toast } from "react-toastify";
import styles from "./demo.module.css";
import "react-toastify/dist/ReactToastify.css";

export default function demo() {
  const [text, setText] = useState("");
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [lang, setLang] = useState("");
  const [voiceURI, setVoiceURI] = useState("");
  const [highlightText, setHighlightText] = useState(false);
  const [useStopOverPause, setUseStopOverPause] = useState(false);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const languages = [...new Set(voices.map(({ lang }) => lang))];
  const onVoicesChanged = () => setVoices(window.speechSynthesis.getVoices());

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
    return () => speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
  }, []);

  function copy() {
    const sanitizedText = text.replace(/\n|(?<!\\)`/g, (match) => (match === "`" ? "\\`" : " "));
    const code = `import React from "react";\nimport Speech${
      highlightText ? ", { HighlightedText }" : ""
    } from "react-text-to-speech";\n\nexport default function App() {\n\tconst text = \`${sanitizedText}\`;\n\treturn (\n\t\t<>\n\t\t\t<Speech${
      highlightText ? ` id="rtts"` : ""
    } text={text} pitch={${pitch}} rate={${rate}} volume={${volume}} lang="${lang}" voiceURI="${voiceURI}" highlightText={${highlightText}} useStopOverPause={${useStopOverPause}} />\n${
      highlightText ? `\t\t\t<HighlightedText id="rtts">{text}</HighlightedText>\n` : ""
    }\t\t</>\n\t);\n}`;
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  }

  return (
    <Layout title="Demo">
      <main className={styles.main}>
        <section className={styles.inputs}>
          <h4>Inputs:</h4>
          <textarea rows={5} placeholder="Enter some text" onChange={(e) => setText(e.target.value)} />
          <div>
            <div>
              <label htmlFor="pitch">Pitch:</label>
              <input id="pitch" type="range" value={pitch} disabled={disabled} step={0.1} min={0} max={2} onChange={(e) => setPitch(+e.target.value)} />
            </div>
            <span>{pitch}</span>
          </div>
          <div>
            <div>
              <label htmlFor="volume">Rate:</label>
              <input id="rate" type="range" value={rate} disabled={disabled} step={0.1} min={0.1} max={10} onChange={(e) => setRate(+e.target.value)} />
            </div>
            <span>{rate}</span>
          </div>
          <div>
            <div>
              <label htmlFor="volume">Volume:</label>
              <input id="volume" type="range" value={volume} disabled={disabled} step={0.05} min={0} max={1} onChange={(e) => setVolume(+e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="lang">Language:</label>
            <select id="lang" value={lang} disabled={disabled} onChange={(e) => setLang(e.target.value)}>
              <option value="">Choose a language</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="voice">Voice:</label>
            <select id="voice" value={voiceURI} disabled={disabled} onChange={(e) => setVoiceURI(e.target.value)}>
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
          <div>
            <label htmlFor="highlightText">Highlight Text:</label>
            <input id="highlightText" type="checkbox" checked={highlightText} onChange={(e) => setHighlightText(e.target.checked)} />
          </div>
          <div>
            <label htmlFor="useStopOverPause">Stop Over Pause:</label>
            <input id="useStopOverPause" type="checkbox" checked={useStopOverPause} onChange={(e) => setUseStopOverPause(e.target.checked)} />
          </div>
        </section>
        <section className={styles.component}>
          <h4>Speech Component:</h4>
          <Speech
            id="rtts"
            text={text}
            pitch={pitch}
            rate={rate}
            volume={volume}
            lang={lang}
            voiceURI={voiceURI}
            highlightText={highlightText}
            useStopOverPause={useStopOverPause}
            onStart={() => setDisabled(true)}
            onStop={() => setDisabled(false)}
          />
          <div className={styles.text}>
            <h4>Text:</h4>
            {highlightText ? <HighlightedText id="rtts">{text}</HighlightedText> : <div>{text}</div>}
          </div>
        </section>
        <button className={styles.button} onClick={copy}>
          Copy Code
        </button>
      </main>
      <ToastContainer stacked position="top-right" />
    </Layout>
  );
}
