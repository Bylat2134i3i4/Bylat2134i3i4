import React from 'react';
import BodyCss from './Styles/Main.module.css';
import Packet from './Packet/Packet';

const Body = (props) => {
  return (
    <div className={BodyCss.MainPage__Main_base}>
      <div className={BodyCss.MainPage__Main_TextBlock}>Ваши папки</div>
      <div className={BodyCss.MainPage_Main_GeneralBlock}>
        <Packet height="h-1/3" show={props.StateMainBar}/>
        <Packet height="h-1/3" show={props.StateMainBar}/>
        <Packet height="h-1/3" show={props.StateMainBar}/>
        <Packet height="h-1/3" show={props.StateMainBar}/>
        <Packet height="h-1/3" show={props.StateMainBar}/>
        <Packet height="h-1/3" show={props.StateMainBar}/>
        <Packet height="h-1/3" show={props.StateMainBar}/>
        <Packet height="h-1/3" show={props.StateMainBar}/>
        <Packet height="h-1/3" show={props.StateMainBar}/>
      </div>
    </div>
  );
}

export default Body;