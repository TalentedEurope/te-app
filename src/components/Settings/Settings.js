import React from 'react';
import { WebView } from 'react-native';
import backendService from '../../shared/backendService';
import I18n from '../../i18n/i18n';

export default class Settings extends React.Component {
  render() {
    return (
      <WebView
        bounces={false}
        source={{
          uri: `${backendService.webUrl}profile/edit?token=${backendService.getToken()}&lang=${I18n.locale}`,
        }}
      />
    );
  }
}
