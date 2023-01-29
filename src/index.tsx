import React, { CSSProperties, useEffect, useState } from 'react'

/** @defaultValue null */
type Id = string | number | null

type Button = JSX.Element | string

/** @defaultValue 5 */
type Number = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

/** @defaultValue 10 */
type Volume = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

type Props = { id: Id, text: string, style: CSSProperties, startBtn: Button, stopBtn: Button, pitch: Number, rate: Number, volume: Volume }

function Speech({ id = null, text, style = {}, startBtn = <button>Start Speech</button>, stopBtn = <button>Stop Speech</button >, pitch = 5, rate = 5, volume = 10 }: Props): JSX.Element {
    const [speechIcon, setSpeechIcon] = useState<Button>(startBtn)
    const [speechId, setSpeechId] = useState<Id>(null)

    function newSpeech() {
        setSpeechId(id)
        setSpeechIcon(stopBtn)
        // below is the method to speak:
        // window.speechSynthesis.speak(new window.speechSynthesisUtterance(text to be spoken))
        const utterance = new window.SpeechSynthesisUtterance(text?.replace(/\s/g, ' '))
        utterance.pitch = pitch / 5
        utterance.rate = rate / 5
        utterance.volume = volume / 10
        utterance.onpause = () => {
            setSpeechId(null);
            setSpeechIcon(startBtn);
        }
        window.speechSynthesis.speak(utterance);
    }

    function speech() {
        if (!window.speechSynthesis) return alert('Browser not supported! Try some other browser')
        // window.speechSynthesis is an API which enables to convert text into speech
        const speaking = window.speechSynthesis.speaking; // window.speechSynthesis.speaking checks it window.speechSynthesis is speaking or not
        if (!speaking) return newSpeech()
        window.speechSynthesis.pause();
        setTimeout(() => {
            window.speechSynthesis.cancel();
            if (speechId !== id) return newSpeech();
            setSpeechId(null);
            setSpeechIcon(startBtn);
        }, 100);
    }

    useEffect(() => () => window.speechSynthesis?.cancel(), [])

    return <span role='button' style={style} onClick={speech}>{speechIcon}</span>
}

export default Speech