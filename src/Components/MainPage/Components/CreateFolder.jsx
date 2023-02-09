import React, {useState} from 'react';
import CreateFolderCss from './Styles/CreateFolder.module.css';
import {IoIosCloseCircle} from 'react-icons/io';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {CreateFold} from './../../../State/AutorisSlice';

const CreateFolder = (props) => {
  const dispatch = useDispatch();
  const persons = useSelector(state => state.Autoris.list.persons)
  const CurrentPerson = persons.filter(el => el.online === true);
  const [InputValue, ChangeInputValue] = useState("");
  const [InputColor, ChangeInputColor] = useState("")

  const CheckInput = () => {
    const Regular_Expression_For_FIO = /^[а-я]+$/;
    if (Regular_Expression_For_FIO.test(InputValue)){
      return true;
    }else{
      return false;
    }
  }

  const CreateNewFolder = (name) => {
    dispatch(CreateFold({
      user_id: CurrentPerson[0].id,
      name: name,
      user_icon: CurrentPerson[0].icon,
      user_name: CurrentPerson[0].name
    }))
  }

  return (
    <div className={CreateFolderCss.Main__CreateFolder_main}>
      <div className={CreateFolderCss.Main__CreateFolder_CloseBlock}>
        <IoIosCloseCircle onClick={() => props.StateCreateFolder()} className={CreateFolderCss.CloseBlock_Icon}/>
      </div>
      <div className={CreateFolderCss.Main__CreateFolder_TextBlock}>Введите название папки</div>
      <div className={classNames(CreateFolderCss.Main__CreateFolder_InputBlock, InputColor)}>
        <input placeholder='Название папки' className={CreateFolderCss.InputBlock__Input} value={InputValue} onChange={el => ChangeInputValue(el.target.value)}/>
        <IoIosCloseCircle className={CreateFolderCss.InputBlock__Icon} onClick={() => {ChangeInputValue("")}}/>
      </div>
      <div className={CreateFolderCss.Main__CreateFolder_ButtonBlock}>
        <button className={CreateFolderCss.ButtonBlock__Button} onClick={
          () => {
            if (CheckInput()){
              CreateNewFolder(InputValue);
              ChangeInputColor("shadow-lg shadow-green-500");
              setTimeout(() => {props.StateCreateFolder()}, 2000)
            }else{
              ChangeInputColor("shadow-lg shadow-red-500");
            }
          }
        }>
          Добавить
        </button>
      </div>
    </div>
  );
}

export default CreateFolder;