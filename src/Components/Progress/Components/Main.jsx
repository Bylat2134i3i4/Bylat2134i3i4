import React from 'react';
import MainCss from './Styles/Main.module.css';
import Folder from './MainComponent/Folder';

const Main = () => {
  return (
    <div className={MainCss.Main__base}>
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
    </div>
  );
}

export default Main;