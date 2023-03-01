import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import {PlaceHolderInput, PlaceHolderInputProps} from '../../components/PlaceHolderInput';
import {Button} from '../../components/Button';
import template from './login.hbs';
import {Validator, InputNames} from '../../utils/Validator';
import HTTPTRansport from '../../utils/HTTPTRansport';
import { BlockUtility} from '../../utils/BlockUtility';
import * as styles from '../../styles.module.pcss';

interface LoginPageProps {
  title: string;
  inputs : PlaceHolderInputProps[],
  link : LinkProps;
  buttonCaption : string;
/*   events?: {
    submit: () => void;
  }; */
}

export class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super(props);
  }

  private readonly validator = Validator.Instance; 

  protected init() {
    this.children.link = new Link(this.props.link);

    this.children.button = new Button({
      label: this.props.buttonCaption,
      events : {
        click: this.onClick.bind(this),
      }
    });

    this.children.inputs = [];

    for (const prop of this.props.inputs) {
      prop.events = {
              focus: () => {console.log('focus')},
              blur: () => {console.log('blur')}
            };
      this.children.inputs.push(new PlaceHolderInput(prop));
    }
/*     this.props.events = {
        submit : this.onSubmit
    } */
  }


/*   onSubmit() {
      console.log('submit');
      return false;
  }
 */


  onClick() {

    let errStr = '';

    const inputNameVal = BlockUtility.getInputValArray(this.children.inputs);
    inputNameVal.forEach( inpNV => {
      console.log(inpNV);
      if (!this.validator.validate(inpNV.name as InputNames, inpNV.value)) {
        errStr = errStr + this.validator.VALIDATORS[inpNV.name as InputNames].errorMessage + '\n';
      }
    })

    if (errStr !== '') {
      console.log(errStr);
    }
    else {
      console.log('Sending HTTP request');
      new HTTPTRansport('').get();
    }
  }


  render() {
    return this.compile(template, { ...this.props, styles });
  }
}