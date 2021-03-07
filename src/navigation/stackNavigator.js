import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AshramDashboard from '../screens/AshramDashboard';
import CountryDashboard from '../screens/CountryDashboard';
import Login from '../screens/Login';
import HomeHeader from '../components/HomeHeader';
import SignUp from '../screens/SignUp';


const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator
    headerMode="screen"
  >
    <Stack.Screen name="SignUp" component={SignUp} options={{ headerTitle: props => <HomeHeader {...props} title="Sign up" /> }} />
    <Stack.Screen name="Login" component={Login} options={{ header: ()=>{}}} />
    <Stack.Screen name="AshramDashboard" component={AshramDashboard} options={{ headerTitle: props => <HomeHeader {...props} title="Ashram dashboard" /> }} />
    <Stack.Screen name="CountryDashboard" component={CountryDashboard} />
  </Stack.Navigator>
);

export default MainStackNavigator;
