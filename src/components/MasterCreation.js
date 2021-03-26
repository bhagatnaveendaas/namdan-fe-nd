import React from 'react';
import {
  View, Text, Image, Dimensions
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../constants/theme';

const { height, width } = Dimensions.get('window');

const MasterCreation = () => (
  <View style={[theme.card, { paddingHorizontal: '3%', paddingTop: '4%', flexDirection: 'row' }]}>
    <View style={{ borderRightColor: theme.colors.grey, borderRightWidth: 1, width: '50%' }}>
      <View style={{
        flexDirection: 'row', marginHorizontal: '7%', paddingHorizontal: '3%', paddingBottom: '8%', alignItems: 'center', borderBottomColor: theme.colors.grey, borderBottomWidth: 1, justifyContent: 'space-between',
      }}
      >
        <View>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>
            Manage
            {'\n'}
            Country
          </Text>
        </View>
        <Image source={require('../../assets/icons/5A.png')} style={{ height: height * 0.07, width: height * 0.07 }} />
      </View>
      <View style={{
        flexDirection: 'row', marginHorizontal: '7%', paddingHorizontal: '3%', paddingVertical: '8%', alignItems: 'center', justifyContent: 'space-between',
      }}
      >
        <View>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>
            Manage
            {'\n'}
            District
          </Text>
        </View>
        <Image source={require('../../assets/icons/7A.png')} style={{ height: height * 0.07, width: height * 0.07 }} />
      </View>
    </View>
    <View style={{ width: '50%' }}>
      <View style={{
        flexDirection: 'row', marginHorizontal: '7%', paddingHorizontal: '3%', paddingBottom: '8%', alignItems: 'center', borderBottomColor: theme.colors.grey, borderBottomWidth: 1, justifyContent: 'space-between',
      }}
      >
        <View>

          <Text style={{ fontSize: 16, textAlign: 'center' }}>
            Manage
            {'\n'}
            State
          </Text>
        </View>
        <Image source={require('../../assets/icons/6A.png')} style={{ height: height * 0.07, width: height * 0.07 }} />
      </View>
      <View style={{
        flexDirection: 'row', marginHorizontal: '7%', paddingHorizontal: '3%', paddingVertical: '8%', alignItems: 'center', justifyContent: 'space-between',
      }}
      >
        <View>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>
            Manage
            {'\n'}
            Tehsil
          </Text>
        </View>
        <Image source={require('../../assets/icons/8A.png')} style={{ height: height * 0.07, width: height * 0.07 }} />
      </View>
    </View>
  </View>
);

export default MasterCreation;
