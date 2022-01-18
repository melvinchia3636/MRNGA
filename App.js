/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator, DrawerItemList,
} from '@react-navigation/drawer';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Provider } from 'react-native-paper';
import { View, Text, ImageBackground } from 'react-native';
import CurrencyConverter from './src/projects/currencyConverter';
import Header from './src/Header';
import Home from './src/Home';

import AvatarImage from './src/assets/avatar.jpg';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer theme={{
        colors: {
          background: '#F8FAFC',
        },
      }}
      >
        <Drawer.Navigator
          screenOptions={{
            drawerStyle: {
              width: '80%',
              backgroundColor: 'white',
            },
            drawerActiveTintColor: '#0EA5E9',
          }}
          drawerContent={(props) => (
            <View>
              <ImageBackground
                source={{ uri: 'https://img.freepik.com/free-vector/gradient-smooth-blue-lines-background_23-2148964962.jpg?size=626&ext=jpg' }}
                style={{
                  marginBottom: 2,
                  padding: 20,
                }}
              >
                <Avatar.Image source={AvatarImage} />
                <Text style={{ color: 'white', fontSize: 16, marginTop: 8 }}>Melvin Chia</Text>
                <Text style={{ color: 'white', fontSize: 12 }}>melvinchia623600@gmail.com</Text>
              </ImageBackground>
              <DrawerItemList
                {...props}
              />
            </View>
          )}
        >
          <Drawer.Screen
            options={{
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons name="home-outline" size={24} color={color} />
              ),
              header: (props) => <Header {...props} />,
            }}
            name="Home"
            component={Home}
          />
          <Drawer.Screen
            options={{
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons name="currency-usd" size={24} color={color} />
              ),
              header: (props) => <Header {...props} />,
            }}
            name="Currency Converter"
            component={CurrencyConverter}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
