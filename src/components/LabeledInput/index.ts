import Block from '../../utils/Block';
import {Input, InputProps} from '../Input';
import template from './labeledinput.hbs';
import { ErrorInformer} from '../ErrorInformer';
import styles from '../../styles.module.pcss';
import {Validator, InputNames} from '../../utils/Validator';

export interface LabeledInputProps extends InputProps {
  label: string;
  errorText: string;
}

export class LabeledInput extends Block<LabeledInputProps> {
  constructor(props: LabeledInputProps) {
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

  public getName() {
    return ((this.children.input as Input).getContent() as HTMLInputElement).name;
  }

  public getValue() {
    return ((this.children.input as Input).getContent() as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
