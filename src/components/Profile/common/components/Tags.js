import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import COMMON_STYLES from '../../../../styles/common';

export const SkillsTags = (props) => {
  const tagStyle = [styles.tag, styles.blue];
  const tagDarkStyle = [styles.tag, styles.dark];

  const addedIds = [];
  const skills = props.skills.filter((skill) => {
    let count = 0;
    for (let i = 0; i < props.skills.length; i++) {
      if (skill.id === props.skills[i].id) {
        count++;
      }
    }
    skill.important = false;

    if (count > 1) {
      skill.important = true;
      if (addedIds.indexOf(skill.id) !== -1) {
        return false;
      }
    }
    addedIds.push(skill.id);
    return true;
  });

  const listTags = skills.map(skill => (
    <Text key={skill.id} style={skill.important ? tagDarkStyle : tagStyle}>
      {skill.name}
    </Text>
  ));
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
  blue: {
    backgroundColor: COMMON_STYLES.BLUE,
    color: 'white',
  },
  dark: {
    backgroundColor: COMMON_STYLES.YELLOW,
    color: 'white',
  },
});
