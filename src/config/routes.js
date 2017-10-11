import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import About from '../components/About/About';
import SearchScreenNavigator from '../components/Search/Search';
import Profile from '../components/Profile/Profile';
import Alerts from '../components/Alerts/Alerts';
import Students from '../components/Students/Students';
import Validators from '../components/Validators/Validators';
import Settings from '../components/Settings/Settings';
import DrawerContainer from '../components/common/DrawerContainer';
import I18n from '../i18n/i18n';
import COMMON_STYLES from '../styles/common';

const DrawerIcon = (props) => {
  const { state } = props.navigation;
  if (state.params && state.params.goBack) {
    return (
      <Icon
        name="md-arrow-round-back"
        size={26}
        color="white"
        style={{ paddingLeft: 20, paddingRight: 10 }}
        onPress={() => props.navigation.goBack()}
      />
    );
  }
  return (
    <Icon
      name="md-menu"
      size={28}
      color="white"
      style={{ paddingLeft: 20, paddingRight: 10 }}
      onPress={() => props.navigation.navigate('DrawerOpen')}
    />
  );
};

export const AppStack = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        title: I18n.t('login.login_title'),
      }),
    },
    Register: {
      screen: Register,
      navigationOptions: () => ({
        title: I18n.t('register.register'),
      }),
    },
    Search: {
      screen: SearchScreenNavigator,
    },
    About: {
      screen: About,
    },
    Profile: {
      screen: Profile,
    },
    Alerts: {
      screen: Alerts,
      navigationOptions: () => ({
        title: I18n.t('company.my_alerts'),
      }),
    },
    Students: {
      screen: Students,
      navigationOptions: () => ({
        title: I18n.t('validators.my_students'),
      }),
    },
    Validators: {
      screen: Validators,
      navigationOptions: () => ({
        title: I18n.t('validators.manage_validators'),
      }),
    },
    Settings: {
      screen: Settings,
      navigationOptions: () => ({
        title: I18n.t('navbar.settings'),
      }),
    },
  },
  {
    initialRouteName: 'Search',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
    navigationOptions: ({ navigation }) => ({
      headerLeft: <DrawerIcon navigation={navigation} />,
      headerStyle: { backgroundColor: COMMON_STYLES.DARK_BLUE, elevation: 0 },
      headerTintColor: 'white',
    }),
  },
);

export const Drawer = DrawerNavigator(
  {
    App: {
      screen: AppStack,
    },
  },
  {
    contentComponent: DrawerContainer,
  },
);
