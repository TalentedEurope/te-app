import { Platform, StyleSheet } from 'react-native';
import COMMON_STYLES from '../../../styles/common';

export const searchStyles = {
  container: {
    flex: 1,
    backgroundColor: COMMON_STYLES.LIGHT_GRAY,
  },

  topbar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 42,
    borderBottomColor: COMMON_STYLES.GRAY,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      android: {
        borderTopColor: COMMON_STYLES.GRAY,
        borderTopWidth: StyleSheet.hairlineWidth,
      },
    }),
  },

  itemBox: {
    margin: 5,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COMMON_STYLES.WHITE,
    borderColor: COMMON_STYLES.GRAY,
    borderWidth: StyleSheet.hairlineWidth,
  },

  photo: {
    width: 50,
    height: 50,
  },

  nameRow: {
    flexDirection: 'row',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: COMMON_STYLES.GRAY,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },

  titleColumn: {
    flexGrow: 1,
    width: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COMMON_STYLES.TEXT_GRAY,
    fontStyle: 'italic',
  },
};
