/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import CurrencyConverter from './src/projects/currencyConverter';
import Header from './src/utils';
import Home from './src/Home';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer theme={{
      colors: {
        background: '#F8FAFC',
      },
    }}
    >
      <Drawer.Navigator screenOptions={{
        drawerStyle: {
          width: '80%',
          backgroundColor: 'white',
        },
        drawerActiveTintColor: 'black',
      }}
      >
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <MaterialCommunityIcons name="home-outline" size={24} color="black" />
            ),
            header: (props) => <Header color="#1E293B" {...props} />,
          }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerIcon: () => (
              <MaterialCommunityIcons name="currency-usd" size={24} color="black" />
            ),
            header: (props) => <Header color="#84CC16" {...props} />,
          }}
          name="Currency Converter"
          component={CurrencyConverter}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
