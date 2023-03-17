import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import {Input, InputProps} from '../../components/Input';
import {Chat, ChatProps} from '../../components/Chat';
import { ErrorInformer} from '../../components/ErrorInformer';
import {Validator, InputNames} from '../../utils/Validator';
import template from './chatwindow.hbs';
import threepoints from '../../../static/threepoints.png';
import attachment from '../../../static/Attachment.png';
import chatEnter from '../../../static/ChatEnter.png';
import { withStore } from '../../utils/Store';
import * as styles from '../../styles.module.pcss';

export class ChatWindowProto extends Block {
  private readonly validator = Validator.Instance; 

  protected init() {
    this.children.profileLink = new Link({
      label: 'Профиль >',
      to: '/profile'
    });

    this.children.addRemoveLink = new Link({
      image: threepoints,
      to: '/addremoveuser'
    });

    this.children.searchInput = new Input({type : 'text', placeholder : 'Поиск', name : 'Search'});
    this.children.messageInput = new Input({type : 'text', placeholder : '', name : 'message',
      events: {
        focus: () => this._validate(),
        blur:  () => this._validate(),
      }
    });
     
    this.children.attachLink = new Link({
      image: attachment,
      to: '/attach'
    });

    this.children.enterLink = new Link({
      image: chatEnter,
      noNavigate : true,
      events: {
        click: () => {console.log('enterLink click')} 
      },
    });

    this.children.chats = [];

   /*  for (const chatProp of this.props.chats) {
      this.children.chats.push(new Chat(chatProp));
    } */

    this.children.errorinformer = new ErrorInformer({text : ''})
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

const withUser = withStore((state) => ({ ...state.user}))

export const ChatWindow = withUser(ChatWindowProto);
