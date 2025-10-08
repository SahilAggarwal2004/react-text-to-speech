# Speech Component

## Basic Usage

```tsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  return <Speech text="This library is awesome!" />;
}
```

## Highlight Text

Like the `useSpeech` hook, the `<Speech>` component can also highlight text. <a href="/docs/usage/useSpeech#highlight-text" target="_blank">Refer Here</a>

With `<Speech>`, the `<HighlightedText>` component exported by **react-text-to-speech** can be used to display the highlighted text.

**NOTE:**

- The `id` of both `<Speech>` and `<HighlightedText>` must be the same to link them together.
- The `<Speech>` component uses rendering optimizations to sync content with `<HighlightedText>` components. As a result, features such as event handlers (`onClick`, `onChange`, etc.), refs, and controlled inputs in the `text` prop will not work in `<HighlightedText>`. For interactive content, use the <a href="/docs/usage/useSpeech" target="_blank">`useSpeech` hook</a> instead.

```tsx
import React, { useMemo } from "react";
import Speech, { HighlightedText } from "react-text-to-speech";

export default function App() {
  const text = useMemo(
    () => (
      <div>
        <span>This library is awesome!</span>
        <div>
          <div>
            <span>It can also read and highlight </span>
            <span>nested text... </span>
            <span>
              <span>upto </span>
              <span>
                any
                <span> level.</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    ),
    [],
  );

  return (
    <>
      <Speech id="unique-id" text={text} highlightText={true} />
      <HighlightedText id="unique-id" />
    </>
  );
}
```

## Handling Errors and Events

```tsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  return (
    <Speech
      text="This library can handle different errors and speech events!"
      onError={(error) => alert(error.message)}
      onStart={() => console.log("Speech Started")}
      onResume={() => console.log("Speech Resumed")}
      onPause={() => console.log("Speech Paused")}
      onStop={() => console.log("Speech Stopped")}
      onBoundary={(event) => console.log("Speech Progress:", event.progress)}
      onQueueChange={(queue) => console.log("Queue updated:", queue)}
    />
  );
}
```

## Multiple Instance Usage

Like `useSpeech` hook, `<Speech>` can handle multiple speech instances. <a href="/docs/usage/useSpeech#multiple-instance-usage" target="_blank">Refer Here</a>

```tsx
import React, { useMemo } from "react";
import Speech from "react-text-to-speech";

function NewsItem({ title, desc }) {
  const text = useMemo(
    () => (
      <>
        <h4 style={{ margin: 0 }}>{title}</h4>
        <div style={{ marginBottom: "0.5rem" }}>{desc}</div>
      </>
    ),
    [title, desc],
  );
  return (
    <div>
      {text}
      <Speech text={text} />
    </div>
  );
}

export default function App() {
  const news = [
    { id: "1", title: "First random title.", desc: "First random description." },
    { id: "2", title: "Second random title.", desc: "Second random description." },
    { id: "3", title: "Third random title.", desc: "Third random description." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      {news.map(({ id, title, desc }) => (
        <NewsItem key={id} title={title} desc={desc} />
      ))}
    </div>
  );
}
```

## Full Customization

Using Function as Children (FaC) in `<Speech>`:

```tsx
import React from "react";
import Speech from "react-text-to-speech";

export default function App() {
  return (
    <Speech text="This is a fully customized speech component." pitch={1.5} rate={2} volume={0.5} voiceURI="Microsoft Heera - English (India)">
      {({ speechStatus, isInQueue, start, pause, stop }) => (
        <div style={{ display: "flex", columnGap: "0.5rem" }}>
          {speechStatus !== "started" ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
          <button onClick={stop}>Stop</button>
        </div>
      )}
    </Speech>
  );
}
```

> You can optionally enable inline processing controls using the `enableDirectives` option - useful for dynamically adjusting pitch, rate, volume, and other speech parameters, or inserting pauses directly within your text content.<br />
> Example: `[[rate=1.2]] This is spoken faster.`<br />
> See [Directives](/docs/usage/directives) for all supported options.

## Usage with Markdown

Like `useSpeech` hook, `<Speech>` can also be used along with markdown. <a href="/docs/usage/useSpeech#usage-with-markdown" target="_blank">Refer Here</a>

```tsx title="Custom MarkdownText Component"
import { useState } from "react";
import { useRemark } from "react-remarkify";
import Speech, { HighlightedText } from "react-text-to-speech";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

function MarkdownText({ children }) {
  const [showMarkdown, setShowMarkdown] = useState(true);
  const reactContent = useRemark({
    markdown: children,
    rehypePlugins: [rehypeRaw, rehypeSanitize],
    remarkPlugins: [remarkGfm],
    remarkToRehypeOptions: { allowDangerousHtml: true },
  });
  const text = showMarkdown ? reactContent : children;

  return (
    <div className="flex flex-col space-y-3 p-4">
      <div className="flex w-fit flex-col items-center space-y-2">
        <button className="rounded-sm border-2 border-black bg-gray-100 px-1 py-0.5 text-sm" onClick={() => setShowMarkdown((prev) => !prev)}>
          Toggle Markdown
        </button>
        <Speech id="unique-id" text={text} highlightText={true} />
      </div>
      <HighlightedText
        id="unique-id"
        className="prose prose-th:w-screen prose-th:max-w-full prose-th:border prose-td:border prose-th:p-2 prose-td:p-2 prose-ul:whitespace-normal prose-ol:whitespace-normal prose-headings:my-2 prose-pre:my-2 prose-table:my-2 prose-table:block prose-table:overflow-x-auto grid max-w-full grid-cols-1 whitespace-pre-wrap break-words *:my-0 *:w-full *:whitespace-pre-wrap"
      />
    </div>
  );
}

export default function App() {
  return <MarkdownText>{`# react-text-to-speech\nThis library is **awesome** and works with _Markdown_ + ReactNode!`}</MarkdownText>;
}
```

## API Reference

Check the [API Reference](/docs/api/speech) for more details.
