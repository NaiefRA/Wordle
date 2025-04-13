import React from "react";
import Tile from "./Tile";

const WordleRow = ({ state, inputWord, wordleWord }) => {
  inputWord = inputWord.toUpperCase().slice(0, 5);
  wordleWord = wordleWord.toUpperCase();

  const letters = [...inputWord];
  const solutionLetters = [...wordleWord];
  const colors = ["wrong", "wrong", "wrong", "wrong", "wrong"];
  const used = [false, false, false, false, false];

  if (state === "enter") {
    for (let i = 0; i < 5; i++) {
      if (letters[i] === solutionLetters[i]) {
        colors[i] = "correct";
        used[i] = true;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (colors[i] === "correct") continue;
      for (let j = 0; j < 5; j++) {
        if (!used[j] && letters[i] === solutionLetters[j]) {
          colors[i] = "guess";
          used[j] = true;
          break;
        }
      }
    }
  }

  return (
    <div className="row">
      {letters.map((letter, i) => {
        let tileState = "absent";

        if (state === "typing") {
          tileState = "typing";
        }
        if (state === "enter") {
          tileState = colors[i];
        }
        if (letter === "'") {
          letter = "";
          tileState = "absent";
        }

        return <Tile key={i} letter={letter} state={tileState} />;
      })}
    </div>
  );
};

export default WordleRow;
