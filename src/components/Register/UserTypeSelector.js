import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from '../../i18n/i18n';
import COMMON_STYLES from '../../styles/common';

export const UserTypeSelector = (props) => {
  const { selectionIndex, onSelect } = props;

  const selectedTypeText = {
    none: I18n.t('register.i_am_a'),
    student: I18n.t('global.student_singular'),
    company: I18n.t('global.company_singular'),
    validator: I18n.t('global.referee_singular'),
    institution: I18n.t('global.institution_singular'),
  };

  const getTypeStyle = (type) => {
    if (selectionIndex === type) return styles.activeIconInput;
    return styles.iconInput;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.selectedTypeText}>{selectedTypeText[selectionIndex]}</Text>

      <View style={styles.typeIconContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={getTypeStyle('student')}
          onPress={() => onSelect('student')}
        >
          <Icon name="user-o" size={18} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={getTypeStyle('company')}
          onPress={() => onSelect('company')}
        >
          <Icon name="building" size={18} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={getTypeStyle('validator')}
          onPress={() => onSelect('validator')}
        >
          <Icon name="certificate" size={18} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={getTypeStyle('institution')}
          onPress={() => onSelect('institution')}
        >
          <Icon name="university" size={18} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  typeIconContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  selectedTypeText: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: COMMON_STYLES.WHITE,
    marginTop: 10,
  },

  icon: {
    color: COMMON_STYLES.WHITE,
    backgroundColor: 'transparent',
  },

  iconInput: {
    backgroundColor: COMMON_STYLES.BLUE,
    borderRadius: 100,
    margin: 10,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeIconInput: {
    backgroundColor: COMMON_STYLES.YELLOW,
    borderRadius: 100,
    margin: 10,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
