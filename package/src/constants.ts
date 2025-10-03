export const lineDelimiter = "\n";

const punctuationDelimiters = [".", "?", "!"];

export const spaceDelimiter = " ";

export const chunkDelimiters = [lineDelimiter, ...punctuationDelimiters.map((delimiter) => delimiter + spaceDelimiter), spaceDelimiter];

export const defaults = { pitch: 1, rate: 1, volume: 1, lang: "", voice: "" };

export const desktopChunkSize = 1000;

export const directiveRegex = /\[\[(\w+)=([^\]=]+)\]\] ?/;

export const directiveRegexGlobal = new RegExp(directiveRegex.source, "g");

export const highlightedTextIdSuffix = "-highlighted-text";

export const idPrefix = "rtts-";

export const iosRegex = /iPhone|iPad|iPod/i;

export const lineSplitRegex = /(.*?)(\n)(.*)/;

export const minChunkSize = 50;

export const mobileChunkSize = 250;

export const mobileRegex = /Android|webOS|BlackBerry|IEMobile|Opera Mini/i;

export const symbolMapping = { "<": "lessthan", ">": "greaterthan" };

export const sanitizeRegex = new RegExp(`[${Object.keys(symbolMapping).join("")}]|(&[^\s;]+);`, "g");

export const specialSymbol = "\u00A0";

export const sentenceDelimiters = [lineDelimiter, ...punctuationDelimiters];

export const sentenceSplitRegex = /(.*?)(\n|[.!?]\s)(.*)/;

export const trailingSpacesRegex = /[ \t]+$/;

export const wordBoundarySeparator = "\u200B";
