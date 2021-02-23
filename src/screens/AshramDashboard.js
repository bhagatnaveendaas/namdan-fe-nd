import React from 'react';
import { View, Button, Text } from 'react-native';
import styles from '../styles/AshramDashboard';
import constants from '../constants/AshramDashboard';

const Home = ({ navigation }) => (
  <View style={styles.center}>
    <Text>{constants.screenName}</Text>
    <Button
      title={constants.buttonTittle}
      onPress={() => navigation.navigate('CountryDashboard')}
    />
  </View>
);

export default Home;
