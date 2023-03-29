import Block from '../../utils/Block';
import template from './input.hbs';
import styles from '../../styles.module.pcss';

export interface InputProps {
  type: string;
  placeholder?: string;
  value?: string;
  name: string;
  accept?: string;
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

  public setValue(value: string) {
    return (this.element as HTMLInputElement).value = value;
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
