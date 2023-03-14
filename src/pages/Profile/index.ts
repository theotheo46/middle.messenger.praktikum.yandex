import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import {LabeledInput, LabeledInputProps} from '../../components/LabeledInput';
import {Button} from '../../components/Button';
import template from './profile.hbs';
import * as styles from '../../styles.module.pcss';
import AuthController from '../../controllers/AuthController';
import { withStore } from '../../utils/Store';

export class ProfilePageProto extends Block {
  init() {
    AuthController.fetchUser();

    this.children.firstName = new LabeledInput({
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      errorText: ''
    });

    this.children.secondName = new LabeledInput({
      name: 'second_name',
      type: 'text',
      label: 'Фамилия',
      errorText: ''
    });

    this.children.login = new LabeledInput({
      name: 'login',
      type: 'text',
      label: 'Логин',
      errorText: ''
    });

    this.children.email = new LabeledInput({
      name: 'email',
      type: 'text',
      label: 'Почта',
      errorText: ''
    });

    this.children.display_name = new LabeledInput({
      name: 'display_name',
      type: 'text',
      label: 'Имя в чате',
      errorText: ''
    });

    this.children.phone = new LabeledInput({
      name: 'phone',
      type: 'text',
      label: 'Телефон',
      errorText: ''
    });

    this.children.button = new Button({
      label: 'Выйти',
      events: {
        click: () => {
          AuthController.logout();
        }
      }
    })
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const withUser = withStore((state) => ({ ...state.user }))

export const ProfilePage = withUser(ProfilePageProto);
