import Block from '../../utils/Block';
import template from './chatsList.hbs';
import { Chat } from '../Chat';
import * as styles from '../../styles.module.pcss';
import store, { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatsController';
import MessagesController from '../../controllers/MessagesController';
import { Link } from '../Link';
import {Button} from '../../components/Button';
import { AddChat } from '../../pages/AddChat';


interface ChatsListProps {
  chats: ChatInfo[];
  isLoaded: boolean;
  selectedChat: number | undefined;
}

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super({...props});
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
   // ChatsController.addUserToChat(8451, 677502);
/*     ChatsController.create('Chat1');
    ChatsController.create('Chat2');
    ChatsController.create('Chat3');  */
    //this.children.profileLink = new Link({ to: '/profile', label: 'Профиль'});

    this.children.addChat = new AddChat(
      {
        title: 'Добавить новый чат',
        showModal: false
      }
    )


    this.children.buttonAddChat = new Button({
      label: 'Add chat',
      events: {
        click: () => this.onAddChat()
      },
    });
    this.children.buttonAddUserToChat = new Button({
      label: 'Add u to chat',
      events: {
        click: () => {console.log('Add user to chat')}
      },
    });
    this.children.buttonRemoveUserFromChat = new Button({
      label: 'Rmv u from chat',
      events: {
        click: () => {console.log('Remove user from chat')}
      },
    });
    this.children.buttonRemoveChat = new Button({
      label: 'Remove chat',
      events: {
        click: () => this.onRemoveSelectedChat()
      },
    });
  }

  private onAddChat() {
    console.log('Add chat');
    const state = store.getState();
    if (state.showModal === undefined) {
      store.set('showModal', true);
    }
    else {
      store.set('showModal', !state.showModal);
    }
  }

  private onRemoveSelectedChat() {
    console.log('Remove chat');
    if (this.props.selectedChat === undefined) {
      alert('Pls select any chat');
    }
    else {
      ChatsController.delete(this.props.selectedChat)
    }


  }

  protected componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    this.children.chats = this.createChats(newProps);
    
    return true;
  }

  private createChats(props: ChatsListProps) {
    return props.chats.map(data => {
      return new Chat({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          }
        }
      });
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props, styles});
  }
}

const withChats = withStore((state) => (
  {
    chats: [...(state.chats || [])],
    selectedChat: state.selectedChat
  }
));

export const ChatsList = withChats(ChatsListBase);
