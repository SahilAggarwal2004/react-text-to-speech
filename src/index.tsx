import React, { CSSProperties, useState } from 'react'

type Button = JSX.Element | string

type Props = { id?: any, text: string, style?: CSSProperties, startBtn?: Button, stopBtn?: Button }

function Speech({ id, text, style = {}, startBtn = <button>Start Speech</button>, stopBtn = <button>Stop Speech</button > }: Props): JSX.Element {
    const [speechIcon, setSpeechIcon] = useState<Button>(startBtn)
    const [speechId, setSpeechId] = useState<any>(null)

    function newSpeech(clickId: any) {
        setSpeechId(clickId)
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

    function speech(clickId: any) {
        // speechSynthesis is an API which enables to convert text into speech
        const speaking = speechSynthesis.speaking; // speechSynthesis.speaking checks it speechSynthesis is speaking or not
        if (!speaking) return newSpeech(clickId)
        speechSynthesis.cancel()
        if (speechId !== clickId) return newSpeech(clickId)
        setSpeechId(null)
        setSpeechIcon(startBtn)
    }

    return <span role='button' style={style} onClick={() => speech(id)}>{speechIcon}</span>
}

export default Speech