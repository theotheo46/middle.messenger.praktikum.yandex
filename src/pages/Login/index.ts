import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import {PlaceHolderInput, PlaceHolderInputProps} from '../../components/PlaceHolderInput';
import {Button} from '../../components/Button';
import template from './login.hbs';
import * as styles from '../../styles.module.pcss';

interface LoginPageProps {
  title: string;
  inputs : PlaceHolderInputProps[],
  link : LinkProps;
  buttonCaption : string;
}

export class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super(props);
  }

  protected init() {
    this.children.link = new Link(this.props.link);

    this.children.button = new Button({
      label: this.props.buttonCaption,
    });

    this.children.inputs = [];

    for (const prop of this.props.inputs) {
      this.children.inputs.push(new PlaceHolderInput(prop));
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}