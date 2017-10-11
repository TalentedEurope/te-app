import DefaultApi from './Default';
import I18n from '../i18n/i18n';

export default class AlertsApi extends DefaultApi {
  getAlerts(page = 1) {
    const urlParams = `lang=${I18n.locale}&page=${page.toString()}`;

    return fetch(`${this.backendService.apiUrl}alerts/?${urlParams}`, {
      method: 'GET',
      headers: this.getHeaders(),
    }).then(this.handleResponse, this.handleNetworkError);
  }
}
