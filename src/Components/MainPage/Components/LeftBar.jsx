import React from 'react';
import LeftBarCss from './Styles/LeftBar.module.css';
import {NavLink} from 'react-router-dom';

const LeftBar = () => {
  return (
    <div className={LeftBarCss.MainPage__LeftBar_main}>
      <div className={LeftBarCss.MainPage__LeftBar_TopBlock}>
        <img className={LeftBarCss.TopBlock__img} src="https://andraursuta.com/wp-content/uploads/2017/04/penguin.jpg" alt=""/>
      </div>
      <div className={LeftBarCss.MainPage__Header_BottomBlock}>
        <div className={LeftBarCss.BottomBlock_GeneralBlock}>
          <NavLink to="/general/profile"><button className={LeftBarCss.GeneralBlock_button}>Профиль</button></NavLink>
          <hr className={LeftBarCss.GeneralBlock_hr}/>
          <NavLink to="/general/progress"><button className={LeftBarCss.GeneralBlock_button}>Прогресс</button></NavLink>
          <hr className={LeftBarCss.GeneralBlock_hr}/>
          <NavLink to="/general/settings"><button className={LeftBarCss.GeneralBlock_button}>Настройки</button></NavLink>
          <hr className={LeftBarCss.GeneralBlock_hr}/>
          <NavLink to="/"><button className={LeftBarCss.GeneralBlock_button}>Выход</button></NavLink>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;