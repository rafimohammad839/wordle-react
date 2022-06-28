import React from "react";

const Row = ({ guess, currentGuess }) => {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((item, idx) => {
          return (
            <div className={item.color} key={idx}>
              {item.key}
            </div>
          );
        })}
      </div>
    );
  }

  if (currentGuess) {
    const letters = currentGuess.split("");

    return (
      <div className="row current">
        {letters.map((letter, idx) => {
          return <div className="filled" key={idx}>{letter}</div>;
        })}
        {[...Array(5 - letters.length)].map((_, i) => {
          return <div key={i}></div>
        })}
      </div>
    );
  }

  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Row;
