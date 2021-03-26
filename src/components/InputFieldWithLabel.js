import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles/Singup';

function InputFieldWithLabel({
  label, value, changeFn, placeholder, isDate, setShow
}) {
  return (
    <View style={styles.inputField}>
      <Text style={styles.label}>{label}</Text>
      {isDate
        ? (
          <TouchableOpacity style={[styles.textInput, { paddingVertical: '4.3%' }]} onPress={() => setShow(true)}>
            <Text>{`${value.toLocaleDateString()}`}</Text>
          </TouchableOpacity>
        )
        : <TextInput placeholder={placeholder} style={styles.textInput} value={value} onChange={changeFn} />}
    </View>
  );
}

export default InputFieldWithLabel;
