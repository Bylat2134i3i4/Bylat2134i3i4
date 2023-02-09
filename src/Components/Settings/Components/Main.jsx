import React, { useState } from 'react';
import MainCss from './Styles/Main.module.css';
import classNames from 'classnames';
import validator from 'validator';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector} from 'react-redux';
import {ChangeIcon, ChangeLogin, ChangePassword} from './../../../State/AutorisSlice';

const Main = () => {
  const dispatch = useDispatch();
  const Persons = useSelector(state => state.Autoris.list.persons);
  const CurrentPerson = useSelector(state => state.Autoris.list.persons).filter(el => el.online === true);
  const [InputValue, ChangeInputValue] = useState("");
  const [ErrorReactionURL, ChangeErrorReactionURL] = useState("");
  const [PhoneInputs, ChangePhoneInputs] = useState({
    Value1: "",
    Value2: ""
  });
  const [ErrorPhoneInputs, ChangeErrProne] = useState({
    Show1: "",
    Show2: ""
  });
  const [PassInputs, ChangePassInputs] = useState({
    Value1: "",
    Value2: ""
  });
  const [ErrorPassInputs, ChangeErrPass] = useState({
    Show1: "",
    Show2: ""
  });

  const ChangeIconEvent = (icon) => {
    dispatch(ChangeIcon({icon: icon}));
  }
  const ChangeLoginEvent = (login) => {
    dispatch(ChangeLogin({login: login}));
  }
  const ChangePasswordEvent = (password) => {
    dispatch(ChangePassword({password: password}));
  }

  const CheckInputValue = () => {
    // const Regular_Expression_URL = /[A-Za-z0-9./:;-=+?!_]+\.jpg/;
    // && Regular_Expression_URL.test(InputValue)
    if (validator.isURL(InputValue)){
      return true;
    }else{
      return false;
    }
  }

  const Base = () => {
    ChangeErrorReactionURL("");
  }

  const CheckPhoneInputs = () => {
    const Regular_Expression_For_Phone = /.7.9[+ 0-9]{2}.[+ 0-9]{7}/;
    const isTrue = Persons.some(el => el.login === PhoneInputs.Value2);
    console.log("То что ввел пользователь "+PhoneInputs.Value1);
    console.log("То что в базе "+CurrentPerson[0].login);
    if (PhoneInputs.Value1 !== PhoneInputs.Value2){
      if (!Regular_Expression_For_Phone.test(PhoneInputs.Value1) || !Regular_Expression_For_Phone.test(PhoneInputs.Value2) || !(PhoneInputs.Value1===CurrentPerson[0].login) || isTrue){
        ChangeErrProne({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
        return false;
      }else{
        ChangeErrProne({Show1: "shadow-lg shadow-green-500", Show2: "shadow-lg shadow-green-500"});
        return true;
      }
    }else{
      ChangeErrProne({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
      return false;
    }
  }

  const CheckPassInputs = () => {
    const Regular_Expression_For_Pass = /[a-z][0-9][a-z][0-9][a-z][0-9]/;
    const isTrue = Persons.some(el => el.password === PassInputs.Value2);
    if (PassInputs.Value1 !== PassInputs.Value2){
      if (!Regular_Expression_For_Pass.test(PassInputs.Value1) || !Regular_Expression_For_Pass.test(PassInputs.Value2) || !(PassInputs.Value1===CurrentPerson[0].password) || isTrue){
        ChangeErrPass({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
        return false;
      }else{
        ChangeErrPass({Show1: "shadow-lg shadow-green-500", Show2: "shadow-lg shadow-green-500"});
        return true;
      }
    }else{
      ChangeErrPass({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
      return false;
    }
  }
  
  return (
    <div className={MainCss.Settig__Main_base}>
      <div className={MainCss.base__TopBlock}>
        <div className={MainCss.TopBlock__LeftSide}>
          <img className={MainCss.LeftSide__Img} src={CurrentPerson[0].icon} alt=""/>
        </div>
        <div className={MainCss.TopBlock__RightSide}>
          <div className={MainCss.RightSide__MainText}>Изменить изображение профиля</div>
          <input value={InputValue} placeholder="Ссылка на изображение" onChange={el => {ChangeInputValue(el.target.value)}} className={classNames(MainCss.RightSide__Input, ErrorReactionURL)}/>
          <button className={MainCss.RightSide__Button} onClick={() => {
            if (CheckInputValue()){
              ChangeIconEvent(InputValue);
              ChangeErrorReactionURL("shadow-lg shadow-green-500");
              setTimeout(() => {Base(); ChangeInputValue("")}, 3000)
            }else{
              ChangeErrorReactionURL("shadow-lg shadow-red-500");
              setTimeout(() => {Base()}, 3000)
            }
          }      
          }>Сохранить</button>
        </div>
      </div>
      <div className={MainCss.base__BottonBlock}>
        <div className={MainCss.BottonBlock__Block}>
          <div className={MainCss.BlockLeft__TextBlock}>Изменить номер телефона</div>
          <InputMask mask={"+7(\\999)9999999"} value={PhoneInputs.Value1} onChange={el => ChangePhoneInputs({Value1:el.target.value, Value2:PhoneInputs.Value2})} className={classNames(MainCss.BlockLeft__Input, ErrorPhoneInputs.Show1)} placeholder='текущий номер' alwaysShowMask/>
          <InputMask mask={"+7(\\999)9999999"} value={PhoneInputs.Value2} onChange={el => ChangePhoneInputs({Value1:PhoneInputs.Value1, Value2:el.target.value})} className={classNames(MainCss.BlockLeft__Input, ErrorPhoneInputs.Show2)} placeholder='новый номер' alwaysShowMask/>
          <button className={MainCss.BlockLeft__Button} onClick={
            () => {
              if (CheckPhoneInputs()){
                setTimeout(() => {ChangeErrProne({Show1: "", Show2: ""})}, 3000)
                ChangeLoginEvent(PhoneInputs.Value2);
                ChangePhoneInputs({Value1: "", Value2: ""});
              }
            }
            }> 
            Сохранить
          </button>
        </div>
        <div className={MainCss.BottonBlock__Block}>
          <div className={MainCss.BlockLeft__TextBlock}>Изменить пароль</div>
          <InputMask mask={"a9a9a9"} value={PassInputs.Value1} onChange={el => ChangePassInputs({Value1:el.target.value, Value2:PassInputs.Value2})} className={classNames(MainCss.BlockLeft__Input, ErrorPassInputs.Show1)} placeholder='текущий пароль' alwaysShowMask/>
          <InputMask mask={"a9a9a9"} value={PassInputs.Value2} onChange={el => ChangePassInputs({Value1:PassInputs.Value1, Value2:el.target.value})} className={classNames(MainCss.BlockLeft__Input, ErrorPassInputs.Show2)} placeholder='новый пароль'  alwaysShowMask/>
          <button className={MainCss.BlockLeft__Button} onClick={
            () => {
              if (CheckPassInputs()){
                setTimeout(() => {ChangeErrPass({Show1: "", Show2: ""})}, 3000);
                ChangePassInputs({Value1: "", Value2: ""});
                ChangePasswordEvent(PassInputs.Value2);
              }
            }
            }>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;