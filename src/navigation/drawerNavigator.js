import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import MainStackNavigator from './stackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="AshramDashboard" component={MainStackNavigator} />
    <Drawer.Screen name="SignUp" component={MainStackNavigator} />
    <Drawer.Screen name="Login" component={MainStackNavigator} />
    <Drawer.Screen name="CountryDashboard" component={MainStackNavigator} />
    <Drawer.Screen name="Entry" component={MainStackNavigator} />
    <Drawer.Screen name="AddNaamdanCenter" component={MainStackNavigator} />
    <Drawer.Screen name="Approvals" component={MainStackNavigator} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
