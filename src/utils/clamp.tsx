

/**
 * The `clamp` function takes in a minimum value, a maximum value, and a value to be clamped, and
 * returns the clamped value within the specified range.
 * @param {number} min - The `min` parameter represents the minimum value that the `value` parameter
 * can be. If the `value` parameter is less than `min`, the function will return `min`.
 * @param {number} max - The `max` parameter represents the maximum value that the `value` parameter
 * can be.
 * @param {number} value - The value parameter represents the number that you want to clamp between the
 * minimum and maximum values.
 * @returns a number.
 */

export function clamp(min: number, max: number, value: number): number {
    return Math.max(Math.min(value, max), min)
}