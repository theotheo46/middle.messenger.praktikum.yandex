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
  avatar : any,
  addRemoveLink : LinkProps,
  title: string,
  attachLink: LinkProps,
  messageInput: InputProps,
  enterLink: LinkProps,
}

export class ChatWindow extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super(props);
  }

  protected init() {
    this.children.profileLink = new Link(this.props.profileLink);
    this.children.addRemoveLink = new Link(this.props.addRemoveLink);
    this.children.searchInput = new Input(this.props.searchInput);
    this.children.messageInput = new Input(this.props.messageInput);
    this.children.attachLink = new Link(this.props.attachLink);
    this.children.enterLink = new Link(this.props.enterLink);
    this.children.chats = [];

    for (const chatProp of this.props.chats) {
      this.children.chats.push(new Chat(chatProp));
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}