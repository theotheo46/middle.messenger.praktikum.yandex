import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import {Input, InputProps} from '../../components/Input';
import {Chat, ChatProps} from '../../components/Chat';
import { ErrorInformer} from '../../components/ErrorInformer';
import {Validator, InputNames} from '../../utils/Validator';
import template from './chatwindow.hbs';
import * as styles from '../../styles.module.pcss';

interface ChatWindowProps {
  profileLink: LinkProps;
  searchInput: InputProps;
  chats : ChatProps[],
  avatar : unknown,
  addRemoveLink : LinkProps,
  title: string,
  attachLink: LinkProps,
  messageInput: InputProps,
  errorText: string;
  enterLink: LinkProps,
}

export class ChatWindow extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    super(props);
  }

  private readonly validator = Validator.Instance; 

  protected init() {
    this.children.profileLink = new Link(this.props.profileLink);
    this.children.addRemoveLink = new Link(this.props.addRemoveLink);
    this.children.searchInput = new Input(this.props.searchInput);
    this.children.messageInput = new Input({...this.props.messageInput,
      events: {
        focus: () => this._validate(),
        blur:  () => this._validate(),
      }
    });
    this.children.attachLink = new Link(this.props.attachLink);
    this.children.enterLink = new Link(this.props.enterLink);
    this.children.chats = [];

    for (const chatProp of this.props.chats) {
      this.children.chats.push(new Chat(chatProp));
    }

    this.children.errorinformer = new ErrorInformer({text : this.props.errorText})
  }


  _validate() {
    const inp = this.children.messageInput as Input;
    const einf = this.children.errorinformer as ErrorInformer;
    const ret = this.validator.validate(inp.name() as InputNames, inp.value());
    if (!ret) {
      const nm = this.validator.VALIDATORS[inp.name() as InputNames].errorMessage;
      einf.setProps({text: nm});
    }
    else {
      einf.setProps({text: ''});
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
