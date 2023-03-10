import React from 'react';
import LeftBarCss from './Styles/LeftBar.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteFolder, GameInit, ChangeFocus, del_fold } from './../../../State/AutorisSlice';

const SettMainFold = (props) => {
  const dispatch = useDispatch();
  const CurrentPerson = useSelector((state) => state.Autoris.list.person);

  const ChangeFocusEvent = (id, status) => {
    dispatch(ChangeFocus({ id: id, status: status }));
  };

  const GameInitEvent = (id) => {
    dispatch(GameInit({ id: id }));
  };

  const Delete = (id_folder) => {
    dispatch(DeleteFolder({ id_folder: id_folder }));
    dispatch(del_fold({ id_folder: id_folder }));
  };

  return (
    <div className={LeftBarCss.MainPage__LeftBar_main}>
      <div className={LeftBarCss.MainPage__LeftBar_TopBlock}>
        <img className={LeftBarCss.TopBlock__img} src={CurrentPerson[0].icon} alt='' />
      </div>
      <div className={LeftBarCss.MainPage__Header_BottomBlock}>
        <div className={LeftBarCss.BottomBlock_GeneralBlock}>
          <NavLink to='/general/setting_folder'>
            <button
              className={LeftBarCss.GeneralBlock_button}
              onClick={() => {
                ChangeFocusEvent(props.id, true);
              }}
            >
              править папку
            </button>
          </NavLink>
          <hr className={LeftBarCss.GeneralBlock_hr} />
          <NavLink to='/general/game'>
            <button
              className={LeftBarCss.GeneralBlock_button}
              onClick={() => GameInitEvent(props.id)}
            >
              начать игру
            </button>
          </NavLink>
          <hr className={LeftBarCss.GeneralBlock_hr} />
          <button
            className={LeftBarCss.GeneralBlock_button}
            onClick={() => {
              Delete(props.id);
            }}
          >
            удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettMainFold;
