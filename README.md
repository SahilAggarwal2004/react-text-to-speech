# react-text-to-speech

An easy to use react component for the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).

It is as easy as to import a React component!

## Features

- Text-to-speech
- Easy to use
- Handles multiple speech instances easily. See [Advanced Usage](#Advanced-Usage)


## Installation

To install react-text-to-speech

```bash
  # with npm:
  npm install react-text-to-speech --save

  # with yarn:
  yarn add react-text-to-speech
```

## Usage

When you use the `<Speech>` component of `react-text-to-speech`, initially your user will see the `startBtn` and when the user clicks on it, the speech instance will start and the user will be able to see the `stopBtn` which will stop the speech instance if the user click on it.

#### Basic Usage
```javascript
import React from 'react'
import Speech from 'react-text-to-speech'

function App() {
    return <Speech text='This library is awesome!' />
}
```

#### Advanced Usage

This is the use case where `react-text-to-speech` outshines the other text-to-speech libraries.

Let's assume that you fetch news from any News API and the API returns 3 news in response as shown below. Now if the user clicks on `startBtn` of #1 news (assuming # as id) and then after some time, clicks on `startBtn` on #2 news before the speech instance of #1 news ends, then `react-text-to-speech` will not just stop the #1 news speech instance and start the #2 news speech instance, but will also convert the `stopBtn` of #1 news to `startBtn`, thus avoiding any error.

```javascript
import React from 'react'
import Speech from 'react-text-to-speech'

function App() {
    // 'news' holds response from some News API
    const news = [
        { id: '1', title: 'First random title', desc: 'First random description' },
        { id: '2', title: 'Second random title', desc: 'Second random description' },
        { id: '3', title: 'Third random title', desc: 'Third random description' },
    ]
    const startBtn = <button class='my-start-btn'>Start Speech</button>
    const stopBtn = <button class='my-stop-btn'>Stop Speech</button>

    return <>
        {news.map(({ id, title, desc }) => <div>
            <h4>{title}</h4>
            <div>{desc}</div>
            <Speech id={id} text={title + '. ' + desc} startBtn={startBtn} stopBtn={stopBtn} />
        </div>)}
    </>
}
```
## Demo

https://github.com/SahilAggarwal2004/cloudnotes/blob/master/src/components/NoteItem.js


## Speech Component API Reference

Here is the full API for the `<Speech>` component, these properties can be set on an instance of Speech:

| Parameter  | Type                  | Required | Default                         | Description                                                                                                                                                                                                                                  |
| -          | -                     | -        | -                               | -                                                                                                                                                                                                                                            |
| `id`       | `string`              | No       | null                          | Required when there are multiple speech instances. When a speech instance is started, the already running speech instance will stop and the speech button will automatically be changed to the `startBtn` based on the `id` of the instance. |
| `text`     | `string`              | Yes      | -                               | It contains the text to be spoken when `startBtn` is clicked.                                                                                                                                                                                |
| `style`    | `React.CSSProperties` | No       | {}                              | The style attribute of `JSX.Element`.                                                                                                                                                                                                        |
| `startBtn` | `JSX.Element`         | No       | `<button>Start Speech</button>` | Button to start the speech instance.                                                                                                                                                                                                         |
| `stopBtn`  | `JSX.Element`         | No       | `<button>Stop Speech</button>`  | Button to stop the speech instance.                                                                                                                                                                                                          |

## Used By

This project is used by:

- [CloudNotes](https://cloudnotesweb.netlify.app/)
- [NewsDose](https://newsdoseweb.netlify.app/)


## Author

[Sahil Aggarwal](https://www.github.com/SahilAggarwal2004)