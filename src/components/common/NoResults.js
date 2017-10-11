import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COMMON_STYLES from '../../styles/common';

export const NoResults = (props) => {
  const { text } = props;

  return (
    <View style={styles.container}>
      <Icon name="frown-o" style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 60,
    color: COMMON_STYLES.SEMI_DARK_GRAY,
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: COMMON_STYLES.DARK_GRAY,
    paddingHorizontal: 40,
    textAlign: 'center',
    fontWeight: '500',
  },
});
