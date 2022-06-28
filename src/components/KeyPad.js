import React, { useEffect, useState } from 'react'
import JSONLetters from '../data/letters.json'

const KeyPad = ({ usedKeys }) => {
  const [letters, setLetters] = useState(null)

  useEffect(() => {
    setLetters(JSONLetters);
  }, [])

  return (
    <div className='keypad'>
      {letters?.map((l) => {
        const color = usedKeys[l.key]
        return <div 
          className={color} 
          key={l.key}
        >
        {l.key}
        </div>
      })}
    </div>
  )
}

export default KeyPad