import Block from '../../utils/Block';
import {LabeledInput} from '../../components/LabeledInput';
import {Button} from '../../components/Button';
import template from './profileSavePassword.hbs';
import * as styles from '../../styles.module.pcss';
import { withStore } from '../../utils/Store';


export class ProfileSavePasswordPageProto extends Block {


  protected init() {

 
    this.children.oldpassword = new LabeledInput({
      name: 'oldpassword',
      type: 'password',
      label: 'Старый пароль',
      errorText: '',
    });

    this.children.newpassword = new LabeledInput({
      name: 'newpassword',
      type: 'password',
      label: 'Новый пароль',
      errorText: '',
    });

    this.children.repnewpassword = new LabeledInput({
      name: 'repnewpassword',
      type: 'password',
      label: 'Повторите новый пароль',
      errorText: '',
    });


    this.children.buttonSave = new Button({
      label: 'Сохранить',
      events: {
        click: () => {
          
        }
      }
    })
   
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user}))

export const ProfileSavePassword = withUser(ProfileSavePasswordPageProto);
