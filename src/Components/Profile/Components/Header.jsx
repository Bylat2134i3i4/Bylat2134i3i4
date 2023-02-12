import React from 'react';
import HeaderCss from './Styles/Header.module.css';
import {BsDoorClosedFill} from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {CloseFocus} from './../../../State/AutorisSlice';

const Header = () => {
  const dispatch = useDispatch();

  const CloseFocusEvent = () => {
    dispatch(CloseFocus());
  }

  return (
    <div className={HeaderCss.Profile__Header_main}>
      <div className={HeaderCss.Header__TextBlock}>Викторина</div>
      <NavLink to="/general"><BsDoorClosedFill className={HeaderCss.Header__Icon} onClick={() => {CloseFocusEvent()}}/></NavLink>
    </div>
  );
}

export default Header;