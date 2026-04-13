import { Link } from 'react-router-dom'

import { wordScrambelingFunction } from '../logic/logic'

export const Home = () => {
    return (
        <div className="home-page">
            <div className="horizontally-centered container">
                <h1>Word Scrambler</h1>
                <h3>It's like Scarbble, but because of trademarks, it is legally distinct.</h3>
                <button onClick={wordScrambelingFunction}>Testing Button</button>
            </div>

            <div className="horizontally-centered">
                
            </div>
            
        </div>
    );
}