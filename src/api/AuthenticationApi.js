import DefaultApi from './Default';

export default class AuthenticationApi extends DefaultApi {
  login(email, password, pushId) {
    if (!pushId) {
      pushId = '';
    }
    const credentials = { email, password };
    return fetch(`${this.backendService.apiUrl}login?app=true&pushID=${pushId}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    }).then(this.handleResponse, this.handleNetworkError);
  }

  register(data) {
    return fetch(`${this.backendService.apiUrl}register?lang=${this.I18n.currentLocale()}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    }).then(this.handleResponse, this.handleNetworkError);
  }
}
