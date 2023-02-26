import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import {Input, InputProps} from '../../components/Input';
import {Button} from '../../components/Button';
import {Chat, ChatProps} from '../../components/Chat';
import template from './chatwindow.hbs';
import * as styles from '../../styles.module.pcss';

interface ChatWindowProps {
  profileLink: LinkProps;
  searchInput: InputProps;
  chats : ChatProps[],
}

export class ChatWindow extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super(props);
  }

  protected init() {
    this.children.profileLink = new Link(this.props.profileLink);
    this.children.searchInput = new Input(this.props.searchInput);
    this.children.chats = [];
    this.children.chats.push(new Chat(this.props.chats[0]));
    this.children.chats.push(new Chat(this.props.chats[1]));
    this.children.chats.push(new Chat(this.props.chats[2]));
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}