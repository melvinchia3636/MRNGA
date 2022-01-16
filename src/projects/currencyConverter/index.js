/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Converter from './page/Converter';
import ExchangeRate from './page/ExchangeRate';

const Tab = createMaterialTopTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: {
        fontSize: 11,
        color: 'white',
      },
      tabBarStyle: {
        backgroundColor: '#84CC16',
      },
      tabBarIndicatorStyle: {
        backgroundColor: 'white',
      },
    }}
    >
      <Tab.Screen name="Converter" component={Converter} />
      <Tab.Screen name="Exchange Rate" component={ExchangeRate} />
    </Tab.Navigator>
  );
}
