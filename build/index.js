import React, { useEffect, useState } from 'react';
function Speech({ id = null, text, style = {}, startBtn = React.createElement("button", null, "Start Speech"), stopBtn = React.createElement("button", null, "Stop Speech"), pitch = 5, rate = 5, volume = 10, lang = '' }) {
    const [speechIcon, setSpeechIcon] = useState(startBtn);
    const [speechId, setSpeechId] = useState(null);
    function reset() {
        setSpeechId(null);
        setSpeechIcon(startBtn);
    }
    function newSpeech() {
        setSpeechId(id);
        setSpeechIcon(stopBtn);
        const utterance = new window.SpeechSynthesisUtterance(text === null || text === void 0 ? void 0 : text.replace(/\s/g, ' '));
        utterance.pitch = pitch / 5;
        utterance.rate = rate / 5;
        utterance.volume = volume / 10;
        utterance.lang = lang;
        utterance.onend = reset;
        utterance.onerror = reset;
        window.speechSynthesis.speak(utterance);
    }
    function speech() {
        if (!window.speechSynthesis)
            return alert('Browser not supported! Try some other browser');
        if (!window.speechSynthesis.speaking)
            return newSpeech();
        window.speechSynthesis.cancel();
        speechId === id ? reset() : newSpeech();
    }
    useEffect(() => { var _a; (_a = window.speechSynthesis) === null || _a === void 0 ? void 0 : _a.cancel(); }, []);
    return React.createElement("span", { role: 'button', style: style, onClick: speech }, speechIcon);
}
export default Speech;
