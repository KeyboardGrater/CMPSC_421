import type React from "react";

export interface WordBankInterface {
    words: string [];
}

export interface ChoosenWordInfo {
    word: string;
    unscrambled: string [];
    scrambled: string [];
} 

export interface TargetSlotProps {
    id: number;
    children: React.ReactNode;
}

export interface DraggableProps {
    id: number;
    children: React.ReactNode;
    letter: string;
}
