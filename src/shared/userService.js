import { AsyncStorage } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import ProfileApi from '../api/ProfileApi';

class UserService {
  userInfo;
  isLogged;
  pushId;

  setPushId(pushId) {
    this.pushId = pushId;
  }

  getToken() {
    return this.userInfo && this.userInfo.token;
  }

  onStartApp() {
    this.setPropertiesData().then(() => {
      if (this.isLogged) {
        const profileApi = new ProfileApi();
        profileApi.getProfile(this.userInfo.id).then((response) => {
          this.updateInfo(response);
        });
      }
    });
  }

  afterLogin(userInfo, token) {
    AsyncStorage.setItem('userInfo', this.stringifyUserInfo(userInfo, token), () => {
      this.setPropertiesData();
    });
  }

  afterLogout() {
    AsyncStorage.removeItem('userInfo');
    this.setPropertiesData();
  }

  updateInfo(userInfo) {
    AsyncStorage.setItem('userInfo', this.stringifyUserInfo(userInfo, this.userInfo.token), () => {
      this.setPropertiesData();
    });
  }

  setPropertiesData() {
    return AsyncStorage.getItem('userInfo', (error, result) => {
      this.userInfo = this.parseUserInfo(result);
      this.isLogged = this.userInfo ? !!this.userInfo.token : false;
      EventRegister.emit('userInfoChanged', '');
    });
  }

  parseUserInfo(userInfo) {
    userInfo = JSON.parse(userInfo);
    if (userInfo && userInfo.id) {
      userInfo.type = userInfo.userable_type.replace('App\\Models\\', '').toLowerCase();
      userInfo.isFilled = !!userInfo.is_filled;
    }
    return userInfo;
  }

  stringifyUserInfo(userInfo, token) {
    return JSON.stringify({
      id: userInfo.id,
      name: userInfo.name,
      surname: userInfo.surname,
      image: userInfo.image,
      userable_type: userInfo.userable_type,
      is_filled: userInfo.is_filled,
      token,
    });
  }
}

export default new UserService();
