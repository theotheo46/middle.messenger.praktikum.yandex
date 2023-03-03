import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import {LabeledInput, LabeledInputProps} from '../../components/LabeledInput';
import {Button} from '../../components/Button';
import template from './profile.hbs';
import * as styles from '../../styles.module.pcss';

interface ProfilePageProps {
  title: string;
  inputs : LabeledInputProps[],
  links : LinkProps[];
  buttonCaption : string;      //links and button are mutual exclusive
  left : any;
  avatar : any;
  isSave : boolean;   // if true - profileSave window (with button) if false - profile page with three links
}

export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super(props);
  }

  protected init() {

    this.children.inputs = [];
    this.children.links = [];

    for (const prop of this.props.inputs) {
      this.children.inputs.push(new LabeledInput(prop));
    }

    if (this.props.isSave) {
      this.children.button = new Button({
        label: this.props.buttonCaption,
      });
    }
    else {
      for (const prop of this.props.links) {
        this.children.links.push(new Link(prop));
      }
    }

  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
