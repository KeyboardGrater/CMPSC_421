import { randomElement, shuffleArray } from "./random";
import type {WordBankInterface, ChoosenWordInfo } from "../interfaces"

async function getAndHandleWordBank (): Promise<string [] | undefined> {
    try {
        const wordBankFilePath: string = "/words.json";
        const response: Response = await fetch(wordBankFilePath);
        let data: WordBankInterface;

        if (!response.ok) {
            throw new Error('Either the file was not found, or there was a issue when fetching it');
        }

        data = await response.json();

        return data.words;
    }
    catch (error) {
        console.error(`Error when fetching the word bank data. Error: ${error}`);
    }
}

function randomlyChoose (wordBank: string []): ChoosenWordInfo {
    const randomWord: string = randomElement(wordBank);
    const unshuffledArray: string [] = [...randomWord];
    const shuffledArray: string [] = shuffleArray([...randomWord]); 
    
    return {word: randomWord, unscrambled: unshuffledArray, scrambled: shuffledArray};
}

export async function wordScrambelingFunction (): Promise<ChoosenWordInfo | null> {
    // Get the words from the word bank, and then store it into a array for sorting
    const wordBank: string [] | undefined = await getAndHandleWordBank();

    if (wordBank === undefined) {
        console.error("The wordBank is undefinied. Returning/Doing nothing.");
        return null;
    }

    console.log(randomlyChoose(wordBank));

    return randomlyChoose(wordBank);
}