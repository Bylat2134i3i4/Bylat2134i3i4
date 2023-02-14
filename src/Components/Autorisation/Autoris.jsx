import AutoCss from './../StylesForRegAutoris/Styles.module.css';
import InputMask from 'react-input-mask';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {AiFillEye} from 'react-icons/ai';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {ChangeOnline, InitBase} from './../../State/AutorisSlice';

const Reg = () => {
  const dispatch = useDispatch();
  const load = useSelector(state => state.Autoris.list.StatusOfLoad);
  const [ShowInputs, ChangeShowInputs] = useState("hidden");

  useEffect(() => {
    if (load === "load"){
      dispatch(InitBase());
    }
    if (load === "installed"){
      ChangeShowInputs("flex");
    }
  }, [dispatch, load]);

  const list = useSelector(state => state.Autoris.list.persons);

  const navite = useNavigate();
  const [InputType, ChangeInputType] = useState("text");
  const [EyeColor, ChangeEyeType] = useState("text-white");
  const [ErrorColor, ChangeErrorColor] = useState({
    FirstInputRed: "",
    SecondInputRed: ""
  });
  const [PhoneInput, ChangePhoneInput] = useState("");
  const [PasswordInput, ChangePasswordInput] = useState("");

  const CheckInput = () => {
    const Regular_Expression_For_Phone = /.7.9[+ 0-9]{2}.[+ 0-9]{7}/;
    const Regular_Expression_For_FIO = /[a-z][0-9][a-z][0-9][a-z][0-9]/;
    if (!Regular_Expression_For_Phone.test(PhoneInput)){
      return '1';
    }
    if (!Regular_Expression_For_FIO.test(PasswordInput)){
      return '2';
    }else{
      return '0';
    }
  }

  const ChangeUserOnline = (id) => {
    dispatch(ChangeOnline(id));
  }


  return (
    <div className={classNames(AutoCss.App__main, ShowInputs==="hidden" ? "animate-pulse" : "animate-none")}>
      <div className={AutoCss.App__MettingTextBlock}>{ShowInputs==="hidden" ? "Загрузка данных" : "Авторизация"}</div>
      <div className={classNames("flex flex-col w-full h-auto items-center", ShowInputs)}>
          <InputMask mask={"+7(\\999)9999999"} className={classNames(AutoCss.App__InputBlock_Input, ErrorColor.FirstInputRed)} alwaysShowMask value={PhoneInput} onChange={el => ChangePhoneInput(el.target.value)}/>
          <div className={classNames(AutoCss.App__InputBlock_Input, ErrorColor.SecondInputRed)}>
            <InputMask mask={"a9a9a9"} value={PasswordInput} onChange={el => ChangePasswordInput(el.target.value)} type={InputType} className={AutoCss.App__InputBlock_PasswordInput} alwaysShowMask/>
            <NavLink to="/"><AiFillEye className={classNames(AutoCss.App__InputBlock_Eye, EyeColor, ErrorColor)} onClick={() => 
              {
              ChangeInputType(InputType === "text" ? "password" : "text");
              ChangeEyeType(InputType === "password" ? "text-white" : "text-black")  
              }
            }/></NavLink>
          </div>
      </div>
      <div className={classNames("flex-col h-auto w-full items-stretch", ShowInputs)}>
        <div className={AutoCss.App__LinkBlock_AutorisLinkBlock}>
          <NavLink to='/registration' className={AutoCss.App__LinkBlock_AutorisLinkBlock_Link} 
          >Хотите зарегистрироваться?</NavLink>
        </div>
        <div className={AutoCss.App__LinkBlock_ButtonBlock}>
          <button className={AutoCss.App__LinkBlock_ButtonBlock_Button} onClick={
            () => {
                if (CheckInput() === "0"){
                  const CurrentUser = list.filter(el => el.login === PhoneInput && el.password === PasswordInput);
                  if (list.length !== 0 && CurrentUser.length !== 0){
                    ChangeUserOnline(CurrentUser[0].id);
                    ChangeErrorColor({
                      FirstInputRed: "shadow-lg shadow-green-700",
                      SecondInputRed: "shadow-lg shadow-green-700"
                    });
                    setTimeout(() => {navite("/general");}, 3000)
                  }else{
                    ChangeErrorColor({
                      FirstInputRed: "shadow-lg shadow-red-500",
                      SecondInputRed: "shadow-lg shadow-red-500"
                    });
                  }
                }
                if (CheckInput() === "1"){
                  ChangeErrorColor({
                    FirstInputRed: "shadow-lg shadow-red-500",
                    SecondInputRed: ""
                  });
                }
                if (CheckInput() === "2"){
                  ChangeErrorColor({
                    FirstInputRed: "",
                    SecondInputRed: "shadow-lg shadow-red-500"
                  });
                }
            }
          }>Войти</button>
        </div>
      </div>
    </div>
  );
}

export default Reg;