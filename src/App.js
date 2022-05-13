import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import gameStateReducer from './reducers/gameStateReducer';
import SnippetSelector from './SnippetSelector';

const App = () => {
  const buttonTextItems = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hangout? The Foo Bar'
  ];
  const initialGameState = {
    victory: false,
    startTime: null,
    totalTime: null,
  };

  const [films, setFilms]= useState([]);
  // const [gameState, setGameState] = useState(initialGameState);
  const [hasError, setErrors] = useState(false);
  const [snippet, setSnippet] = useState('');
  const [userText, setUserText] = useState('');
  const [wins, setWins] = useState(0);

  const [gameState, dispatch] = useReducer(gameStateReducer, initialGameState);

  const chooseSnippet = (selectedSnippet) => {
    const action = {
      type: 'start',
      payload: { ...initialGameState, startTime: Date.now() },
    }
    dispatch(action);
    setSnippet(selectedSnippet);
    // setGameState({
    //   ...initialGameState,
    //   startTime: new Date().getTime()
    // });
    setUserText('');
  };

  const fetchData = async () => {
    const response = await fetch(
      'https://ghibliapi.herokuapp.com/films?limit=3'
    );
    response
      .json()
      .then((response) => setFilms(response))
      .catch((err) => setErrors(err));
  }

  const updateUserText = (e) => {
    const userText = e.target.value;
    setUserText(userText);
    if (userText && userText === snippet) {
      // setGameState({
      //   ...gameState,
      //   totalTime: new Date().getTime() - gameState.startTime,
      //   victory: true,
      // });
      const action = {
        type: 'victory',
        payload: {
          totalTime: Date.now() - gameState.startTime,
          victory: true,
        },
      };
      dispatch(action);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if(gameState.victory) {
      document.title= 'Victory!';
    }
    setWins(wins + 1);
  }, [gameState]);

  return (
    <div className='App'>
      <h2>TypeRace</h2>
      <hr />
      <h3>Snippet</h3>
      <div>{snippet}</div>
      {
        gameState.victory
        ? <h4>{`Done! Woot! Time: ${gameState.totalTime}ms`}</h4>
        : null
      }
      <input
        value={userText}
        onChange={updateUserText}
        disabled={gameState.victory}
      />
      <hr />
      <SnippetSelector chooseSnippet={chooseSnippet} films={films} />
      <>{hasError ? 'An error has occurred' : null}</>
    </div>
  );
};

export default App;
