import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

import './index.css';
import "typeface-gaegu";

import Layout from './pages/layout';
import NotFound from './pages/notfound';
import reportWebVitals from './reportWebVitals';

// I have spent way to long on this and I just can't do it anymore.
// No idea why setCurrentGuess keeps freezing my app. Looked everywhere online for solutions but jsut can't figure it out.
// Regardless, I've gotten great practice managing React and its variables, so I'm satisfied. It's very very close and the bulk
// of the hard work, setting up the app and getting it running (as well as the settings and stats!), seems to be working.
// I just think that at this point, my time is better spent working towards the final project.
// When line 34 was uncommented (replacing line 33), for some reason "solution" would always end up null (i.e. NaN) no matter what.
// React just couldn't handle using maxGuessValue to derive the solution number, I suppose?

export default function GuessApp() {
  // For stats
  const [lifetimeGuesses, setLifetimeGuesses] = useState("0");
  const [wins, setWins] = useState("0");

  // For settings
  const [guessesAllowed, setGuessesAllowed] = useState("10");
  const [maxGuessValue, setMaxGuessValue] = useState("50");

  // For game
  const [currentGuess, setCurrentGuess] = useState('-1');
  var totalGuesses = 0;
  var solution = 42;
  //var solution = Math.floor(Math.random * {maxGuessValue});

  function ResetGame() {
    setCurrentGuess("");
    solution = Math.floor(Math.random * {maxGuessValue});
    totalGuesses = 0;
  }

  function Game() {
    if (currentGuess == -1) {
      return (
        <>
          <h1>
            Welcome to Guessing Game!
          </h1>
          <form>
            <label>
              Your Guess: <input type="number" min="0" max={maxGuessValue} value={currentGuess} onChange={(e) => setCurrentGuess(e.target.value)}/>
            </label>
          </form>
        </>
      )
    }
    else if (totalGuesses > guessesAllowed) {
      // Make a guess
      totalGuesses += 1;

      if (currentGuess == solution) {
        // Update statistic variables
        setWins(wins + 1);
        setLifetimeGuesses(lifetimeGuesses + totalGuesses);
        return (
          <>
            <h1>
              Congratulations! You guessed the number!
            </h1>
            <button onClick={ResetGame}>Play again?</button>
          </>
        )
      }
      else if (currentGuess > solution) {
        // Guessed low
        return (
          <>
            <h1>
              Guesses left: ({guessesAllowed} - {totalGuesses})
            </h1>
            <h2>
              Your guess, {currentGuess}, was LESS than the secret number!
            </h2>
            <form>
              <label>
                Your Guess: <input type="number" min="0" max={maxGuessValue} value={currentGuess} onChange={(e) => setCurrentGuess(e.target.value)}/>
              </label>
            </form>
          </>
        );
      }
      else {
        // Guessed high
        return (
          <>
            <h1>
              Guesses left: ({guessesAllowed} - {totalGuesses})
            </h1>
            <h2>
              Your guess, {currentGuess}, was GREATER than the secret number!
            </h2>
            <form>
              <label>
                Your Guess: <input type="number" min="0" max={maxGuessValue} value={currentGuess} onChange={(e) => setCurrentGuess(e.target.value)}/>
              </label>
            </form>
          </>
        );
      }
    }
    else {
      // Play is unsuccessful, update with total number of guesses
      setLifetimeGuesses(lifetimeGuesses + totalGuesses);
      return (
        <>
          <h1>
            The number was {solution}. Better luck next time! curr is {currentGuess}!
          </h1>
          <button onClick={ResetGame}>Play again?</button>
        </>
      );
    }
  };

  function Stats() {
    return (
      <>
        <h1>Number of correct guesses: {wins}</h1>
        <h1>Average number of guesses per win: {wins} / {lifetimeGuesses}</h1>
      </>
    )
  };

  function Settings() {
      return (
        <>
          <form>
              <label>
                  Guesses allowed: <input type="number" id="guessesAllowed" min="1" max="50" step="1" value={guessesAllowed} onChange={changeGuessesAllowed}/>
              </label>
              <br/>
              <label>
                  Range: 0 to <input type="number" id="range" min="10" max="200" step="1" value={maxGuessValue} onChange={changeRange}/>
              </label>
          </form>
        </>
      );
  };

  const changeGuessesAllowed = (e) => {
    setGuessesAllowed(e.target.value)
  };

  const changeRange = (e) => {
    setMaxGuessValue(e.target.value)
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Game />} />
          <Route path="stats" element={<Stats />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<GuessApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();