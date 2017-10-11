import React from 'react';
import { Platform, TextInput, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from '../../../../i18n/i18n';
import COMMON_STYLES from '../../../../styles/common';

export const SearchBox = (props) => {
  const { value, onChange, onSubmit } = props;
  return (
    <TouchableWithoutFeedback onPress={() => this.searchInput.focus()}>
      <View style={styles.innerContainer}>
        <Icon name="search" style={styles.icon} />
        <TextInput
          style={styles.searchBox}
          placeholder={I18n.t('landing.search_placeholder')}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          returnKeyType="go"
          value={value}
          onChangeText={onChange}
          onSubmitEditing={onSubmit}
          autoCapitalize="none"
          autoCorrect={false}
          ref={(input) => {
            this.searchInput = input;
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  icon: {
    color: COMMON_STYLES.SEMI_LIGHT_GRAY,
    fontSize: 17,
    paddingLeft: 10,
    paddingBottom: Platform.OS === 'ios' ? 1 : 0,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },

  searchBox: {
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
    paddingBottom: 0,
    paddingHorizontal: 15,
    fontSize: 14,
    flex: 1,
  },
});
