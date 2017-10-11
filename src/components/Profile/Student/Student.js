import React from 'react';
import { ImageBackground, Image, Text, StyleSheet, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SkillsTags } from '../common/components/Tags';
import { ContactInfo } from '../common/components/ContactInfo';
import { Timeline } from '../common/components/Timeline';
import { LanguageTags } from '../common/components/LanguageTags';
import I18n from '../../../i18n/i18n';
import backendService from '../../../shared/backendService';
import { profileStyles } from '../common/styles';
import COMMON_STYLES from '../../../styles/common';

export default class StudentProfile extends React.Component {
  state = {
    contactInfoShown: false,
  };

  componentWillMount() {
    this.student = this.props.data;
    this.contactInfo = {
      email: this.student.email,
      phone: this.student.phone,
      facebook: this.student.facebook,
      linkedin: this.student.linkedin,
      twitter: this.student.twitter,
      address: `${this.student.address}, ${this.student.city}, ${I18n.t(`global.${this.student.country}`)}`,
    };
    [this.mainStudy] = this.student.userable.studies;
    this.studies = this.student.userable.studies.map(study => ({
      id: study.id,
      title: `${study.name} | ${study.level}`,
      dateLine: `${study.field} - ${study.institution_name}`,
    }));
    this.training = this.student.userable.training.map((training) => {
      const trDate = new Date(training.date).getFullYear();
      return {
        id: training.id,
        title: training.name,
        dateLine: `${trDate}`,
      };
    });
    this.experiences = this.student.userable.experiences.map((experience) => {
      const exFrom = new Date(experience.from).getFullYear();
      const exUntil =
        experience.until !== '' ? `- ${new Date(experience.until).getFullYear()}` : '';
      return {
        id: experience.id,
        title: `${experience.position} ${I18n.t('reg-profile.at')} ${experience.company}`,
        dateLine: `${exFrom} ${exUntil}`,
      };
    });
  }

  showContactInfo() {
    this.setState({ contactInfoShown: true });
  }

