import React from 'react';
import ProfileCss from './Profile.module.css';
import Header from './Components/Header';
import Main from './Components/Main';
import { useSelector } from 'react-redux';

const Profile = () => {
  const CurrentPerson = useSelector((state) => state.Autoris.list.person);
  const CurrentPersonFolders = useSelector((state) => state.Autoris.list.folders);
  const Cards = useSelector((state) => state.Autoris.list.cards);

  const CountFolders = CurrentPersonFolders.length;
  const CountCards = Cards.length;

  return (
    <div className={ProfileCss.Profile__base}>
      <div className={ProfileCss.Profile__header}>
        <Header />
      </div>
      <div className={ProfileCss.Profile__main}>
        <div className={ProfileCss.main__LeftSide}>
          <img className={ProfileCss.LeftSide__Img} src={CurrentPerson[0].icon} alt='' />
          <div className={ProfileCss.LeftSide__TextBlock}>{CurrentPerson[0].name}</div>
        </div>
        <div className={ProfileCss.main__RightSide}>
          <Main data={CurrentPerson[0]} emount_card={CountCards} emount_folders={CountFolders} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
