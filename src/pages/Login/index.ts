import Block from '../../utils/Block';
import {Link} from '../../components/Link';
import {PlaceHolderInput} from '../../components/PlaceHolderInput';
import {Button} from '../../components/Button';
import template from './login.hbs';
import styles from '../../styles.module.pcss';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthAPI';

export class LoginPage extends Block {
  constructor() {
    super( { events: { submit: (e: Event) => this.onSubmit(e) } });
  }


 init() {

    this.props.title = 'Войти';

    this.children.link = new Link({
      label: 'Нет аккаунта?',
      to: '/register'
    });

    this.children.login = new PlaceHolderInput({
      name: 'login',
      type: 'text',
      placeholder: 'Логин',
      errorText: ''
    });

    this.children.password = new PlaceHolderInput({
      name: 'password',
      type: 'password',
      placeholder: 'Пароль',
      errorText: ''
    });

    this.children.button = new Button({
      label: 'Авторизоваться',
      type: "submit",
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
 
  onSubmit(e : Event) {
    e.preventDefault();
    const values = Object
      .values(this.children)
      .filter(child => child instanceof PlaceHolderInput)
      .map((child) => ([(child as PlaceHolderInput).getName(), (child as PlaceHolderInput).getValue()]))
    const data = Object.fromEntries(values);
    AuthController.signin(data as SignupData);
  }

/*   onClick() {

    let errStr = '';

    const inputNameVal = BlockUtility.getInputValArray(this.children.inputs);
    inputNameVal.forEach( inpNV => {
      console.log(inpNV);
      if (!this.validator.validate(inpNV.name as InputNames, inpNV.value)) {
        errStr = errStr + this.validator.VALIDATORS[inpNV.name as InputNames].errorMessage + '\n';
      }
    })

    if (errStr !== '') {
      console.log(errStr);
    }
    else {
      console.log('Sending HTTP request');
      new HTTPTransport('').get(BlockUtility.queryStringify(inputNameVal));
    }
  }
 */

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
