import React from "react";
import { View, Button, Text } from "react-native";
import styles from '../styles/AshramDashboard'
import constants from '../constants/AshramDashboard'

const Home = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text>{constants.screenName}</Text>
      <Button
        title={constants.buttonTittle}
        onPress={() => navigation.navigate("CountryDashboard")} // We added an onPress event which would navigate to the About screen
      />
    </View>
  );
};


export default Home;