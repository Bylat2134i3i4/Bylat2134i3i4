import React, { useState } from 'react';
import MainCss from './Styles/Main.module.css';
import classNames from 'classnames';
import validator from 'validator';
import InputMask from 'react-input-mask';

const Main = () => {
  const [InputValue, ChangeInputValue] = useState("");
  const [ImgURL, ChangeImgURL] = useState("https://andraursuta.com/wp-content/uploads/2017/04/penguin.jpg");
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
    if (PhoneInputs.Value1 !== PhoneInputs.Value2){
      if (!Regular_Expression_For_Phone.test(PhoneInputs.Value1) || !Regular_Expression_For_Phone.test(PhoneInputs.Value2)){
        ChangeErrProne({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
      }else{
        ChangePhoneInputs({Value1: "", Value2: ""});
        ChangeErrProne({Show1: "shadow-lg shadow-green-500", Show2: "shadow-lg shadow-green-500"});
      }
    }else{
      ChangeErrProne({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
    }
  }

  const CheckPassInputs = () => {
    const Regular_Expression_For_Pass = /[a-z][0-9][a-z][0-9][a-z][0-9]/;
    if (PassInputs.Value1 !== PassInputs.Value2){
      if (!Regular_Expression_For_Pass.test(PassInputs.Value1) || !Regular_Expression_For_Pass.test(PassInputs.Value2)){
        ChangeErrPass({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
      }else{
        ChangePassInputs({Value1: "", Value2: ""});
        ChangeErrPass({Show1: "shadow-lg shadow-green-500", Show2: "shadow-lg shadow-green-500"});
      }
    }else{
      ChangeErrPass({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
    }
  }
  
  return (
    <div className={MainCss.Settig__Main_base}>
      <div className={MainCss.base__TopBlock}>
        <div className={MainCss.TopBlock__LeftSide}>
          <img className={MainCss.LeftSide__Img} src={ImgURL} alt=""/>
        </div>
        <div className={MainCss.TopBlock__RightSide}>
          <div className={MainCss.RightSide__MainText}>Изменить изображение профиля</div>
          <input value={InputValue} placeholder="Ссылка на изображение" onChange={el => {ChangeInputValue(el.target.value)}} className={classNames(MainCss.RightSide__Input, ErrorReactionURL)}/>
          <button className={MainCss.RightSide__Button} onClick={() => {
            if (CheckInputValue()){
              ChangeImgURL(InputValue);
              ChangeErrorReactionURL("shadow-lg shadow-green-500");
              setTimeout(() => {Base()}, 5000)
            }else{
              ChangeErrorReactionURL("shadow-lg shadow-red-500");
              setTimeout(() => {Base()}, 5000)
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
          <button className={MainCss.BlockLeft__Button} onClick={() => {CheckPhoneInputs(); setTimeout(() => {ChangeErrProne({Show1: "", Show2: ""})}, 3000)}}> 
            Сохранить
          </button>
        </div>
        <div className={MainCss.BottonBlock__Block}>
          <div className={MainCss.BlockLeft__TextBlock}>Изменить пароль</div>
          <InputMask mask={"a9a9a9"} value={PassInputs.Value1} onChange={el => ChangePassInputs({Value1:el.target.value, Value2:PassInputs.Value2})} className={classNames(MainCss.BlockLeft__Input, ErrorPassInputs.Show1)} placeholder='текущий пароль' alwaysShowMask/>
          <InputMask mask={"a9a9a9"} value={PassInputs.Value2} onChange={el => ChangePassInputs({Value1:PassInputs.Value1, Value2:el.target.value})} className={classNames(MainCss.BlockLeft__Input, ErrorPassInputs.Show2)} placeholder='новый пароль'  alwaysShowMask/>
          <button className={MainCss.BlockLeft__Button} onClick={() => {CheckPassInputs(); setTimeout(() => {ChangeErrPass({Show1: "", Show2: ""})}, 3000)}}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;