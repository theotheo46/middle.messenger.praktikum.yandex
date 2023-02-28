enum INPUTEVENTS {
    FOCUS = 'focus',
    BLUR = 'blur'
}

type InputNames = 'email' | 'phone' | 'login' | 'first_name' | 'second_name' | 'message' | 'password';


/* first_name, second_name — латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).
login — от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).
email — латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.
password — от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.
phone — от 10 до 15 символов, состоит из цифр, может начинается с плюса.
message — не должно быть пустым. */

export class Validator {

    private readonly VALIDATORS : Record<InputNames, any> = {
        'email' : /^[a-z0-9-]+@[a-z]+\.[a-z]+$/,
        'phone' : /^\+?[0-9]{10,15}$/,
        'login' : /^(?=.*[A-Za-z])[A-Za-z0-9-_]{3,20}$/,
        'first_name' : /^[A-ZА-я][a-zа-я-]+$/,
        'second_name' : /^[A-ZА-я][a-zа-я-]+$/,
        'message' : /^\S+$/,
        'password' : /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
    }

    validate(inputevent: INPUTEVENTS, name : InputNames, value : string) : boolean {
        return this._check(value, this.VALIDATORS[name]);   
    }

    private _check(value : string, regexp : any) : boolean {
        return (value.match(regexp) !== null);
    }

}