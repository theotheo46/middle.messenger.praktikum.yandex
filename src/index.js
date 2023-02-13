import login from './pages/login/login.hbs';
import error from './pages/error/error.hbs';
import registration from './pages/registration/registration.hbs';
import profile from './pages/profile/profile.hbs';
import profileSave from './pages/profile/profileSave.hbs';
import profileSavePassword from './pages/profile/profileSavePassword.hbs';
import fileUpload from './pages/fileUpload/fileUpload.hbs';
import fileUploaded from './pages/fileUpload/fileUploaded.hbs';
import user from './pages/user/user.hbs';
import './components/button';
import './components/input';
import './components/labeledinput';
import * as styles from './styles.module.pcss';
import avatar from '../static/UserIcon6464.png';
import left from '../static/left.png';

const ROUTES = {
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
}

const PORT = 3000;

function render(html) {
  const app = document.querySelector('#app');
  app.innerHTML = html;
}

window.goToPage = function (name) {
  const page = ROUTES[name]
  let context;
  switch (name) {
    case 'login':
      context = { 
        title:    'Вход',
        login:    {  placeholder: 'Логин', error_text: 'Неверный логин', name: 'login' , type: 'text'}, 
        password: {  placeholder: 'Пароль', type: 'password', name:'password' }, 
        button:   {  type: 'submit', label: 'Авторизоваться'},
        styles 
      }
      break;
    case 'registration':
      context = { 
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
      }
      break;
    case 'profile':
      context = { 
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
      }
      break;
    case 'profileSave':
      context = { 
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
      }
      break;
    case 'profileSavePassword':
      context = { 
        title: 'Иван',
        avatar,
        left,
        button:         {   type: 'submit', label: 'Сохранить'},
        oldpassword:    {  label: 'Старый пароль', value: '12345',  type: 'password', name: 'password' }, 
        newpassword:    {  label: 'Новый пароль', value: '1234567', type: 'password' , name: 'newpassword' }, 
        repnewpassword: {  label: 'Новый пароль', value: '1234567', type: 'password' , name: 'repnewpassword' }, 
        styles 
      }
      break;
    case 'fileUpload':
      context = { 
        caption:    'Загрузите файл',
        link_text:  'Выбрать файл на компьютере',
        button:     { type: 'button', label: 'Поменять'},
        error_text :'Нужно выбрать файл',
        styles 
      }
      break;
    case 'fileUploaded':
      context = { 
        caption:   'Файл загружен',
        file_name: 'pic.jpg',
        button:    {type: 'button', label: 'Поменять'},
        styles 
      }
      break;
    case 'fileUploadError':
      context = { 
        caption:       'Ошибка попробуйте еще раз',
        link_text:     'Выбрать файл на компьютере',
        button:        {type: 'button', label: 'Поменять'},
        styles 
      }
      break;
      case 'userAdd':
        context = { 
          caption:  'Добавить пользователя',
          button:   { type: 'submit',label: 'Добавить'},
          user:     {placeholder: 'Логин', value: 'ivan101010', type: 'text' }, 
          styles 
        }
        break;
      case 'userRemove':
        context = { 
          caption: 'Удалить пользователя',
          button:  { type: 'submit',label: 'Удалить'},
          user:    {placeholder: 'Логин', value: 'ivan101010', type: 'text' }, 
          styles 
        }
        break;
    case '404':
      context = { errorCode: '404', errorText: 'Не туда попали', styles }
      break;
    case '500':
      context = { errorCode: '500', errorText: 'Мы уже фиксим', styles }
      break;
    default:
      console.log('Unknown name: ' + name);
      break;
  }
  render(page(context));
}

window.addEventListener('DOMContentLoaded', () => {
  context = { 
    title:    'Вход',
    login:    {  placeholder: 'Логин', error_text: 'Неверный логин', name: 'login' , type: 'text'}, 
    password: {  placeholder: 'Пароль', type: 'password', name:'password' }, 
    button:   {  type: 'submit', label: 'Авторизоваться'},
    styles 
  }
  render(ROUTES.login(context));
});
