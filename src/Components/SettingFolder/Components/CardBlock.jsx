import React from 'react';
import CardBlockCss from './Styles/CardBlock.module.css';

const CardBlock = (props) => {
  return (
  <div className={CardBlockCss.SettingFolder__CardBlock_main} onClick={() => {props.ChangeInput(document.getElementById('Front').textContent, document.getElementById('Back').textContent)}}>
      <div className={CardBlockCss.main__InfoBlock}>Номер</div>
      <div id='Front' className={CardBlockCss.main__InfoBlock}>Перед</div>
      <div id='Back' className={CardBlockCss.main__InfoBlock}>Зад</div>
      <div className={CardBlockCss.main__InfoBlock}>Время создания</div>
    </div>
  );
}

export default CardBlock;