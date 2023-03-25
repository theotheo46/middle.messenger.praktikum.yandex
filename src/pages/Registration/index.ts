import Block from '../../utils/Block';
import {Link} from '../../components/Link';
import {PlaceHolderInput} from '../../components/PlaceHolderInput';
import {Button} from '../../components/Button';
import template from './registration.hbs';
import {Validator} from '../../utils/Validator';
import * as styles from '../../styles.module.pcss';
import AuthController from '../../controllers/AuthController';
import { SignupData } from '../../api/AuthAPI';

export class RegistrationPage extends Block {
  constructor() {
    super( { events: { submit: (e: Event) => this.onSubmit(e) } });
  }

  private readonly validator = Validator.Instance; 

  protected init() {
    this.props.title = 'Регистрация';

    this.children.first_name = new PlaceHolderInput({
      name: 'first_name',
      type: 'text',
      placeholder: 'Имя',
      errorText: ''
    });

    this.children.second_name = new PlaceHolderInput({
      name: 'second_name',
      type: 'text',
      placeholder: 'Фамилия',
      errorText: ''
    });

/* 
    this.children.display_name = new PlaceHolderInput({
      name: 'display_name',
      type: 'text',
      placeholder: 'Имя в чате',
      errorText: ''
    }); */

    this.children.email = new PlaceHolderInput({
      name: 'email',
      type: 'text',
      placeholder: 'Почта',
      errorText: ''
    });

    this.children.login = new PlaceHolderInput({
      name: 'login',
      type: 'text',
      placeholder: 'Логин',
      errorText: ''
    });

    this.children.phone = new PlaceHolderInput({
      name: 'phone',
      type: 'text',
      placeholder: 'Телефон',
      errorText: ''
    });

    this.children.password = new PlaceHolderInput({
      name: 'password',
      type: 'password',
      placeholder: 'Пароль',
      errorText: ''
    });

    this.children.button = new Button({
      label: 'Зарегистрироваться',
      type: "submit"
    });

    this.children.link = new Link({
      label: 'Войти',
      to: '/'
    });
   
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const values = Object
      .values(this.children)
      .filter(child => child instanceof PlaceHolderInput)
      .map((child) => ([(child as PlaceHolderInput).getName(), (child as PlaceHolderInput).getValue()]))
      console.log(values);
    const data = Object.fromEntries(values);
    console.log(data);

    AuthController.signup(data as SignupData);
    
  }

  /* onClick() {

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
  } */

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
