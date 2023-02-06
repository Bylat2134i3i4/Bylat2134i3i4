import React, {useState} from 'react';
import CardSetCss from './Styles/CardSettingBlock.module.css';
import classNames from 'classnames';

const CardSettingBlock = (props) => {
  const [ShowError, ChangeShowError] = useState({
    Show1: "",
    Show2: ""
  });
  const CheckInput = () => {
    const Regular_Expression_Input = /^[A-Za-zа-яА-Я]+$/;
    if (!Regular_Expression_Input.test(props.InputValue.Value1)){
      ChangeShowError({Show1: "shadow-lg shadow-red-500", Show2: ShowError.Show2});
    }else{
      if (!Regular_Expression_Input.test(props.InputValue.Value2)){
        ChangeShowError({Show1: ShowError.Show1, Show2: "shadow-lg shadow-red-500"});
      }else{
        ChangeShowError({Show1: "shadow-lg shadow-green-500", Show2: "shadow-lg shadow-green-500"});
      }
    }
  }

  const Base = () => {
    ChangeShowError({
      Show1: "",
      SHow2: ""
    });
  }

  return (
    <div className={CardSetCss.CardSetBlock__main}>
      <input placeholder='передняя сторона' className={classNames(CardSetCss.main__Input, ShowError.Show1)} value={props.InputValue.Value1} onChange={el => props.ChangeInputValue({Value1: el.target.value, Value2: props.InputValue.Value2})}/>
      <input placeholder='оборотная сторона' className={classNames(CardSetCss.main__Input, ShowError.Show2)} value={props.InputValue.Value2} onChange={el => props.ChangeInputValue({Value1: props.InputValue.Value1, Value2: el.target.value})}/>
      <div className={CardSetCss.main__ButtonBlock}>
        <button className={CardSetCss.ButtonBlock__Button} onClick={() => {CheckInput(); setTimeout(() => {Base()}, 3000)} }>Добавить</button>
        <button className={CardSetCss.ButtonBlock__Button} onClick={() => {CheckInput(); setTimeout(() => {Base()}, 3000)} }>Сохранить</button>
        <button className={CardSetCss.ButtonBlock__Button} onClick={() => {props.ChangeInputValue({Value1: "", Value2: ""})}}>Удалить</button>
      </div>
    </div>
  );
}

export default CardSettingBlock;