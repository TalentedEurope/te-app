import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { EventRegister } from 'react-native-event-listeners';
import Communications from 'react-native-communications';
import I18n from '../../i18n/i18n';
import backendService from '../../shared/backendService';
import userService from '../../shared/userService';
import COMMON_STYLES from '../../styles/common';

const MenuItem = props => (
  <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
    <View style={styles.menuItem}>
      <Icon name={props.icon} style={styles.menuItemIcon} />
      <Text style={styles.menuItemText}>{props.text}</Text>
    </View>
  </TouchableOpacity>
);

export default class DrawerContainer extends React.Component {
  state = {
    userIsLogged: userService.isLogged,
    imageUrl: this.getImageUrl(),
    imageStyle: this.getImageStyle(),
  };

  componentWillMount() {
    EventRegister.addEventListener('userInfoChanged', () => {
      this.setState({
        userIsLogged: userService.isLogged,
        imageUrl: this.getImageUrl(),
        imageStyle: this.getImageStyle(),
      });
    });
  }

  getImageUrl() {
    const image = userService.userInfo ? userService.userInfo.image : 'default.png';
    return `${backendService.webUrl}uploads/photo/${image}`;
  }

  getImageStyle() {
    let imageStyle = styles.userPhoto;
    if (
      userService.userInfo &&
      ['company', 'institution'].includes(userService.userInfo.type) &&
      userService.userInfo.image !== 'default.png'
    ) {
      imageStyle = styles.userLogo;
    }
    return imageStyle;
  }

  showProfileImage() {
    return (
      ['student', 'company', 'institution'].includes(userService.userInfo.type) &&
      userService.userInfo.image !== 'default.png'
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.header} source={require('../../images/background.png')}>
          {!this.state.userIsLogged && (
            <View style={styles.innerHeader}>
              <Image
                resizeMode={'contain'}
                style={this.state.imageStyle}
                source={{ uri: this.state.imageUrl }}
              />

              <Text style={styles.userInfo}>{I18n.t('login.sign_in_features')}</Text>
            </View>
          )}
          {this.state.userIsLogged && (
            <View style={styles.innerHeader}>
              {this.showProfileImage() && (
                <Image
                  resizeMode={'contain'}
                  style={this.state.imageStyle}
                  source={{ uri: this.state.imageUrl }}
                />
              )}
              <Text style={styles.userInfo}>
                {I18n.t('email.validatorRequested_line_2').replace('%s', userService.userInfo.name)}
              </Text>
            </View>
          )}
        </ImageBackground>

        <ScrollView style={styles.body}>
          <MenuItem
            icon="home"
            onPress={() => navigation.navigate('Search')}
            text={I18n.t('global.home')}
          />

          <MenuItem
            icon="info-circle"
            onPress={() => navigation.navigate('About')}
            text={I18n.t('reg-profile.about')}
          />

          {!this.state.userIsLogged && (
            <View>
              <MenuItem
                icon="sign-in"
                onPress={() => navigation.navigate('Login')}
                text={I18n.t('global.login_btn')}
              />
              <MenuItem
                icon="file"
                onPress={() => navigation.navigate('Register')}
                text={I18n.t('global.register_btn')}
              />
            </View>
          )}

          {this.state.userIsLogged && (
            <View>
              {userService.userInfo.type === 'company' && (
                <MenuItem
                  icon="bell"
                  onPress={() => navigation.navigate('Alerts')}
                  text={I18n.t('navbar.alerts')}
                />
              )}

              {userService.userInfo.type === 'institution' && (
                <MenuItem
                  icon="users"
                  onPress={() => navigation.navigate('Validators')}
                  text={I18n.t('validators.validators')}
                />
              )}

              {userService.userInfo.type === 'validator' && (
                <MenuItem
                  icon="balance-scale"
                  onPress={() => navigation.navigate('Students')}
                  text={I18n.t('validators.my_students')}
                />
              )}

              {userService.userInfo.isFilled &&
                ['student', 'company'].includes(userService.userInfo.type) && (
                  <MenuItem
                    icon="address-card-o"
                    onPress={() =>
                      navigation.navigate('Profile', {
                        id: userService.userInfo.id,
                        myProfile: true,
                      })}
                    text={I18n.t('reg-profile.my_profile')}
                  />
                )}

              <MenuItem
                icon="cogs"
                onPress={() => navigation.navigate('Settings')}
                text={I18n.t('navbar.settings')}
              />

              <MenuItem
                icon="sign-out"
                onPress={() => navigation.navigate('Login', { logout: true })}
                text={I18n.t('global.logout_btn')}
              />
            </View>
          )}

          <MenuItem
            icon="link"
            onPress={() => Communications.web('http://talentedeurope.eu/')}
            text={I18n.t('global.web')}
          />

          <Image
            resizeMode={'contain'}
            style={styles.logo}
            source={require('../../images/logo.png')}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: COMMON_STYLES.DARK_BLUE,
    padding: 20,
    paddingTop: 45,
    minHeight: 100,
  },
  innerHeader: {
    alignItems: 'center',
  },
  userPhoto: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  userLogo: {
    width: 156,
    height: 74,
    marginBottom: 20,
  },
  userInfo: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  body: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
  },
  menuItemIcon: {
    color: COMMON_STYLES.DARK_BLUE,
    width: 35,
    fontSize: 16,
  },
  menuItemText: {
    color: COMMON_STYLES.DARK_BLUE,
    fontSize: 16,
  },

  logo: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50,
    height: 85,
  },
});
