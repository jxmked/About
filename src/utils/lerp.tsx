
/**
 * The lerp function calculates a linear interpolation between two numbers based on a given point.
 * @param {number} start - The start parameter is the initial value or starting point of the range you
 * want to interpolate between.
 * @param {number} end - The "end" parameter represents the ending value of the range you want to
 * interpolate between.
 * @param {number} point - The "point" parameter represents a value between 0 and 1 that determines the
 * interpolation point between the start and end values.
 * @returns a number.
 */
export function lerp(start: number, end: number, point: number): number {
    return (end - start) * point + start; 
}
