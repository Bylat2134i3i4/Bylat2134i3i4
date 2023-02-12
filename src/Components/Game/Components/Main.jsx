import React, { useState } from 'react';
import classNames from 'classnames';
import MainCss from './Main.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {Game_DeleteCard, Game_ChangeCardType, Game_AddCard, Change_GeneralCardType} from './../../../State/AutorisSlice';

const Main = () => {
  const dispatch = useDispatch();
  const CardArr = useSelector(state => state.Autoris.list.current_game);
  const folder = CardArr[0].folder_id;
  const UserFolders = useSelector(state => state.Autoris.list.folders).filter(el => el.id_folder === folder)[0].card

  const [Show, ChangeShow] = useState("hidden");
  const [ShowBlock, ChangeShowBlock] = useState({
    Visible1: "flex",
    Visible2: "hidden"
  })

  const ChangeCardsTypes = (front) => {
      const type = UserFolders.filter(el => el.front === front)[0].card_type;
      if (type === "новые"){
        dispatch(Change_GeneralCardType({id: folder, front: front,  new_card_type: "изучаемые"}));
      }
      if (type === "изучаемые"){
        dispatch(Change_GeneralCardType({id: folder, front: front,  new_card_type: "пройденные"}))
      }
  }

  const DeleteCardEvent = (id) => {
    dispatch(Game_DeleteCard({id: id}));
  }

  const ChangeCardEvent = (id, type) => {
    dispatch(Game_ChangeCardType({id: id, type: type}));
  }

  const AddCardEvent = (card, id) => {
    dispatch(Game_AddCard({card: card, id: id}));
  }

  const CountCardTypes = (Type) => {
    if (CardArr[0].cards.length === 0){
      return 0;
    }else{
      let News = 0;
      let Now = 0;
      let Good = 0;
      CardArr[0].cards.map(el => {
        if (el.card_type === "новые"){
          News +=1;
        }else{
          if (el.card_type === "изучаемые"){
            Now += 1;
          }else{
            Good += 1;
          }
        }
      });
      if (Type === 1){
        return News;
      }else{
        if (Type === 2){
          return Now;
        }else{return Good;}
      }
    }
  }

  const CurrentElement = (Type) => {
    if (CardArr[0].cards.length === 0){
      return "";
    }else{
      if (Type === 1){
        return CardArr[0].cards[0].front;
      }else{
        return CardArr[0].cards[0].back;
      }
    }
  }

  const ToDoWithCard = () => {
    if (CardArr[0].cards[0].card_type === "новые"){
      ChangeCardEvent(CardArr[0].cards[0].id_card, "изучаемые");
    }
    if (CardArr[0].cards[0].card_type === "изучаемые"){
      ChangeCardEvent(CardArr[0].cards[0].id_card, "пройденные");
    }
  }

  return (
    <div className={MainCss.Game__Main_base}>
      <div className={MainCss.base__TopBlock}>
        {CurrentElement(1)}
      </div>
      <div className={MainCss.base__BottomBlock}>
        <div className={MainCss.BottomBlock__LeftSide}>
          <div className={classNames(MainCss.LeftSide__Block, "text-blue-500")}>
            <div className={MainCss.Block__Element}>Новые</div>
            <div className={MainCss.Block__Element}>{CountCardTypes(1)}</div>
          </div>
          <div className={classNames(MainCss.LeftSide__Block, "text-yellow-500")}>
            <div className={MainCss.Block__Element}>Запоминаемые</div>
            <div className={MainCss.Block__Element}>{CountCardTypes(2)}</div>
          </div>
          <div className={classNames(MainCss.LeftSide__Block, "text-green-500")}>
            <div className={MainCss.Block__Element}>Пройденные</div>
            <div className={MainCss.Block__Element}>{CountCardTypes(3)}</div>
          </div>
        </div>
        <div className={MainCss.BottomBlock__RightSide}>
            <div className={classNames(MainCss.RightSide__TextBlock, Show)}>{CurrentElement(2)}</div>
            <div className={classNames(MainCss.RightSide__ButtonBlock, ShowBlock.Visible2)}><button className='transition-all italic text-blue-500 hover:underline' onClick={() =>  {
              if (CardArr[0].cards[0].card_type === "пройденные"){
                ChangeCardsTypes(CardArr[0].cards[0].front);
                DeleteCardEvent(CardArr[0].cards[0].id_card);
              }else{
                AddCardEvent(CardArr[0].cards[0], CardArr[0].cards[CardArr[0].cards.length - 1].id_card + 1);
                DeleteCardEvent(CardArr[0].cards[0].id_card);
              }
              ChangeShowBlock({Visible1: "flex", Visible2: "hidden"}); 
              ChangeShow("hidden")
              }}>Продолжить</button></div>
            <div className={classNames(MainCss.RightSide__ButtonBlock, ShowBlock.Visible1)}>
              <button className={classNames(MainCss.ButtonBlock__Button, "bg-red-500")} onClick={() => {
                if (CardArr[0].cards.length > 0){
                  ChangeShow("flex"); 
                  ChangeShowBlock({Visible1: "hidden", Visible2: "flex"})
                }
                }}>Не знаю</button>
              <button className={classNames(MainCss.ButtonBlock__Button, "bg-green-500")} onClick={() => {
                if (CardArr[0].cards.length > 0){
                  ToDoWithCard();
                  if (CardArr[0].cards.length > 0){
                    ChangeShow("flex");  
                    ChangeShowBlock({Visible1: "hidden", Visible2: "flex"})
                  }
                }
                }}>Хорошо</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Main;