import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import {LabeledInput, LabeledInputProps} from '../../components/LabeledInput';
import {Button} from '../../components/Button';
import template from './profile.hbs';
import * as styles from '../../styles.module.pcss';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
import { withStore } from '../../utils/Store';
import { UserProfile } from '../../api/UserAPI';

export class ProfilePageProto extends Block {
  init() {
    AuthController.fetchUser();
    this.children.first_name = new LabeledInput({
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      errorText: '',
      value: this.props.first_name
    });

    this.children.second_name = new LabeledInput({
      name: 'second_name',
      type: 'text',
      label: 'Фамилия',
      errorText: '',
      value: this.props.second_name
    });

    this.children.login = new LabeledInput({
      name: 'login',
      type: 'text',
      label: 'Логин',
      errorText: '',
      value: this.props.login
    });

    this.children.email = new LabeledInput({
      name: 'email',
      type: 'text',
      label: 'Почта',
      errorText: '',
      value: this.props.email
    });

    this.children.display_name = new LabeledInput({
      name: 'display_name',
      type: 'text',
      label: 'Имя в чате',
      errorText: '',
      value: this.props.display_name
    });

    this.children.phone = new LabeledInput({
      name: 'phone',
      type: 'text',
      label: 'Телефон',
      errorText: '',
      value: this.props.phone
    });

    this.children.buttonSave = new Button({
      label: 'Сохранить',
      events: {
        click: () => this.onProfileSave()
      }
    })

    this.children.linkChangeData = new Link({
      label: 'Изменить данные',
      to: '/profilesave'
    });

    this.children.linkChangePassword = new Link({
      label: 'Изменить пароль',
      to: '/profilesavepassword'
    });

    this.children.buttonExit = new Button({
      label: 'Выйти',
      events: {
        click: () => {
          AuthController.logout();
        }
      }
    })
  }

  onProfileSave() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof LabeledInput)
      .map((child) => ([(child as LabeledInput).getName(), (child as LabeledInput).getValue()]))
    const data = Object.fromEntries(values);
    UserController.saveprofile(data as UserProfile);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const withUserIsNotSave = withStore((state) => ({ ...state.user, isSave: false }))
const withUserIsSave = withStore((state) => ({ ...state.user, isSave: true }))

export const ProfilePageIsNotSave = withUserIsNotSave(ProfilePageProto);
export const ProfilePageIsSave = withUserIsSave(ProfilePageProto);
