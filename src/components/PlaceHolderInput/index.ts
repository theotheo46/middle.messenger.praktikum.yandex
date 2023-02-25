import Block from '../../utils/Block';
import {Input, InputProps} from '../Input';
import template from './placeholderinput.hbs';
import * as styles from '../../styles.module.pcss';

interface PlaceHolderInputProps extends InputProps{
  error_text: string;
}

export class PlaceHolderInput extends Block<PlaceHolderInputProps> {
  constructor(props: PlaceHolderInputProps) {
    super(props);
  }

  protected init() {
    this.children.input = new Input(this.props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}