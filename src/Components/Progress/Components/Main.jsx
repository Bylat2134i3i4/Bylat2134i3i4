import React from 'react';
import MainCss from './Styles/Main.module.css';
import Folder from './MainComponent/Folder';
import { useSelector } from 'react-redux';

const Main = () => {
  const CurrentPerson = useSelector((state) => state.Autoris.list.person);
  const FolderCurPers = useSelector((state) => state.Autoris.list.folders);
  const Cards = useSelector((state) => state.Autoris.list.cards);

  return (
    <div className={MainCss.Main__base}>
      {FolderCurPers.length === 0 ? (
        <div />
      ) : (
        FolderCurPers.map((el) => (
          <Folder
            key={el.id_folder}
            data={{
              folder_name: el.name,
              emount: el.amount_card,
              icon: CurrentPerson[0].icon,
              user_name: CurrentPerson[0].name,
              cards: Cards.filter((val) => val.id_folder === el.id_folder),
            }}
          />
        ))
      )}
    </div>
  );
};

export default Main;
