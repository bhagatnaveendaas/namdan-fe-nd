import React from 'react';
import {
  Image, Text, View, Dimensions
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

function RoundIconButton({ handleClick, iconName, label }) {
  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={{ alignContent: 'center', alignSelf: 'center' }}>
        <Image style={{ height: width * 0.2, width: width * 0.2 }} source={iconName} />
        <Text style={{ fontSize: 14, textAlign: 'center' }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default RoundIconButton;
