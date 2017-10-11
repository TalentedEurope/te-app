import DefaultApi from './Default';
import I18n from '../i18n/i18n';

export default class SearchApi extends DefaultApi {
  getResults(collective, page = 1, searchText = '', filters = {}) {
    let urlParams = `lang=${I18n.locale}&page=${page.toString()}`;
    if (searchText !== '') {
      urlParams = `${urlParams}&search_text=${searchText}`;
    }

    Object.entries(filters).forEach(([keyGroup, selectedFilters]) => {
      selectedFilters.forEach((filter) => {
        urlParams = `${urlParams}&${keyGroup}%5B%5D=${filter}`;
      });
    });

    return fetch(`${this.backendService.apiUrl}search/${collective}?${urlParams}`, {
      method: 'GET',
      headers: this.getHeaders(),
    }).then(this.handleResponse, this.handleNetworkError);
  }

  getFilters(collective) {
    return fetch(`${this.backendService.apiUrl}search/${collective}/filters?lang=${I18n.locale}`, {
      method: 'GET',
      headers: this.getHeaders(),
    }).then(this.handleResponse, this.handleNetworkError);
  }
}
