import BaseAPI from './BaseAPI';
import { User } from './AuthAPI';


export interface UserProfile {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface Password {
    oldPassword: string;
    newPassword: string;
  }

export interface Login {
  login: string;
}


export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  saveprofile(data: UserProfile) {
    return this.http.put('/profile', data);
  }

  saveavatar(data: FormData) {
    return this.http.put('/profile/avatar', data);
  }

  savepassword(data: Password) {
    return this.http.put('/password', data);
  }

  async search(data: Login): Promise<User> {
    const user = await this.http.post<User[]>('/search', data);
    console.log(user[0])
    return user[0];
  }


  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}

export default new UserAPI();
