/* eslint-disable no-unused-vars */
import { useState } from 'react';


const useWorlde = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)])
  const [history, setHistory] = useState([])
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({}) // {a: 'green', b: 'yellow'}

  // Format the guess into an array of letter objects
  const formatGuess = () => {
    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: 'grey' }
    })

    // Find green colors
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = null;
      }
    })

    // Find yellow colors
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    })

    return formattedGuess
  }

  // Add a new guess to the guess state
  // Update the incorrect state if the guess is correct
  // Add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true)
    }
    setGuesses(prevGuesses => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })
    setHistory(prevHistory => {
      return [...prevHistory, currentGuess]
    })
    setTurn(prevTurn => {
      return prevTurn + 1
    })

    setUsedKeys((prevUsedKeys) => {
      const newsKeys = { ...prevUsedKeys };

      formattedGuess.forEach((l) => {
        const currentColor = newsKeys[l.key];

        if (l.color === 'green') {
          newsKeys[l.key] = 'green';
          return;
        }
        if (l.color === 'yellow' && currentColor !== 'green') {
          newsKeys[l.key] = 'yellow';
          return;
        }
        if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
          newsKeys[l.key] = 'grey';
          return;
        }
      })
      return newsKeys;
    })

    setCurrentGuess('')
  }

  // Handle the keyup event & track new guess
  // If user pressess enter, add the new guess
  const handleKeyUp = ({ key }) => {

    // If the key is enter, submit the currentGuess into guesses array
    if (key === 'Enter') {

      // Don't add it if the turn > 5
      if (turn > 5) {
        console.log('You used all your guesses')
        return;
      }
      // Do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log('You already tried that word!')
        return;
      }
      // Check if the guess length isn't equal to 5
      if (currentGuess.length !== 5) {
        console.log('Please enter a 5 letter word!')
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    // If the key is a backspace, remove the last character
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1))
      return;
    }

    // Set currentGuess only if the key is an alphabet
    
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key)
      } else {
        console.log('Current Guess size exceeded!')
      }
    }
  }

  return {turn, currentGuess, guesses, usedKeys, isCorrect, handleKeyUp}

}

export default useWorlde;