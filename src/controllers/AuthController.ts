import API, { AuthAPI, SigninData, SignupData} from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      router.go('/profile');
    } catch (e: any) {
      let errorText = 'Internal sever error';
      if ('response' in e && 'reason' in e.response) {
        errorText = e.response.reason;
      }
/*       store.set('error', {errorCode: e.status, errorText: errorText, to: '/'});
      router.go('/error'); */
      alert(`Ошибка\nStatus:${e.status}\n${errorText}`);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go('/profile');
    } catch (e: any) {
      let errorText = 'Internal sever error';
      if ('response' in e && 'reason' in e.response) {
        errorText = e.response.reason;
      }
      alert(`Ошибка\nStatus:${e.status}\n${errorText}`);
    }
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set('user', user);
  }

  async logout() {
    try {
      await this.api.logout();
      router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
