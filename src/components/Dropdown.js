import React from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/Singup';

function Dropdown({
  label, value, changeFn, options
}) {
  // console.log({value})
  return (
    <View style={styles.inputField}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={styles.dropdown}
      >
        <Picker
          selectedValue={value}
          onValueChange={changeFn}
        >
          {options.map((item, index) => <Picker.Item key={index} label={item} value={item} />)}
        </Picker>
      </View>
    </View>
  );
}

export default Dropdown;
