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

Like `useSpeech` hook, the `<Speech>` component can also be used to highlight text. [Refer here](/docs/usage/useSpeech#highlight-text)

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
    []
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

Like `useSpeech` hook, the `<Speech>` component can also be used to handle multiple speech instances. [Refer here](/docs/usage/useSpeech#multiple-instance-usage)

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
    [title, desc]
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

## API Reference

Check the [API Reference](/docs/api/speech) for more details.
