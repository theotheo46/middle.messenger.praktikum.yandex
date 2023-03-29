import Block from '../../utils/Block';
import {LabeledInput} from '../../components/LabeledInput';
import {Button} from '../../components/Button';
import template from './profileSavePassword.hbs';
import styles from '../../styles.module.pcss';
import { withStore } from '../../utils/Store';
import UserController from '../../controllers/UserController';
import { Password } from '../../api/UserAPI';
import { Link } from '../../components/Link';
import left from '../../../static/left.png';
import ResourcesAPI from '../../api/ResourcesAPI';


interface ProfileSavePasswordPageProps {
  title: string;
}
export class ProfileSavePasswordPageProto extends Block {

  constructor(props: ProfileSavePasswordPageProps) {
    super( { ...props, events: { submit: (e: Event) => this.onPasswordSave(e) } });
  }

  protected init() {
    this.children.oldPassword = new LabeledInput({
      name: 'oldPassword',
      type: 'password',
      label: 'Старый пароль',
      errorText: '',
    });

    this.children.newPassword = new LabeledInput({
      name: 'newPassword',
      type: 'password',
      label: 'Новый пароль',
      errorText: '',
    });

    this.children.repnewPassword = new LabeledInput({
      name: 'repnewPassword',
      type: 'password',
      label: 'Повторите новый пароль',
      errorText: '',
    });


    this.children.buttonSave = new Button({
      label: 'Сохранить',
      type: "submit"
    })

    this.children.linkLeft = new Link({
      image: left,
      isBack: true
    });
   
  }

  onPasswordSave(e: Event) {
    e.preventDefault();
    console.log((this.children.newPassword as LabeledInput).getValue() );
    console.log((this.children.repnewPassword as LabeledInput).getValue() );

    if ((this.children.newPassword as LabeledInput).getValue() !== (this.children.repnewPassword as LabeledInput).getValue())
    {
      alert('Новые пароли не совпадают')
      return;
    }
    
    const values = Object
      .values(this.children)
      .filter(child => child instanceof LabeledInput)
      .filter(child => (child as LabeledInput).getName() !== 'repnewPassword')   
      .map((child) => ([(child as LabeledInput).getName(), (child as LabeledInput).getValue()]))
    const data = Object.fromEntries(values);
    UserController.savepassword(data as Password);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}


const withUser = withStore((state) => ({ ...state.user, avatar: ResourcesAPI.get_res_url() + state.user.avatar, display_name_label: state.user.display_name}))

export const ProfileSavePassword = withUser(ProfileSavePasswordPageProto);
