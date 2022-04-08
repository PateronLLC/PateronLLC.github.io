import React from 'react';
import { Box, Grid } from '@mui/material';
import LetterBox from './LetterBox.js';
import GameOverModal from './GameOverModal.js';

const BoardArea = ({ finalWord, squares, squareColors, currSquare, gameOver, won, resetBoard }) => {
  const renderSquare = (char, key, color) => {
    return <LetterBox key={key} char={char} color={color} />;
  };

  return (
    <>
      <GameOverModal
        gameOver={gameOver}
        resetBoard={resetBoard}
        won={won}
        finalWord={finalWord}
        currSquare={currSquare}
      />
      <Box
        sx={{
          paddingBottom: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {squares.map((rowArray, rowIndex) => {
          return (
            <Grid
              container
              key={`row-container-${rowIndex}`}
              sx={{
                width: 'min(90vw, 522px)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {rowArray.map((char, colIndex) => {
                const key = rowIndex.toString() + colIndex.toString();
                return renderSquare(char, key, squareColors[rowIndex][colIndex]);
              })}
            </Grid>
          );
        })}
      </Box>
    </>
  );
};

export default BoardArea;
