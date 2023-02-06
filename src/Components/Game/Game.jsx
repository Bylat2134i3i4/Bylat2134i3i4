import React from 'react';
import Header from './../Profile/Components/Header';
import Main from './Components/Main';
import GameCss from './Game.module.css'

const Game = () => {
  return (
    <div className={GameCss.Game__base}>
      <div className={GameCss.base__header}>
        <Header />
      </div>
      <div className={GameCss.base__main}>
        <Main />
      </div>
    </div>
  );
}

export default Game;