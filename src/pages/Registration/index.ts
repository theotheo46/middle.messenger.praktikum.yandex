import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import {PlaceHolderInput, PlaceHolderInputProps} from '../../components/PlaceHolderInput';
import {Button} from '../../components/Button';
import template from './registration.hbs';
import {Validator, InputNames} from '../../utils/Validator';
import HTTPTRansport from '../../utils/HTTPTRansport';
import { BlockUtility} from '../../utils/BlockUtility';
import * as styles from '../../styles.module.pcss';

interface RegistrationPageProps {
  title: string;
  inputs : PlaceHolderInputProps[],
  buttonCaption : string;      
  link : LinkProps;
}

export class RegistrationPage extends Block<RegistrationPageProps> {
  constructor(props: RegistrationPageProps) {
    super(props);
  }

  private readonly validator = Validator.Instance; 

  protected init() {

    this.children.inputs = [];

    for (const prop of this.props.inputs) {
      this.children.inputs.push(new PlaceHolderInput(prop));
    }
 
   
    this.children.button = new Button({
      label: this.props.buttonCaption,
      events : {
        click: this.onClick.bind(this),
      }
    });

    this.children.link = new Link(this.props.link);
   
  }

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
      new HTTPTRansport('').get(BlockUtility.queryStringify(inputNameVal));
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
