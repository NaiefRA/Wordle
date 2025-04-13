import React, { useEffect, useState } from "react";
import WordleRow from "./WordleRow";
import Popup from "./Popup";
import Tile from "./Tile";

const wordList = [
  "apple",
  "grape",
  "brick",
  "crane",
  "table",
  "chair",
  "light",
  "flame",
  "spine",
  "brain",
  "scale",
  "drive",
  "water",
  "plant",
  "shine",
  "tiger",
  "zebra",
  "crown",
  "eagle",
  "brush",
  "climb",
  "drake",
  "froze",
  "glide",
  "hover",
  "jumpy",
  "kneel",
  "laugh",
  "match",
  "nerdy",
  "orbit",
  "plain",
  "quilt",
  "rider",
  "snake",
  "trick",
  "union",
  "vivid",
  "wrist",
  "xenon",
  "yield",
  "zesty",
  "blush",
  "cargo",
  "dance",
  "eject",
  "flock",
  "giant",
  "hound",
  "inbox",
  "jewel",
  "karma",
  "latch",
  "macho",
  "noble",
  "oxide",
  "piano",
  "quote",
  "rough",
  "smile",
  "tulip",
  "ultra",
  "voter",
  "widen",
  "yacht",
  "zebra",
  "blame",
  "cabin",
  "ditch",
  "epoch",
  "fable",
  "grain",
  "hatch",
  "ideal",
  "judge",
  "kneel",
  "lemon",
  "mango",
  "night",
  "opera",
  "proud",
  "quake",
  "reign",
  "shard",
  "thorn",
  "unite",
  "voice",
  "worry",
  "xerox",
  "yummy",
  "zonal",
  "acorn",
  "beach",
  "candy",
  "daisy",
  "earth",
  "faith",
  "glory",
  "happy",
  "igloo",
  "joker",
  "kitty",
  "lunar",
  "mirth",
  "nudge",
  "offer",
  "punch",
  "quirk",
  "roast",
  "sword",
  "toast",
  "usher",
  "vague",
  "whale",
  "xylem",
  "yodel",
  "zappy",
];

const Main = () => {
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
          const newState = [...state];
          newState[currRow] = "enter";
          setState(newState);
          if (wordleWord.toUpperCase() === guesses[currRow]) {
            console.log("You Win");
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
        {popup && (
          <Popup message="Congratulations 🎉" oc={() => setPopup(false)} />
        )}
      </div>
    </div>
  );
};

export default Main;
