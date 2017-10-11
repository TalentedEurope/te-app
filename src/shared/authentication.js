import AuthenticationApi from '../api/AuthenticationApi';
import userService from './userService';

export default class Authentication {
  constructor() {
    this.AuthenticationApi = new AuthenticationApi();
    this.userService = userService;
  }

  login(email, password) {
    return this.AuthenticationApi.login(email, password, userService.pushId).then((response) => {
      this.userService.afterLogin(response.user, response.token);
    });
  }

  register(data) {
    return this.AuthenticationApi.register(data);
  }

  logout() {
    this.userService.afterLogout();
  }
}
