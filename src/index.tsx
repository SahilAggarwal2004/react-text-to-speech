import React, { CSSProperties, useState } from 'react'

type Id = string | number | null

type Button = JSX.Element | string

type Props = { id?: Id, text: string, style?: CSSProperties, startBtn?: Button, stopBtn?: Button }

function Speech({ id = null, text, style = {}, startBtn = <button>Start Speech</button>, stopBtn = <button>Stop Speech</button > }: Props): JSX.Element {
    const [speechIcon, setSpeechIcon] = useState<Button>(startBtn)
    const [speechId, setSpeechId] = useState<Id>(null)

    function newSpeech() {
        setSpeechId(id)
        setSpeechIcon(stopBtn)
        // below is the method to speak:
        // speechSynthesis.speak(new SpeechSynthesisUtterance(text to be spoken))
        const utterance = new SpeechSynthesisUtterance(text?.replace(/\s/g, ' '))
        speechSynthesis.speak(utterance)
        utterance.onend = () => {
            setSpeechId(null)
            setSpeechIcon(startBtn)
        }
    }

    function speech() {
        // speechSynthesis is an API which enables to convert text into speech
        const speaking = speechSynthesis.speaking; // speechSynthesis.speaking checks it speechSynthesis is speaking or not
        if (!speaking) return newSpeech()
        speechSynthesis.cancel()
        if (speechId !== id) return newSpeech()
        setSpeechId(null)
        setSpeechIcon(startBtn)
    }

    return <span role='button' style={style} onClick={speech}>{speechIcon}</span>
}

export default Speech