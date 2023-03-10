import React, { useEffect, useState } from 'react';
import SetFolCss from './SetFol.module.css';
import Header from './../Profile/Components/Header';
import CardSettingBlock from './Components/CardSetBlock';
import CardBlock from './Components/CardBlock';
import { useSelector } from 'react-redux';

const SetFol = () => {
  const FolderCurPers = useSelector((state) => state.Autoris.list.folders).filter(
    (el) => el.focus === true,
  );
  const CurrentCards = useSelector((state) => state.Autoris.list.cards).filter(
    (el) => el.id_folder === FolderCurPers[0].id_folder,
  );

  const [InputValue, ChangeInputValue] = useState({
    Value1: '',
    Value2: '',
  });

  const [CheckedCard, ChangeCheckedCard] = useState(-1);

  const ChangeInput = (Front, Back) => {
    ChangeInputValue({ Value1: Front, Value2: Back });
  };

  let count = 0;

  return (
    <div className={SetFolCss.SettingFolder__main}>
      <div className={SetFolCss.main__RightSide}>
        <div className={SetFolCss.RightSide__Header}>
          <Header />
        </div>
        <div className={SetFolCss.RightSide__CardBlock}>
          {CurrentCards.map((el) => {
            count++;
            return (
              <CardBlock
                key={el.id_card}
                ChangeInput={ChangeInput}
                ChangeCheckedCard={ChangeCheckedCard}
                data={{
                  id_card: el.id_card,
                  order: count,
                  front: el.front,
                  back: el.back,
                  time_create: el.time_create,
                  type_card: el.card_type,
                }}
              />
            );
          })}
        </div>
        <div className={SetFolCss.RightSide__CardSettingBlock}>
          <CardSettingBlock
            InputValue={InputValue}
            ChangeInputValue={ChangeInputValue}
            CheckedCard={CheckedCard}
            ChangeCheckedCard={ChangeCheckedCard}
            Folder_Id={FolderCurPers[0].id_folder}
            folder_name={FolderCurPers[0].name}
          />
        </div>
      </div>
    </div>
  );
};

export default SetFol;
