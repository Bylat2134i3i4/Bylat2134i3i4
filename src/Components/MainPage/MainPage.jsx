import React, { useState } from 'react';
import Header from './Components/Header';
import Body from './Components/Body';
import LeftBarBlock from './Components/LeftBar';
import CreateFolderBlock from './Components/CreateFolder';
import SettMainFold from './Components/SettMainFolder';

const MainPage = () => {
  
  const [LeftBar, ChangeLeftBar] = useState(false);
  const [CreateFolder, ChangeCreateFolder] = useState(false);
  const [MainBar, ChangeMainBar] = useState(false);

  const StateLeftBar = () => {
    LeftBar ? ChangeLeftBar(false) : ChangeLeftBar(true) 
  }
  const StateCreateFolder = () => {
    CreateFolder ? ChangeCreateFolder(false) : ChangeCreateFolder(true) 
  }
  const StateMainBar = () => {
    MainBar ? ChangeMainBar(false) : ChangeMainBar(true) 
  }

  return (
    <div className='flex flex-col w-full h-full'>
      {LeftBar && <LeftBarBlock />}
      {CreateFolder && <CreateFolderBlock StateCreateFolder={StateCreateFolder}/>}
      {MainBar && <SettMainFold />}
      <Header StateLeftBar={StateLeftBar} StateCreateFolder={StateCreateFolder}/>
      <Body StateMainBar={StateMainBar}/>
    </div>
  );
}

export default MainPage;