import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/drawerNavigator';

const App = () => (
  <NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>
);
export default App;
