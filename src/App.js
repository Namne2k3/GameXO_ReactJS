import logo from './logo.svg';
import './App.css';

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
function GameXO () {

  const cells = document.querySelectorAll('.cell');
  const winConditions = [
    [ 0 , 1 , 2 ] ,
    [ 3 , 4 , 5 ] ,
    [ 6 , 7 , 8 ] ,
    [ 0 , 3 , 6 ] , 
    [ 1 , 4 , 7 ] ,
    [ 2 , 5 , 8 ] ,
    [ 0 , 4 , 8 ] , 
    [ 2 , 4 , 6 ] 
  ];
  const [currentPlayer,setCurrentPlayer] = useState("");
  const [options,setOptions] = useState([ "" , "" , "" , "" , "" , "" , "" , "" , "" ]);
  const [running,setRunning] = useState(false);
  const [playerTurn,setPlayerTurn] = useState("");
  const [roundWon,setRoundWon] = useState(false);
  
  useEffect( () => {
    runGame();
  },[])

  const updateCell = (cell , index) => {
    options[index] = currentPlayer ;
    console.log(cell)
    cell.textContent = currentPlayer ; 
    setOptions([...options])
  }

  const changePlayer = () => {
    if ( currentPlayer === "X" ) {
      setCurrentPlayer("O")
    } else {
      setCurrentPlayer("X")
    }
    setPlayerTurn(currentPlayer + "'s turn");
  }

  const checkWinner = () => {
    let isWon = false ; 
    for ( let i = 0 ; i < winConditions.length ; i ++ ) {
      const condition = winConditions[i] ;
      const cellA = options[condition[0]] ; 
      const cellB = options[condition[1]] ; 
      const cellC = options[condition[2]] ;

      if ( cellA === "" || cellB === "" || cellC === "" ){
          continue ; 
      }
      if ( cellA === cellB && cellB === cellC ) {
          setRoundWon(true);
          isWon = true ;
          break ; 
      }
    }
    if ( isWon ) {
      setPlayerTurn(currentPlayer + " win!");
      setRunning(false);
    } else if ( !options.includes("") ) {
      setPlayerTurn("Draw!");
      setRunning(false);
    } else {
      changePlayer() ;
    }
  }

  const cellClicked = (e) => {
    const cellIndex = e.target.getAttribute("cellIndex") ; 
    if ( options[cellIndex] !== "" || !running ) 
      return ; 
    updateCell(e.target,cellIndex)
    checkWinner() ;
  }
  const restartGame = () => {
    setCurrentPlayer("X");
    cells.forEach( cell => cell.textContent = "" ) ;
    setOptions([ "" , "" , "" , "" , "" , "" , "" , "" , "" ]);
    setPlayerTurn(currentPlayer + "'s turn");
    setRunning(true);
  }
  const runGame = () => {
    setCurrentPlayer("X");
    setPlayerTurn(currentPlayer + "'s turn");
    setRunning(true);
  }
  return(
    <div id="gameContainer">
        <h1>Game XO</h1>  
        <div id="cellContainer">
            <div onClick={cellClicked} cellIndex="0" className="cell"></div>
            <div onClick={cellClicked} cellIndex="1" className="cell"></div>
            <div onClick={cellClicked} cellIndex="2" className="cell"></div>
            <div onClick={cellClicked} cellIndex="3" className="cell"></div>
            <div onClick={cellClicked} cellIndex="4" className="cell"></div>
            <div onClick={cellClicked} cellIndex="5" className="cell"></div>
            <div onClick={cellClicked} cellIndex="6" className="cell"></div>
            <div onClick={cellClicked} cellIndex="7" className="cell"></div>
            <div onClick={cellClicked} cellIndex="8" className="cell"></div>
        </div>
        <h2 id="statusText">{playerTurn}</h2>
        <button onClick={restartGame} className="btn btn-info" id="restartBtn">Restart</button>
    </div>
  );
}

function App() {
  return (
    <GameXO />
  );
}

export default App;
