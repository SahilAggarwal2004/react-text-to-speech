import React, { useEffect, useState } from 'react';
function Speech({ id = null, text, style = {}, startBtn = React.createElement("button", null, "Start Speech"), stopBtn = React.createElement("button", null, "Stop Speech"), pitch = 5, rate = 5, volume = 10 }) {
    const [speechIcon, setSpeechIcon] = useState(startBtn);
    const [speechId, setSpeechId] = useState(null);
    function newSpeech() {
        setSpeechId(id);
        setSpeechIcon(stopBtn);
        const utterance = new SpeechSynthesisUtterance(text === null || text === void 0 ? void 0 : text.replace(/\s/g, ' '));
        utterance.pitch = pitch / 5;
        utterance.rate = rate / 5;
        utterance.volume = volume / 10;
        speechSynthesis.speak(utterance);
        utterance.onend = () => {
            setSpeechId(null);
            setSpeechIcon(startBtn);
        };
    }
    function speech() {
        const speaking = speechSynthesis.speaking;
        if (!speaking)
            return newSpeech();
        speechSynthesis.cancel();
        if (speechId !== id)
            return newSpeech();
        setSpeechId(null);
        setSpeechIcon(startBtn);
    }
    useEffect(() => { speechSynthesis.cancel(); }, []);
    return React.createElement("span", { role: 'button', style: style, onClick: speech }, speechIcon);
}
export default Speech;
