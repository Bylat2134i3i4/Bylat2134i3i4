import React from 'react';
import Auto from './Components/Autorisation/Autoris';
import Regist from './Components/Registration/Regist';
import { Route, Routes } from 'react-router-dom';
import AppCss from './App.module.css';
import MainPage from './Components/MainPage/MainPage';
import Setting from './Components/Settings/Setting';
import Progress from './Components/Progress/Progress';
import Profile from './Components/Profile/Profile';
import SetFol from './Components/SettingFolder/SetFol';
import Game from './Components/Game/Game';

const App = () => {
  return (
    <div className={AppCss.app_main}>
      <Routes>
        <Route path="/*" element={<Auto />} />
        <Route path="/registration" element={<Regist />} />
        <Route path="/general" element={<MainPage />} />
        <Route path="/general/settings" element={<Setting />} />
        <Route path="/general/progress" element={<Progress />} />
        <Route path="/general/profile" element={<Profile />} />
        <Route path="/general/setting_folder" element={<SetFol />} />
        <Route path="/general/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
