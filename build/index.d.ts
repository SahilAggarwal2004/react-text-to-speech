import { CSSProperties } from 'react';
type Id = string | number | null;
type Button = JSX.Element | string;
type Number = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type Volume = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type Props = {
    id: Id;
    text: string;
    style: CSSProperties;
    startBtn: Button;
    stopBtn: Button;
    pitch: Number;
    rate: Number;
    volume: Volume;
};
declare function Speech({ id, text, style, startBtn, stopBtn, pitch, rate, volume }: Props): JSX.Element;
export default Speech;
