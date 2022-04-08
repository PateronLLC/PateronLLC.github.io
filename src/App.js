import React, { useState } from 'react';
import { Container } from '@mui/material';
import Header from './components/header/Header.js';
import BoardArea from './components/gameboard/BoardArea.js';
import { Keyboard } from './components/keyboard/Keyboard.js';
import { NUM_GUESSES, WORD_LENGTH } from './constants/settings.js';
import { setNewWord, finalWord } from './lib/solution.js';
import { WORDLIST } from './constants/wordlist.js';
import './App.css';

function App() {
  const [squares, setSquares] = useState(
    Array.from({ length: NUM_GUESSES }, (value, index) =>
      Array.from({ length: WORD_LENGTH }, (value1, index1) => ''),
    ),
  );
  const [squareColors, setSquareColors] = useState(
    Array.from({ length: NUM_GUESSES }, (value, index) =>
      Array.from({ length: WORD_LENGTH }, (value1, index1) => 'lightgray'),
    ),
  );
  const [currSquare, setCurrSquare] = useState([0, 0]);
  const [gameOver, setGameOver] = useState(false); // transition this state to 'gameovermodal'
  const [won, setWon] = useState(false);
  const [colorKeyboard, setColorKeyboard] = useState({});
  const [stats, setStats] = useState({
    histogram: [2, 3, 4, 3, 1, 0],
    totalGames: 10,
    wins: 7,
    currentStreak: 3,
    bestStreak: 4,
  });
  const [animating, setAnimating] = useState(false);
  const [modalState, setModalState] = useState({
    gameOverModal: false,
    statsModal: false,
    loginModal: false,
    createUserModal: false,
  });

  const resetBoard = () => {
    const newSquares = Array.from({ length: NUM_GUESSES }, (value, index) =>
      Array.from({ length: WORD_LENGTH }, (value1, index1) => ''),
    );
    const newSquareColors = Array.from({ length: NUM_GUESSES }, (value, index) =>
      Array.from({ length: WORD_LENGTH }, (value1, index1) => 'lightgray'),
    );
    const newCurrSquare = [0, 0];
    setGameOver(false);
    new Promise((resolve) => setTimeout(() => resolve('Reset state to new game'), 0)).then(() => {
      setSquares(newSquares);
      setSquareColors(newSquareColors);
      setCurrSquare(newCurrSquare);
      setNewWord();
      setColorKeyboard({});
    });
  };

  const deepClone = (input) => {
    if (typeof input !== 'object' || input === null) {
      return input;
    }
    const output = Array.isArray(input) ? [] : {};
    for (let key in input) {
      let value = input[key];
      output[key] = deepClone(value);
    }
    return output;
  };

  const onChar = (key) => {
    key = key.toUpperCase();
    if (currSquare[1] < squares[0].length) {
      const newSquares = deepClone(squares);
      const newCurrSquare = deepClone(currSquare);
      newSquares[currSquare[0]][currSquare[1]] = key;
      newCurrSquare[1]++;

      setSquares(newSquares);
      setCurrSquare(newCurrSquare);
    }
  };

  const onDelete = () => {
    if (currSquare[1] === squares[0].length) {
      setSquareColors((prevSquareColors) => {
        const newSquareColors = deepClone(prevSquareColors);
        for (let idx in newSquareColors[currSquare[0]]) {
          newSquareColors[currSquare[0]][idx] = 'lightgray';
        }
        return newSquareColors;
      });
    }
    if (currSquare[1] !== 0) {
      setSquares((prevSquares) => {
        const newSquares = deepClone(prevSquares);
        newSquares[currSquare[0]][currSquare[1] - 1] = '';
        return newSquares;
      });
      setCurrSquare((prevCurrSquare) => {
        const newCurrSquare = deepClone(prevCurrSquare);
        newCurrSquare[1]--;
        return newCurrSquare;
      });
    } else {
      console.error('You cannot delete until you have characters entered');
    }
  };

  const onEnter = () => {
    let usedWord = false;
    const currGuess = squares[currSquare[0]].join('');
    const newSquareColors = deepClone(squareColors);
    const newColorKeyboard = deepClone(colorKeyboard);

    //Check if guess has already been made
    for (let idx = 0; idx < currSquare[0]; idx++) {
      const wordJoin = squares[idx].join('');
      if (wordJoin === currGuess) {
        usedWord = true;
      }
    }

    // Check word against WORDLIST, turn row red if not in list
    if (!WORDLIST.includes(currGuess.toLowerCase()) || usedWord) {
      for (let idx in newSquareColors[currSquare[0]]) {
        newSquareColors[currSquare[0]][idx] = 'red';
      }
      setSquareColors(newSquareColors);
      console.log(`Sorry, ${currGuess} is not in our word list or word has been used already.`);
    } else {
      // Cache letter frequency in finalWord
      const finalWordLetterCache = {};
      finalWord.split('').forEach((value, index) => {
        if (!Object.prototype.hasOwnProperty.call(finalWordLetterCache, value))
          finalWordLetterCache[value] = 1;
        else {
          finalWordLetterCache[value]++;
        }
      });

      // Letter matches location, turn green
      squares[currSquare[0]].forEach((square, squareIndex) => {
        if (
          Object.prototype.hasOwnProperty.call(finalWordLetterCache, square)
          && square === finalWord[squareIndex]
        ) {
          newSquareColors[currSquare[0]][squareIndex] = 'green';
          finalWordLetterCache[square]--;
          newColorKeyboard[square] = 'green';
        }
      });

      // Letter matches, but not location, turn yellow
      squares[currSquare[0]].forEach((square, squareIndex) => {
        if (
          Object.prototype.hasOwnProperty.call(finalWordLetterCache, square)
          && finalWordLetterCache[square] > 0
          && newSquareColors[currSquare[0]][squareIndex] !== 'green'
        ) {
          newSquareColors[currSquare[0]][squareIndex] = 'yellow';
          finalWordLetterCache[square]--;
          if (newColorKeyboard[square] !== 'green') newColorKeyboard[square] = 'yellow';
        }
      });

      // Letter doesn't match any letter in solution or cache is empty, turn dark gray
      squares[currSquare[0]].forEach((square, squareIndex) => {
        if (
          !Object.prototype.hasOwnProperty.call(finalWordLetterCache, square)
          || (finalWordLetterCache[square] === 0
            && newSquareColors[currSquare[0]][squareIndex] === 'lightgray')
        ) {
          newSquareColors[currSquare[0]][squareIndex] = 'gray';
          if (newColorKeyboard[square] !== 'green' && newColorKeyboard[square] !== 'yellow')
            newColorKeyboard[square] = 'gray';
        }
      });

      // Animate current guess
      let animateIndex = 0;
      const newRowColors = newSquareColors[currSquare[0]];
      setAnimating(true);
      // Updates colors up to current index on the current row for each letter
      const interval = setInterval(() => {
        const newColorsToUpdate = newRowColors.map((value, index) => {
          if (index <= animateIndex) return value;
          else return 'lightgray';
        });
        const animateSquareColors = deepClone(newSquareColors);
        animateSquareColors[currSquare[0]] = newColorsToUpdate;
        setSquareColors(animateSquareColors);

        // After final letter animation
        if (animateIndex >= squares.length - 1) {
          setAnimating(false);
          clearInterval(interval);

          //check to see if the row matches the final word, if match, win game
          if (currGuess === finalWord) {
            setWon(true);
            setGameOver(true);
            // If guess is last guess, and no match, lose game
          } else if (currSquare[0] >= squares.length - 1) {
            setWon(false);
            setGameOver(true);
            // If guess is no match, increment to next row
          } else {
            setCurrSquare((prevCurrSquare) => {
              const newCurrSquare = deepClone(prevCurrSquare);
              newCurrSquare[0]++;
              newCurrSquare[1] = 0;
              return newCurrSquare;
            });
          }
        }
        animateIndex++;
      }, 200);
      setColorKeyboard(newColorKeyboard);
    }
  };

  function fetchStats() {
    // const res = await fetch(`https://wordlepl.us/stats?id=`);
    // const json = await res.json();
    // console.log(`stats response ${json.response}`);
    // setStats(json.response);
    // //display modal with stats
    // handle error
    setStats({
      histogram: [2, 3, 4, 3, 1, 0],
      totalGames: 10,
      wins: 7,
      currentStreak: 3,
      bestStreak: 4,
    });
    console.log('Fetching stats placeholder');
  }

  function toggleModal(modalName) {
    const defaultModalState = {
      statsModal: false,
      gameOverModal: false,
      loginModal: false,
      createUserModal: false,
    };
    setModalState((prevState) => {
      return Object.assign(defaultModalState, { [modalName]: !prevState?.[modalName] });
    });
  }

  return (
    <Container className="App" maxWidth="false">
      <Header
        stats={stats}
        fetchStats={fetchStats}
        modalState={modalState}
        toggleModal={toggleModal}
      />
      <BoardArea
        finalWord={finalWord}
        squares={squares}
        squareColors={squareColors}
        currSquare={currSquare}
        gameOver={gameOver}
        won={won}
        resetBoard={resetBoard}
      />
      <Keyboard
        finalWord={finalWord}
        squares={squares}
        squareColors={squareColors}
        currSquare={currSquare}
        gameOver={gameOver}
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        colorKeyboard={colorKeyboard}
        resetBoard={resetBoard}
        animating={animating}
        modalState={modalState}
      />
    </Container>
  );
}

export default App;
