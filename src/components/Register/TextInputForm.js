import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const TextInputForm = (props) => {
  const {
    icon,
    value,
    placeholder,
    returnKeyType,
    onChangeText,
    onSubmitEditing,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
    editable,
    refFn,
  } = props;

  return (
    <View style={styles.container}>
      {icon && <Icon name={icon} size={30} style={styles.textIconInput} />}

      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        returnKeyType={returnKeyType || 'next'}
        onChangeText={text => onChangeText(text)}
        onSubmitEditing={() => {
          if (onSubmitEditing) {
            onSubmitEditing();
          }
        }}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize || 'none'}
        autoCorrect={false}
        style={styles.input}
        editable={editable}
        ref={(input) => {
          if (refFn) {
            refFn(input);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
  },
  textIconInput: {
    color: 'rgba(0, 0, 0, 0.5)',
    width: 32,
    paddingRight: 4,
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'right',
  },
  input: {
    height: 40,
    color: 'white',
    paddingHorizontal: 10,
    flex: 1,
  },
});
