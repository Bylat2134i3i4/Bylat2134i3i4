import React from 'react';
import ProfileCss from './Profile.module.css';
import Header from './Components/Header';
import Main from './Components/Main';
import {useSelector} from 'react-redux';

const Profile = () => {
  const Persons = useSelector(state => state.Autoris.list.persons);
  const Folders = useSelector(state => state.Autoris.list.folders);

  const CurrentPerson = Persons.filter(el => el.online === true);
  const CurrentPersonFolders = Folders.filter(el => el.user_Id === CurrentPerson[0].id);
  const CountFolders = CurrentPersonFolders.length;
  let CountCards = 0;
  CurrentPersonFolders.map(el => CountCards = CountCards + el.amount_card);

  return (
    <div className={ProfileCss.Profile__base}>
      <div className={ProfileCss.Profile__header}>
        <Header />
      </div>
      <div className={ProfileCss.Profile__main}>
        <div className={ProfileCss.main__LeftSide}>
          <img className={ProfileCss.LeftSide__Img} src={CurrentPerson[0].icon} alt=""/>
          <div className={ProfileCss.LeftSide__TextBlock}>{CurrentPerson[0].name}</div>
        </div>
        <div className={ProfileCss.main__RightSide}>
          <Main data={CurrentPerson[0]} emount_card={CountCards} emount_folders={CountFolders}/>
        </div>
      </div>
    </div>
  );
}

export default Profile;