import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AshramDashboard from '../screens/AshramDashboard';
import CountryDashboard from '../screens/CountryDashboard';

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
  </Stack.Navigator>
);

export default { MainStackNavigator };
