import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const InitBase = createAsyncThunk(
  'Autoris/InitBase',
  async function () {
    const response = await fetch("http://cerver/", {
      method: "GET",
      header: {
        'Content-Type': 'json/application'
      }
    })
      .then(response => response.json())

    return response;
  }
);

export const SaveinBase = createAsyncThunk(
  'Autoris/SaveinBase',
  async function (state) {
    const response = await fetch("http://cerver/", {
      method: "POST",
      header: {
        'Content-Type': 'json/application'
      },
      body: JSON.stringify(state)
    })
      .then(response => response.json())

    return response;
  }
)

const Autoris = createSlice({
  name: 'Autoris',
  initialState: {
    list: {
      StatusOfLoad: "load",
      persons: [],
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
        focus: false,
        card: []
      })
    },
    ChangeFocus(state, action) {
      state.list.folders.filter(el => el.id_folder === action.payload.id)[0].focus = action.payload.status;
    },
    CloseFocus(state, action) {
      if (state.list.folders.filter(el => el.focus === true).length > 0) {
        state.list.folders.filter(el => el.focus === true)[0].focus = false;
      }
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
  },
  extraReducers: {
    [InitBase.fulfilled]: (state, action) => {
      state.list.persons = action.payload.persons;
      state.list.folders = action.payload.folders;

      for (let i = 0; i < state.list.persons.length; i++) {
        state.list.persons[i].id = Number(state.list.persons[i].id);
      }

      for (let i = 0; i < state.list.folders.length; i++) {
        state.list.folders[i].id_folder = Number(state.list.folders[i].id_folder);
        state.list.folders[i].user_Id = Number(state.list.folders[i].user_Id);
        state.list.folders[i].amount_card = Number(state.list.folders[i].amount_card);
        for (let j = 0; j < state.list.folders[i].card.length; j++) {
          state.list.folders[i].card[j].id_card = Number(state.list.folders[i].card[j].id_card);
          state.list.folders[i].card[j].id_folder = Number(state.list.folders[i].card[j].id_folder);
        }
      }

      state.list.StatusOfLoad = "installed";
    },
  }
})

export const { CreateUser, CreateFold, DeleteFolder, CreateCard, DeleteCard, ChangeOnline, ChangeIcon, ChangeLogin, ChangePassword, ChangeCard, GameInit, Game_DeleteCard, Game_ChangeCardType, Game_AddCard, CloseField, Change_GeneralCardType, ChangeFocus, CloseFocus } = Autoris.actions
export default Autoris.reducer