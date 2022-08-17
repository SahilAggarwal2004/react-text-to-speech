import React, { useState } from 'react';
function Speech(_a) {
    var id = _a.id, text = _a.text, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.startBtn, startBtn = _c === void 0 ? React.createElement("button", null, "Start Speech") : _c, _d = _a.stopBtn, stopBtn = _d === void 0 ? React.createElement("button", null, "Stop Speech") : _d;
    var _e = useState(startBtn), speechIcon = _e[0], setSpeechIcon = _e[1];
    var _f = useState(null), speechId = _f[0], setSpeechId = _f[1];
    function newSpeech(clickId) {
        setSpeechId(clickId);
        setSpeechIcon(stopBtn);
        var utterance = new SpeechSynthesisUtterance(text.replace(/\s/g, ' '));
        speechSynthesis.speak(utterance);
        utterance.onend = function () {
            setSpeechId(null);
            setSpeechIcon(startBtn);
        };
    }
    function speech(clickId) {
        var speaking = speechSynthesis.speaking;
        if (!speaking)
            return newSpeech(clickId);
        speechSynthesis.cancel();
        if (speechId !== clickId)
            return newSpeech(clickId);
        setSpeechId(null);
        setSpeechIcon(startBtn);
    }
    return React.createElement("span", { role: 'button', style: style, onClick: function () { return speech(id); } }, speechIcon);
}
export default Speech;
