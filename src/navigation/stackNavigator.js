import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AshramDashboard from '../screens/AshramDashboard';
import CountryDashboard from '../screens/CountryDashboard';
import Login from '../screens/Login';
import HomeHeader from '../components/HomeHeader';
import SignUp from '../screens/SignUp';
import NamdanCenter from '../screens/NamdanCenter';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#9AC4F8',
      },
      headerTintColor: 'white',
      headerBackTitle: 'Back',
    }}
  >
    <Stack.Screen name="AshramDashboard" component={AshramDashboard} />
    <Stack.Screen name="CountryDashboard" component={CountryDashboard} />
    <Stack.Screen name="NamdanCenter" component={NamdanCenter} options={{ headerTitle: props => <HomeHeader {...props} title="Add Namdan Center" /> }} />
  </Stack.Navigator>
);

export default { MainStackNavigator };
