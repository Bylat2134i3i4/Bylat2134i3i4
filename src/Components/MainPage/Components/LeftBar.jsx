import React from 'react';
import LeftBarCss from './Styles/LeftBar.module.css';
import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {CloseField} from './../../../State/AutorisSlice';

const LeftBar = () => {
  const dispatch = useDispatch();

  const CloseFieldEvent = (id) => {
    dispatch(CloseField({id: id}));
  }

  const CurrentPerson = useSelector(state => state.Autoris.list.persons).filter(el => el.online === true);
  return (
    <div className={LeftBarCss.MainPage__LeftBar_main}>
      <div className={LeftBarCss.MainPage__LeftBar_TopBlock}>
        <img className={LeftBarCss.TopBlock__img} src={CurrentPerson[0].icon} alt=""/>
      </div>
      <div className={LeftBarCss.MainPage__Header_BottomBlock}>
        <div className={LeftBarCss.BottomBlock_GeneralBlock}>
          <NavLink to="/general/profile"><button className={LeftBarCss.GeneralBlock_button}>Профиль</button></NavLink>
          <hr className={LeftBarCss.GeneralBlock_hr}/>
          <NavLink to="/general/progress"><button className={LeftBarCss.GeneralBlock_button}>Прогресс</button></NavLink>
          <hr className={LeftBarCss.GeneralBlock_hr}/>
          <NavLink to="/general/settings"><button className={LeftBarCss.GeneralBlock_button}>Настройки</button></NavLink>
          <hr className={LeftBarCss.GeneralBlock_hr}/>
          <NavLink to="/"><button className={LeftBarCss.GeneralBlock_button} onClick={() => CloseFieldEvent(CurrentPerson[0].id)}>Выход</button></NavLink>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;