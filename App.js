/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {
  StatusBar, Text, View, Pressable,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import ExchangeRate from './src/page/ExchangeRate';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function Main() {
  return (
    <>
      <Tab.Navigator screenOptions={{ tabBarLabelStyle: { fontSize: 11, color: 'white' }, tabBarStyle: { backgroundColor: '#84CC16' }, tabBarIndicatorStyle: { backgroundColor: 'white' } }}>
        <Tab.Screen name="Converter" component={HomeScreen} />
        <Tab.Screen name="Exchange Rate" component={ExchangeRate} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={{
      colors: {
        background: '#F8FAFC',
      },
    }}
    >
      <Stack.Navigator>
        <Stack.Screen
          options={{
            header: () => (
              <View
                style={{
                  height: 60,
                  backgroundColor: '#84CC16',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                }}
              >
                <Pressable
                  onPress={() => alert('This is a button!')}
                  title="Info"
                >
                  <MaterialCommunityIcons name="menu" size={28} color="white" />
                </Pressable>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 16,
                    marginLeft: 12,
                  }}
                >
                  Currency Converter
                </Text>
              </View>
            ),
          }}
          name="Currency Converter"
          component={Main}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
