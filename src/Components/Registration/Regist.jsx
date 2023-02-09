import RegCss from './../StylesForRegAutoris/Styles.module.css';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { NavLink, useNavigate} from 'react-router-dom';
import {AiFillEye} from 'react-icons/ai';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {CreateUser} from './../../State/AutorisSlice';

const Regist = () => {
  const dispatch = useDispatch();
  const persons = useSelector(el => el.Autoris.list.persons);
  const navigate = useNavigate();
  const [InputType, ChangeInputType] = useState("text");
  const [EyeColor, ChangeEyeType] = useState("text-white");
  const [ErrorColor, ChangeErrorColor] = useState({
    FirstInputRed: "",
    SecondInputRed: "",
    ThirdInputRed: ""
  });
  const [PhoneInput, ChangePhoneInput] = useState("");
  const [PasswordInput, ChangePasswordInput] = useState("");
  const [UserNameInput, ChangeUserNameInput] = useState("");

  const ChangeStore = (name, login, password, icon, online) => {
    dispatch(CreateUser({name: name, login: login, password: password, icon: icon, online: online}));
  }

  const CheckInput = () => {
    const Regular_Expression_For_Phone = /.7.9[+ 0-9]{2}.[+ 0-9]{7}/;
    const Regular_Expression_For_Password = /[a-z][0-9][a-z][0-9][a-z][0-9]/;
    const Regular_Expression_For_FIO = /^[а-я]+$/;
    if (!Regular_Expression_For_Phone.test(PhoneInput)){
      return '1';
    }
    if (!Regular_Expression_For_Password.test(PasswordInput)){
      return '2';
    }
    if (!Regular_Expression_For_FIO.test(UserNameInput)){
      return '3';
    }else{
      return '0';
    }
  }

  return (
<div className={RegCss.App__main}>
      <div className={RegCss.App__MettingTextBlock}>Регистрация</div>
      <div className={RegCss.App__InputBlock}>
          <input placeholder='Имя пользователя' className={classNames(RegCss.App__InputBlock_Input, ErrorColor.ThirdInputRed)} value={UserNameInput} onChange={el => {ChangeUserNameInput(el.target.value)}}/>
          <InputMask mask={"+7(\\999)9999999"} className={classNames(RegCss.App__InputBlock_Input, ErrorColor.FirstInputRed)} alwaysShowMask value={PhoneInput} onChange={el => ChangePhoneInput(el.target.value)}/>
          <div className={classNames(RegCss.App__InputBlock_Input, ErrorColor.SecondInputRed)}>
            <InputMask mask={"a9a9a9"} value={PasswordInput} onChange={el => ChangePasswordInput(el.target.value)} type={InputType} className={RegCss.App__InputBlock_PasswordInput} alwaysShowMask/>
            <NavLink to="/registration"><AiFillEye className={classNames(RegCss.App__InputBlock_Eye, EyeColor, ErrorColor)} onClick={() => 
              {
              ChangeInputType(InputType === "text" ? "password" : "text");
              ChangeEyeType(InputType === "password" ? "text-white" : "text-black")  
              }
            }/></NavLink>
          </div>
      </div>
      <div className={RegCss.App__LinkBlock}>
        <div className={RegCss.App__LinkBlock_AutorisLinkBlock}>
          <NavLink to='/' className={RegCss.App__LinkBlock_AutorisLinkBlock_Link}>Уже есть аккаунт?</NavLink>
        </div>
        <div className={RegCss.App__LinkBlock_ButtonBlock}>
          <button className={RegCss.App__LinkBlock_ButtonBlock_Button} onClick={
            () => {
              const IsExist = persons.some(el => el.login === PhoneInput && el.password === PasswordInput && el.name === UserNameInput);
              if (CheckInput() === "0"){
                if (IsExist){
                  ChangeErrorColor({
                    FirstInputRed: "shadow-lg shadow-red-500",
                    SecondInputRed: "shadow-lg shadow-red-500",
                    ThirdInputRed: "shadow-lg shadow-red-500"
                  });
                }else{
                  ChangeErrorColor({
                    FirstInputRed: "shadow-lg shadow-green-600",
                    SecondInputRed: "shadow-lg shadow-green-600",
                    ThirdInputRed: "shadow-lg shadow-green-600"
                  });
                  ChangeStore(UserNameInput, PhoneInput, PasswordInput, "", false);
                  setTimeout(() => {navigate("/")}, 3000);
                }
              }
              if (CheckInput() === "1"){
                ChangeErrorColor({
                  FirstInputRed: "shadow-lg shadow-red-500",
                  SecondInputRed: "",
                  ThirdInputRed: ""
                });
              }
              if (CheckInput() === "2"){
                ChangeErrorColor({
                  FirstInputRed: "",
                  SecondInputRed: "shadow-lg shadow-red-500",
                  ThirdInputRed: ""
                });
              }
              if (CheckInput() === "3"){
                ChangeErrorColor({
                  FirstInputRed: "",
                  SecondInputRed: "",
                  ThirdInputRed: "shadow-lg shadow-red-500"
                });
              }
            }
          }>Зарегистрироваться</button>
        </div>
      </div>
    </div>
  );
}

export default Regist;