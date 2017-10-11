import React from 'react';
import { ImageBackground, Image, Text, StyleSheet, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from '../../../i18n/i18n';
import backendService from '../../../shared/backendService';
import { SkillsTags } from '../common/components/Tags';
import { ContactInfo } from '../common/components/ContactInfo';
import { profileStyles } from '../common/styles';

export default class CompanyProfile extends React.Component {
  state = {
    contactInfoShown: false,
  };

  componentWillMount() {
    this.company = this.props.data;
    this.contactInfo = {
      email: this.company.email,
      phone: this.company.phone,
      facebook: this.company.facebook,
      linkedin: this.company.linkedin,
      twitter: this.company.twitter,
      address: `${this.company.address}, ${this.company.city}, ${I18n.t(`global.${this.company.country}`)}`,
    };
  }

  showContactInfo() {
    this.setState({ contactInfoShown: true });
  }

  render() {
    return (
      <ScrollView style={styles.container} bounces={false}>
        <ImageBackground
          source={require('../../../images/company-background.png')}
          style={styles.profileHead}
        >
          <View style={styles.profileInner}>
            <Image
              style={this.company.image === 'default.png' ? styles.photo : styles.logo}
              source={{ uri: `${backendService.webUrl}uploads/photo/${this.company.image}` }}
            />

            <Text style={styles.name}>{this.company.name}</Text>
            <Text style={styles.mainStudy}>
              {I18n.t(`reg-profile.${this.company.userable.activity}`)}
            </Text>
            <ContactInfo
              contactInfo={this.contactInfo}
              visible={this.state.contactInfoShown}
              buttonPress={() => {
                this.showContactInfo();
              }}
            />
          </View>
        </ImageBackground>

        <View style={styles.card}>
          <View style={styles.titleRow}>
            <View style={styles.titleIconContainer}>
              <Icon name="info" size={20} style={styles.titleIcon} />
            </View>
            <Text style={styles.cardTitle}>{I18n.t('reg-profile.about')}</Text>
          </View>

          <View style={styles.textRow}>
            <Icon name="map-marker" size={14} style={styles.subtitleIcon} />
            <Text style={styles.inlineTitle}>{I18n.t('reg-profile.we_are_in')}: </Text>
            <Text>
              {this.company.city}, {I18n.t(`global.${this.company.country}`)}
            </Text>
          </View>

          {this.company.userable.personal_skills.length > 0 && (
            <View style={styles.textRow}>
              <Icon name="gears" size={14} style={styles.subtitleIcon} />
              <Text style={styles.inlineTitle}>
                {I18n.t('reg-profile.we_are_looking_for_people_skilled_in')}:{' '}
              </Text>
              <SkillsTags skills={this.company.userable.personal_skills} />
            </View>
          )}

          <View style={styles.textRow}>
            <Icon name="lightbulb-o" size={14} style={styles.subtitleIcon} />
            <Text style={styles.inlineTitle}>
              {I18n.t('reg-profile.we_think_that_talent_is')}:{' '}
            </Text>
            <Text>{this.company.userable.talent}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ...profileStyles,
});
