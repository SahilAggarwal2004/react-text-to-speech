import React, { DetailedHTMLProps, HTMLAttributes, ReactNode, useEffect, useState } from 'react'
import { HiMiniStop, HiVolumeOff, HiVolumeUp } from './icons.js'

export type Button = JSX.Element | string | null

export type SpeechStatus = 'started' | 'paused' | 'stopped'

export interface ChildrenOptions {
    speechStatus?: SpeechStatus
    start?: () => void
    pause?: () => void
    stop?: () => void
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
    onError?: Function
    children?: Children
    props?: Props
}

export type { IconProps } from './icons.js'

function Speech({
    text, pitch = 1, rate = 1, volume = 1, lang = '',
    startBtn = <HiVolumeUp />, pauseBtn = <HiVolumeOff />, stopBtn = <HiMiniStop />,
    onError = () => alert('Browser not supported! Try some other browser.'),
    children, props = {}
}: SpeechProps) {
    const [speechStatus, setSpeechStatus] = useState<SpeechStatus>('stopped')

    function pause() {
        setSpeechStatus('paused')
        window.speechSynthesis?.pause()
    }

    function start() {
        const synth = window.speechSynthesis
        if (!synth) return onError()
        setSpeechStatus('started')
        if (synth.paused) return synth.resume()
        if (synth.speaking) synth.cancel()
        const utterance = new window.SpeechSynthesisUtterance(text?.replace(/\s/g, ' '))
        utterance.pitch = pitch
        utterance.rate = rate
        utterance.volume = volume
        utterance.lang = lang
        utterance.onend = () => stop();
        utterance.onerror = () => stop();
        synth.speak(utterance);
    }

    function stop(manual?: boolean) {
        setSpeechStatus('stopped')
        if (manual) window.speechSynthesis?.cancel();
    }

    function speech() {
        if (speechStatus === 'started') pause()
        else start()
    }

    useEffect(() => { window.speechSynthesis?.cancel() }, [])

    return typeof children === 'function' ? children({ speechStatus, start, pause, stop }) : <div style={{ display: 'flex', columnGap: '1rem' }} {...props}>
        <span role='button' onClick={speech}>{speechStatus === 'started' ? pauseBtn : startBtn}</span>
        {stopBtn && <span role='button' onClick={() => stop(true)}>{stopBtn}</span>}
    </div>
}

export default Speech