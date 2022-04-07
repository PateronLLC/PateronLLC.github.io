import { WORDLIST } from '../constants/wordlist.js';

const getNewWord = () => {
  const word = WORDLIST[Math.floor(Math.random() * WORDLIST.length)].toUpperCase();
  console.log('No peeking!  The secret word is: ', word);
  return word;
};

export let finalWord = getNewWord();

export const setNewWord = () => {
  finalWord = getNewWord();
};
