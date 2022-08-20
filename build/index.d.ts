import { CSSProperties } from 'react';
declare type Id = string | number | null;
declare type Button = JSX.Element | string;
declare type Props = {
    id?: Id;
    text: string;
    style?: CSSProperties;
    startBtn?: Button;
    stopBtn?: Button;
};
declare function Speech({ id, text, style, startBtn, stopBtn }: Props): JSX.Element;
export default Speech;
