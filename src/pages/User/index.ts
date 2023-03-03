import Block from '../../utils/Block';
import {PlaceHolderInput, PlaceHolderInputProps} from '../../components/PlaceHolderInput';
import {Button} from '../../components/Button';
import template from './user.hbs';
import * as styles from '../../styles.module.pcss';

interface UserPageProps {
  caption: string;
  input : PlaceHolderInputProps,
  buttonCaption : string;      
}

export class UserPage extends Block<UserPageProps> {
  constructor(props: UserPageProps) {
    super(props);
  }

  protected init() {

    this.children.input = new PlaceHolderInput(this.props.input);
    this.children.button = new Button({
      label: this.props.buttonCaption,
    });
   
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
