import React from 'react';
import {
  View, Text, Image, Dimensions
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../constants/theme';

const { height, width } = Dimensions.get('window');

const VerticalIconButton = ({ label, icon, pressHandler }) => (
  <View style={{ paddingBottom: '3%', width: '30%', height: '50%' }}>
    <View style={[theme.card, { paddingVertical: '8%', flexGrow: 1 }]}>
      <TouchableOpacity onPress={pressHandler}>
        <View style={{ paddingBottom: '4%' }}>
          <Image
            style={{
              height: height * 0.07, width: height * 0.065, alignItems: 'center', alignSelf: 'center'
            }}
            source={icon}
          />
        </View>
        <Text style={{
          alignContent: 'center', alignSelf: 'center', alignItems: 'center', fontSize: 14, textAlign: 'center'
        }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default VerticalIconButton;
