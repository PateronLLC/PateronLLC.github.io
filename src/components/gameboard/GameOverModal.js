import React from "react";
import {
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';

const GameOverModal = ({ gameOver, resetBoard, won, finalWord, currSquare }) => {
  return (
    <>
      <Dialog
          open={gameOver}
          onClose={() => {
            resetBoard();
          }}
        >
        <DialogTitle>{won ? 'You won! 🎈' : 'You lost! 😔'}</DialogTitle>
        <DialogContent className="dialog-content">
          <DialogContentText className="dialogtext">
            {won
              ? `You guessed the word, ${finalWord}, in ${currSquare[0] + 1} guess${
                  currSquare[0] === 0 ? '' : 'es'
                }!`
              : `The solution was ${finalWord}.\nBetter luck next time.`}
          </DialogContentText>
          <Button
            onClick={() => {
              resetBoard();
            }}
            variant="contained"
            className="dialogtext"
          >
            Start a new Game!
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default GameOverModal;