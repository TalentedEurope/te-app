import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import COMMON_STYLES from '../../../../styles/common';

export const LanguageTags = (props) => {
  const listLangs = props.items.map(item => (
    <View style={styles.item} key={item.id}>
      <Text>
        {item.name} | {item.level}
      </Text>
    </View>
  ));
  return <View style={styles.container}>{listLangs}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: COMMON_STYLES.LIGHT_GRAY,
    borderColor: COMMON_STYLES.GRAY,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    margin: 5,
    width: '45%',
  },
});
