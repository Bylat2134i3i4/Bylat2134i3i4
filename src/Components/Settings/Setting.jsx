import React from 'react';
import Header from './../Profile/Components/Header';
import SettingCss from './Setting.module.css';
import Main from './Components/Main';

const Setting = () => {
  return (
    <div className={SettingCss.General__Settig_base}>
      <div className={SettingCss.base__Header}>
        <Header />
      </div>
      <div className={SettingCss.base_Main}>
        <Main />
      </div>
    </div>
  );
}

export default Setting