import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import styles from '../styles/Login';

function GreyButton({ label, handlePress }) {
  return (
    <TouchableOpacity style={styles.GreyButton} onPress={handlePress} elevation={5}>
      <Text style={[styles.textCenter, styles.GreyButtonText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default GreyButton;
