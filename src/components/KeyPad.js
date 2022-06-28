import React, { useEffect, useState } from 'react'

const KeyPad = ({ usedKeys }) => {
  const [letters, setLetters] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3001/letters')
      .then(res => res.json())
      .then(data => setLetters(data))
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