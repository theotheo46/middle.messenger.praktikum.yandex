import { expect } from 'chai';
import {Validator} from './Validator'


describe('Validator', () => {

    const validator = Validator.Instance;

    const email = 'email'
  
    it(`should pass correct ${email}`,  () => {
      expect(validator.validate(email, 'theotheo46@gmail.com')).to.true;
    });

    it(`should not pass uncorrect ${email}`,  () => {
        expect(validator.validate(email, 'theotheo46gmail.com')).to.false;
      });

    const phone = 'phone'

    it(`should pass correct ${phone}`,  () => {
    expect(validator.validate(phone, '+79262066996')).to.true;
    });

    it(`should not pass uncorrect ${phone}`,  () => {
        expect(validator.validate(phone, 'theotheo46')).to.false;
    });

    const login = 'login'

    it(`should pass correct ${login}`,  () => {
    expect(validator.validate(login, 'theo')).to.true;
    });

    it(`should not pass uncorrect ${login}`,  () => {
        expect(validator.validate(login, '12345')).to.false;
    });

    const first_name = 'first_name'

    it(`should pass correct ${first_name}`,  () => {
    expect(validator.validate(first_name, 'Дмитрий')).to.true;
    });

    it(`should not pass uncorrect ${first_name}`,  () => {
        expect(validator.validate(first_name, 'дмит рий')).to.false;
    });

    const message = 'message'

    it(`should pass correct ${message}`,  () => {
    expect(validator.validate(message, 'Дмитрий')).to.true;
    });

    it(`should not pass uncorrect ${message}`,  () => {
        expect(validator.validate(message, '')).to.false;
    });

    const password = 'password'

    it(`should pass correct ${password}`,  () => {
    expect(validator.validate(password, 'Aa101010')).to.true;
    });

    it(`should not pass uncorrect ${password}`,  () => {
        expect(validator.validate(password, '10101010')).to.true; 
    });


  });
