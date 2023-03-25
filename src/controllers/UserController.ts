import API, { UserAPI, UserProfile, Password} from '../api/UserAPI';
import router from '../utils/Router';
import AuthController from './AuthController';


export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }


  async saveprofile(data: UserProfile) {
    try {
      await this.api.saveprofile(data);
      await AuthController.fetchUser();
      router.go('/profile');
    } catch (e: any) {
      let errorText = 'Internal sever error';
      if ('response' in e && 'reason' in e.response) {
        errorText = e.response.reason;
      }
      alert(`Ошибка\nStatus:${e.status}\n${errorText}`);
    }
  }

  async savepassword(data: Password) {
    try {
      await this.api.savepassword(data);
      await AuthController.fetchUser();
      router.go('/profile');
    } catch (e: any) {
      let errorText = 'Internal sever error';
      if ('response' in e && 'reason' in e.response) {
        errorText = e.response.reason;
      }
      alert(`Ошибка\nStatus:${e.status}\n${errorText}`);
    }
  }

  async saveavatar(data: FormData) {
    try {
      await this.api.saveavatar(data);
      await AuthController.fetchUser();
      router.go('/profile');
    } catch (e: any) {
        let errorText = 'Internal sever error';
        if ('response' in e && 'reason' in e.response) {
          errorText = e.response.reason;
        }
        alert(`Ошибка\nStatus:${e.status}\n${errorText}`);
    }
  }

}

export default new UserController();
