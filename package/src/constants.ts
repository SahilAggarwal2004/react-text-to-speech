import { SpeechSynthesisUtteranceKeys } from "./types.js";

export const lineDelimiter = "\n";

const punctuationDelimiters = [".", "?", "!"];

export const spaceDelimiter = " ";

export const chunkDelimiters = [lineDelimiter, ...punctuationDelimiters.map((delimiter) => delimiter + spaceDelimiter), spaceDelimiter];

export const desktopChunkSize = 1000;

export const minChunkSize = 50;

export const mobileChunkSize = 250;

export const symbolMapping = { "<": "lessthan", ">": "greaterthan" };

export const sanitizeRegex = new RegExp(`[${Object.keys(symbolMapping).join("")}]|(&[^\s;]+);`, "g");

export const sentenceDelimiters = [lineDelimiter, ...punctuationDelimiters];

export const spaceDelimiters = [lineDelimiter, spaceDelimiter];

export const specialSymbol = "\u00A0";

const utteranceEvents: SpeechSynthesisUtteranceKeys = ["onstart", "onend", "onerror", "onpause", "onresume", "onmark", "onboundary"];

const utteranceProperties: SpeechSynthesisUtteranceKeys = ["lang", "voice", "volume", "rate", "pitch"];

export const utterancePropertiesAndEvents = utteranceProperties.concat(utteranceEvents);
