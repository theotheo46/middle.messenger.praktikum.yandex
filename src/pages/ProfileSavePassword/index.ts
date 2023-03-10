import Block from '../../utils/Block';
import {LabeledInput, LabeledInputProps} from '../../components/LabeledInput';
import {Button} from '../../components/Button';
import template from './profileSavePassword.hbs';
import * as styles from '../../styles.module.pcss';

interface ProfileSavePasswordPageProps {
  title: string;
  inputs : LabeledInputProps[],
  buttonCaption : string;      
  left : any;
  avatar : any;
}

export class ProfileSavePasswordPage extends Block<ProfileSavePasswordPageProps> {
  constructor(props: ProfileSavePasswordPageProps) {
    super(props);
  }

  protected init() {

    this.children.inputs = [];

    for (const prop of this.props.inputs) {
      this.children.inputs.push(new LabeledInput(prop));
    }
   
    this.children.button = new Button({
      label: this.props.buttonCaption,
    });
   
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
