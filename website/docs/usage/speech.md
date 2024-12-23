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

Like `useSpeech` hook, the `<Speech>` component can also be used to highlight text. <a href="/docs/usage/useSpeech#highlight-text" target="_blank">Refer Here</a>

With `<Speech>` component, `<HighlightedText>` component exported by **react-text-to-speech** can be used to display the highlighted text.

**NOTE:** `id` of both `<Speech>` and `<HighlightedText>` should be same to link them together. Additionally, `text` should be included as children within the `<HighlightedText>` component as demonstrated below. This helps prevent initial [layout shift](https://web.dev/articles/cls) issues that may arise while **react-text-to-speech** links both components based on their respective `id`. It's important to note that the children added in this manner are temporary and will be replaced once the components are successfully linked.

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
      <HighlightedText id="unique-id">{text}</HighlightedText>
    </>
  );
}
```

## Multiple Instance Usage

Like `useSpeech` hook, the `<Speech>` component can also be used to handle multiple speech instances. <a href="/docs/usage/useSpeech#multiple-instance-usage" target="_blank">Refer Here</a>

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
  // 'news' holds response from some News API
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

Using Function as Children(FaC) in the `<Speech>` component.

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

## Usage with Markdown

Like `useSpeech` hook, the `<Speech>` component can also be used along with markdown. <a href="/docs/usage/useSpeech#usage-with-markdown" target="_blank">Refer Here</a>

```tsx title="Custom MarkdownText Component"
import { useState } from "react";
import { useRemark } from "react-remarkify";
import Speech, { HighlightedText } from "react-text-to-speech";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

function MarkdownText({ text }) {
  const [showMarkdown, setShowMarkdown] = useState(true);
  const reactContent = useRemark({
    markdown: text,
    rehypePlugins: [rehypeRaw, rehypeSanitize],
    remarkPlugins: [remarkGfm],
    remarkToRehypeOptions: { allowDangerousHtml: true },
  });
  const mdText = showMarkdown ? reactContent : text;

  return (
    <div className="flex flex-col space-y-3 p-4 text-justify">
      <div className="flex w-fit flex-col items-center space-y-2">
        <button className="rounded-sm border-2 border-black bg-gray-100 px-1 py-0.5 text-sm" onClick={() => setShowMarkdown((prev) => !prev)}>
          Toggle Markdown
        </button>
        <Speech id="unique-id" text={mdText} highlightText={true} />
      </div>
      <HighlightedText
        id="unique-id"
        className="prose max-w-[90vw] overflow-x-scroll whitespace-pre-wrap break-words leading-snug *:my-0 *:w-max *:max-w-full prose-headings:my-1 prose-pre:w-full prose-li:my-0 prose-table:w-full prose-table:table-fixed prose-th:border prose-th:p-2 prose-td:border prose-td:p-2"
      >
        {mdText}
      </HighlightedText>
    </div>
  );
}

export default function App() {
  return <MarkdownText text={`# react-text-to-speech\nThis library is awesome`} />;
}
```

## API Reference

Check the [API Reference](/docs/api/speech) for more details.
