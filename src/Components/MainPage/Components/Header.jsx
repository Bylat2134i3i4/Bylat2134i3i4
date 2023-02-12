import React, { useState } from 'react';
import HeaderCss from './Styles/Header.module.css';
import {AiFillProfile} from 'react-icons/ai';
import {HiMagnifyingGlass} from 'react-icons/hi2';

const Header = (props) => {
  const [InputValue, ChangeInputValue] = useState("");
  
  return (
    <div className={HeaderCss.MainPage__Header_main}>
      <div className={HeaderCss.MainPage__Header_TextBlock}>Викторина</div>
      <div className={HeaderCss.MainPage__Header_AnotherBlock}>
        <div className={HeaderCss.AnotherBlock_Block}>
          <button className={HeaderCss.AnotherBlock_Button} onClick={() => props.StateCreateFolder()}>создать папку</button>
        </div>
        <div className={HeaderCss.AnotherBlock_Block}>
          <div className={HeaderCss.AnotherBlock_InputBlock}>
            <input value={InputValue} placeholder='поиск...' className={HeaderCss.AnotherBlock_InputBlock_Input} onChange={el=>{ChangeInputValue(el.target.value)}}/>
            <HiMagnifyingGlass className={HeaderCss.AnotherBlock_InputBlock_Icon} onClick={() => props.ChangeStringSearh(InputValue)}/>
          </div>
          <AiFillProfile className={HeaderCss.AnotherBlock_Burger} onClick={() => props.StateLeftBar()}/>
        </div>
      </div>
    </div>
  );
}

export default Header;