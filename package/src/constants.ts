export const lineDelimiter = "\n";

const punctuationDelimiters = [".", "?", "!"];

export const spaceDelimiter = " ";

export const chunkDelimiters = [lineDelimiter, ...punctuationDelimiters.map((delimiter) => delimiter + spaceDelimiter), spaceDelimiter];

export const defaults = { pitch: 1, rate: 1, volume: 1, lang: "", voice: "" };

export const desktopChunkSize = 1000;

export const directiveRegex = /\[\[(\w+)=([^\]=]+)\]\] ?/;

export const directiveRegexGlobal = new RegExp(directiveRegex.source, "g");

export const minChunkSize = 50;

export const mobileChunkSize = 250;

export const symbolMapping = { "<": "lessthan", ">": "greaterthan" };

export const sanitizeRegex = new RegExp(`[${Object.keys(symbolMapping).join("")}]|(&[^\s;]+);`, "g");

export const specialSymbol = "\u00A0";

export const sanitizedRegex = new RegExp(` (?:${Object.values(symbolMapping).join("|")})${specialSymbol}`, "g");

export const sentenceDelimiters = [lineDelimiter, ...punctuationDelimiters];

export const startToken = "\u200B";
