import Block from '../../utils/Block';
import template from './chat.hbs';
import styles from '../../styles.module.pcss';
import { withStore } from '../../utils/Store';
import { ChatInfo } from '../../api/ChatsAPI';
import ResourcesAPI from '../../api/ResourcesAPI';

export interface ChatProps {
  id: number;
  title: string;
  avatar?: string;
  unread_count: number;
  selectedChat: ChatInfo;
  events: {
    click: () => void;
  }
}

class ChatBase extends Block<ChatProps> {
  constructor(props: ChatProps) {
    if (props.avatar !== undefined && props.avatar !== null) {
      props.avatar = ResourcesAPI.get_res_url() + props.avatar.slice(1);
    }
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props, isSelected: this.props.id === this.props.selectedChat?.id , styles});
  }
}

export const withSelectedChat = withStore<ChatProps>(state => ({selectedChat: (state.chats || []).find((chat: ChatInfo) => chat.id === state.selectedChat)}));

export const Chat = withSelectedChat(ChatBase);
