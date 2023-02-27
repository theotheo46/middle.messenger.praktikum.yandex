import Block from '../../utils/Block';
import template from './input.hbs';
import * as styles from '../../styles.module.pcss';

export interface InputProps {
  type: string;
  placeholder?: string;
  value?: string;
  name: string;
  events?: {
    focus: () => void;
    blur: () => void;
  };
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }

  value() {
    const input = this.element as HTMLInputElement;
    return input.value;
  }

  name() {
    const input = this.element as HTMLInputElement;
    return input.name;
  }
}