  render() {
    return (
      <ScrollView style={styles.container} bounces={false}>
        <ImageBackground
          source={require('../../../images/student-background.png')}
          style={styles.profileHead}
        >
          <View style={styles.profileInner}>
            <Image
              style={styles.photo}
              source={{ uri: `${backendService.webUrl}uploads/photo/${this.student.image}` }}
            />

            <Text style={styles.name}>
              {this.student.name} {this.student.surname}
            </Text>
            <Text style={styles.mainStudy}>{this.mainStudy.name}</Text>
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
            <Icon name="graduation-cap" size={14} style={styles.subtitleIcon} />
            <Text style={styles.inlineTitle}>{I18n.t('reg-profile.education')}: </Text>
            <Text>
              {this.mainStudy.name} {I18n.t('reg-profile.at')} {this.mainStudy.institution_name}
            </Text>
          </View>

          <View style={styles.textRow}>
            <Icon name="map-marker" size={14} style={styles.subtitleIcon} />
            <Text style={styles.inlineTitle}>{I18n.t('reg-profile.lives_in')}: </Text>
            <Text>
              {this.student.city}, {I18n.t(`global.${this.student.country}`)}
            </Text>
            <Text> | </Text>
            <Text style={styles.inlineTitle}>{I18n.t('reg-profile.nationality')}: </Text>
            <Text>{I18n.t(`global.${this.student.userable.nationality}`)}</Text>
          </View>

          {this.student.userable.birthdate !== '' && (
            <View style={styles.textRow}>
              <Icon name="calendar" size={14} style={styles.subtitleIcon} />
              <Text style={styles.inlineTitle}>{I18n.t('reg-profile.born_on')}: </Text>
              <Text>{new Date(this.student.userable.birthdate).toLocaleDateString()}</Text>
            </View>
          )}

          <View style={styles.textRow}>
            <Icon name="lightbulb-o" size={14} style={styles.subtitleIcon} />
            <Text style={styles.inlineTitle}>{I18n.t('reg-profile.my_talent')}: </Text>
            <Text>{this.student.userable.talent}</Text>
          </View>

          {this.student.userable.valid === 'validated' &&
            this.student.validator && (
              <View>
                <View style={styles.textRow}>
                  <Icon name="star" size={14} style={[styles.subtitleIcon, styles.validatedIcon]} />
                  <Text style={styles.inlineTitle}>{I18n.t('reg-profile.refereed_by')}: </Text>
                  <Text>
                    {this.student.validator.user.name} {this.student.validator.user.surname} |{' '}
                  </Text>
                  <View style={styles.textRow}>
                    <Icon name="calendar" size={14} style={styles.subtitleIcon} />
                    <Text>{this.student.userable.validation_request.updated_at} </Text>
                  </View>
                </View>

                <Text style={styles.validationComment}>
                  {this.student.userable.validation_comment}
                </Text>
              </View>
            )}
        </View>

        <View style={styles.card}>
          <View style={styles.titleRow}>
            <View style={styles.titleIconContainer}>
              <Icon name="gears" size={20} style={styles.titleIcon} />
            </View>
            <Text style={styles.cardTitle}>{I18n.t('reg-profile.skills')}</Text>
          </View>

          {this.student.userable.professional_skills.length > 0 && (
            <View>
              <Text style={styles.subtitle}>{I18n.t('reg-profile.professional')}: </Text>
              <SkillsTags skills={this.student.userable.professional_skills} />
            </View>
          )}

          {this.student.userable.personal_skills.length > 0 && (
            <View>
              <Text style={styles.subtitle}>{I18n.t('reg-profile.personal')}: </Text>
              <SkillsTags skills={this.student.userable.personal_skills} />
            </View>
          )}

          <View>
            <Text style={styles.inlineTitle}>{I18n.t('reg-profile.legend')}</Text>
            <View style={styles.textRow}>
              <Icon name="circle" size={20} style={styles.skillImportant} />
              <Text>{I18n.t('reg-profile.set_by_both_parties')} </Text>
            </View>
            <View style={styles.textRow}>
              <Icon name="circle" size={20} style={styles.skill} />
              <Text>{I18n.t('reg-profile.set_by_referee_or_student')}</Text>
            </View>
          </View>
        </View>

        {this.studies.length > 0 && (
          <View style={styles.card}>
            <View style={styles.titleRow}>
              <View style={styles.titleIconContainer}>
                <Icon name="graduation-cap" size={20} style={styles.titleIcon} />
              </View>
              <Text style={styles.cardTitle}>{I18n.t('reg-profile.study').split('|')[1]}</Text>
            </View>
            <Timeline items={this.studies} />
          </View>
        )}

        {this.training.length > 0 && (
          <View style={styles.card}>
            <View style={styles.titleRow}>
              <View style={styles.titleIconContainer}>
                <Icon name="trophy" size={20} style={styles.titleIcon} />
              </View>
              <Text style={styles.cardTitle}>{I18n.t('reg-profile.student_training')}</Text>
            </View>
            <Timeline items={this.training} />
          </View>
        )}

        {this.student.userable.languages.length > 0 && (
          <View style={styles.card}>
            <View style={styles.titleRow}>
              <View style={styles.titleIconContainer}>
                <Icon name="language" size={20} style={styles.titleIcon} />
              </View>
              <Text style={styles.cardTitle}>{I18n.t('reg-profile.student_languages')}</Text>
            </View>
            <LanguageTags items={this.student.userable.languages} />
          </View>
        )}

        {this.experiences.length > 0 && (
          <View style={styles.card}>
            <View style={styles.titleRow}>
              <View style={styles.titleIconContainer}>
                <Icon name="suitcase" size={20} style={styles.titleIcon} />
              </View>
              <Text style={styles.cardTitle}>{I18n.t('reg-profile.student_work_experience')}</Text>
            </View>
            <Timeline items={this.experiences} />
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ...profileStyles,

  validatedIcon: {
    color: COMMON_STYLES.YELLOW,
  },

  validationComment: {
    padding: 5,
    backgroundColor: COMMON_STYLES.INFO_BG,
    color: COMMON_STYLES.INFO_TEXT,
  },

  skillImportant: {
    color: COMMON_STYLES.YELLOW,
    paddingRight: 5,
  },

  skill: {
    color: COMMON_STYLES.BLUE,
    paddingRight: 5,
  },
});
