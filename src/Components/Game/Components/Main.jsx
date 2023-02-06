import React, { useState } from 'react';
import classNames from 'classnames';
import MainCss from './Main.module.css';

const Main = () => {
  const [Show, ChangeShow] = useState("hidden");
  const [ShowBlock, ChangeShowBlock] = useState({
    Visible1: "flex",
    Visible2: "hidden"
  })
  return (
    <div className={MainCss.Game__Main_base}>
      <div className={MainCss.base__TopBlock}>
        Лицевая сторона
      </div>
      <div className={MainCss.base__BottomBlock}>
        <div className={MainCss.BottomBlock__LeftSide}>
          <div className={classNames(MainCss.LeftSide__Block, "text-blue-500")}>
            <div className={MainCss.Block__Element}>Новые</div>
            <div className={MainCss.Block__Element}>0</div>
          </div>
          <div className={classNames(MainCss.LeftSide__Block, "text-yellow-500")}>
            <div className={MainCss.Block__Element}>Запоминаемые</div>
            <div className={MainCss.Block__Element}>0</div>
          </div>
          <div className={classNames(MainCss.LeftSide__Block, "text-green-500")}>
            <div className={MainCss.Block__Element}>Пройденные</div>
            <div className={MainCss.Block__Element}>0</div>
          </div>
        </div>
        <div className={MainCss.BottomBlock__RightSide}>
            <div className={classNames(MainCss.RightSide__TextBlock, Show)}>Оборотная сторона</div>
            <div className={classNames(MainCss.RightSide__ButtonBlock, ShowBlock.Visible2)}><button className='transition-all italic text-blue-500 hover:underline' onClick={() =>  {ChangeShowBlock({Visible1: "flex", Visible2: "hidden"}); ChangeShow("hidden")}}>Продолжить</button></div>
            <div className={classNames(MainCss.RightSide__ButtonBlock, ShowBlock.Visible1)}>
              <button className={classNames(MainCss.ButtonBlock__Button, "bg-red-500")} onClick={() => {ChangeShow("flex"); ChangeShowBlock({Visible1: "hidden", Visible2: "flex"})}}>Не знаю</button>
              <button className={classNames(MainCss.ButtonBlock__Button, "bg-green-500")} onClick={() => {ChangeShow("flex");  ChangeShowBlock({Visible1: "hidden", Visible2: "flex"})}}>Хорошо</button>
              <button className={classNames(MainCss.ButtonBlock__Button, "bg-blue-500")} onClick={() => {ChangeShow("flex");  ChangeShowBlock({Visible1: "hidden", Visible2: "flex"})} }>Легко</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Main;