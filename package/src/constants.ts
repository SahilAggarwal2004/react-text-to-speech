import { SpeechSynthesisUtteranceKeys } from "./types.js";

export const desktopChunkSize = 1000;

export const minChunkSize = 50;

export const mobileChunkSize = 250;

export const specialSymbol = "\u00A0";

export const symbolMapping = { "<": "lessthan", ">": "greaterthan" };

export const sanitizeRegex = new RegExp(`[${Object.keys(symbolMapping).join("")}]|(&[^\s;]+);`, "g");

const utteranceProperties: SpeechSynthesisUtteranceKeys = ["lang", "voice", "volume", "rate", "pitch"];

const utteranceEvents: SpeechSynthesisUtteranceKeys = ["onstart", "onend", "onerror", "onpause", "onresume", "onmark", "onboundary"];

export const utterancePropertiesAndEvents = utteranceProperties.concat(utteranceEvents);
