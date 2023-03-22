import Block from '../../utils/Block';
import template from './chatsList.hbs';
import { Chat } from '../Chat';
import * as styles from '../../styles.module.pcss';
import store, { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatsAPI';
import ChatsController from '../../controllers/ChatsController';
import {Button} from '../../components/Button';
import { AddChat } from '../../pages/AddChat';
import { AddUserToChat } from '../../pages/AddUserToChat';
import { RemoveUserFromChat } from '../../pages/RemoveUserFromChat';
import Router from '../../utils/Router';
import { Attachment } from '../../pages/Attachment';


interface ChatsListProps {
  chats: ChatInfo[];
  isLoaded: boolean;
  selectedChat: number | undefined;
}

class ChatsListBase extends Block<ChatsListProps>  {
  constructor(props: ChatsListProps) {
    super({...props});
  }

  protected init() {
    this.children.chats = this.createChats(this.props);

    this.children.attachment = new Attachment(
      {
        title: 'Присоединить',
        showModal: false
      }
    )

    this.children.addChat = new AddChat(
      {
        title: 'Добавить новый чат',
        showModal: false
      }
    )

    this.children.addUserToChat = new AddUserToChat(
      {
        title: 'Добавить пользователя к чату',
        showModal: false
      }
    )

    this.children.removeUserFromChat = new RemoveUserFromChat(
      {
        title: 'Удалить пользователя из чата',
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
        click: () => this.onAddUserToChat()
      },
    });
    this.children.buttonRemoveUserFromChat = new Button({
      label: 'Rmv u from chat',
      events: {
        click: () => this.onRemoveUserFromChat()
      },
    });
    this.children.buttonRemoveChat = new Button({
      label: 'Remove chat',
      events: {
        click: () => this.onRemoveSelectedChat()
      },
    });
    this.children.buttonProfile = new Button({
      label: 'Profile',
      events: {
        click: () => this.onProfileClick()
      },
    });
  }

  private onProfileClick() {
    Router.go('/profile');
  }

  private onAddChat() {
    if (store.isModalShow()) return;
    const state = store.getState();
    if (state.showModalAddChat === undefined) {
      store.set('showModalAddChat', true);
    }
    else {
      store.set('showModalAddChat', !state.showModalAddChat);
    }
  }

  private onRemoveSelectedChat() {
    if (store.isModalShow()) return;
    if (this.props.selectedChat === undefined) {
      alert('Pls select any chat');
    }
    else {
      ChatsController.delete(this.props.selectedChat)
      ChatsController.unselectChat();
    }
  }

  private onRemoveUserFromChat() {
    if (store.isModalShow()) return;
    if (this.props.selectedChat === undefined) {
      alert('Pls select any chat');
      return;
    }

    const state = store.getState();
    if (state.showModalRemoveUserFromChat === undefined) {
      store.set('showModalRemoveUserFromChat', true);
    }
    else {
      store.set('showModalRemoveUserFromChat', !state.showModalRemoveUserFromChat);
    }
  }

  
  private onAddUserToChat() {
    if (store.isModalShow()) return;
    if (this.props.selectedChat === undefined) {
      alert('Pls select any chat');
      return;
    }

    const state = store.getState();
    if (state.showModalAddUserToChat === undefined) {
      store.set('showModalAddUserToChat', true);
    }
    else {
      store.set('showModalAddUserToChat', !state.showModalAddUserToChat);
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
