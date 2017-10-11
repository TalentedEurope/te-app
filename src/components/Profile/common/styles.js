import { StyleSheet } from 'react-native';
import COMMON_STYLES from '../../../styles/common';

export const profileStyles = {
  container: {
    flex: 1,
    backgroundColor: COMMON_STYLES.LIGHT_GRAY,
  },

  profileHead: {
    backgroundColor: COMMON_STYLES.DARK_BLUE,
  },

  profileInner: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: COMMON_STYLES.LIGHT_GRAY,
    borderWidth: 3,
    marginBottom: 15,
  },
  logo: {
    width: 176,
    height: 100,
    borderColor: COMMON_STYLES.LIGHT_GRAY,
    borderWidth: 3,
    marginBottom: 15,
  },

  name: {
    fontSize: 30,
    fontWeight: '100',
    backgroundColor: 'transparent',
    color: COMMON_STYLES.WHITE,
    textAlign: 'center',
    marginBottom: 10,
  },

  mainStudy: {
    fontSize: 20,
    fontWeight: '100',
    backgroundColor: 'transparent',
    color: COMMON_STYLES.YELLOW,
    textAlign: 'center',
    marginBottom: 15,
  },

  card: {
    backgroundColor: COMMON_STYLES.WHITE,
    borderColor: COMMON_STYLES.GRAY,
    borderWidth: StyleSheet.hairlineWidth,
    margin: 10,
    padding: 10,
    paddingTop: 0,
  },

  titleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 7,
    marginBottom: 5,
    borderBottomColor: COMMON_STYLES.LIGHT_GRAY,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },

  titleIconContainer: {
    height: 34,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: COMMON_STYLES.BLUE,
    marginRight: 10,
  },

  titleIcon: {
    color: COMMON_STYLES.WHITE,
  },

  cardTitle: {
    fontSize: 18,
  },

  textRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 5,
  },

  subtitleIcon: {
    color: COMMON_STYLES.BLUE,
    marginRight: 5,
  },

  inlineTitle: {
    fontWeight: 'bold',
  },
};
