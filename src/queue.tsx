export type SpeechUtterancesQueue = SpeechSynthesisUtterance[];

export type QueueChangeEventHandler = (queue: SpeechUtterancesQueue) => any;

let queue: SpeechUtterancesQueue = [];

export function addToQueue(callback: QueueChangeEventHandler | undefined, utterance: SpeechSynthesisUtterance) {
  queue.push(utterance);
  callback?.(queue);
}

export function removeFromQueue(callback?: QueueChangeEventHandler, utterance?: SpeechSynthesisUtterance) {
  if (!utterance) queue.shift();
  else queue = queue.filter((queuedUtterance) => queuedUtterance !== utterance);
  callback?.(queue);
}

export function clearQueue(callback?: QueueChangeEventHandler) {
  queue = [];
  callback?.(queue);
}

export function speakFromQueue() {
  const utterance = queue[0];
  if (utterance) speechSynthesis.speak(utterance);
}
