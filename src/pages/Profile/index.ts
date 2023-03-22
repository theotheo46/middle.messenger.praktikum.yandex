import Block from '../../utils/Block';
import {Link} from '../../components/Link';
import {LabeledInput} from '../../components/LabeledInput';
import {Button} from '../../components/Button';
import template from './profile.hbs';
import * as styles from '../../styles.module.pcss';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
import { withStore } from '../../utils/Store';
import { UserProfile } from '../../api/UserAPI';
import left from '../../../static/left.png';
import ResourcesAPI from '../../api/ResourcesAPI';
import { Input } from '../../components/Input';


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

    this.children.linkLeft = new Link({
      image: left,
      isBack: true
    });

    this.children.linkChangeData = new Link({
      label: 'Изменить данные',
      to: '/profilesave'
    });

    this.children.linkChangePassword = new Link({
      label: 'Изменить пароль',
      to: '/profilesavepassword'
    });

    this.children.linkToMessenger = new Link({
      label: 'К Мессенджеру',
      to: '/messenger'
    });

    this.children.buttonExit = new Button({
      label: 'Выйти',
      events: {
        click: () => {
          AuthController.logout();
        }
      }
    })

    
    this.children.inputFileAttach = new Input({
      name: 'image_attach',
      type: 'file',
      accept: "image/png, image/jpeg"
    });

  }

  onProfileSave() {
    const values = Object
      .values(this.children)
      .filter(child => child instanceof LabeledInput)
      .map((child) => ([(child as LabeledInput).getName(), (child as LabeledInput).getValue()]))
    const data = Object.fromEntries(values);
    UserController.saveprofile(data as UserProfile);
    const photoFiles = ((this.children.inputFileAttach as Input).getContent() as HTMLInputElement).files;
    if (!photoFiles) {
      throw new Error('photoFiles is not defined');  
  }
    if (photoFiles.length > 0) {
      const fileAvatar = photoFiles.item(0);
      console.log(fileAvatar);
      const fData = new FormData();
      fData.append('avatar', fileAvatar as Blob);
      UserController.saveavatar(fData);
    }
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const withUserIsNotSave = withStore((state) => ({ ...state.user, isSave: false, avatar: ResourcesAPI.get_res_url() + state.user.avatar, display_name_label: state.user.display_name}))
const withUserIsSave = withStore((state) => ({ ...state.user, isSave: true, avatar: ResourcesAPI.get_res_url() + state.user.avatar, display_name_label: state.user.display_name}))

export const ProfilePageIsNotSave = withUserIsNotSave(ProfilePageProto);
export const ProfilePageIsSave = withUserIsSave(ProfilePageProto);
