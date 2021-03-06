import React from 'react';
import {
  View, Text, Image, Dimensions
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../constants/theme';

const { height } = Dimensions.get('window');

const FlatIconButtons = ({ label, icon, pressHandler }) => (
  <View style={[{ width: '49%', marginTop: '2%', paddingHorizontal: label.length > 20 ? '5%' : '8%', }, theme.card]}>
    <TouchableOpacity onPress={pressHandler} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: '4%' }}>
      <Text style={{
        alignContent: 'center', alignSelf: 'center', alignItems: 'center', fontFamily: theme.fonts.poppins.regular, ...theme.sizes.regular
      }}
      >
        {label}
        {' '}
      </Text>
      <Image style={{ height: height * 0.07, width: height * 0.065 }} source={icon} />
    </TouchableOpacity>
  </View>
);

export default FlatIconButtons;
