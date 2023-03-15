import Block from '../../utils/Block';
import {LabeledInput} from '../../components/LabeledInput';
import {Button} from '../../components/Button';
import template from './profileSavePassword.hbs';
import * as styles from '../../styles.module.pcss';
import { withStore } from '../../utils/Store';
import UserController from '../../controllers/UserController';
import { Password } from '../../api/UserAPI';


export class ProfileSavePasswordPageProto extends Block {


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
      events: {
        click: () => this.onPasswordSave()
      }
    })
   
  }

  onPasswordSave() {

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

const withUser = withStore((state) => ({ ...state.user}))

export const ProfileSavePassword = withUser(ProfileSavePasswordPageProto);
