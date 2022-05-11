import React, { useState } from 'react';
import './App.css';

const App = () => {
  const buttonTextItems = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hangout? The Foo Bar'
  ];
  const initialGameState = {
    victory: null,
    startTime: null,
    endTime: null
  };
  const [snippet, setSnippet] = useState('');
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(initialGameState);
  const chooseSnippet = (index) => {
    setSnippet(buttonTextItems[index]);
    setGameState({
      ...initialGameState,
      startTime: new Date().getTime()
    });
  };
  const updateUserText = (e) => {
    setUserText(e.target.value);
    if (e.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      })
    }
  };
  return (
    <div className='App'>
      <h2>TypeRace</h2>
      <hr />
      <h3>Snippet</h3>
      <div>{snippet}</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <h4>{
        gameState.victory
        ? `Done! Woot! Time: ${gameState.endTime}ms`
        : null
      }</h4>
      <input
        value={userText}
        onChange={updateUserText}
      />
      <hr />
      {buttonTextItems.map((textItem, index) => (
        <button
          key={textItem}
          onClick={() => chooseSnippet(index)}
        >
          {textItem}
        </button>
      ))}
    </div>
  );
};

export default App;
