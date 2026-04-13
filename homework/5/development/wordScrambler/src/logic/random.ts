
export function randomNumberGenerator (min: number, max: number): number {
    const range: number = max - min + 1;
    const array: Uint32Array<ArrayBuffer> = new Uint32Array(1);

    // Fills the first index of the array, with a secure, random integer (0 to 2^32 - 1)
    window.crypto.getRandomValues(array);
    
    // Scale the number down to the range
    return min + (array[0] % range);
}

function randomlyChooseIndex (array: unknown []): number {
    return randomNumberGenerator(0, array.length - 1);
}

export function randomElement <T> (array: T[]): T {
    return array[randomlyChooseIndex(array)];
}

export function shuffleArray <T> (array: T[]): T[] {
    console.log(`Before Shuffle: ${array}`);

    for (let i: number = array.length - 1; i > 0; i--) {
        // Pick a random number from 0 to i (inclusive)
        const j = randomNumberGenerator(0, i);
        
        // Swap
        [array[i], array[j]] = [array[j], array[i]];
    }

    console.log(`After Shuffle: ${array}`);
    return array;
}