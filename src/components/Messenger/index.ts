import Block from '../../utils/Block';
import template from './messenger.hbs';
import { Message } from '../Message';
import { Input } from '../Input';
import { Button } from '../Button';
import * as styles from '../../styles.module.pcss';
import MessagesController, { Message as MessageInfo } from '../../controllers/MessagesController';
import store, { withStore } from '../../utils/Store';

interface MessengerProps {
  selectedChat: number | undefined;
  messages: MessageInfo[];
  userId: number;
}

class MessengerBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super(props);
  }
  protected init() {
    this.children.messages = this.createMessages(this.props);

    this.children.input = new Input({
      type: 'text',
      placeholder: 'Сообщение',
      name: 'message'
    });

    this.children.buttonAttach = new Button({
      label: 'Присоединить',
      type: 'button',
      events: {
        click: () => {
          if (store.isModalShow()) return;
          if (this.props.selectedChat === undefined) {
            alert('Pls select any chat');
            return;
          }
      
          const state = store.getState();
          if (state.showModalAttachment === undefined) {
            store.set('showModalAttachment', true);
          }
          else {
            store.set('showModalAttachment', !state.showModalAttachment);
          }
        }
      }
    });

    this.children.buttonSend = new Button({
      label: 'Отправить',
      type: 'button',
      events: {
        click: () => {
          const input =this.children.input as Input;
          const message = input.value();

          input.setValue('');

          if (!this.props.selectedChat) {
            throw new Error('selectedChat is not defined');
          }

          MessagesController.sendMessage(this.props.selectedChat, message);
        }
      }
    });
  }

  protected componentDidUpdate(oldProps: MessengerProps, newProps: MessengerProps): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: MessengerProps) {
    return props.messages.map(data => {
      return new Message({...data, isMine: props.userId === data.user_id });
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}

const withSelectedChatMessages = withStore(state => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase);
