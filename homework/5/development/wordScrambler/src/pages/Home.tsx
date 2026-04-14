import { Link } from 'react-router-dom'
import React, {Children, useEffect, useState} from "react";
import { DndContext, useDraggable, useDroppable, type DragEndEvent } from '@dnd-kit/core';
import { CSS} from '@dnd-kit/utilities';

import type { ChoosenWordInfo, TargetSlotProps, DraggableProps } from '../interfaces';
import { wordScrambelingFunction } from '../logic/logic'


export const Home = () => {
    // const [gameData, setGameData] = useState(wordScrambelingFunction());
    // const [gameData, setGameData] = useState(Promise<ChoosenWordInfo | null>);
    const [gameData, setGameData] = useState<ChoosenWordInfo | null>(null);
    const [slots, setSlots] = useState<Record<number, string | null>>({});

    useEffect( () => {
        // Get the word, it's original word (string), charArray, and scrambled array
        wordScrambelingFunction().then((data) => {
           setGameData(data); 
        })
    }, []);
    const onMove = (letter: string, targetSlotId: number | null) => {
        setSlots(prev => ({
            ...prev,
            [targetSlotId as number]: letter
        }));
    }

    // Check to see if the wordScrambelingFunction returns null. If so, the board will not be made.
    if (!gameData) {
        return <div>Loading...</div>
    }

    return (
        <div className="home-page">
            <div className="horizontally-centered container">
                <h1>Word Scrambler</h1>
                <h3>It's like Scrabble, but because of trademarks, it is legally distinct.</h3>
                {/* <button onClick={wordScrambelingFunction}>Testing Button</button> */}
            </div>

            {/*
            <DndContext>
                {/* Target Boxes
                <div>
                    {gameData.unscrambled.map((_, index) =>(
                        <TargetSlot key={index} id={index}>
                            {/* TODO
                            {""}
                        </TargetSlot>
                    ))}
                </div>
                
                {/* Dragging boxes 
                <div>
                    {gameData.scrambled.map((item, index) => 
                        <PlaceableSquares key={index} id={index} letter={item}>
                            {/* TODO
                            {""}
                        </PlaceableSquares>
                    )}
                </div>


            </DndContext>  
            */}

            <DndContext onDragEnd={(event) => {
                const letter = event.active.data.current?.letter;
                handleDragEnd(event, (targetId) => {
                    if (typeof targetId === 'number') setSlots(prev => ({ ...prev, [targetId]: letter }));
                })
            }}>
                {/* Target Boxes */}    
                 <div>
                    {gameData.unscrambled.map((correctLetter, index) => {
                        const droppedLetter = slots[index];
                        const isCorrect = droppedLetter === correctLetter;
                        console.log(`DroppedLetter: ${droppedLetter}`);
                        console.log(`isCorrect: ${isCorrect}`);
                        return (
                            <TargetSlot key={index} id={index} isCorrect={isCorrect}>
                                {/* Check if a letter has been dropped here */}
                                {droppedLetter ? (
                                    <div className="placed-letter">{droppedLetter}</div>
                                ) : null}
                            </TargetSlot>
                        );
                    })}
                </div>
                
                {/* Dragging boxes */}
                <div>
                    {gameData.scrambled.map((item, index) => {
                        const isPlaced = Object.values(slots).includes(item);
                        return !isPlaced ? (
                            <PlaceableSquares key={index} id={index} letter={item}>
                                {""}
                            </PlaceableSquares>
                        ) : null;
                    })}
                </div>
            
            </DndContext>          
        </div>
    );
}

function TargetSlot({ id, children, isCorrect }: TargetSlotProps & { isCorrect?: boolean }) {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    let className: string = `slot hover-button`;
    if (isOver) className += " hovered";
    if (isCorrect) className += " correct-slot";

    return (
        <div ref={setNodeRef} className={className}>
            {children !== undefined ? children : <span style={{fontSize: '2rem'}}>&#9633;</span>}
        </div>
    );
}


function PlaceableSquares({id, children, letter}: DraggableProps) {
    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
        id: id,
        data: { letter }
    });

    // Shows the dragging
    const style = {
        transform: CSS.Translate.toString(transform),
    }

    const className: string = `Dragging-block ${isDragging ? "dragging" : "notDragging"}`;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={className}
            {...listeners}
            {...attributes}
        >
                <span style={{fontSize: '2rem' }}>{letter}</span>
        </div>
    );
}

const handleDragEnd = (event: DragEndEvent, onMove: (targetId: number | null) => void) => {
    const {over} = event;

    if (over) {
        // This occurs when the block is dropped
        const id = typeof over.id === 'string' ? parseInt(over.id, 10) : over.id;
        console.log("Placed in: ", id);
        onMove(id);
    } else {
        console.log("Dropped in the void");
        onMove(null);
    }
};

// function PlaceableSquares({id, children}: Props) {
//     const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
//         id: id,
//     });

//     // Apply the transformation to move the item
    
//     const className: string = `Dragging-block ${isDragging ? "dragging" : "notDragging"}`;
    
//     return (
//         <div
//             ref={setNodeRef}
//             className={className}
//             {...listeners}
//             {...attributes}
//         >
//             {children ?? <span style={{fontSize: '2rem' }}>&9633;</span>}
//         </div>
//     );
// }


// async function createBoard(): Promise<void | null> {
//     // First get the random word, and the scrambled order of the blocks
//     const wordInfo: ChoosenWordInfo | null = await wordScrambelingFunction();

//     // Check to see if we can progress further
//     if (wordInfo === null) {
//         console.error(`Within createBoard, wordInfo is null.`);
//         return null;
//     }

//     // Extract the data from wordInfo
//     const word: string = wordInfo.word;
//     const unscrambledWord: string [] = wordInfo.unscrambled;
//     const scrambledWord: string [] = wordInfo.scrambled;

//     // Call the creation (draw) of the board
//     drawBoard(unscrambledWord);
// }