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
      console.error(e.status);
      console.error(e.response.reason);
      store.set('error', {errorCode: e.status, errorText: e.response.reason});
      router.go('/error');
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go('/profile');
    } catch (e: any) {
      console.error(e.status);
      console.error(e.response.reason);
      store.set('error', {errorCode: e.status, errorText: e.response.reason});
      router.go('/error');
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
