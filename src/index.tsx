import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, useEffect, useState } from 'react'
import { HiMiniStop, HiVolumeOff, HiVolumeUp } from './icons.js'

export type Button = JSX.Element | string | null

export type SpeechStatus = 'started' | 'paused' | 'stopped'

export interface ChildrenOptions {
    speechStatus?: SpeechStatus
    start?: Function
    pause?: Function
    stop?: Function
}

export type Children = (childrenOptions: ChildrenOptions) => ReactNode

export type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface SpeechProps {
    text: string
    pitch?: number
    rate?: number
    volume?: number
    lang?: string
    startBtn?: Button
    pauseBtn?: Button
    stopBtn?: Button
    useStopOverPause?: boolean
    onError?: Function
    children?: Children
    props?: Props
}

export type { IconProps } from './icons.js'

function Speech({
    text, pitch = 1, rate = 1, volume = 1, lang = '',
    startBtn = <HiVolumeUp />, pauseBtn = <HiVolumeOff />, stopBtn = <HiMiniStop />, useStopOverPause,
    onError = () => alert('Browser not supported! Try some other browser.'),
    children, props = {}
}: SpeechProps) {
    const [speechStatus, setSpeechStatus] = useState<SpeechStatus>('stopped')
    const [useStop, setUseStop] = useState<boolean>();

    const pause = () => speechStatus !== 'paused' && window.speechSynthesis?.pause()
    const stop = () => speechStatus !== 'stopped' && window.speechSynthesis?.cancel()

    function start() {
        const synth = window.speechSynthesis
        if (!synth) return onError()
        setSpeechStatus('started')
        if (speechStatus === 'paused') return synth.resume()
        if (synth.speaking) synth.cancel()
        const utterance = new window.SpeechSynthesisUtterance(text?.replace(/\s/g, ' '))
        utterance.pitch = pitch
        utterance.rate = rate
        utterance.volume = volume
        utterance.lang = lang
        function setStopped() {
            setSpeechStatus('stopped')
            utterance.onpause = null;
            utterance.onend = null;
            utterance.onerror = null;
            if (synth.paused) synth.cancel()
        }
        utterance.onpause = () => setSpeechStatus('paused');
        utterance.onend = setStopped;
        utterance.onerror = setStopped;
        synth.speak(utterance);
    }

    function speech() {
        if (speechStatus !== 'started') start()
        else if (useStop === false) pause()
        else stop()
    }

    useEffect(() => {
        setUseStop(useStopOverPause ?? ((navigator as any).userAgentData?.mobile || false))
        window.speechSynthesis?.cancel()
    }, [])

    return typeof children === 'function' ? children({ speechStatus, start, pause, stop }) : <div style={{ display: 'flex', columnGap: '1rem' }} {...props}>
        <span role='button' onClick={speech}>{speechStatus !== 'started' ? startBtn : useStop === false ? pauseBtn : stopBtn}</span>
        {useStop === false && stopBtn && <span role='button' onClick={stop}>{stopBtn}</span>}
    </div>
}

export default Speech