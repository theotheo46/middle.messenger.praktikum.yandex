import avatar from '../static/UserIcon6464.png';
import left from '../static/left.png';
import { ErrorPage } from './pages/Error';
import { LoginPage } from './pages/Login';
import { RegistrationPage } from './pages/Registration';
import { UserPage } from './pages/User';
import { ProfileSavePasswordPage } from './pages/ProfileSavePassword';
import { ProfilePage } from './pages/Profile';
import { FileUploadPage } from './pages/FileUpload';
import { ChatWindow } from './pages/ChatWindow';
import Block from './utils/Block';

/* const ROUTES = {
  "login" : login,
  "404" : error,
  "500" : error,
  "registration" : registration,
  "profile" : profile,
  "profileSave" : profileSave,
  "profileSavePassword" : profileSavePassword,
  "fileUpload" : fileUpload,
  "fileUploadError" : fileUpload,
  "fileUploaded" : fileUploaded,
  "userAdd" : user,
  "userRemove" : user,
}  */

const PORT = 3000;

declare global {
  interface Window {
    goToPage:any;
  }
}

interface BlockConstructable<P extends Record<string, any> = any> {
  new(props: P): Block<P>;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }
  root.innerHTML = '';
  root.append(block.getContent()!);
  return root;
}


 window.goToPage = function (name : string) {
  let page;
  switch (name) {
    case 'login':
      page = new LoginPage(
        {
          title : 'Вход',
          linkText : 'Нет аккаунта?',
          buttonCaption : 'Авторизоваться',
          inputs : [
            {placeholder: 'Логин', errorText: 'Неверный логин', name: 'login' , type: 'text'},
            {placeholder: 'Пароль', errorText: 'Неверный пароль', name: 'password' , type: 'password' },
          ]
        }
      );
      render('#app', page);
      break;
    case 'registration':
    /*   context = { 
        title:          'Регистрация',
        mail:           {  placeholder: 'Почта', name: 'email', type: 'text'}, 
        phone:          {  placeholder: 'Телефон', name: 'phone' , type: 'text'}, 
        name:           {  placeholder: 'Имя', name: 'first_name', type: 'text'}, 
        surname:        {  placeholder: 'Фамилия', name: 'second_name', type: 'text'}, 
        login:          {  placeholder: 'Логин', name: 'login', type: 'text'}, 
        anotherpassword:{  placeholder: 'Пароль (еще раз)', type: 'password', error_text: 'Неверный пароль', name: 'password' }, 
        password:       {  placeholder: 'Пароль', type: 'password', error_text: 'Неверный пароль', name: 'anotherpassword' }, 
        button:         {  type: 'submit', label: 'Зарегистрироваться'},
        styles 
      } */

      page = new RegistrationPage (
        {
          title: 'Иван',
          inputs : [
            {type : 'text', placeholder : 'Почта', name : 'email'},
            {type : 'text', placeholder : 'Телефон', name : 'phone'},
            {type : 'text', placeholder : 'Имя', name : 'first_name'},
            {type : 'text', placeholder : 'Фамилия', name : 'second_name'},
            {type : 'text', placeholder : 'Логин', name : 'login'},
            {type : 'password', placeholder : 'Пароль', name : 'password', errorText : 'Неверный пароль'},
            {type : 'password', placeholder : 'Пароль (еще раз)', name : 'anotherpassword', errorText : 'Неверный пароль'},
          ],
          buttonCaption : 'Зарегистрироваться',     
          link : {label : 'Войти'}
        }
      );
      render('#app', page);
      break;
   case 'profile':
/*       context = { 
        title: 'Иван',
        avatar,
        left,
        name:       {  label: 'Имя', value: 'Иван', name: 'first_name', type: 'text'}, 
        surname:    {  label: 'Фамилия', value: 'Иванов', name: 'second_name', type: 'text' }, 
        login:      {  label: 'Логин', value: 'ivan101010', name: 'login' , type: 'text'}, 
        mail:       {  label: 'Почта', value: 'theotheo46@gmail.com', name: 'email', type: 'text' }, 
        chatname:   {  label: 'Имя в чате', value: 'Ванек', name: 'display_name', type: 'text' },
        phone:      {  label: 'Телефон', value: '8345657384', name: 'phone', type: 'text' },
        styles 
      } */
      page = new ProfilePage( {
          title : 'Иван',
          isSave : false,
          left,
          avatar,
          buttonCaption : '',
          links : [
            {label : 'Изменить данные'},
            {label : 'Изменить пароль'},
            {label : 'Выйти'},
          ],
          inputs : [
            {label : 'Имя', type : 'text', value : 'Иван', name : 'first_name'},
            {label : 'Фамилия', type : 'text', value : 'Иванов', name : 'second_name'},
            {label : 'Логин', type : 'text', value : 'ivan101010', name : 'login'},
            {label : 'Почта', type : 'text', value : 'theotheo46@gmail.com', name : 'email'},
            {label : 'Имя в чате', type : 'text', value : 'Ванек', name : 'display_name'},
            {label : 'Телефон', type : 'text', value : '8345657384', name : 'phone'},
          ]
        }
      );
      render('#app', page);
      break;
    case 'profileSave':
/*       context = { 
        title: 'Иван',
        avatar,
        left,
        button:  {   type: 'submit', label: 'Сохранить'},
        name:    {  label: 'Имя', value: 'Иван', name: 'first_name', type: 'text' }, 
        surname: {  label: 'Фамилия', value: 'Иванов', name: 'second_name', type: 'text' }, 
        login:   {  label: 'Логин', value: 'ivan101010' , name: 'login', type: 'text' }, 
        mail:    {  label: 'Почта', value: 'theotheo46@gmail.com' , name: 'email', type: 'text' }, 
        chatname:{  label: 'Имя в чате', value: 'Ванек', name: 'display_name', type: 'text' },
        phone:   {  label: 'Телефон', value: '8345657384', name: 'phone', type: 'text' },
        styles 
      } */
      page = new ProfilePage( {
        title : 'Иван',
        isSave : true,
        left,
        avatar,
        buttonCaption : 'Сохранить',
        links : [],
        inputs : [
          {label : 'Имя', type : 'text', value : 'Иван', name : 'first_name'},
          {label : 'Фамилия', type : 'text', value : 'Иванов', name : 'second_name'},
          {label : 'Логин', type : 'text', value : 'ivan101010', name : 'login'},
          {label : 'Почта', type : 'text', value : 'theotheo46@gmail.com', name : 'email'},
          {label : 'Имя в чате', type : 'text', value : 'Ванек', name : 'display_name'},
          {label : 'Телефон', type : 'text', value : '8345657384', name : 'phone'},
        ]
      }
    );
    render('#app', page);
      break;
      
    case 'profileSavePassword':
      page = new ProfileSavePasswordPage(
        {
          title : 'Иван',
          left,
          avatar,
          buttonCaption : 'Сохранить',
          inputs : [
            {label : 'Старый пароль', type : 'password', value : '12345', name : 'password'},
            {label : 'Новый пароль', type : 'password', value : '1234567676', name : 'newpassword'},
            {label : 'Новый пароль', type : 'password', value : '1234567676', name : 'repnewpassword'},
          ]
        }
      );
      render('#app', page);
/*       context = { 
        title: 'Иван',
        avatar,
        left,
        button:         {   type: 'submit', label: 'Сохранить'},
        oldpassword:    {  label: 'Старый пароль', value: '12345',  type: 'password', name: 'password' }, 
        newpassword:    {  label: 'Новый пароль', value: '1234567', type: 'password' , name: 'newpassword' }, 
        repnewpassword: {  label: 'Новый пароль', value: '1234567', type: 'password' , name: 'repnewpassword' }, 
        styles 
      } */
      break;
      
    case 'fileUpload':
/*       context = { 
        caption:    'Загрузите файл',
        link_text:  'Выбрать файл на компьютере',
        button:     { type: 'button', label: 'Поменять'},
        error_text :'Нужно выбрать файл',
        styles 
      } */
      page = new FileUploadPage(
        {
          caption: 'Загрузите файл',
          isFileUpload : true,
          errorText : 'Нужно выбрать файл',
          buttonCaption : 'Поменять',
          fileLink : {label : 'Выбрать файл на компьютере'}
        }
      );
      render('#app', page);
      break;
    case 'fileUploaded':
/*       context = { 
        caption:   'Файл загружен',
        file_name: 'pic.jpg',
        button:    {type: 'button', label: 'Поменять'},
        styles 
      }
      break; */
      page = new FileUploadPage(
        {
          caption: 'Файл загружен',
          isFileUpload : false,
          errorText : '',
          buttonCaption : 'Поменять',
          fileName : 'pic.jpg',
          fileLink : {label : ''}
        }
      );
      render('#app', page);
      break;
    case 'fileUploadError':
/*       context = { 
        caption:       'Ошибка попробуйте еще раз',
        link_text:     'Выбрать файл на компьютере',
        button:        {type: 'button', label: 'Поменять'},
        styles 
      } */
      page = new FileUploadPage(
        {
          caption: 'Ошибка попробуйте еще раз',
          isFileUpload : true,
          buttonCaption : 'Поменять',
          fileLink : {label : 'Выбрать файл на компьютере'}
        }
      );
      render('#app', page);
      break;
      
      case 'userAdd':
/*         context = { 
          caption:  'Добавить пользователя',
          button:   { type: 'submit',label: 'Добавить'},
          user:     {placeholder: 'Логин', value: 'ivan101010', type: 'text' }, 
          styles 
        } */
        page = new UserPage(
          {
            caption: 'Добавить пользователя',
            input : {type : 'text', placeholder : 'Логин', name : 'login', value: 'ivan101010'},
            buttonCaption : 'Добавить',
          }
        );
        render('#app', page);
        break;
      case 'userRemove':
/*         context = { 
          caption: 'Удалить пользователя',
          button:  { type: 'submit',label: 'Удалить'},
          user:    {placeholder: 'Логин', value: 'ivan101010', type: 'text' }, 
          styles 
        } */
        page = new UserPage(
          {
            caption: 'Удалить пользователя',
            input : {type : 'text', placeholder : 'Логин', name : 'login', value: 'ivan101010'},
            buttonCaption : 'Удалить',
          }
        );
        render('#app', page);
        break; 
    case '404':
      page = new ErrorPage({errorCode : 404, errorText : 'Не туда попали', link : {label : 'Назад к чатам'}});
      render('#app', page);
      break;
    case '500':
      page = new ErrorPage({errorCode : 500, errorText : 'Мы уже фиксим', link : {label : 'Назад к чатам'}});
      render('#app', page);
      break;
    case 'chatWindow':
      page = new ChatWindow(
        {
          profileLink : {label : 'Профиль >'},
          searchInput : {type : 'text', placeholder : 'Поиск', name : 'Search'},
          chats : [
            {
              avatar,
              title : 'Игорь',
              datetime : '11:15',
              message : 'Привет',
              unread_count : 5,
            },
            {
              avatar,
              title : 'Иван',
              datetime : '12:15',
              message : 'фыдлврофдылворфдылвордыфлвордыфлворыфдлорвыфдлворыдф фырвлыфдорв ыфлорвдыфлрводфлыорв лфыорвдлыфорвдыфлрво',
              unread_count : 3,
            },
            {
              avatar,
              title : 'Петр',
              datetime : '13:15',
              message : 'Привет',
              unread_count : 0,
            },
            {
              avatar,
              title : 'ЯЕгоНезнаю',
              datetime : '13:15',
              message : 'Дай денег',
              unread_count : 20,
            }
            ,
            {
              avatar,
              title : 'Чужой',
              datetime : 'пт',
              message : 'Добрый день',
              unread_count : 10,
            }
          ]
        }
      );
      render('#app', page);
      break;
    default:
      console.log('Unknown name: ' + name);
      break;
  }
} 

window.addEventListener('DOMContentLoaded', () => {
  const page = new LoginPage(
    {
      title : 'Вход',
      linkText : 'Нет аккаунта?',
      buttonCaption : 'Авторизоваться',
      inputs : [
        {placeholder: 'Логин', errorText: 'Неверный логин', name: 'login' , type: 'text' },
        {placeholder: 'Пароль', errorText: 'Неверный пароль', name: 'password' , type: 'password'},
      ]
    }
  );
  render('#app', page);
});

