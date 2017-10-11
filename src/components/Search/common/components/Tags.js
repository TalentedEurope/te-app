import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import COMMON_STYLES from '../../../../styles/common';

export const SkillsTags = (props) => {
  let tagStyle = [styles.tag, styles.gray];
  if (props.backgroundColor === 'dark') {
    tagStyle = [styles.tag, styles.dark];
  }

  const skills = props.skills ? props.skills.slice(0, 4) : [];

  const listTags = skills.map(skill => (
    <Text key={skill.id} style={tagStyle}>
      {skill.name}
    </Text>
  ));
  if (skills.length > 3) {
    listTags.push(<Text key="..." style={tagStyle}>
        ...
      </Text>);
  }
  return <View style={styles.tagsWrapper}>{listTags}</View>;
};

export const LanguagesTags = (props) => {
  const languages = props.languages ? props.languages.slice(0, 4) : [];

  const listTags = languages.map(language => (
    <Text key={language} style={[styles.tag, styles.dark]}>
      {language}
    </Text>
  ));
  if (languages.length > 3) {
    listTags.push(<Text key="..." style={[styles.tag, styles.dark]}>
        ...
      </Text>);
  }
  return <View style={styles.tagsWrapper}>{listTags}</View>;
};

const styles = StyleSheet.create({
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    padding: 5,
    paddingHorizontal: 8,
    fontSize: 11,
    marginRight: 4,
    marginBottom: 5,
  },
  gray: {
    backgroundColor: COMMON_STYLES.LIGHT_GRAY,
    color: COMMON_STYLES.TEXT_COLOR,
  },
  dark: {
    backgroundColor: COMMON_STYLES.DARK_BLUE,
    color: 'white',
  },
});
