# Directives

Directives are a powerful feature in react-text-to-speech that allow you to control how text is interpreted during processing. By embedding special commands directly in your content, you can dynamically adjust aspects like delay, pitch, rate, volume, language, voice, and more.

## Directive Syntax

Directives follow a simple syntax:

```
[[key=value]]
```

- `key`: The name of the parameter you want to control (e.g., `delay`, `pitch`).
- `value`: The value you want to set for that parameter.

Directives are enclosed in double square brackets `[[]]` and are case-sensitive. They can be placed anywhere within the text string. It's recommended to add a space before and after the directive for better readability, though it's not strictly required.

## Supported Directives

Here's a list of the directives currently supported by **react-text-to-speech**:

### `[[delay=milliseconds]]`

Introduces a pause before the subsequent content is processed.

- `milliseconds`: The duration of the pause in milliseconds (a number).

**Example:**

```
This will have a [[delay=500]] half-second pause.
```

### `[[pitch=number | default]]`

Sets the pitch of the spoken text.

- `number`: A number between 0 and 2.
- `default`: Resets the pitch to the default value (1).

**Example:**

```
[[pitch=0.5]] This is a lower pitched voice. [[pitch=1.5]] This is a higher pitched voice. [[pitch=default]] This is the default pitch.
```

### `[[rate=number | default]]`

Sets the speed of the spoken text.

- `number`: A numeric value that adjusts the rate. Values less than 1 are slower, and values greater than 1 are faster.
- `default`: Resets the rate to the default value (1).

**Example:**

```
[[rate=2]] This is faster speech rate. [[rate=0.5]] This is slower speech rate. [[rate=default]] This is the default rate.
```

### `[[volume=number | default]]`

Sets the volume.

- `number`: A number between 0 and 1.
- `default`: Resets the volume to the default value (1).

**Example:**

```
[[volume=0.7]] This is quieter voice. [[volume=default]] This is the default volume.
```

### `[[lang=string | default]]`

Sets the language context.

- `string`: A valid BCP 47 language tag (e.g., "en-US", "es-ES", "fr-FR").
- `default`: Resets the language to the default language.

**Example:**

```
This is [[lang=es-ES]] Spanish text. [[lang=default]] This is the default language.
```

### `[[voice=voiceURI | default]]`

Sets the voice to be used.

- `voiceURI`: The `voiceURI` of the desired voice. You can obtain a list of available `voiceURI`s using the `useVoices` hook.
- `default`: Resets the voice to the default voice.

**Example:**

```
This is a [[voice=Microsoft David - English (United States)]] different voice. [[voice=default]] This is the default voice.
```

### `[[skip=boolean]]`

Skips the processing of the following content while `skip=true` is active.

- `true`: Begins skipping any content that follows.
- `false`: Resumes processing of content.

**Example:**

```
This will be processed. [[skip=true]] This will be skipped. [[skip=false]] This will be processed again.
```

## Behavior and Scope

- **Immediate Application:** Directives are applied as soon as they are encountered during content processing.
- **Scoped Effect:** The effect of a directive applies to the content that follows it. If another directive for the same parameter is encountered later, it will override the previous one.
- **Chunk Boundaries:** Directives are processed within the text chunks that are handled by the system. This means a directive in one chunk can affect subsequent chunks if not overridden.

## Code Example

```tsx
import React, { useMemo } from "react";
import { useSpeech } from "react-text-to-speech";

export default function App() {
  const text = useMemo(
    () => (
      <>
        <p>This is the default voice.</p>
        <p>This is a [[pitch=1.5]][[rate=0.7]] higher and slower voice.</p>
        <p>[[delay=1000]] A one-second pause before this sentence.</p>
        <p>[[lang=en-IN]] Hello India! [[lang=default]] Hello World!</p>
        <p>This is [[volume=0.6]] quieter, [[volume=default]] normal volume, and [[volume=0.2]] very quiet.</p>
        <p>This is spoken. [[skip=true]] This is skipped. [[skip=false]] This is spoken again.</p>
      </>
    ),
    [],
  );

  const { Text, start, speechStatus, stop } = useSpeech({ text, enableDirectives: true });

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <Text />
      <div style={{ display: "flex", columnGap: "0.5rem" }}>
        {speechStatus !== "started" ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
        <button onClick={stop}>Stop</button>
      </div>
    </div>
  );
}
```
