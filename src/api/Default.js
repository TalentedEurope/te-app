import backendService from '../shared/backendService';
import I18n from '../i18n/i18n';

export default class DefaultApi {
  constructor() {
    this.backendService = backendService;
    this.I18n = I18n;
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${this.backendService.getToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  handleResponse(response) {
    if (!response.ok) {
      return response.json().then((error) => {
        throw error;
      });
    }
    return response.json();
  }

  handleNetworkError(error) {
    const handledError = { error: error.message };
    throw handledError;
  }
}
