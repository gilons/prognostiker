/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home/index';
import { StatusBar, StyleSheet, View } from 'react-native';
import colors from './meta/colors';
import SelectTeams from './screens/Teams/index';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor={colors.transparent}
        barStyle={'default'}>
      </StatusBar>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false
          }}
          component={Home}
        />
        <Stack.Screen
          name="Teams"
          options={{ title: 'Select Team',headerShown:false }}
          component={SelectTeams} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
