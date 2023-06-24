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
    console.log(currentPlayer)
    let tempCurrentPlayer = currentPlayer ; 
    if ( currentPlayer === "X" ) {
      setCurrentPlayer("O")
      tempCurrentPlayer = "O"
    } else if ( currentPlayer === "O") {
      setCurrentPlayer("X")
      tempCurrentPlayer = "X"
    }
    setPlayerTurn(tempCurrentPlayer + "'s turn");
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
    const cellindex = e.target.getAttribute("cellindex") ; 
    if ( options[cellindex] !== "" || !running ) 
      return ; 
    updateCell(e.target,cellindex)
    checkWinner();
  }
  const restartGame = () => {
    setCurrentPlayer("X");
    setPlayerTurn(currentPlayer + "'s turn");
    cells.forEach( cell => cell.textContent = "" ) ;
    setOptions([ "" , "" , "" , "" , "" , "" , "" , "" , "" ]);
    setRunning(true);
  }
  const runGame = () => {
    setCurrentPlayer("X");
    setPlayerTurn("X's turn");
    setRunning(true);
  }
  return(
    <div id="gameContainer">
      <div className='title_container'>
        <h1>Game XO</h1>  
      </div>
        <div id="cellContainer">
            <div onClick={cellClicked} cellindex="0" className="cell"></div>
            <div onClick={cellClicked} cellindex="1" className="cell"></div>
            <div onClick={cellClicked} cellindex="2" className="cell"></div>
            <div onClick={cellClicked} cellindex="3" className="cell"></div>
            <div onClick={cellClicked} cellindex="4" className="cell"></div>
            <div onClick={cellClicked} cellindex="5" className="cell"></div>
            <div onClick={cellClicked} cellindex="6" className="cell"></div>
            <div onClick={cellClicked} cellindex="7" className="cell"></div>
            <div onClick={cellClicked} cellindex="8" className="cell"></div>
        </div>
        <div className="status_container">
          <h2 id="statusText">{playerTurn}</h2>
        </div>
        <button onClick={restartGame} className="btn btn-info" id="restartBtn">Restart</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <GameXO />
    </div>
  );
}

export default App;
