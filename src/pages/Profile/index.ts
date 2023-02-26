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

    this.children.inputs.push(new LabeledInput(this.props.inputs[0]));
    this.children.inputs.push(new LabeledInput(this.props.inputs[1]));
    this.children.inputs.push(new LabeledInput(this.props.inputs[2]));
    this.children.inputs.push(new LabeledInput(this.props.inputs[3]));
    this.children.inputs.push(new LabeledInput(this.props.inputs[4]));
    this.children.inputs.push(new LabeledInput(this.props.inputs[5]));

    if (this.props.isSave) {
      this.children.button = new Button({
        label: this.props.buttonCaption,
      });
    }
    else {
      this.children.links.push(new Link(this.props.links[0]));
      this.children.links.push(new Link(this.props.links[1]));
      this.children.links.push(new Link(this.props.links[2]));
    }

  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}