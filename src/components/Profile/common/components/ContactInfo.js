import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Communications from 'react-native-communications';
import COMMON_STYLES from '../../../../styles/common';

export const ContactInfo = (props) => {
  if (props.visible) {
    return (
      <View style={styles.contactBox}>
        <Text style={styles.address}>{props.contactInfo.address}</Text>

        <View style={styles.contactMethods}>
          <Button
            icon={{ name: 'phone', type: 'font-awesome', color: COMMON_STYLES.BLUE }}
            buttonStyle={styles.linkButton}
            onPress={() => {
              Communications.phonecall(props.contactInfo.phone, true);
            }}
          />
          <Button
            icon={{ name: 'envelope-o', type: 'font-awesome', color: COMMON_STYLES.BLUE }}
            buttonStyle={styles.linkButton}
            onPress={() => {
              Communications.email([props.contactInfo.email], null, null, null, null);
            }}
          />
          {props.contactInfo.facebook !== '' && (
            <Button
              icon={{ name: 'facebook', type: 'font-awesome', color: COMMON_STYLES.BLUE }}
              buttonStyle={styles.linkButton}
              onPress={() => {
                Communications.web(props.contactInfo.facebook);
              }}
            />
          )}
          {props.contactInfo.twitter !== '' && (
            <Button
              icon={{ name: 'twitter', type: 'font-awesome', color: COMMON_STYLES.BLUE }}
              buttonStyle={styles.linkButton}
              onPress={() => {
                Communications.web(props.contactInfo.twitter);
              }}
            />
          )}
          {props.contactInfo.linkedin !== '' && (
            <Button
              icon={{ name: 'linkedin', type: 'font-awesome', color: COMMON_STYLES.BLUE }}
              buttonStyle={styles.linkButton}
              onPress={() => {
                Communications.web(props.contactInfo.linkedin);
              }}
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <Button
      raised
      icon={{ name: 'envelope-o', type: 'font-awesome', color: COMMON_STYLES.BLACK }}
      title="Contact information"
      textStyle={styles.contactButtonText}
      buttonStyle={styles.contactButton}
      onPress={props.buttonPress}
    />
  );
};

const styles = StyleSheet.create({
  contactButton: {
    backgroundColor: COMMON_STYLES.YELLOW,
  },

  contactButtonText: {
    fontSize: 14,
    color: COMMON_STYLES.BLACK,
  },

  contactBox: {
    backgroundColor: COMMON_STYLES.WHITE,
    padding: 20,
  },

  contactMethods: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  address: {
    fontStyle: 'italic',
    color: COMMON_STYLES.TEXT_GRAY,
    textAlign: 'center',
  },

  linkButton: {
    backgroundColor: 'transparent',
  },
});
