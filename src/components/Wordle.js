import React, { useEffect, useState } from 'react'
import useWorlde from '../hooks/useWordle'
import Grid from './Grid';
import KeyPad from './KeyPad';
import Modal from './Modal';

export default function Wordle({ solution }) {
  const { currentGuess, guesses, usedKeys, turn, isCorrect, handleKeyUp } = useWorlde(solution);
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    console.log('Inside useEffect', Object.freeze(handleKeyUp));
    window.addEventListener('keyup', handleKeyUp);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener('keyup', handleKeyUp);
    }
    
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener('keyup', handleKeyUp);
    }

    return () => window.removeEventListener('keyup', handleKeyUp);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleKeyUp, isCorrect])

  return (
    <div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <KeyPad usedKeys={usedKeys} />
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </div>
  )
}
