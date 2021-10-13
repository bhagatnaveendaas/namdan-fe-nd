import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import MainStackNavigator from './stackNavigator';
import SearchScreen from '../screens/entry/search';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Ashram Dashboard" component={MainStackNavigator} />
    <Drawer.Screen name="SignUp" component={MainStackNavigator} />
    <Drawer.Screen name="Login" component={MainStackNavigator} />
    <Drawer.Screen name="Country Dashboard" component={MainStackNavigator} />
    <Drawer.Screen name="Entry" component={MainStackNavigator} />
    <Drawer.Screen name="SearchScreen" component={SearchScreen} />
    <Drawer.Screen name="Add Naamdan Center" component={MainStackNavigator} />
    <Drawer.Screen name="Add Sewadaar" component={MainStackNavigator} />
    <Drawer.Screen name="Approvals" component={MainStackNavigator} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
