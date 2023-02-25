import Block from '../../utils/Block';
import {Input, InputProps} from '../Input';
import template from './labeledinput.hbs';
import * as styles from '../../styles.module.pcss';

interface LabeledInputProps extends InputProps {
  label: string;
}

export class LabeledInput extends Block<LabeledInputProps> {
  constructor(props: LabeledInputProps) {
    super(props);
  }

  protected init() {
    this.children.input = new Input(this.props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}