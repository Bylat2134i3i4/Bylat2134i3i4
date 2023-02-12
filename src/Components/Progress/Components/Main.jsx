import React from 'react';
import MainCss from './Styles/Main.module.css';
import Folder from './MainComponent/Folder';
import {useSelector} from 'react-redux';

const Main = () => {
  const CurrentPerson = useSelector(state => state.Autoris.list.persons).filter(el => el.online === true);
  const FolderCurPers = useSelector(state => state.Autoris.list.folders).filter(el => el.user_Id === CurrentPerson[0].id);

  return (
    <div className={MainCss.Main__base}>
      {FolderCurPers.length === 0 ? <div /> : FolderCurPers.map(el => <Folder key={el.id_folder} data={{folder_name: el.name, emount: el.amount_card, icon: CurrentPerson[0].icon, user_name: CurrentPerson[0].name}}/>)}
    </div>
  );
}

export default Main;