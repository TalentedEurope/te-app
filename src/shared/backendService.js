import BackendConfig from '../config/backend';
import userService from './userService';

class BackendService {
  webUrl = '';
  apiUrl = '';

  constructor() {
    this.webUrl = BackendConfig.webUrl;
    this.apiUrl = BackendConfig.apiUrl;
  }

  getToken() {
    return userService.getToken();
  }
}

export default new BackendService();
