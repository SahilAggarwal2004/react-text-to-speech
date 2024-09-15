import { State } from "./types.js";

export const state: State = { stopReason: "auto" };

export const setState = (newState: Partial<State>) => Object.assign(state, newState);
