import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import COMMON_STYLES from '../../styles/common';

export const ModalHeader = (props) => {
  const { title, onClose } = props;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.balanceTitle} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity activeOpacity={0.8} style={styles.closeButton} onPress={() => onClose()}>
        <Ionicon name="md-close" style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    backgroundColor: 'white',
    borderBottomColor: COMMON_STYLES.GRAY,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
  },
  title: {
    paddingBottom: 10,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: COMMON_STYLES.DARK_BLUE,
    flex: 1,
  },
  balanceTitle: {
    width: 50,
  },
  closeButton: {
    width: 50,
    height: 32,
    paddingBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 22,
    color: COMMON_STYLES.GRAY,
  },
});
