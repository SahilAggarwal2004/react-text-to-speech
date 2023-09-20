import { CSSProperties } from 'react';
export type Id = string | number | null;
export type Button = JSX.Element | string;
export type Number = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Volume = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export interface SpeechProps {
    id: Id;
    text: string;
    style: CSSProperties;
    startBtn: Button;
    stopBtn: Button;
    pitch: Number;
    rate: Number;
    volume: Volume;
    lang: string;
}
declare function Speech({ id, text, style, startBtn, stopBtn, pitch, rate, volume, lang }: SpeechProps): JSX.Element;
export default Speech;
