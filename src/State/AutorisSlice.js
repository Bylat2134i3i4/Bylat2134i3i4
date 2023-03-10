import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const get_users_id_pass_login = createAsyncThunk(
  'Autoris/get_users_id_pass_login',
  async function () {
    const response = await fetch("http://cerver/index.php?get_log_pass_id", {
      method: "GET",
      header: {
        'Content-Type': 'json/application'
      }
    })
      .then(response => response.json())

    return response;
  }
);

export const change_card_type = createAsyncThunk(
  'Autoris/change_card_type',
  async function (array) {
    const response = await fetch("http://cerver/index.php?change_card_type", {
      method: "POST",
      header: {
        'Content-Type': 'json/application'
      },
      body: JSON.stringify(array)
    })
      .then(response => response.json())
  }
);

export const del_fold = createAsyncThunk(
  'Autoris/del_fold',
  async function (data) {
    const API = "http://cerver/index.php?delete_folder=" + data.id_folder;
    const response = await fetch(API, {
      method: "GET",
      header: {
        'Content-Type': 'json/application'
      }
    })
      .then(response => response.json());

    //return response;
  }
);

export const del_card = createAsyncThunk(
  'Autoris/del_card',
  async function (data) {
    const API = "http://cerver/index.php?delete_card=" + data.id;
    const response = await fetch(API, {
      method: "GET",
      header: {
        'Content-Type': 'json/application'
      }
    })
      .then(response => response.json());

    //return response;
  }
);

export const get_data_current_user = createAsyncThunk(
  'Autoris/get_data_current_user',
  async function (id) {
    const API = "http://cerver/index.php?get_user=" + id;
    const response = await fetch(API, {
      method: "GET",
      header: {
        'Content-Type': 'json/application'
      }
    })
      .then(response => response.json());

    return response;
  }
);

export const add_user = createAsyncThunk(
  'Autoris/add_user',
  async function (object) {
    const API = "http://cerver/index.php?add_user";
    const data = {
      name: object.name,
      login: object.login,
      password: object.password,
      icon: ""
    }
    const response = await fetch(API, {
      method: "POST",
      header: {
        'Content-Type': 'json/application'
      },
      body: JSON.stringify(data)
    })
    //return response;
  }
);

