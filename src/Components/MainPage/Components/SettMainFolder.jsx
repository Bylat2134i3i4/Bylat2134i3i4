import React from 'react';
import LeftBarCss from './Styles/LeftBar.module.css';
import { NavLink } from 'react-router-dom';

const SettMainFold = () => {
  return (
    <div className={LeftBarCss.MainPage__LeftBar_main}>
    <div className={LeftBarCss.MainPage__LeftBar_TopBlock}>
      <img className={LeftBarCss.TopBlock__img} src="https://andraursuta.com/wp-content/uploads/2017/04/penguin.jpg" alt=""/>
    </div>
    <div className={LeftBarCss.MainPage__Header_BottomBlock}>
      <div className={LeftBarCss.BottomBlock_GeneralBlock}>
        <NavLink to="/general/setting_folder"><button className={LeftBarCss.GeneralBlock_button}>править папку</button></NavLink>
        <hr className={LeftBarCss.GeneralBlock_hr}/>
        <NavLink to="/general/game"><button className={LeftBarCss.GeneralBlock_button}>начать игру</button></NavLink>
        <hr className={LeftBarCss.GeneralBlock_hr}/>
        <button className={LeftBarCss.GeneralBlock_button}>удалить</button>
      </div>
    </div>
  </div>
  );
}

export default SettMainFold;