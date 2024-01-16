import { clamp } from "./clamp";
import { lerp } from "./lerp";

/**
 * The `inRange` function generates a random number within a given range and optionally rounds it to
 * the nearest integer.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The `max` parameter represents the maximum value that the generated number can
 * be.
 * @param {boolean} [round=false] - The `round` parameter is a boolean flag that determines whether the
 * result should be rounded to the nearest whole number or not. If `round` is set to `true`, the result
 * will be rounded using the `Math.round()` function. If `round` is set to `false` or not
 * @returns a number.
 */
export function inRange(
  min: number,
  max: number,
  round: boolean = false,
): number {
  let res = lerp(min, max, Math.random());
  // to be sure
  res = clamp(min, max, res);

  return round ? Math.round(res) : res;
}

/**
 * The NeOPo function returns a positive or negative value based on a random number.
 * @param {number} value - The parameter "value" is a number that is passed to the function NeOPo.
 * @returns The function `NeOPo` returns a number.
 */
export function NeOPo(value: number): number {
  return Math.random() > 0.5 ? Math.abs(value) : -Math.abs(value);
}
