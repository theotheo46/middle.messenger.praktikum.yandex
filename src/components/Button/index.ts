import Block from '../../utils/Block';
import template from './button.hbs';
import styles from '../../styles.module.pcss';

interface ButtonProps {
  type?: string;
  label: string;
  events?: {
    click: () => void;
  };
}

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
    if (props.type === undefined) {props.type = 'button'}
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
