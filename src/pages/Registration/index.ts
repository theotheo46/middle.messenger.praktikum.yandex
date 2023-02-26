import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import {PlaceHolderInput, PlaceHolderInputProps} from '../../components/PlaceHolderInput';
import {Button} from '../../components/Button';
import template from './registration.hbs';
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

  protected init() {

    this.children.inputs = [];

    for (const prop of this.props.inputs) {
      this.children.inputs.push(new PlaceHolderInput(prop));
    }
 
   
    this.children.button = new Button({
      label: this.props.buttonCaption,
    });

    this.children.link = new Link(this.props.link);
   
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}