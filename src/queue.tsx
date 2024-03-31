export type SpeechUtterancesQueue = SpeechSynthesisUtterance[];

export type QueueChangeEventHandler = (queue: SpeechUtterancesQueue) => any;

let queue: SpeechUtterancesQueue = [];

export function addToQueue(utterance: SpeechSynthesisUtterance, callback?: QueueChangeEventHandler) {
  queue.push(utterance);
  callback?.(queue);
}

export function removeFromQueue(utterance: SpeechSynthesisUtterance, callback?: QueueChangeEventHandler) {
  const index = queue.indexOf(utterance);
  if (index === -1) return;
  queue.splice(index, 1);
  callback?.(queue);
}

export function clearQueue() {
  queue = [];
}

export function speakFromQueue() {
  const utterance = queue[0];
  if (utterance) speechSynthesis.speak(utterance);
}
