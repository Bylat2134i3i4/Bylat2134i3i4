import React, {useState} from 'react';
import PacketCss from './Packet.module.css';
import classNames from 'classnames';
import {HiDotsCircleHorizontal} from 'react-icons/hi';
import SettMainFold from './../SettMainFolder';

const Packet = (props) => {
  const [MainBar, ChangeMainBar] = useState(false);

  const StateMainBar = () => {
    MainBar ? ChangeMainBar(false) : ChangeMainBar(true) 
  }

  return (
    <div className={classNames(PacketCss.Frame, props.height)}>
      <div className={PacketCss.Frame__Maintext}>{props.data.name}</div>
      <div className={PacketCss.Frame__CountBlock}>{props.data.emount}</div>
      <div className={PacketCss.Frame__BottomBlock}>
        <div className='flex w-auto h-full'>
          <img src={props.data.icon} alt="" className={PacketCss.BottomBlock_Img}/>
          <div className={PacketCss.BottomBlock_Text}>{props.data.user_name}</div>
        </div>
        <div className='flex w-auto h-full'>
          <HiDotsCircleHorizontal className={'w-auto h-full transition-colors hover:text-blue-700'} onClick={() => StateMainBar()}/>
        </div>
        {MainBar && <SettMainFold id={props.data.id_folder}/>}
      </div>
    </div>
  );
}

export default Packet;