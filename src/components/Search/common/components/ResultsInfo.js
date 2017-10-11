import React from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-easy-toast';
import COMMON_STYLES from '../../../../styles/common';

export const ResultsInfo = (props) => {
  const { refFn } = props;
  return (
    <Toast
      style={styles.toast}
      textStyle={styles.text}
      position="bottom"
      positionValue={180}
      opacity={0.9}
      ref={refFn}
    />
  );
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: COMMON_STYLES.DARK_BLUE,
    padding: 5,
    borderRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});
