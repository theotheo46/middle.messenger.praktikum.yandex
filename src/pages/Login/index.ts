import Block from '../../utils/Block';
import {Link} from '../../components/Link';
import {PlaceHolderInput, PlaceHolderInputProps} from '../../components/PlaceHolderInput';
import {Button} from '../../components/Button';
import template from './login.hbs';
import * as styles from '../../styles.module.pcss';

interface LoginPageProps {
  title: string;
  inputs : PlaceHolderInputProps[],
  linkText : string;
  buttonCaption : string;
}

export class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super(props);
  }

  protected init() {
    this.children.link = new Link({
      label: this.props.linkText,
    });

    this.children.button = new Button({
      label: this.props.buttonCaption,
    });

    this.children.inputs = [];
    this.children.inputs.push(new PlaceHolderInput(this.props.inputs[0]));
    this.children.inputs.push(new PlaceHolderInput(this.props.inputs[1]));

  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}