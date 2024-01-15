import React from "react";

export function lerp(start: number, end: number, point: number): number {
    return (end - start) * point + start; 
}
