import React from 'react';
import FooterCss from './Styles/Footer.module.css';
import Packet from './Packet/Packet';

const Footer = (props) => {
  return (
    <div className={FooterCss.MainPage__Footer_main}>
      <div className={FooterCss.MainPage__Footer_TextBlock}>Рекомендуемые</div>
      <div className={FooterCss.MainPage__Footer_General}>
        <Packet height='h-full' show={props.StateBottomBar}/>
        <Packet height='h-full' show={props.StateBottomBar}/>
        <Packet height='h-full' show={props.StateBottomBar}/>
      </div>
    </div>
  );
}

export default Footer;