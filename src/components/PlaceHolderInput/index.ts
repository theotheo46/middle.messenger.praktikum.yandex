import Block from '../../utils/Block';
import {Input, InputProps} from '../Input';
import { ErrorInformer} from '../ErrorInformer';
import template from './placeholderinput.hbs';
import * as styles from '../../styles.module.pcss';
import {Validator, InputNames} from '../../utils/Validator';

export interface PlaceHolderInputProps extends InputProps{
  errorText: string;
}
export class PlaceHolderInput extends Block<PlaceHolderInputProps> {
  constructor(props: PlaceHolderInputProps) {
    super(props);
  }

  private readonly validator = Validator.Instance; 

  protected init() {
    this.children.input = new Input({...this.props,
      events: {
        focus: () => this._validate(),
        blur:  () => this._validate(),
      }
  });
    this.children.errorinformer = new ErrorInformer({text : this.props.errorText})
  }

  _validate() {
    const inp = this.children.input as Input;
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

/*   validate() {
    const inp = this.children.input as Input;
    console.log(` name: ${inp.name()}   value: ${inp.value()}`);
  } */

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}