import { FD_WEIGHTS } from "../data/fdWeight.js";

export function gainFromOptionString(option) {
  return FD_WEIGHTS[option] ?? 0;
}

export function currentSetGain(lines) {
  return lines.reduce((sum, opt) => sum + gainFromOptionString(opt), 0);
}