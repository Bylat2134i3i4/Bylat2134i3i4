import React, { useState } from 'react';
import SetFolCss from './SetFol.module.css';
import Header from './../Profile/Components/Header';
import CardSettingBlock from './Components/CardSetBlock';
import CardBlock from './Components/CardBlock';

const SetFol = () => {
  const [InputValue, ChangeInputValue] = useState({
    Value1: "",
    Value2: ""
  });

  const ChangeInput = (Front, Back) => {
    ChangeInputValue({Value1: Front, Value2: Back})
  }

  return (
    <div className={SetFolCss.SettingFolder__main}>
      <div className={SetFolCss.main__LeftSide}>
        <div className={SetFolCss.LeftSide__Folder}>Название папки</div>
        <div className={SetFolCss.LeftSide__Folder}>Название папки</div>
        <div className={SetFolCss.LeftSide__Folder}>Название папки</div>
        <div className={SetFolCss.LeftSide__Folder}>Название папки</div>
        <div className={SetFolCss.LeftSide__Folder}>Название папки</div>
      </div>
      <div className={SetFolCss.main__RightSide}>
        <div className={SetFolCss.RightSide__Header}>
          <Header />
        </div>
        <div className={SetFolCss.RightSide__CardBlock}>
          <CardBlock ChangeInput={ChangeInput}/>
          <CardBlock ChangeInput={ChangeInput}/>
          <CardBlock ChangeInput={ChangeInput}/>
        </div>
        <div className={SetFolCss.RightSide__CardSettingBlock}>
          <CardSettingBlock InputValue={InputValue} ChangeInputValue={ChangeInputValue}/>
        </div>
      </div>
    </div>
  );
}

export default SetFol;