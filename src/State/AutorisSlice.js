import { createSlice } from '@reduxjs/toolkit';

const Autoris = createSlice({
  name: 'Autoris',
  initialState: {
    list: {
      persons: [
        {
          id: 1,
          name: "булат",
          login: "+7(927)4139312",
          password: "t5t5t5",
          icon: "https://andraursuta.com/wp-content/uploads/2017/04/penguin.jpg",
          online: true
        }
      ],
      folders: [],
      current_game: [],
    },
  },
  reducers: {
    ChangeIcon(state, action) {
      state.list.persons.filter(el => el.online === true)[0].icon = action.payload.icon;
    },
    ChangeLogin(state, action) {
      state.list.persons.filter(el => el.online === true)[0].login = action.payload.login;
    },
    ChangePassword(state, action) {
      state.list.persons.filter(el => el.online === true)[0].password = action.payload.password;
    },
    ChangeOnline(state, action) {
      state.list.persons.filter(el => el.id === action.payload)[0].online = true;
    },
    CloseField(state, action) {
      state.list.persons.filter(el => el.id === action.payload.id)[0].online = false;
    },
    CreateUser(state, action) {
      state.list.persons.push({
        id: state.list.persons.length === 0 ? 1 : state.list.persons[state.list.persons.length - 1].id + 1,
        name: action.payload.name,
        login: action.payload.login,
        password: action.payload.password,
        icon: action.payload.icon,
        online: action.payload.online
      })
    },
    CreateFold(state, action) {

      state.list.folders.push({
        user_Id: action.payload.user_id,
        id_folder: state.list.folders.length === 0 ? 1 : state.list.folders[state.list.folders.length - 1].id_folder + 1,
        name: action.payload.name,
        icon: action.payload.user_icon,
        amount_card: 0,
        user_name: action.payload.user_name,
        card: []
      })
    },
    DeleteFolder(state, action) {
      state.list.folders = state.list.folders.filter(el => el.id_folder !== action.payload.id_folder);
    },
    CreateCard(state, action) {
      const CardArr = state.list.folders.filter(el => el.id_folder === action.payload.id)[0].card;
      state.list.folders.filter(el => el.id_folder === action.payload.id)[0].card.push({
        id_card: CardArr.length === 0 ? 1 : CardArr[CardArr.length - 1].id_card + 1,
        id_folder: action.payload.id,
        front: action.payload.front,
        back: action.payload.back,
        card_type: "новые",
        time_create: new Date().toLocaleDateString()
      })
      state.list.folders.filter(el => el.id_folder === action.payload.id)[0].amount_card += 1;
    },
    DeleteCard(state, action) {
      state.list.folders.filter(el => el.id_folder === action.payload.id)[0].amount_card -= 1;
      state.list.folders.filter(el => el.id_folder === action.payload.id)[0].card = state.list.folders.filter(el => el.id_folder === action.payload.id)[0].card.filter(el => el.id_card !== action.payload.id_card);
    },
    ChangeCard(state, action) {
      state.list.folders.filter(el => el.id_folder === action.payload.id)[0].card.filter(el => el.id_card === action.payload.id_card)[0].front = action.payload.front;
      state.list.folders.filter(el => el.id_folder === action.payload.id)[0].card.filter(el => el.id_card === action.payload.id_card)[0].back = action.payload.back;
    },
    GameInit(state, action) {
      let helper = state.list.folders.filter(el => el.id_folder === action.payload.id)[0].card;

      state.list.current_game[0] = {
        folder_id: action.payload.id,
        cards: helper.map(el => {
          return {
            id_card: el.id_card,
            id_folder: el.id_folder,
            front: el.front,
            back: el.back,
            card_type: "новые",
            time_create: el.time_create
          }
        }),
        new_cards: state.list.folders.filter(el => el.id_folder === action.payload.id)[0].card.length
      }
    },
    Game_DeleteCard(state, action) {
      state.list.current_game[0].cards = state.list.current_game[0].cards.filter(el => el.id_card !== action.payload.id);
    },
    Game_ChangeCardType(state, action) {
      state.list.current_game[0].cards.filter(el => el.id_card === action.payload.id)[0].card_type = action.payload.type;
    },
    Game_AddCard(state, action) {
      state.list.current_game[0].cards.push({
        id_card: action.payload.id,
        id_folder: action.payload.card.id_folder,
        front: action.payload.card.front,
        back: action.payload.card.back,
        card_type: action.payload.card.card_type,
        time_create: action.payload.card.time_create
      });
    },
    Change_GeneralCardType(state, action) {
      state.list.folders.filter(el => el.id_folder === action.payload.id)[0].card.filter(el => el.front === action.payload.front)[0].card_type = action.payload.new_card_type;
    }
  }
})

export const { CreateUser, CreateFold, DeleteFolder, CreateCard, DeleteCard, ChangeOnline, ChangeIcon, ChangeLogin, ChangePassword, ChangeCard, GameInit, Game_DeleteCard, Game_ChangeCardType, Game_AddCard, CloseField, Change_GeneralCardType } = Autoris.actions
export default Autoris.reducer