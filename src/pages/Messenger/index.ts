import Block from '../../utils/Block';
import template from './messenger.hbs';
import { ChatsList } from '../../components/ChatsList';
import { Messenger } from '../../components/Messenger';
import styles from '../../styles.module.pcss';       
import ChatsController from '../../controllers/ChatsController';
import { withStore } from '../../utils/Store';

export class MessengerPageBase extends Block {
  constructor() {
    super({});
  }

  protected init() {
    this.children.chatsList = new ChatsList({ isLoaded: false });

    this.children.messenger = new Messenger({});

    ChatsController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true
      })
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { styles })
  }
}

const withUser = withStore((state) => ({ ...state.user}))

export const MessengerPage = withUser(MessengerPageBase);
