import Block from '../../utils/Block';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import template from '../AddChat/addchat.hbs';
import {AddChatProps} from '../AddChat';
import styles from '../../styles.module.pcss';
import store, { withStore } from '../../utils/Store';
import ChatsController from '../../controllers/ChatsController';


export class AddUserToChatBase extends Block<AddChatProps> {
    constructor(props: AddChatProps) {
        super(props);
      }
  
  
   init() {

     this.props.showModal = false;
  
      this.children.input = new Input({
        name: 'username',
        type: 'text',
        placeholder: 'Имя пользователя',
      });

      this.children.buttonOK = new Button({
        label: 'OK',
        events: {
            click: () => this.onOK()
        }
      })
  
      this.children.buttonCancel = new Button({
        label: 'Cancel',
        events: {
            click: () => this.onCancel()
        }
      })
    }
   
    onOK() {
        const userName = (this.children.input as Input).value();
        if (userName == '') {
            alert('Имя пользователя не должно быть пустым');
        }
        else {
          
          if (!this.props.selectedChat) {
            throw new Error('selectedChat is not defined');
          }
            ChatsController.addUserToChat(this.props.selectedChat, userName);
            const state = store.getState();
            store.set('showModalAddUserToChat', !state.showModalAddUserToChat);
        }
    }
           
    onCancel() {
        console.log('Cancel')
        const state = store.getState();
        store.set('showModalAddUserToChat', !state.showModalAddUserToChat);
    }
    

  
    render() {
      return this.compile(template, { ...this.props, styles });
    }
  }

  const withShowModal = withStore((state) => ({showModal: state.showModalAddUserToChat, selectedChat: state.selectedChat}))
  
  export const AddUserToChat = withShowModal(AddUserToChatBase);

  
 