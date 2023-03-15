import BaseAPI from './BaseAPI';


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

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  saveprofile(data: UserProfile) {
    return this.http.put('/profile', data);
  }

  savepassword(data: Password) {
    return this.http.put('/password', data);
  }


  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}

export default new UserAPI();
