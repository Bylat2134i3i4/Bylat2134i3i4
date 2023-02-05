import React from 'react';
import LeftBarCss from './Styles/LeftBar.module.css';

const SettBotFold = () => {
  return (
    <div className={LeftBarCss.MainPage__LeftBar_main}>
    <div className={LeftBarCss.MainPage__LeftBar_TopBlock}>
      <img className={LeftBarCss.TopBlock__img} src="https://andraursuta.com/wp-content/uploads/2017/04/penguin.jpg" alt=""/>
    </div>
    <div className={LeftBarCss.MainPage__Header_BottomBlock}>
      <div className={LeftBarCss.BottomBlock_GeneralBlock}>
        <button className={LeftBarCss.GeneralBlock_button}>добавить в новую папку</button>
        <hr className={LeftBarCss.GeneralBlock_hr}/>
        <button className={LeftBarCss.GeneralBlock_button}>добавить в существующую папку</button>
      </div>
    </div>
  </div>
  );
}

export default SettBotFold;