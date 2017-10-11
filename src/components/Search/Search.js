import React from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Main from './Main/Main';
import SearchStudents from './Students/Students';
import SearchCompanies from './Companies/Companies';
import SearchInstitutions from './Institutions/Institutions';
import COMMON_STYLES from '../../styles/common';
import I18n from '../../i18n/i18n';

const TabBarIcon = props => <Icon name={props.name} size={18} color={COMMON_STYLES.DARK_BLUE} />;

export default TabNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: () => ({
        title: I18n.t('global.home'),
        tabBarIcon: <TabBarIcon name="home" />,
      }),
    },
    SearchStudents: {
      screen: SearchStudents,
      navigationOptions: () => ({
        title: I18n.t('global.student_plural'),
        tabBarIcon: <TabBarIcon name="user" />,
      }),
    },
    SearchCompanies: {
      screen: SearchCompanies,
      navigationOptions: () => ({
        title: I18n.t('global.company_plural'),
        tabBarIcon: <TabBarIcon name="building" />,
      }),
    },
    SearchInstitutions: {
      screen: SearchInstitutions,
      navigationOptions: () => ({
        title: I18n.t('global.institution').split('|')[1],
        tabBarIcon: <TabBarIcon name="university" />,
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: COMMON_STYLES.DARK_BLUE,
      inactiveTintColor: COMMON_STYLES.DARK_BLUE,
      activeBackgroundColor: COMMON_STYLES.YELLOW,
      inactiveBackgroundColor: COMMON_STYLES.LIGHT_GRAY,
      showIcon: true,
      showLabel: false,
      pressColor: COMMON_STYLES.YELLOW,
      style: {
        backgroundColor: COMMON_STYLES.LIGHT_GRAY,
        elevation: 0,
      },
      indicatorStyle: {
        backgroundColor: COMMON_STYLES.BLUE,
      },
    },
  },
);
