import RegCss from './../StylesForRegAutoris/Styles.module.css';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeStatusOfLoad, add_user } from './../../State/AutorisSlice';

const Regist = () => {
  const dispatch = useDispatch();
  const user_list = useSelector((state) => state.Autoris.list.short_list);
  const navigate = useNavigate();
  const [InputType, ChangeInputType] = useState('text');
  const [EyeColor, ChangeEyeType] = useState('text-white');
  const [ErrorColor, ChangeErrorColor] = useState({
    FirstInputRed: '',
    SecondInputRed: '',
    ThirdInputRed: '',
  });
  const [PhoneInput, ChangePhoneInput] = useState('');
  const [PasswordInput, ChangePasswordInput] = useState('');
  const [UserNameInput, ChangeUserNameInput] = useState('');

  const ChangeLoad = () => {
    dispatch(ChangeStatusOfLoad());
  };

  const Add_User = () => {
    dispatch(add_user({ name: UserNameInput, login: PhoneInput, password: PasswordInput }));
  };

  const CheckInput = () => {
    const Regular_Expression_For_Phone = /.7.9[+ 0-9]{2}.[+ 0-9]{7}/;
    const Regular_Expression_For_Password = /[a-z][0-9][a-z][0-9][a-z][0-9]/;
    const Regular_Expression_For_FIO = /^[а-я]+$/;
    if (!Regular_Expression_For_Phone.test(PhoneInput)) {
      return '1';
    }
    if (!Regular_Expression_For_Password.test(PasswordInput)) {
      return '2';
    }
    if (!Regular_Expression_For_FIO.test(UserNameInput)) {
      return '3';
    } else {
      return '0';
    }
  };

  const ThereIsInBase = () => {
    if (
      user_list.filter((el) => el.login === PhoneInput || el.password === PasswordInput).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={RegCss.App__main}>
      <div className={RegCss.App__MettingTextBlock}>Регистрация</div>
      <div className={RegCss.App__InputBlock}>
        <input
          placeholder='Имя пользователя'
          className={classNames(RegCss.App__InputBlock_Input, ErrorColor.ThirdInputRed)}
          value={UserNameInput}
          onChange={(el) => {
            ChangeUserNameInput(el.target.value);
          }}
        />
        <InputMask
          mask={'+7(\\999)9999999'}
          className={classNames(RegCss.App__InputBlock_Input, ErrorColor.FirstInputRed)}
          alwaysShowMask
          value={PhoneInput}
          onChange={(el) => ChangePhoneInput(el.target.value)}
        />
        <div className={classNames(RegCss.App__InputBlock_Input, ErrorColor.SecondInputRed)}>
          <InputMask
            mask={'a9a9a9'}
            value={PasswordInput}
            onChange={(el) => ChangePasswordInput(el.target.value)}
            type={InputType}
            className={RegCss.App__InputBlock_PasswordInput}
            alwaysShowMask
          />
          <NavLink to='/registration'>
            <AiFillEye
              className={classNames(RegCss.App__InputBlock_Eye, EyeColor, ErrorColor)}
              onClick={() => {
                ChangeInputType(InputType === 'text' ? 'password' : 'text');
                ChangeEyeType(InputType === 'password' ? 'text-white' : 'text-black');
              }}
            />
          </NavLink>
        </div>
      </div>
      <div className={RegCss.App__LinkBlock}>
        <div className={RegCss.App__LinkBlock_AutorisLinkBlock}>
          <NavLink to='/' className={RegCss.App__LinkBlock_AutorisLinkBlock_Link}>
            Уже есть аккаунт?
          </NavLink>
        </div>
        <div className={RegCss.App__LinkBlock_ButtonBlock}>
          <button
            className={RegCss.App__LinkBlock_ButtonBlock_Button}
            onClick={() => {
              if (CheckInput() === '0') {
                if (ThereIsInBase()) {
                  ChangeErrorColor({
                    FirstInputRed: 'shadow-lg shadow-red-500',
                    SecondInputRed: 'shadow-lg shadow-red-500',
                    ThirdInputRed: 'shadow-lg shadow-red-500',
                  });
                } else {
                  ChangeErrorColor({
                    FirstInputRed: 'shadow-lg shadow-green-600',
                    SecondInputRed: 'shadow-lg shadow-green-600',
                    ThirdInputRed: 'shadow-lg shadow-green-600',
                  });
                  ChangeLoad();
                  Add_User();
                  setTimeout(() => {
                    navigate('/');
                  }, 3000);
                }
              }
              if (CheckInput() === '1') {
                ChangeErrorColor({
                  FirstInputRed: 'shadow-lg shadow-red-500',
                  SecondInputRed: '',
                  ThirdInputRed: '',
                });
              }
              if (CheckInput() === '2') {
                ChangeErrorColor({
                  FirstInputRed: '',
                  SecondInputRed: 'shadow-lg shadow-red-500',
                  ThirdInputRed: '',
                });
              }
              if (CheckInput() === '3') {
                ChangeErrorColor({
                  FirstInputRed: '',
                  SecondInputRed: '',
                  ThirdInputRed: 'shadow-lg shadow-red-500',
                });
              }
            }}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default Regist;
