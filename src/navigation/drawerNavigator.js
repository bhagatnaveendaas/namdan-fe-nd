import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { MainStackNavigator } from './stackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="AshramDashboard" component={MainStackNavigator} />
    <Drawer.Screen name="CountryDashboard" component={MainStackNavigator} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
