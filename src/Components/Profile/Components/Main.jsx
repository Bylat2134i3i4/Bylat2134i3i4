import React, {useState} from 'react';
import MainCss from './Styles/Main.module.css';
import {AiFillEye} from 'react-icons/ai';
import classNames from 'classnames';

const Main = () => {
  const [Type, ChangeType] = useState({
    Type1: "password",
    Type2: "password"
  });
  const [color, ChangeColor] = useState({
    Color1: "text-black",
    Color2: "text-black"
  })
  const Helper = (ChangedInput) => {
    if (ChangedInput === 1){
      if (Type.Type1==="text"){
        ChangeColor({Color1: "text-black", Color2: color.Color2});
        ChangeType({Type1: "password", Type2: Type.Type2});
      }else{
        ChangeColor({Color1: "text-white", Color2: color.Color2});
        ChangeType({Type1: "text", Type2: Type.Type2});
      }
    }else{
      if (Type.Type2==="text"){
        ChangeColor({Color1: color.Color1, Color2: "text-black"});
        ChangeType({Type1: Type.Type1, Type2: "password"});
      }else{
        ChangeColor({Color1: color.Color1, Color2: "text-white"});
        ChangeType({Type1: Type.Type1, Type2: "text"});
      }
    }
  }
  return (
    <div className={MainCss.Main__base}>
      <div className={MainCss.Base__GeneralBlock}>
        <div className={MainCss.GeneralBlock_TextBlock}>Телефон</div>
        <div className={MainCss.GeneralBlock_InputBlock}>
          <input type={Type.Type1} value={"+79274139312"} className={MainCss.InputBlock_Input} onChange={() => ""}/>
          <AiFillEye className={classNames(MainCss.InputBlock_Icon, color.Color1)} onClick={() => Helper(1)}/>
        </div>
      </div>
      <div className={MainCss.Base__GeneralBlock}>
        <div className={MainCss.GeneralBlock_TextBlock}>Пароль</div>
        <div className={MainCss.GeneralBlock_InputBlock}>
          <input type={Type.Type2} value={"w9w9w9"} className={MainCss.InputBlock_Input} onChange={() => ""}/>
          <AiFillEye className={classNames(MainCss.InputBlock_Icon, color.Color2)} onClick={() => Helper(2)}/>
        </div>
      </div>
      <div className={MainCss.Base__GeneralBlock}>
        <div className={MainCss.GeneralBlock_EazyText}>Общее число папок </div>
        <div className={MainCss.GeneralBlock_EazyText}>0</div>
      </div>
      <div className={MainCss.Base__GeneralBlock}>
        <div className={MainCss.GeneralBlock_EazyText}>Общее число карточек </div>
        <div className={MainCss.GeneralBlock_EazyText}>0</div>
      </div>
    </div>
  );
}

export default Main;