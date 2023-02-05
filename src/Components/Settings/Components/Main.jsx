import React, { useState } from 'react';
import MainCss from './Styles/Main.module.css';
import classNames from 'classnames';
import validator from 'validator';

const Main = () => {
  const [InputValue, ChangeInputValue] = useState("");
  const [ImgURL, ChangeImgURL] = useState("https://andraursuta.com/wp-content/uploads/2017/04/penguin.jpg");
  const [ErrorReaction, ChangeErrorReaction] = useState("");

  const CheckInputValue = () => {
    const Regular_Expression_URL = /[A-Za-z0-9./:;-=+?!_]+\.jpg/;
    if (validator.isURL(InputValue) && Regular_Expression_URL.test(InputValue)){
      return true;
    }else{
      return false;
    }
  }
  const Base = () => {
    ChangeErrorReaction("");
  }
  return (
    <div className={MainCss.Settig__Main_base}>
      <div className={MainCss.base__TopBlock}>
        <div className={MainCss.TopBlock__LeftSide}>
          <img className={MainCss.LeftSide__Img} src={ImgURL} alt=""/>
        </div>
        <div className={MainCss.TopBlock__RightSide}>
          <div className={MainCss.RightSide__MainText}>Изменить изображение профиля</div>
          <input value={InputValue} placeholder="Ссылка на изображение" onChange={el => {ChangeInputValue(el.target.value)}} className={classNames(MainCss.RightSide__Input, ErrorReaction)}/>
          <button className={MainCss.RightSide__Button} onClick={() => {
            if (CheckInputValue()){
              ChangeImgURL(InputValue);
              ChangeErrorReaction("shadow-lg shadow-green-500");
              setTimeout(() => {Base()}, 5000)
            }else{
              ChangeErrorReaction("shadow-lg shadow-red-500");
              setTimeout(() => {Base()}, 5000)
            }
          }      
          }>Сохранить</button>
        </div>
      </div>
      <div className={MainCss.base__BottonBlock}>
        <div className={MainCss.BottonBlock__Block}>
          <div className={MainCss.BlockLeft__TextBlock}>Изменить номер телефона</div>
          <input className={MainCss.BlockLeft__Input} placeholder='текущий номер'/>
          <input className={MainCss.BlockLeft__Input} placeholder='новый номер' />
          <button className={MainCss.BlockLeft__Button}>Сохранить</button>
        </div>
        <div className={MainCss.BottonBlock__Block}>
          <div className={MainCss.BlockLeft__TextBlock}>Изменить пароль</div>
          <input className={MainCss.BlockLeft__Input} placeholder='текущий пароль'/>
          <input className={MainCss.BlockLeft__Input} placeholder='новый пароль' />
          <button className={MainCss.BlockLeft__Button}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}

export default Main;