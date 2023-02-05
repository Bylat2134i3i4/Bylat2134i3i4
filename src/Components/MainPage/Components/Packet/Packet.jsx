import React from 'react';
import PacketCss from './Packet.module.css';
import classNames from 'classnames';
import {HiDotsCircleHorizontal} from 'react-icons/hi';

const Packet = (props) => {
  return (
    <div className={classNames(PacketCss.Frame, props.height)}>
      <div className={PacketCss.Frame__Maintext}>Название папки</div>
      <div className={PacketCss.Frame__CountBlock}>количество слов</div>
      <div className={PacketCss.Frame__BottomBlock}>
        <div className='flex w-auto h-full'>
          <img src="https://andraursuta.com/wp-content/uploads/2017/04/penguin.jpg" alt="" className={PacketCss.BottomBlock_Img}/>
          <div className={PacketCss.BottomBlock_Text}>username</div>
        </div>
        <div className='flex w-auto h-full'>
          <HiDotsCircleHorizontal className={'w-auto h-full transition-colors hover:text-blue-700'} onClick={() => props.show()}/>
        </div>
      </div>
    </div>
  );
}

export default Packet;