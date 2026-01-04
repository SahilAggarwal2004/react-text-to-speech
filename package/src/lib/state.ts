import type { State } from "../types.js";

export const state: State = { stopReason: "manual" };

export function setState(newState: Partial<State>) {
  Object.assign(state, newState);
}
