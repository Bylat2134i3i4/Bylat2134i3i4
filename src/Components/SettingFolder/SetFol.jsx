import React, { useState } from 'react';
import SetFolCss from './SetFol.module.css';
import Header from './../Profile/Components/Header';
import CardSettingBlock from './Components/CardSetBlock';
import CardBlock from './Components/CardBlock';
import {useSelector} from 'react-redux';
import classNames from 'classnames';
import Comp from './Components/SetFolComponent/Component';

const SetFol = () => {
  const CurrentPerson = useSelector(state => state.Autoris.list.persons).filter(el => el.online === true);
  const FolderCurPers = useSelector(state => state.Autoris.list.folders).filter(el => el.user_Id === CurrentPerson[0].id);
  const [FolderColor, ChangeFolderColor] = useState("");

  const [InputValue, ChangeInputValue] = useState({
    Value1: "",
    Value2: ""
  });

  const [CurrentFolder, ChangeCurrentFolder] = useState(-1);
  const [CheckedCard, ChangeCheckedCard] = useState(-1);

  const ChangeInput = (Front, Back) => {
    ChangeInputValue({Value1: Front, Value2: Back})
  }

  const ChangeColor = () => {
    FolderColor === "" ? ChangeFolderColor("bg-green-500") : ChangeFolderColor("");
  }

  return (
    <div className={SetFolCss.SettingFolder__main}>
      <div className={SetFolCss.main__LeftSide}>
        {FolderCurPers.length === 0 ? <div /> : FolderCurPers.map(el => <Comp key={el.id_folder} ChangeColor={ChangeColor} id_folder={el.id_folder} FolderColor={FolderColor} ChangeCurrentFolder={ChangeCurrentFolder} name={el.name}/>)}
      </div>
      <div className={SetFolCss.main__RightSide}>
        <div className={SetFolCss.RightSide__Header}>
          <Header />
        </div>
        <div className={SetFolCss.RightSide__CardBlock}>
          {FolderCurPers.some(el => el.id_folder === CurrentFolder) ? FolderCurPers.filter(el => el.id_folder === CurrentFolder).map(val => val.card.map(el => <CardBlock key={el.id_card} ChangeInput={ChangeInput} ChangeCheckedCard={ChangeCheckedCard} data={{id_card: el.id_card, front: el.front, back: el.back, time_create: el.time_create}}/>)) : <div />}
        </div>
        <div className={SetFolCss.RightSide__CardSettingBlock}>
          <CardSettingBlock InputValue={InputValue} ChangeInputValue={ChangeInputValue} CheckedCard={CheckedCard} ChangeCheckedCard={ChangeCheckedCard} Folder_Id={CurrentFolder}/>
        </div>
      </div>
    </div>
  );
}

export default SetFol;