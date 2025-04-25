import React, { useEffect, useState } from "react";
import WordleRow from "./WordleRow";
import Popup from "./Popup";
import Tile from "./Tile";

const Main = () => {
  const [wordList, setWordList] = useState(["Temps"]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/words.txt`)
      .then((res) => res.text())
      .then((data) => {
        const words = data
          .split("\n")
          .map((word) => word.trim())
          .filter(Boolean);
        setWordList(words);
        setWordleWord(words[Math.floor(Math.random() * words.length)]);
      })
      .catch((err) => console.error(err));
  }, []);

  const [guesses, setGuesses] = useState(["", "", "", "", "", ""]);
  const [currRow, setCurrRow] = useState(0);
  const [state, setState] = useState([
    "typing",
    "typing",
    "typing",
    "typing",
    "typing",
    "typing",
  ]);
  const [lost, setLost] = useState(false);
  const [popup, setPopup] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const [wordleWord, setWordleWord] = useState(
    wordList[Math.floor(Math.random() * wordList.length)]
  );

  console.log(wordleWord);

  const handleReset = (e) => {
    e.preventDefault();
    console.log("click");
    setGuesses(["", "", "", "", "", ""]);
    setCurrRow(0);
    setState(Array(6).fill("typing"));
    setPopup(false);
    setGameActive(true);
    setWordleWord(wordList[Math.floor(Math.random() * wordList.length)]);
    window.location.reload();
  };

  useEffect(() => {
    if (!gameActive || currRow === 6) {
      return;
    }

    const handleKeydown = (e) => {
      const letter = e.key.toUpperCase();
      if (/^[A-Z]$/.test(letter)) {
        if (guesses[currRow].length < 5) {
          const newGuess = [...guesses];
          newGuess[currRow] += letter;
          setGuesses(newGuess);
        }
      }
      if (letter === "BACKSPACE") {
        const newGuess = [...guesses];
        newGuess[currRow] = guesses[currRow].slice(
          0,
          guesses[currRow].length - 1
        );
        setGuesses(newGuess);
      }
      if (letter === "ENTER") {
        if (guesses[currRow].length === 5) {
          if (!wordList.includes(guesses[currRow].toLowerCase())) {
            return;
          }

          const newState = [...state];
          newState[currRow] = "enter";
          setState(newState);
          if (wordleWord.toUpperCase() === guesses[currRow]) {
            console.log("You Win");
            setGameActive(false);

            setTimeout(() => setPopup(true), 500);
          } else if (currRow === 5) {
            console.log("You Lose");
            setLost(true);
            setGameActive(false);
            setTimeout(() => setPopup(true), 500);
          }
          if (currRow < 6) {
            setCurrRow(currRow + 1);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
    // eslint-disable-next-line
  }, [guesses, currRow, state, gameActive, wordleWord]);

  return (
    <div>
      <h2 className="title">
        {[..."WORDLECLONE"].map((letter, i) => {
          return <Tile key={i} letter={letter} state="absent" />;
        })}
      </h2>
      <div className="main-container">
        <div className="rows-list">
          {guesses.map((guess, i) => {
            let dashes = "";
            for (let i = 0; i < 5 - guess.length; i++) {
              dashes += "'";
            }
            guess += dashes;
            return (
              <WordleRow
                key={i}
                state={state[i]}
                inputWord={guess}
                wordleWord={wordleWord}
              />
            );
          })}
        </div>
        <div className="button-container">
          <button className="reset-button" onClick={(e) => handleReset(e)}>
            Reset
          </button>
        </div>
      </div>
      <div>
        {popup &&
          (lost ? (
            <Popup
              message={`You Lost! The word was ${wordleWord.toUpperCase()}`}
              oc={() => setPopup(false)}
            />
          ) : (
            <Popup message="Congratulations 🎉" oc={() => setPopup(false)} />
          ))}
      </div>
    </div>
  );
};

export default Main;
