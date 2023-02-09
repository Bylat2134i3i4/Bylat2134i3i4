import React, {useState} from 'react';
import CardSetCss from './Styles/CardSettingBlock.module.css';
import classNames from 'classnames';
import {useSelector, useDispatch} from 'react-redux';
import {CreateCard, ChangeCard, DeleteCard} from './../../../State/AutorisSlice';

const CardSettingBlock = (props) => {
  const dispatch = useDispatch();
  const CurrentFolder = useSelector(state => state.Autoris.list.folders).filter(el => el.id_folder === props.Folder_Id);

  const [ShowError, ChangeShowError] = useState({
    Show1: "",
    Show2: ""
  });
  const CheckInput = () => {
    const Regular_Expression_Input = /^[A-Za-zа-яА-Я]+$/;
    if (!Regular_Expression_Input.test(props.InputValue.Value1)){
      ChangeShowError({Show1: "shadow-lg shadow-red-500", Show2: ShowError.Show2});
      return false;
    }else{
      if (!Regular_Expression_Input.test(props.InputValue.Value2)){
        ChangeShowError({Show1: ShowError.Show1, Show2: "shadow-lg shadow-red-500"});
        return false;
      }else{
        ChangeShowError({Show1: "shadow-lg shadow-green-500", Show2: "shadow-lg shadow-green-500"});
        return true;
      }
    }
  }

  const CreateCardEvent = (id, front, back) => {
    dispatch(CreateCard({id: id, front: front, back: back}));
  }
  const DeleteCardEvent = (id, id_card) => {
    dispatch(DeleteCard({id: id, id_card: id_card}));
  }
  const ChangeCardEvent = (id, id_card, front, back) => {
    dispatch(ChangeCard({id: id, id_card: id_card, front: front, back: back}));
  }

  const Base = () => {
    ChangeShowError({
      Show1: "",
      Show2: ""
    });
  }

  return (
    <div className={CardSetCss.CardSetBlock__main}>
      <input placeholder='передняя сторона' className={classNames(CardSetCss.main__Input, ShowError.Show1)} value={props.InputValue.Value1} onChange={el => props.ChangeInputValue({Value1: el.target.value, Value2: props.InputValue.Value2})}/>
      <input placeholder='оборотная сторона' className={classNames(CardSetCss.main__Input, ShowError.Show2)} value={props.InputValue.Value2} onChange={el => props.ChangeInputValue({Value1: props.InputValue.Value1, Value2: el.target.value})}/>
      <div className={CardSetCss.main__ButtonBlock}>
        <button className={CardSetCss.ButtonBlock__Button} onClick={
          () => {
            if (CheckInput()){
              if (CurrentFolder.length > 0){
                let isExit = false;
                if (CurrentFolder[0].card.length > 0){
                  isExit = CurrentFolder[0].card.some(el => el.front === props.InputValue.Value1 || el.back === props.InputValue.Value2);
                }
                if (isExit){
                  ChangeShowError({Show1: ShowError.Show1, Show2: "shadow-lg shadow-red-500"});
                }else{
                  setTimeout(() => {Base()}, 3000);
                  CreateCardEvent(props.Folder_Id, props.InputValue.Value1, props.InputValue.Value2);
                  props.ChangeInputValue({Value1: "", Value2: ""})
                }
              }else{
                ChangeShowError({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
              } 
            }else{
              ChangeShowError({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
            }
            props.ChangeCheckedCard(-1);
          }}
        >Добавить</button>
        <button className={CardSetCss.ButtonBlock__Button} onClick={
          () => {
            if (CheckInput()){
              if (CurrentFolder.length > 0 && CurrentFolder[0].card.length > 0){
                const CardArr = CurrentFolder[0].card;
                const isExit = CardArr.some(el => el.id_card === props.CheckedCard);
                if (isExit){
                  ChangeCardEvent(props.Folder_Id, props.CheckedCard, props.InputValue.Value1, props.InputValue.Value2);
                }else{
                  ChangeShowError({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
                }
              }else{
                ChangeShowError({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
              } 
            }else{
              ChangeShowError({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
            } 
            props.ChangeInputValue({Value1: "", Value2: ""});
            props.ChangeCheckedCard(-1);
          }}>Сохранить</button>
        <button className={CardSetCss.ButtonBlock__Button} onClick={
          () => {
            if (CheckInput()){
              if (CurrentFolder.length > 0 && CurrentFolder[0].card.length > 0){
                const isExit = CurrentFolder[0].card.some(el => el.id_card === props.CheckedCard);
                if (isExit){
                  setTimeout(() => {Base()}, 3000)
                  DeleteCardEvent(props.Folder_Id, props.CheckedCard);
                }else{
                  ChangeShowError({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
                }
              }else{
                ChangeShowError({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
              }
            }else{
              ChangeShowError({Show1: "shadow-lg shadow-red-500", Show2: "shadow-lg shadow-red-500"});
            }
            props.ChangeInputValue({Value1: "", Value2: ""});
            props.ChangeCheckedCard(-1);
          }}
        >Удалить</button>
      </div>
    </div>
  );
}

export default CardSettingBlock;