export const add_fold = createAsyncThunk(
  'Autoris/add_fold',
  async function (data) {
    const API = "http://cerver/index.php?add_folder";
    const response = await fetch(API, {
      method: "POST",
      header: {
        'Content-Type': 'json/application'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json());

    return response;
  }
);

export const add_card = createAsyncThunk(
  'Autoris/add_card',
  async function (info) {
    const API = "http://cerver/index.php?add_card";
    const data = {
      id_folder: info.id_folder,
      front: info.front,
      back: info.back,
      card_type: "новые",
      time_create: new Date().toLocaleDateString()
    }
    const response = await fetch(API, {
      method: "POST",
      header: {
        'Content-Type': 'json/application'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json());

    return response;
  }
);

export const change_icon = createAsyncThunk(
  'Autoris/change_icon',
  async function (data) {
    const API = "http://cerver/index.php?change_icon";
    const response = await fetch(API, {
      method: "POST",
      header: {
        'Content-Type': 'json/application'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json());

    //return response;
  }
);

export const change_login = createAsyncThunk(
  'Autoris/change_login',
  async function (data) {
    const API = "http://cerver/index.php?change_login";
    const response = await fetch(API, {
      method: "POST",
      header: {
        'Content-Type': 'json/application'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json());

    //return response;
  }
);

export const change_password = createAsyncThunk(
  'Autoris/change_password',
  async function (data) {
    const API = "http://cerver/index.php?change_password";
    const response = await fetch(API, {
      method: "POST",
      header: {
        'Content-Type': 'json/application'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json());

    // return response;
  }
);

export const change_card_look = createAsyncThunk(
  'Autoris/change_card_look',
  async function (data) {
    const API = "http://cerver/index.php?change_card_look";
    const response = await fetch(API, {
      method: "POST",
      header: {
        'Content-Type': 'json/application'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json());

    //return response;
  }
);

const Autoris = createSlice({
  name: 'Autoris',
  initialState: {
    list: {
      StatusOfLoad: "load",
      person: [],//храниться данные конкретного пользователя
      folders: [],//храняться все папки пользователя
      cards: [],//храняться все карточки пользователя
      current_game: [],//нужно чтобы хранить данные о игре по конкретной папке
      short_list: [],//нужно для регистрации и авторизации, будет заполняться id, login, pass пользователей
    },
  },
  reducers: {//это функции, которые изменяют текущий state, то есть объект "list"
    ChangeStatusOfLoad(state) {//это нужно, чтобы сделать анимацию загрузки данных пользователя с сервера, при его успешной авторизации
      state.list.StatusOfLoad = "load";
    },
    ChangeIcon(state, action) {//изменение иконки у текущего пользователя
      state.list.person[0].icon = action.payload.icon;
    },
    ChangeLogin(state, action) {//изменеие логина у текущего пользователя
      state.list.person[0].login = action.payload.login;
    },
    ChangePassword(state, action) {//изменение пароля у текущего пользователя
      state.list.person[0].password = action.payload.password;
    },
    CloseUserWork(state) {//если пользователь выходит с аккаунта, очищаем state со всеми его данными
      state.list.person = [];
      state.list.folders = [];
      state.list.cards = [];
      state.list.short_list = [];
      state.list.StatusOfLoad = "load";
      state.list.current_game = [];
    },
    // CreateFold(state, action) {//создание новой папки у текущего клиента
    //   state.list.folders.push({
    //     user_Id: state.list.person[0].id,
    //     id_folder: state.list.folders.length === 0 ? 0 : state.list.folders[state.list.folders.length - 1].id_folder + 1,
    //     name: action.payload.name,
    //     icon: state.list.person[0].icon,
    //     amount_card: 0,
    //     user_name: state.list.person[0].name,
    //     focus: false,// флаг, который показывает, данные какой папки будут отображены на странице "setting_folder"
    //   })
    // },
    ChangeFocus(state, action) {//когда пользователь выходит\заходит из\на страницы\страницу "setting_folder" меняется флаг
      state.list.folders.filter(el => el.id_folder === action.payload.id)[0].focus = action.payload.status;
    },
    CloseFocus(state, action) {// убрать функция ChangeFocus может заменить по функционалу
      if (state.list.folders.filter(el => el.focus === true).length > 0) {
        state.list.folders.filter(el => el.focus === true)[0].focus = false;
      }
    },
    DeleteFolder(state, action) {// процесс удаления папки
      state.list.folders = state.list.folders.filter(el => el.id_folder !== action.payload.id_folder);//удаление папки

      state.list.cards = state.list.cards.filter(el => el.id_folder !== action.payload.id_folder);//удаление карточек связанных с папкой
    },
    // CreateCard(state, action) {//создание карточки 

    //   state.list.cards.push({
    //     id_card: state.list.cards.length === 0 ? 0 : state.list.cards[state.list.cards.length - 1].id_card + 1,
    //     id_folder: action.payload.id,
    //     front: action.payload.front,
    //     back: action.payload.back,
    //     card_type: "новые",
    //     time_create: new Date().toLocaleDateString()
    //   })

    //   state.list.folders.filter(el => el.id_folder === action.payload.id)[0].amount_card += 1;//прибавление количества карточек к папке
    //   // в которой лежит данная карточка
    // },
    DeleteCard(state, action) {//удаление карточки
      state.list.folders.filter(el => el.id_folder === action.payload.id_folder)[0].amount_card -= 1;//уменьшение количества карточек
      //к папке, в которой лежит данная карточка
      state.list.cards = state.list.cards.filter(el => el.id_card !== action.payload.id_card);
    },
    ChangeCard(state, action) {//изменение передней и задней части карточки
      state.list.cards.filter(el => el.id_card === action.payload.id_card)[0].front = action.payload.front;
      state.list.cards.filter(el => el.id_card === action.payload.id_card)[0].back = action.payload.back;
    },
    GameInit(state, action) {//инициализация данных об игре, запускается, когда пользователь нажимает на кнопку
      // начать игру по конкретной папке
      //console.log(state.list.cards[0].filter(el => el.id_folder === action.payload.id));

      state.list.current_game[0] = {
        folder_id: action.payload.id,
        cards: state.list.cards.filter(el => el.id_folder === action.payload.id).map(el => {
          return {
            id_card: el.id_card,
            id_folder: el.id_folder,
            front: el.front,
            back: el.back,
            card_type: "новые",
            time_create: el.time_create
          }
        })
      }
    },
    Game_DeleteCard(state, action) {//удаление карточки из очереди, если ее card_type="пройденные"
      state.list.current_game[0].cards = state.list.current_game[0].cards.filter(el => el.id_card !== action.payload.id);
    },
    Game_ChangeCardType(state, action) {//изменение статуса карточки, если пользователь нажал на кнопку "хорошо"
      state.list.current_game[0].cards.filter(el => el.id_card === action.payload.id)[0].card_type = action.payload.type;
    },
    Game_AddCard(state, action) {
      //если пользователь нажал на кнопку "хорошо", карточка поменяет свой тип, будет удалена из очереди
      //и тут в дело вступает эта функция, которая добавит эту карточку в конец очереди с уже новым статусом
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

      //когда игра закончиться, все карточки изменят свой статус на ступень выше
      //это условие не касается карточек со статусом "хорошо" их статус не измениться
      //чтобы обратиться к карточке будем использовать поле "front", так как в игре id карточки меняется и мы не сможем по нему
      // найти туже карточку в массиве "cards", а поле "front" уникально
      state.list.cards.filter(el => el.front === action.payload.front)[0].card_type = action.payload.new_card_type;
    },

    // for (let i = 0; i < state.list.persons.length; i++) {
    //   state.list.persons[i].id = Number(state.list.persons[i].id);
    // }

    // for (let i = 0; i < state.list.folders.length; i++) {
    //   state.list.folders[i].id_folder = Number(state.list.folders[i].id_folder);
    //   state.list.folders[i].user_Id = Number(state.list.folders[i].user_Id);
    //   state.list.folders[i].amount_card = Number(state.list.folders[i].amount_card);
    //   for (let j = 0; j < state.list.folders[i].card.length; j++) {
    //     state.list.folders[i].card[j].id_card = Number(state.list.folders[i].card[j].id_card);
    //     state.list.folders[i].card[j].id_folder = Number(state.list.folders[i].card[j].id_folder);
    //   }
    // }

  },
  extraReducers: {// тут идет работа непосредственно с ответами от сервера
    [get_users_id_pass_login.fulfilled]: (state, action) => {//если мы получили id, pass, login пользователей, то
      state.list.short_list = action.payload.persons;

      state.list.StatusOfLoad = "installed";//тип загрузки "загружены"
    },
    [get_data_current_user.fulfilled]: (state, action) => {//если мы получили полный сет данных (пользовательские данные)
      // папки пользователя и все его карточки, то идет инициализация текущего state данными, которые пришли с сервера
      state.list.person = action.payload.person;
      if (action.payload.his_folders !== undefined) {
        state.list.folders = action.payload.his_folders;

        for (let i = 0; i < state.list.folders.length; i++) {//изменение типов string - > integer
          state.list.folders[i].id_folder = Number(state.list.folders[i].id_folder);
          state.list.folders[i].user_Id = Number(state.list.folders[i].user_Id);
          state.list.folders[i].amount_card = Number(state.list.folders[i].amount_card);
        }
      }
      if (action.payload.his_cards !== undefined) {
        state.list.cards = action.payload.his_cards;
        for (let i = 0; i < state.list.cards.length; i++) {//изменение типов string - > integer
          state.list.cards[i].id_card = Number(state.list.cards[i].id_card);
          state.list.cards[i].id_folder = Number(state.list.cards[i].id_folder);
        }
      }

      state.list.StatusOfLoad = "installed";
    },
    [add_fold.fulfilled]: (state, action) => {
      state.list.folders.push({
        user_Id: state.list.person[0].id,
        id_folder: Number(action.payload.id_folder),
        name: action.payload.name,
        icon: state.list.person[0].icon,
        amount_card: 0,
        user_name: state.list.person[0].name,
        focus: false,// флаг, который показывает, данные какой папки будут отображены на странице "setting_folder"
      });
    },
    [add_card.fulfilled]: (state, action) => {
      state.list.cards.push({
        id_card: Number(action.payload.id_card),
        id_folder: Number(action.payload.id_folder),
        front: action.payload.front,
        back: action.payload.back,
        card_type: "новые",
        time_create: new Date().toLocaleDateString()
      });

      state.list.folders.filter(el => el.id_folder === Number(action.payload.id_folder))[0].amount_card += 1;
    }
  }
})

export const { DeleteFolder, DeleteCard, ChangeOnline, ChangeIcon, ChangeLogin, ChangePassword, ChangeCard, GameInit, Game_DeleteCard, Game_ChangeCardType, Game_AddCard, CloseUserWork, Change_GeneralCardType, ChangeFocus, CloseFocus, ChangeStatusOfLoad } = Autoris.actions
export default Autoris.reducer