import { QueueChangeEventHandler, SpeechQueue, SpeechQueueItem } from "./types.js";
import { cancel } from "./utils.js";

const queue: SpeechQueue = [];

const queueListeners: QueueChangeEventHandler[] = [];

export function clearQueue(cancelSpeech = false, start = 0, emitEvent = false) {
  if (cancelSpeech) cancel();
  queue.slice(start).forEach(({ setSpeechStatus }) => setSpeechStatus("stopped"));
  queue.length = 0;
  if (emitEvent) emit();
}

export function addToQueue(item: SpeechQueueItem, callback?: QueueChangeEventHandler) {
  queue.push(item);
  emit(callback);
}

export const clearQueueHook = () => clearQueue(true, 1, true);

export const clearQueueUnload = () => clearQueue(true, 1);

export function dequeue(index: number = 0) {
  if (index === 0) cancel();
  else removeFromQueue(index);
}

export function emit(callback?: QueueChangeEventHandler) {
  const utteranceQueue = queue.map(({ utterance }) => utterance);
  queueListeners.forEach((listener) => listener(utteranceQueue));
  callback?.(utteranceQueue);
}

export function removeFromQueue(utterance: SpeechSynthesisUtterance, callback?: QueueChangeEventHandler): void;
export function removeFromQueue(utterance: number): void;
export function removeFromQueue(utterance: SpeechSynthesisUtterance | number, callback?: QueueChangeEventHandler) {
  const index = typeof utterance === "number" ? utterance : queue.findIndex((item) => item.utterance === utterance);
  if (index === -1) return;
  const [item] = queue.splice(index, 1);
  if (item) {
    item.setSpeechStatus("stopped");
    emit(callback);
  }
}

export function speakFromQueue() {
  const item = queue[0];
  if (item) window.speechSynthesis.speak(item.utterance);
}

export function subscribe(callback: QueueChangeEventHandler) {
  queueListeners.push(callback);
  return () => {
    const index = queueListeners.indexOf(callback);
    if (index !== -1) queueListeners.splice(index, 1);
  };
}
