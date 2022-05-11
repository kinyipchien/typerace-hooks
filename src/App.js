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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
