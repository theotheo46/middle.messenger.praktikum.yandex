import Block from '../../utils/Block';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import template from './addchat.hbs';
import * as styles from '../../styles.module.pcss';
import store, { withStore } from '../../utils/Store';
import ChatsController from '../../controllers/ChatsController';

interface AddChatProps  {
    showModal : boolean;
    title: string;
  }

export class AddChatBase extends Block<AddChatProps> {
    constructor(props: AddChatProps) {
        super(props);
      }
  
  
   init() {

     this.props.showModal = false;
  
      this.children.input = new Input({
        name: 'chatname',
        type: 'text',
        placeholder: 'Имя чата',
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
        const chatName = (this.children.input as Input).value();
        if (chatName == '') {
            alert('Имя чата не должно быть пустым');
        }
        else {
            ChatsController.create(chatName);
            const state = store.getState();
            store.set('showModal', !state.showModal);
        }
    }
           
    onCancel() {
        console.log('Cancel')
        const state = store.getState();
        store.set('showModal', !state.showModal);
    }
    

  
    render() {
      return this.compile(template, { ...this.props, styles });
    }
  }

  const withShowModal = withStore((state) => ({showModal: state.showModal}))
  
  export const AddChat = withShowModal(AddChatBase);

  
