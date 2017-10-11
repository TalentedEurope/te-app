import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COMMON_STYLES from '../../../../styles/common';

export const Timeline = (props) => {
  const listItems = props.items.map(item => (
    <View style={styles.item} key={item.id}>
      <Icon name="circle" size={10} style={styles.dot} />
      <Text style={styles.dateLine}>{item.dateLine}</Text>
      <Text>{item.title}</Text>
    </View>
  ));
  return <View style={styles.timelineWrapper}>{listItems}</View>;
};

const styles = StyleSheet.create({
  dateLine: {
    color: COMMON_STYLES.TEXT_GRAY,
    fontSize: 12,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  dot: {
    color: COMMON_STYLES.BLUE,
    position: 'absolute',
    left: -4,
    top: 5,
  },
  item: {
    paddingLeft: 10,
    borderLeftColor: COMMON_STYLES.GRAY,
    borderLeftWidth: StyleSheet.hairlineWidth,
    paddingBottom: 15,
  },
});
