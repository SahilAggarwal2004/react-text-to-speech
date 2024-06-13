import Layout from "@theme/Layout";
import parse from "html-react-parser";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Markdown from "react-markdown";
import { useSpeech } from "react-text-to-speech";
import { HiMiniStop, HiVolumeOff, HiVolumeUp } from "react-text-to-speech/icons";
import { toast, ToastContainer } from "react-toastify";
import remarkGfm from "remark-gfm";

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
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [markdown, setMarkdown] = useState("");

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const languages = [...new Set(voices.map(({ lang }) => lang))];
  const onVoicesChanged = () => setVoices(window.speechSynthesis.getVoices());

  const [disabled, setDisabled] = useState(false);

  const mdText = useMemo(() => <>{!showMarkdown ? text : markdown && parse(markdown)}</>, [text, markdown]);
  const { Text, speechStatus, start, pause, stop } = useSpeech({
    text: mdText,
    pitch,
    rate,
    volume,
    lang,
    voiceURI,
    highlightText,
    onStart: () => setDisabled(true),
    onStop: () => setDisabled(false),
  });

  useEffect(() => {
    speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
    return () => speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
  }, []);

  useLayoutEffect(() => {
    stop();
    setMarkdown(document.querySelector(".rtts-markdown")?.innerHTML);
  }, [text, showMarkdown]);

  function copy() {
    const sanitizedText = text.replace(/(?<!\\)(`|\$)/g, "\\$1");
    if (showMarkdown)
      var code = `import parse from "html-react-parser";
import { useLayoutEffect, useMemo, useState } from "react";
import Markdown from "react-markdown";
import { useSpeech } from "react-text-to-speech";
import remarkGfm from "remark-gfm";

export default function App() {
  const text = \`${sanitizedText}\`;

  const [markdown, setMarkdown] = useState("");
  const mdText = useMemo(() => <>{markdown && parse(markdown)}</>, [markdown]);
  const { Text, speechStatus, start, pause, stop } = useSpeech({ text: mdText, pitch: ${pitch}, rate: ${rate}, volume: ${volume}, lang: "${lang}", voiceURI: "${voiceURI}", highlightText: ${highlightText} });

  useLayoutEffect(() => {
    setMarkdown(document.querySelector(".rtts-markdown")?.innerHTML);
  }, []);

  return (
    <div style={{ margin: "1rem", whiteSpace: "pre-wrap" }}>
      <div style={{ display: "flex", columnGap: "1rem", marginBottom: "1rem" }}>
        <button disabled={speechStatus === "started"} onClick={start}>
          Start
        </button>
        <button disabled={speechStatus === "paused"} onClick={pause}>
          Pause
        </button>
        <button disabled={speechStatus === "stopped"} onClick={stop}>
          Stop
        </button>
      </div>
      <div className="prose max-w-[90vw] overflow-x-scroll whitespace-pre-wrap break-words leading-snug *:my-0 *:w-max *:max-w-full prose-headings:my-1 prose-pre:w-full prose-li:my-0 prose-table:w-full prose-table:table-fixed prose-th:border prose-th:p-2 prose-td:border prose-td:p-2">
        <Text />
      </div>
      <Markdown className="rtts-markdown hidden" remarkPlugins={[remarkGfm]}>
        {text}
      </Markdown>
    </div>
  );
}`;
    else
      code = `import React from "react";
import { useSpeech } from "react-text-to-speech";

export default function App() {
  const text = \`${sanitizedText}\`;
  const { Text, speechStatus, start, pause, stop } = useSpeech({ text, pitch: ${pitch}, rate: ${rate}, volume: ${volume}, lang: "${lang}", voiceURI: "${voiceURI}", highlightText: ${highlightText} });

  return (
    <div style={{ margin: "1rem", whiteSpace: "pre-wrap" }}>
      <div style={{ display: "flex", columnGap: "1rem", marginBottom: "1rem" }}>
        <button disabled={speechStatus === "started"} onClick={start}>
          Start
        </button>
        <button disabled={speechStatus === "paused"} onClick={pause}>
          Pause
        </button>
        <button disabled={speechStatus === "stopped"} onClick={stop}>
          Stop
        </button>
      </div>
      <Text />
    </div>
  );
}`;
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
            <label htmlFor="showMarkdown">Markdown Support:</label>
            <input id="showMarkdown" type="checkbox" checked={showMarkdown} onChange={(e) => setShowMarkdown(e.target.checked)} />
          </div>
        </section>
        <section className={styles.component}>
          <h4>Speech Component:</h4>
          <div className={styles.icons}>
            <button>{speechStatus !== "started" ? <HiVolumeUp title="Start speech" onClick={start} /> : <HiVolumeOff title="Pause speech" onClick={pause} />}</button>
            <button>
              <HiMiniStop title="Stop speech" onClick={stop} />
            </button>
          </div>
          <div className={styles.text}>
            <h4>Text:</h4>
            <div className="prose max-w-[90vw] overflow-x-scroll whitespace-pre-wrap break-words leading-snug *:my-0 *:w-max *:max-w-full prose-headings:my-1 prose-pre:w-full prose-li:my-0 prose-table:w-full prose-table:table-fixed prose-th:border prose-th:p-2 prose-td:border prose-td:p-2">
              <Text />
            </div>
            {showMarkdown && (
              <Markdown className="rtts-markdown hidden" remarkPlugins={[remarkGfm]}>
                {text}
              </Markdown>
            )}
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
