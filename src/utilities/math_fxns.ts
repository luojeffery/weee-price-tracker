export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Example: Map 5 from range (0-10) to (0-100)
console.log(mapRange(5, 0, 10, 0, 100)); // Output: 50
