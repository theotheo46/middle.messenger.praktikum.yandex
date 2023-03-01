//при добавления нового инпута его аттрибут name надо добавить в type InputNames и в объект VALIDATORS с соответствующими паттерном и error message
//все аттрибуты name (для инпутов) должны быть уникальны в рамках всего приложения
export type InputNames = 'email' | 'phone' | 'login' | 'first_name' | 'second_name' | 'message' | 'password';

type ValidationTuple = {
    regex : any;
    errorMessage : string;
}


/* first_name, second_name — латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).
login — от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).
email — латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.
password — от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.
phone — от 10 до 15 символов, состоит из цифр, может начинается с плюса.
message — не должно быть пустым. */

export class Validator {

    private static _instance: Validator;

    public readonly VALIDATORS : Record<InputNames, ValidationTuple> = {
        'email' : {regex : /^[a-z0-9-]+@[a-z]+\.[a-z]+$/, errorMessage : 'Почтовый адрес должен быть на латинице, может содержать цифры и символы @ и .'},
        'phone' : {regex : /^\+?[0-9]{10,15}$/,errorMessage :'Номер телефона должет иметь от 10 до 15 символов, состоит из цифр, может начинается с плюса'},
        'login' : {regex :/^(?=.*[A-Za-z])[A-Za-z0-9-_]{3,20}$/,errorMessage :'Логин должен иметь от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов'},
        'first_name' : {regex : /^[A-ZА-я][a-zа-я-]+$/,errorMessage : 'Имя должно содержать латиницу или кириллицу, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов'},
        'second_name' : {regex : /^[A-ZА-я][a-zа-я-]+$/,errorMessage : 'Фамилия должна содержать латиницу или кириллицу, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов'},
        'message' : {regex : /^\S+$/,errorMessage :'Не должно быть пустым'},
        'password' : {regex : /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,errorMessage :'Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'},
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    validate(name : InputNames, value : string) : boolean {
        return this._check(value, this.VALIDATORS[name].regex);   
    }

    private _check(value : string, regexp : any) : boolean {
        return (value.match(regexp) !== null);
    }

}