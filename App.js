import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/drawerNavigator';
import FontContainer from './FontContainer';

const App = () => (
  <FontContainer>
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  </FontContainer>
);
export default App;
