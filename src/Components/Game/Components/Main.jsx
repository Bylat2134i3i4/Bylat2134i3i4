import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import MainCss from './Main.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  Game_DeleteCard,
  Game_ChangeCardType,
  Game_AddCard,
  Change_GeneralCardType,
  change_card_type,
} from './../../../State/AutorisSlice';

const Main = () => {
  const dispatch = useDispatch();
  const GameCard = useSelector((state) => state.Autoris.list.current_game);
  const GlobalCard = useSelector((state) => state.Autoris.list.cards);

  const [Show, ChangeShow] = useState('hidden');
  const [ShowBlock, ChangeShowBlock] = useState({
    Visible1: 'flex',
    Visible2: 'hidden',
  });

  useEffect(() => {
    if (GameCard[0].cards.length === 0) {
      Change_card_type_on_Server();
    }
  });

  const ChangeCardsTypes = (front) => {
    const type = GlobalCard.filter((el) => el.front === front)[0].card_type;
    if (type === 'изучаемые') {
      dispatch(Change_GeneralCardType({ front: front, new_card_type: 'пройденные' }));
    }
    if (type === 'новые') {
      dispatch(Change_GeneralCardType({ front: front, new_card_type: 'изучаемые' }));
    }
  };

  const Change_card_type_on_Server = () => {
    const arr = GlobalCard.map((el) => {
      if (el.id_folder === GameCard[0].folder_id) {
        return {
          id_card: el.id_card,
          card_type: el.card_type,
        };
      }
    });
    dispatch(change_card_type(arr));
  };

  const DeleteCardEvent = (id) => {
    dispatch(Game_DeleteCard({ id: id }));
  };

  const ChangeCardEvent = (id, type) => {
    dispatch(Game_ChangeCardType({ id: id, type: type }));
  };

  const AddCardEvent = (card, id) => {
    dispatch(Game_AddCard({ card: card, id: id }));
  };

  const CountCardTypes = (Type) => {
    if (GameCard[0].cards.length === 0) {
      return 0;
    } else {
      let News = 0;
      let Now = 0;
      let Good = 0;
      for (let i = 0; i < GameCard[0].cards.length; i++) {
        if (GameCard[0].cards[i].card_type === 'новые') {
          News += 1;
        } else {
          if (GameCard[0].cards[i].card_type === 'изучаемые') {
            Now += 1;
          } else {
            Good += 1;
          }
        }
      }

      if (Type === 1) {
        return News;
      } else {
        if (Type === 2) {
          return Now;
        } else {
          return Good;
        }
      }
    }
  };

  const CurrentElement = (Type) => {
    if (GameCard[0].cards.length === 0) {
      return '';
    } else {
      if (Type === 1) {
        return GameCard[0].cards[0].front;
      } else {
        return GameCard[0].cards[0].back;
      }
    }
  };

  const ToDoWithCard = () => {
    if (GameCard[0].cards[0].card_type === 'новые') {
      ChangeCardEvent(GameCard[0].cards[0].id_card, 'изучаемые');
    }
    if (GameCard[0].cards[0].card_type === 'изучаемые') {
      ChangeCardEvent(GameCard[0].cards[0].id_card, 'пройденные');
    }
  };

  return (
    <div className={MainCss.Game__Main_base}>
      <div className={MainCss.base__TopBlock}>
        <div className={MainCss.Description}>видимая сторона карточки</div>
        <div className='flex w-auto h-auto bg-dark-blue my-auto'>{CurrentElement(1)}</div>
      </div>
      <div className={MainCss.base__BottomBlock}>
        <div className={MainCss.BottomBlock__LeftSide}>
          <div className={classNames(MainCss.LeftSide__Block, 'text-blue-500')}>
            <div className={MainCss.Block__Element}>Новые</div>
            <div className={MainCss.Block__Element}>{CountCardTypes(1)}</div>
          </div>
          <div className={classNames(MainCss.LeftSide__Block, 'text-yellow-500')}>
            <div className={MainCss.Block__Element}>Запоминаемые</div>
            <div className={MainCss.Block__Element}>{CountCardTypes(2)}</div>
          </div>
          <div className={classNames(MainCss.LeftSide__Block, 'text-green-500')}>
            <div className={MainCss.Block__Element}>Пройденные</div>
            <div className={MainCss.Block__Element}>{CountCardTypes(3)}</div>
          </div>
        </div>
        <div className={MainCss.BottomBlock__RightSide}>
          <div className={MainCss.Description}>сокрытая сторона карточки</div>
          <div className={classNames(MainCss.RightSide__TextBlock, Show)}>{CurrentElement(2)}</div>
          <div className={classNames(MainCss.RightSide__ButtonBlock, ShowBlock.Visible2)}>
            <button
              className='transition-all italic text-blue-500 hover:underline'
              onClick={() => {
                if (GameCard[0].cards[0].card_type === 'пройденные') {
                  ChangeCardsTypes(GameCard[0].cards[0].front);
                  DeleteCardEvent(GameCard[0].cards[0].id_card);
                } else {
                  AddCardEvent(
                    GameCard[0].cards[0],
                    GameCard[0].cards[GameCard[0].cards.length - 1].id_card + 1,
                  );
                  DeleteCardEvent(GameCard[0].cards[0].id_card);
                }
                ChangeShowBlock({ Visible1: 'flex', Visible2: 'hidden' });
                ChangeShow('hidden');
              }}
            >
              Продолжить
            </button>
          </div>
          <div className={classNames(MainCss.RightSide__ButtonBlock, ShowBlock.Visible1)}>
            <button
              className={classNames(MainCss.ButtonBlock__Button, 'bg-red-500')}
              onClick={() => {
                if (GameCard[0].cards.length > 0) {
                  ChangeShow('flex');
                  ChangeShowBlock({ Visible1: 'hidden', Visible2: 'flex' });
                }
              }}
            >
              Не знаю
            </button>
            <button
              className={classNames(MainCss.ButtonBlock__Button, 'bg-green-500')}
              onClick={() => {
                if (GameCard[0].cards.length > 0) {
                  ToDoWithCard();
                  if (GameCard[0].cards.length > 0) {
                    ChangeShow('flex');
                    ChangeShowBlock({ Visible1: 'hidden', Visible2: 'flex' });
                  }
                }
              }}
            >
              Хорошо
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
