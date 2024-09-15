# useSpeech Hook

## API Reference

Here is the full API for the `useSpeech` hook, these options can be passed as paramerters to the hook:
| Parameter | Type | Required | Default | Description |
| - | - | - | - | - |
| `text` | `string \| JSX.Element` | Yes | - | It contains the text to be spoken by **Web Speech API**. |
| `pitch` | `number (0 to 2)` | No | 1 | The pitch at which the utterance will be spoken. |
| `rate` | `number (0.1 to 10)` | No | 1 | The speed at which the utterance will be spoken. |
| `volume` | `number (0 to 1)` | No | 1 | The volume at which the utterance will be spoken. |
| `lang` | `string` | No | - | The language in which the utterance will be spoken. |
| `voiceURI` | `string \| string[]` | No | - | The voice using which the utterance will be spoken. If provided an array, further voices will be used as fallback if initial voices are not found. See possible values [here](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices). |
| `autoPlay` | `boolean` | No | `false` | Automatically starts speech when the component loads or when `text` changes, if set to true. |
| `preserveUtteranceQueue` | `boolean` | No | `false` | Whether to maintain a queue of speech utterances (true) or clear previous utterances (false). |
| `highlightText` | `boolean` | No | `false` | Whether the words in the text should be highlighted as they are read or not. |
| `highlightProps` | `React.DetailedHTMLProps` | No | - | Props to customize the highlighted word, typically applied to the `<mark>` tag. |
| `maxChunkSize` | `number (minimum 50)` | No | 250 | Specifies the maximum size of each text chunk when dividing the text. This helps manage the Web Speech API's text limit, avoiding issues related to large text inputs. |
| `onError` | [`SpeechSynthesisErrorHandler`](#speechsynthesiserrorhandler) | No | `console.error` | Function to be executed if browser doesn't support **Web Speech API**. |
| `onStart` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed when speech utterance is started. |
| `onResume` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed when speech utterance is resumed. |
| `onPause` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed when speech utterance is paused. |
| `onStop` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed when speech utterance is stopped. |
| `onBoundary` | [`SpeechSynthesisEventHandler`](#speechsynthesiseventhandler) | No | - | Function to be executed at specified boundaries during speech synthesis. |
| `onQueueChange` | [`QueueChangeEventHandler`](#queuechangeeventhandler) | No | - | Function to be executed whenever `queue` changes. |

## Types

### SpeechSynthesisErrorHandler

```typescript
type SpeechSynthesisErrorHandler = (error: Error) => any;
```

### SpeechSynthesisEventHandler

```typescript
type SpeechSynthesisEventHandler = (event: SpeechSynthesisEvent) => any;
```

### QueueChangeEventHandler

```typescript
type SpeechUtterancesQueue = SpeechSynthesisUtterance[];
type QueueChangeEventHandler = (queue: SpeechUtterancesQueue) => any;
```
