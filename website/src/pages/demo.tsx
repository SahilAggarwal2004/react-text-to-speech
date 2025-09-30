import Layout from "@theme/Layout";
import { useState } from "react";
import { useRemark } from "react-remarkify";
import { useSpeech, useVoices } from "react-text-to-speech";
import { HiMiniStop, HiVolumeOff, HiVolumeUp } from "react-text-to-speech/icons";
import { HighlightMode } from "react-text-to-speech/types";
import { toast, ToastContainer } from "react-toastify";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { highlightModes } from "../constants";
import styles from "./demo.module.css";

export default function Demo() {
  const [autoPlay, setAutoPlay] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [enableDirectives, setEnableDirectives] = useState(false);
  const [highlightText, setHighlightText] = useState(false);
  const [highlightMode, setHighlightMode] = useState<HighlightMode>("word");
  const [lang, setLang] = useState("");
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [showOnlyHighlightedText, setShowOnlyHighlightedText] = useState(false);
  const [text, setText] = useState("");
  const [voiceURI, setVoiceURI] = useState("");
  const [volume, setVolume] = useState(1);

  const { languages, voices } = useVoices();
  const reactContent = useRemark({
    markdown: text,
    rehypePlugins: [rehypeRaw, rehypeSanitize],
    remarkPlugins: [remarkGfm],
    remarkToRehypeOptions: { allowDangerousHtml: true },
  });
  const { Text, speechStatus, start, pause, stop } = useSpeech({
    text: showMarkdown ? reactContent : text,
    pitch,
    rate,
    volume,
    lang,
    voiceURI,
    autoPlay,
    highlightText,
    showOnlyHighlightedText,
    highlightMode,
    enableDirectives,
    onStart: () => setDisabled(true),
    onStop: () => setDisabled(false),
  });

  function copy() {
    const sanitizedText = text.replace(/(?<!\\)(`|\$)/g, "\\$1");
    if (showMarkdown)
      var code = `import { useState } from "react";
import { useRemark } from "react-remarkify";
import { useSpeech } from "react-text-to-speech";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

export default function App() {
  const text = \`${sanitizedText}\`;

  const reactContent = useRemark({ markdown: text, rehypePlugins: [rehypeRaw, rehypeSanitize], remarkPlugins: [remarkGfm], remarkToRehypeOptions: { allowDangerousHtml: true } });
  const { Text, speechStatus, start, pause, stop } = useSpeech({ text: reactContent, pitch: ${pitch}, rate: ${rate}, volume: ${volume}, lang: "${lang}", voiceURI: "${voiceURI}", autoPlay: ${autoPlay}, highlightText: ${highlightText}, showOnlyHighlightedText: ${showOnlyHighlightedText}, highlightMode: "${highlightMode}", enableDirectives: "${enableDirectives}" });

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
      <div className="prose prose-th:w-screen prose-th:max-w-full prose-th:border prose-td:border prose-th:p-2 prose-td:p-2 prose-ul:whitespace-normal prose-ol:whitespace-normal prose-headings:my-1 prose-pre:my-1 grid max-w-full grid-cols-1 whitespace-pre-wrap break-words *:my-0 *:w-full *:whitespace-pre-wrap">
        <Text />
      </div>
    </div>
  );
}`;
    else
      code = `import React from "react";
import { useSpeech } from "react-text-to-speech";

export default function App() {
  const text = \`${sanitizedText}\`;
  const { Text, speechStatus, start, pause, stop } = useSpeech({ text, pitch: ${pitch}, rate: ${rate}, volume: ${volume}, lang: "${lang}", voiceURI: "${voiceURI}", autoPlay: ${autoPlay}, highlightText: ${highlightText}, showOnlyHighlightedText: ${showOnlyHighlightedText}, highlightMode: "${highlightMode}", enableDirectives: "${enableDirectives} });

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
          <textarea rows={5} placeholder="Enter some text" value={text} className="resize-y" onChange={(e) => setText(e.target.value)} />
          <div>
            <div>
              <label htmlFor="pitch">Pitch:</label>
              <input id="pitch" type="range" value={pitch} step={0.1} min={0.1} max={2} onChange={(e) => setPitch(+e.target.value)} />
            </div>
            <span>{pitch}</span>
          </div>
          <div>
            <div>
              <label htmlFor="rate">Rate:</label>
              <input id="rate" type="range" value={rate} step={0.1} min={0.1} max={10} onChange={(e) => setRate(+e.target.value)} />
            </div>
            <span>{rate}</span>
          </div>
          <div>
            <div>
              <label htmlFor="volume">Volume:</label>
              <input id="volume" type="range" value={volume} step={0.05} min={0} max={1} onChange={(e) => setVolume(+e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="lang">Language:</label>
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
            <label htmlFor="voice">Voice:</label>
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
          <div>
            <label htmlFor="autoPlay">Auto Play:</label>
            <input id="autoPlay" type="checkbox" checked={autoPlay} disabled={disabled} onChange={(e) => setAutoPlay(e.target.checked)} />
          </div>
          <div>
            <label htmlFor="highlightText">Highlight Text:</label>
            <input id="highlightText" type="checkbox" checked={highlightText} onChange={(e) => setHighlightText(e.target.checked)} />
          </div>
          <div>
            <label htmlFor="showOnlyHighlightedText">Show Only Highlighted Text:</label>
            <input
              id="showOnlyHighlightedText"
              type="checkbox"
              checked={showOnlyHighlightedText}
              disabled={!highlightText}
              onChange={(e) => setShowOnlyHighlightedText(e.target.checked)}
            />
          </div>
          <div>
            <label htmlFor="highlightMode">Highlight Mode:</label>
            <select id="highlightMode" value={highlightMode} disabled={disabled || !highlightText} onChange={(e) => setHighlightMode(e.target.value as HighlightMode)}>
              {highlightModes.map((mode) => (
                <option key={mode} value={mode}>
                  {highlightText ? mode : "Choose a mode"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="enableDirectives">Enable Directives:</label>
            <input id="enableDirectives" type="checkbox" checked={enableDirectives} onChange={(e) => setEnableDirectives(e.target.checked)} />
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
            <Text className="prose prose-th:w-screen prose-th:max-w-full prose-th:border prose-td:border prose-th:p-2 prose-td:p-2 prose-ul:whitespace-normal prose-ol:whitespace-normal prose-headings:my-1 prose-pre:my-1 grid max-w-full grid-cols-1 whitespace-pre-wrap break-words *:my-0 *:w-full *:whitespace-pre-wrap" />
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
