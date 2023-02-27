import Block from '../../utils/Block';
import {Input, InputProps} from '../Input';
import { ErrorInformer, ErrorInformerProps } from '../ErrorInformer';
import template from './placeholderinput.hbs';
import * as styles from '../../styles.module.pcss';

export interface PlaceHolderInputProps extends InputProps{
  errorText: string;
}

export class PlaceHolderInput extends Block<PlaceHolderInputProps> {
  constructor(props: PlaceHolderInputProps) {
    super(props);
  }

  protected init() {
    this.children.input = new Input({...this.props,
      events: {
        focus: () => this.validate(),
        blur:  () => this.validate(),
      }
  });
    this.children.errorinformer = new ErrorInformer({text : this.props.errorText})
  }

  validate() {
    const inp = this.children.input as Input;
    console.log(` name: ${inp.name()}   value: ${inp.value()}`);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}