import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import ProfileApi from '../../api/ProfileApi';
import StudentProfile from './Student/Student';
import CompanyProfile from './Company/Company';
import ValidatorProfile from './Validator/Validator';
import { NoResults } from '../common/NoResults';
import userService from '../../shared/userService';
import I18n from '../../i18n/i18n';

export default class Profile extends React.Component {
  state = {
    data: [],
    collective: '',
    loading: true,
  };

  componentDidMount() {
    const { state } = this.props.navigation;
    if (state.params && state.params.id) {
      this.profileApi = new ProfileApi();

      this.profileApi
        .getProfile(state.params.id)
        .then((response) => {
          this.setState({
            data: response,
            collective: response.userable_type.replace('App\\Models\\', ''),
            loading: false,
          });
          if (state.params.myProfile) {
            userService.updateInfo(response);
          }
        })
        .catch(() => {
          this.setState({
            collective: '',
            loading: false,
          });
        });
    }
  }

  render() {
    if (!this.state.loading) {
      if (this.state.collective === 'Student') {
        return (
          <View style={styles.container}>
            <StudentProfile data={this.state.data} />
          </View>
        );
      } else if (this.state.collective === 'Company') {
        return (
          <View style={styles.container}>
            <CompanyProfile data={this.state.data} />
          </View>
        );
      } else if (this.state.collective === 'Validator') {
        return (
          <View style={styles.container}>
            <ValidatorProfile data={this.state.data} />
          </View>
        );
      }
      return (
        <View style={styles.container}>
          <NoResults text={I18n.t('reg-profile.profile_not_available')} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={{ paddingVertical: 60 }}>
          <ActivityIndicator animating size="large" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
