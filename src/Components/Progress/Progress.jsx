import React from 'react';
import Header from './../Profile/Components/Header';
import ProgressCss from './Progress.module.css';
import Main from './Components/Main';

const Progress = () => {
  return (
    <div className={ProgressCss.Progress__Header_base}>
      <div className={ProgressCss.bain__Header}>
        <Header />
      </div>
      <div className={ProgressCss.bain__Main}>
        <Main />
      </div>
    </div>
  );
}

export default Progress;