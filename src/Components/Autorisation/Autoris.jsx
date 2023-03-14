import AutoCss from './../StylesForRegAutoris/Styles.module.css';
import InputMask from 'react-input-mask';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { get_users_id_pass_login, get_data_current_user } from './../../State/AutorisSlice';

const Reg = () => {
  const dispatch = useDispatch();
  const load = useSelector((state) => state.Autoris.list.StatusOfLoad);
  const user_list = useSelector((state) => state.Autoris.list.short_list);
  const [ShowInputs, ChangeShowInputs] = useState('hidden');

  useEffect(() => {
    if (load === 'load') {
      dispatch(get_users_id_pass_login());
    }
    if (load === 'installed') {
      ChangeShowInputs('flex');
    }
  }, [dispatch, load]);

  const navite = useNavigate();
  const [InputType, ChangeInputType] = useState('text');
  const [EyeColor, ChangeEyeType] = useState('text-white');
  const [ErrorColor, ChangeErrorColor] = useState({
    FirstInputRed: '',
    SecondInputRed: '',
  });
  const [PhoneInput, ChangePhoneInput] = useState('');
  const [PasswordInput, ChangePasswordInput] = useState('');

  const CheckInput = () => {
    const Regular_Expression_For_Phone = /.7.9[+ 0-9]{2}.[+ 0-9]{7}/;
    const Regular_Expression_For_FIO = /[a-z][0-9][a-z][0-9][a-z][0-9]/;
    if (!Regular_Expression_For_Phone.test(PhoneInput)) {
      return '1';
    }
    if (!Regular_Expression_For_FIO.test(PasswordInput)) {
      return '2';
    } else {
      return '0';
    }
  };

  const ThereIsInBase = () => {
    if (user_list.length < 0) {
      return -1;
    } else {
      if (
        user_list.filter((el) => el.login === PhoneInput && el.password === PasswordInput).length >
        0
      ) {
        return user_list.filter((el) => el.login === PhoneInput && el.password === PasswordInput)[0]
          .id;
      } else {
        return -1;
      }
    }
  };

  const InitPersonData = (id) => {
    dispatch(get_data_current_user(id));
  };

  return (
    <div
      className={classNames(
        AutoCss.App__main,
        ShowInputs === 'hidden' ? 'animate-pulse' : 'animate-none',
      )}
    >
      <div className={AutoCss.App__MettingTextBlock}>
        {ShowInputs === 'hidden' ? 'Загрузка данных' : 'Авторизация'}
      </div>
      <div className={classNames('flex flex-col w-full h-auto items-center', ShowInputs)}>
        <InputMask
          mask={'+7(\\999)9999999'}
          className={classNames(AutoCss.App__InputBlock_Input, ErrorColor.FirstInputRed)}
          alwaysShowMask
          value={PhoneInput}
          onChange={(el) => ChangePhoneInput(el.target.value)}
        />
        <div className={classNames(AutoCss.App__InputBlock_Input, ErrorColor.SecondInputRed)}>
          <InputMask
            mask={'a9a9a9'}
            value={PasswordInput}
            onChange={(el) => ChangePasswordInput(el.target.value)}
            type={InputType}
            className={AutoCss.App__InputBlock_PasswordInput}
            alwaysShowMask
          />
          <NavLink to='/'>
            <AiFillEye
              className={classNames(AutoCss.App__InputBlock_Eye, EyeColor, ErrorColor)}
              onClick={() => {
                ChangeInputType(InputType === 'text' ? 'password' : 'text');
                ChangeEyeType(InputType === 'password' ? 'text-white' : 'text-black');
              }}
            />
          </NavLink>
        </div>
      </div>
      <div className={classNames('flex-col h-auto w-full items-stretch', ShowInputs)}>
        <div className={AutoCss.App__LinkBlock_AutorisLinkBlock}>
          <NavLink to='/registration' className={AutoCss.App__LinkBlock_AutorisLinkBlock_Link}>
            Хотите зарегистрироваться?
          </NavLink>
        </div>
        <div className={AutoCss.App__LinkBlock_ButtonBlock}>
          <button
            className={AutoCss.App__LinkBlock_ButtonBlock_Button}
            onClick={() => {
              if (CheckInput() === '0') {
                if (ThereIsInBase() !== -1) {
                  ChangeErrorColor({
                    FirstInputRed: 'shadow-lg shadow-green-700',
                    SecondInputRed: 'shadow-lg shadow-green-700',
                  });
                  InitPersonData(ThereIsInBase());
                  setTimeout(() => {
                    navite('/general');
                  }, 3000);
                } else {
                  setTimeout(() => {
                    ChangeErrorColor({
                      FirstInputRed: '',
                      SecondInputRed: '',
                    });
                  }, 1500);
                  ChangeErrorColor({
                    FirstInputRed: 'shadow-lg shadow-red-500',
                    SecondInputRed: 'shadow-lg shadow-red-500',
                  });
                }
              }
              if (CheckInput() === '1') {
                setTimeout(() => {
                  ChangeErrorColor({
                    FirstInputRed: '',
                    SecondInputRed: '',
                  });
                }, 1500);
                ChangeErrorColor({
                  FirstInputRed: 'shadow-lg shadow-red-500',
                  SecondInputRed: '',
                });
              }
              if (CheckInput() === '2') {
                setTimeout(() => {
                  ChangeErrorColor({
                    FirstInputRed: '',
                    SecondInputRed: '',
                  });
                }, 1500);
                ChangeErrorColor({
                  FirstInputRed: '',
                  SecondInputRed: 'shadow-lg shadow-red-500',
                });
              }
            }}
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reg;
