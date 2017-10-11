import DefaultApi from './Default';

export default class ProfileApi extends DefaultApi {
  getProfile(userId) {
    return fetch(`${this.backendService.apiUrl}profile/${userId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    }).then(this.handleResponse, this.handleNetworkError);
  }
}
