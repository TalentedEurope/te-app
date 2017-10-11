import I18n from '../../../i18n/i18n';

export const showResultsInfo = (toast, collective, total, searchText) => {
  if (total > 0) {
    const resultsInfo = getResultsInfo(collective, total, searchText);
    toast.show(resultsInfo, 1600);
  }
};

export const getResultsInfo = (collective, total, searchText) => {
  const suffix = total === 1 ? '_singular' : '';
  const collectiveKey = `global.${collective}${suffix}`;
  const collectiveString = I18n.t(collectiveKey).toLowerCase();

  let resultsInfo = '';

  if (searchText !== '') {
    if (total === 0) {
      resultsInfo = I18n.t('search.there_are_no_matching_the_selected_filters').replace(
        '%s',
        collectiveString,
      );
    } else {
      resultsInfo = I18n.t('search.we_found_matching_your_needs')
        .replace('%number%', total)
        .replace('%collective%', collectiveString);
    }
  } else {
    resultsInfo = `${I18n.t('search.we_found')} ${total} ${collectiveString}`;
  }

  return resultsInfo;
};
