import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import I18n from '../../../i18n/i18n';
import COMMON_STYLES from '../../../styles/common';

export default class ValidatorProfile extends React.Component {
  componentWillMount() {
    this.validator = this.props.data;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{this.validator.name}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
