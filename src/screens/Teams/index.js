import React, {Component} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Teams from './components/Teams';
import * as football from '../../meta/football.json';
import {View} from 'react-native';
const Tab = createBottomTabNavigator();
export default function SelectTeams(props) {
  const {navigation, route} = props;
  const selectItem = (item) => {
    const select = route && route.params.selectTeam;
    select && select(item);
    return navigation.goBack();
  };
  function renderLeagues() {
    return <Teams selectItem={selectItem} data={football.clubs} />;
  }
  function renderCountries() {
    return <Teams data={football.countries} selectItem={selectItem} />;
  }
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 20,
        },
      }}
      initialRouteName={'Leagues'}>
      <Tab.Screen name={'Leagues'} component={renderLeagues} />
      <Tab.Screen name={'Countries'} component={renderCountries} />
    </Tab.Navigator>
  );
}
