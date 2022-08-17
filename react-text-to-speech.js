/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'

export default function Speech({ id, text, style = {}, startBtn = <button>Start Speech</button>, stopBtn = <button>Stop Speech</button> }) {
    const [speechIcon, setSpeechIcon] = useState(startBtn)
    const [speechId, setSpeechId] = useState()

    function newSpeech(clickId) {
        setSpeechId(clickId)
        setSpeechIcon(stopBtn)
        const utterance = new SpeechSynthesisUtterance(text.replace(/\s/g, ' '))
        speechSynthesis.speak(utterance)
        utterance.onend = () => {
            setSpeechId()
            setSpeechIcon(startBtn)
        }
    }

    function speech(clickId) {
        const speaking = speechSynthesis.speaking;
        if (!speaking) return newSpeech(clickId)
        speechSynthesis.cancel()
        if (speechId !== clickId) return newSpeech(clickId)
        setSpeechId()
        setSpeechIcon(startBtn)
    }

    return <span role='button' style={style} onClick={() => speech(id)}>{speechIcon}</span>
}