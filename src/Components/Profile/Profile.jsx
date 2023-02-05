import React from 'react';
import ProfileCss from './Profile.module.css';
import Header from './Components/Header';
import Main from './Components/Main';

const Profile = () => {
  return (
    <div className={ProfileCss.Profile__base}>
      <div className={ProfileCss.Profile__header}>
        <Header />
      </div>
      <div className={ProfileCss.Profile__main}>
        <div className={ProfileCss.main__LeftSide}>
          <img className={ProfileCss.LeftSide__Img} src="https://andraursuta.com/wp-content/uploads/2017/04/penguin.jpg" alt=""/>
          <div className={ProfileCss.LeftSide__TextBlock}>Имя пользователя</div>
        </div>
        <div className={ProfileCss.main__RightSide}>
          <Main />
        </div>
      </div>
    </div>
  );
}

export default Profile;