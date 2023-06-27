import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import componentDidUpdate  from 'react'
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
  const [isPVC,setIsPVC] = useState(false) ;
  const [computerTurn,setComputerTurn] = useState(false) ;
  useEffect( () => {
    restartGame();
  },[])

  useEffect( () => {
    if ( options.includes("") ) {
      changeComputerPlay();
      computerPlay();
      checkWinner();
    }
  },[computerTurn])

  const updateCell = (cell , index) => {
    options[index] = currentPlayer ;
    cell.textContent = currentPlayer ; 
    setOptions([...options])
  }

  const computerPlay = () => {
    let random ;
    do {
      random = Math.floor(Math.random() * 9) ; 
    } while ( options[random] !== "" ) ;
    options[random] = currentPlayer ;
    setOptions([...options]);
    updateCell(document.getElementById(random),random);
    setPlayerTurn(prevCurrentPlayer => prevCurrentPlayer + "'s turn");
  }

  const changeComputerPlay = () => {
    setCurrentPlayer ( prevCurrentPlayer => prevCurrentPlayer = "O");
  }

  const changePlayer = () => {
    let tempCurrentPlayer = currentPlayer ; 
    if ( currentPlayer === "X" ) {
      tempCurrentPlayer = "O"
      setCurrentPlayer( tempCurrentPlayer );
    } else if ( currentPlayer === "O") {
      tempCurrentPlayer = "X"
      setCurrentPlayer( tempCurrentPlayer );
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
    console.log(currentPlayer)
    const cellindex = e.target.getAttribute("cellindex") ; 
    if ( options[cellindex] !== "" || !running ) 
      return ; 
    updateCell(e.target,cellindex)
    checkWinner();
    
    if ( isPVC ) {
      setComputerTurn(!computerTurn);
    }
  }
  const restartGame = () => {
    setCurrentPlayer("X");
    setPlayerTurn("X's turn");
    cells.forEach( cell => cell.textContent = "" ) ;
    setOptions([ "" , "" , "" , "" , "" , "" , "" , "" , "" ]);
    setRunning(true);
  }
  // const runGame = () => {
  //   setCurrentPlayer("X");
  //   setPlayerTurn("X's turn");
  //   setRunning(true);
  // }
  const handlePVC = (e) => {
    setIsPVC(!isPVC);
    restartGame();
  }


  return(
    <>
      <div id="gameContainer">
        <div className='title_container'>
          <h1>Game XO</h1>  
        </div>
          <div id="cellContainer">
              <div id="0" onClick={cellClicked} cellindex="0" className="cell"></div>
              <div id="1" onClick={cellClicked} cellindex="1" className="cell"></div>
              <div id="2" onClick={cellClicked} cellindex="2" className="cell"></div>
              <div id="3" onClick={cellClicked} cellindex="3" className="cell"></div>
              <div id="4" onClick={cellClicked} cellindex="4" className="cell"></div>
              <div id="5" onClick={cellClicked} cellindex="5" className="cell"></div>
              <div id="6" onClick={cellClicked} cellindex="6" className="cell"></div>
              <div id="7" onClick={cellClicked} cellindex="7" className="cell"></div>
              <div id="8" onClick={cellClicked} cellindex="8" className="cell"></div>
          </div>
          <div className="status_container">
            <h2 id="statusText">{playerTurn}</h2>
          </div>
          <button onClick={restartGame} className="btn btn-info" id="restartBtn">Restart</button>
          <button className={ isPVC ? 'btn_pvc active' : 'btn_pvc' } onClick={handlePVC} >PVC</button>
          
      </div>
    </>
  );
}


function App() {
  return (
    <div className='App'>
      <GameXO />
    </div>
  );
}

export default App;
