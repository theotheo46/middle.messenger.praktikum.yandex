import avatar from '../static/UserIcon6464.png';
import addRemoveUserButton from '../static/threepoints.png';
import attachButton from '../static/Attachment.png';
import chatEnterButton from '../static/ChatEnter.png';
import photoOrVideoAttachment from '../static/PhotoOrVideoAttachment.png';
import fileAttachment from '../static/FileAttachment.png';
import locationAttachment from '../static/LocationAttachment.png';
import addUser from '../static/AddUser.png';
import removeUser from '../static/RemoveUser.png';
import left from '../static/left.png';
import { ErrorPage } from './pages/Error';
import { LoginPage } from './pages/Login';
import { RegistrationPage } from './pages/Registration';
import { UserPage } from './pages/User';
import { ProfileSavePasswordPage } from './pages/ProfileSavePassword';
import { ProfilePage } from './pages/Profile';
import { FileUploadPage } from './pages/FileUpload';
import { ChatWindow } from './pages/ChatWindow';
import { RefPicPopup } from './pages/RefPicPopup';
import Block from './utils/Block';
declare global {
  interface Window {
    goToPage:any;
  }
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
          link : {
            label: 'Нет аккаунта?',
            href : '#',
            name : 'loginref',
          },
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
      page = new RegistrationPage (
        {
          title: 'Иван',
          inputs : [
            {type : 'text', placeholder : 'Почта', name : 'email', errorText: ''},
            {type : 'text', placeholder : 'Телефон', name : 'phone', errorText: ''},
            {type : 'text', placeholder : 'Имя', name : 'first_name', errorText: ''},
            {type : 'text', placeholder : 'Фамилия', name : 'second_name', errorText: ''},
            {type : 'text', placeholder : 'Логин', name : 'login', errorText: ''},
            {type : 'password', placeholder : 'Пароль', name : 'password', errorText : 'Неверный пароль'},
            {type : 'password', placeholder : 'Пароль (еще раз)', name : 'anotherpassword', errorText : 'Неверный пароль'},
          ],
          buttonCaption : 'Зарегистрироваться',     
          link : {
            label: 'Войти',
            href : '#',
            name : 'enterref',
          }
        }
      );
      render('#app', page);
      break;
   case 'profile':
      page = new ProfilePage( {
          title : 'Иван',
          isSave : false,
          left,
          avatar,
          buttonCaption : '',
          links : [
            {
              label: 'Изменить данные',
              href : '#',
              name : 'datachref',
            },
            {
              label: 'Изменить пароль',
              href : '#',
              name : 'passchref',
            },
            {
              label: 'Выйти',
              href : '#',
              name : 'exitref',
            },
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
      break;
      
    case 'fileUpload':
      page = new FileUploadPage(
        {
          caption: 'Загрузите файл',
          isFileUpload : true,
          errorText : 'Нужно выбрать файл',
          buttonCaption : 'Поменять',
          fileLink : {
            label: 'Выбрать файл на компьютере',
            href : '#',
            name : 'choiceref',
          }
        }
      );
      render('#app', page);
      break;
    case 'fileUploaded':
      page = new FileUploadPage(
        {
          caption: 'Файл загружен',
          isFileUpload : false,
          errorText : '',
          buttonCaption : 'Поменять',
          fileName : 'pic.jpg',
          fileLink : {
            label: '',
            href : '#',
            name : 'enterref',
          }
        }
      );
      render('#app', page);
      break;
    case 'fileUploadError':
      page = new FileUploadPage(
        {
          caption: 'Ошибка попробуйте еще раз',
          isFileUpload : true,
          buttonCaption : 'Поменять',
          fileLink : {
            label: 'Выбрать файл на компьютере',
            href : '#',
            name : 'enterref',
          }
        }
      );
      render('#app', page);
      break;
       
      case 'userAdd':
        page = new UserPage(
          {
            caption: 'Добавить пользователя',
            input : {type : 'text', placeholder : 'Логин', name : 'login', value: 'ivan101010', errorText: ''},
            buttonCaption : 'Добавить',
          }
        );
        render('#app', page);
        break;
      case 'userRemove':
        page = new UserPage(
          {
            caption: 'Удалить пользователя',
            input : {type : 'text', placeholder : 'Логин', name : 'login', value: 'ivan101010', errorText: '' },
            buttonCaption : 'Удалить',
          }
        );
        render('#app', page);
        break; 
    case '404':
      page = new ErrorPage({errorCode : 404, errorText : 'Не туда попали', link : {
        label: 'Назад к чатам',
        href : '#',
        name : 'returnref',
      }});
      render('#app', page);
      break;
    case '500':
      page = new ErrorPage({errorCode : 500, errorText : 'Мы уже фиксим', link : {
        label: 'Назад к чатам',
        href : '#',
        name : 'returnref',
      }});
      render('#app', page);
      break;
    case 'attachmentPopUp':
      page = new RefPicPopup({links : [
      {
        label: 'Фото или видеo',
        href : '#',
        image : photoOrVideoAttachment
      },
      {
        label: 'Файл',
        href : '#',
        image : fileAttachment
      },  
      {
        label: 'Локация',
        href : '#',
        image : locationAttachment
      },    
    ]
    });
    render('#app', page);
    break;
    case 'addRemoveUserPopUp':
      page = new RefPicPopup({links : [
      {
        label: 'Добавить пользователя',
        href : '#',
        image : addUser
      },
      {
        label: 'Удалить пользователя',
        href : '#',
        image : removeUser
      }  
    ]
    });
    render('#app', page);
    break;
    case 'chatWindow':
      page = new ChatWindow(
        {
          profileLink : {
            label: 'Профиль>',
            href : '#',
            name : 'enterref',
          },
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
          ],
          avatar,
          addRemoveLink : {
            href : '#',
            image : addRemoveUserButton,
          },
          title: 'Дмитрий',
          attachLink: {
            href : '#',
            image : attachButton,
          },
          messageInput: {type : 'text', placeholder : '', name : 'messageEntry'},
          enterLink: {
            href : '#',
            image : chatEnterButton,
          },
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
  window.goToPage('login');
});

