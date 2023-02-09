import React from 'react';
import CardBlockCss from './Styles/CardBlock.module.css';

const CardBlock = (props) => {

  return (
  <div className={CardBlockCss.SettingFolder__CardBlock_main} onClick={() => {props.ChangeInput(props.data.front, props.data.back); props.ChangeCheckedCard(props.data.id_card)}}>
      <div className={CardBlockCss.main__InfoBlock}>{props.data.id_card}</div>
      <div className={CardBlockCss.main__InfoBlock}>{props.data.front}</div>
      <div className={CardBlockCss.main__InfoBlock}>{props.data.back}</div>
      <div className={CardBlockCss.main__InfoBlock}>{props.data.time_create}</div>
    </div>
  );
}

export default CardBlock;