import Block from '../../utils/Block';
import template from './chat.hbs';
import * as styles from '../../styles.module.pcss';



export interface ChatProps {
  avatar : any;
  title : string;
  datetime : string;
  message : string;
  unread_count : number;
}

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

