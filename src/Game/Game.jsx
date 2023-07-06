import React, {useState} from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import Cells from '../components/Cells/Cells.jsx';

function Game(){
    const [startText, setStartText] = useState('Start');
    const [restart, setRestart] = useState(false);

    return(<div>
        <Navbar startText={startText} setStartText={setStartText} restart={restart} setRestart={setRestart} ></Navbar>
        <Cells startText={startText} restart={restart}></Cells>
    </div>)
}

export default Game;