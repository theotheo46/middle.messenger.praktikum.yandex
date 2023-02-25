import Block from '../../utils/Block';
import template from './input.hbs';
import * as styles from '../../styles.module.pcss';

export interface InputProps {
  type?: string;
  placeholder: string;
  value: string;
  name: string;
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
