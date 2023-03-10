import React, { useState } from 'react';
import CardSetCss from './Styles/CardSettingBlock.module.css';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
  ChangeCard,
  DeleteCard,
  change_card_look,
  add_card,
  del_card,
} from './../../../State/AutorisSlice';

const CardSettingBlock = (props) => {
  const dispatch = useDispatch();
  const AllCards = useSelector((state) => state.Autoris.list.cards);
  const CurrectCards = useSelector((state) => state.Autoris.list.cards).filter(
    (el) => el.id_folder === props.Folder_Id,
  );

  // const CurrentPerson = useSelector((state) => state.Autoris.list.person);
  const [ShowError, ChangeShowError] = useState({
    Show1: '',
    Show2: '',
  });
  const CheckInput = () => {
    const Regular_Expression_Input = /^[A-Za-zа-яА-Я]+$/;
    if (!Regular_Expression_Input.test(props.InputValue.Value1)) {
      setTimeout(() => Base(), 1500);
      ChangeShowError({ Show1: 'shadow-lg shadow-red-500', Show2: ShowError.Show2 });
      return false;
    } else {
      if (!Regular_Expression_Input.test(props.InputValue.Value2)) {
        setTimeout(() => Base(), 1500);
        ChangeShowError({ Show1: ShowError.Show1, Show2: 'shadow-lg shadow-red-500' });
        return false;
      } else {
        setTimeout(() => Base(), 1500);
        ChangeShowError({
          Show1: 'shadow-lg shadow-green-500',
          Show2: 'shadow-lg shadow-green-500',
        });
        return true;
      }
    }
  };

  const CreateCardEvent = (front, back) => {
    dispatch(
      add_card({
        id_folder: props.Folder_Id,
        front: front,
        back: back,
        card_type: 'новые',
        time_create: new Date().toLocaleDateString(),
      }),
    );
  };
  const DeleteCardEvent = (id_folder, id_card) => {
    dispatch(DeleteCard({ id_folder: id_folder, id_card: id_card }));

    dispatch(del_card({ id: id_card }));
  };
  const ChangeCardEvent = (id_card, front, back) => {
    dispatch(ChangeCard({ id_card: id_card, front: front, back: back }));

    dispatch(change_card_look({ id: id_card, front: front, back: back }));
  };

  const Base = () => {
    ChangeShowError({
      Show1: '',
      Show2: '',
    });
  };

  return (
    <div className={CardSetCss.CardSetBlock__main}>
      <div className='flex w-full h-auto text-base font-bold justify-center'>
        {props.folder_name}
      </div>
      <input
        placeholder='передняя сторона'
        className={classNames(CardSetCss.main__Input, ShowError.Show1)}
        value={props.InputValue.Value1}
        onChange={(el) =>
          props.ChangeInputValue({ Value1: el.target.value, Value2: props.InputValue.Value2 })
        }
      />
      <input
        placeholder='оборотная сторона'
        className={classNames(CardSetCss.main__Input, ShowError.Show2)}
        value={props.InputValue.Value2}
        onChange={(el) =>
          props.ChangeInputValue({ Value1: props.InputValue.Value1, Value2: el.target.value })
        }
      />
      <div className={CardSetCss.main__ButtonBlock}>
        <button
          className={CardSetCss.ButtonBlock__Button}
          onClick={() => {
            if (CheckInput()) {
              const isExit = AllCards.some(
                (el) => el.front === props.InputValue.Value1 || el.back === props.InputValue.Value2,
              );
              if (isExit) {
                setTimeout(() => Base(), 1500);
                ChangeShowError({
                  Show1: 'shadow-lg shadow-red-500',
                  Show2: 'shadow-lg shadow-red-500',
                });
              } else {
                setTimeout(() => Base(), 1500);
                CreateCardEvent(props.InputValue.Value1, props.InputValue.Value2);
                props.ChangeInputValue({ Value1: '', Value2: '' });
              }
            } else {
              setTimeout(() => Base(), 1500);
              ChangeShowError({
                Show1: 'shadow-lg shadow-red-500',
                Show2: 'shadow-lg shadow-red-500',
              });
            }
            props.ChangeCheckedCard(-1);
          }}
        >
          Добавить
        </button>
        <button
          className={CardSetCss.ButtonBlock__Button}
          onClick={() => {
            if (CheckInput()) {
              if (CurrectCards.length > 0) {
                const isExit = AllCards.some(
                  (el) =>
                    el.front === props.InputValue.Value1 || el.back === props.InputValue.Value2,
                );
                if (!isExit) {
                  setTimeout(() => Base(), 1500);
                  ChangeCardEvent(
                    props.CheckedCard,
                    props.InputValue.Value1,
                    props.InputValue.Value2,
                  );
                } else {
                  setTimeout(() => Base(), 1500);
                  ChangeShowError({
                    Show1: 'shadow-lg shadow-red-500',
                    Show2: 'shadow-lg shadow-red-500',
                  });
                }
              } else {
                setTimeout(() => Base(), 1500);
                ChangeShowError({
                  Show1: 'shadow-lg shadow-red-500',
                  Show2: 'shadow-lg shadow-red-500',
                });
              }
            } else {
              setTimeout(() => Base(), 1500);
              ChangeShowError({
                Show1: 'shadow-lg shadow-red-500',
                Show2: 'shadow-lg shadow-red-500',
              });
            }
            props.ChangeInputValue({ Value1: '', Value2: '' });
            props.ChangeCheckedCard(-1);
          }}
        >
          Сохранить
        </button>
        <button
          className={CardSetCss.ButtonBlock__Button}
          onClick={() => {
            if (CheckInput()) {
              if (CurrectCards.length > 0) {
                const isExit = CurrectCards.some((el) => el.id_card === props.CheckedCard);
                if (isExit) {
                  setTimeout(() => Base(), 1500);
                  DeleteCardEvent(props.Folder_Id, props.CheckedCard);
                } else {
                  setTimeout(() => Base(), 1500);
                  ChangeShowError({
                    Show1: 'shadow-lg shadow-red-500',
                    Show2: 'shadow-lg shadow-red-500',
                  });
                }
              } else {
                setTimeout(() => Base(), 1500);
                ChangeShowError({
                  Show1: 'shadow-lg shadow-red-500',
                  Show2: 'shadow-lg shadow-red-500',
                });
              }
            } else {
              setTimeout(() => Base(), 1500);
              ChangeShowError({
                Show1: 'shadow-lg shadow-red-500',
                Show2: 'shadow-lg shadow-red-500',
              });
            }
            props.ChangeInputValue({ Value1: '', Value2: '' });
            props.ChangeCheckedCard(-1);
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default CardSettingBlock;
