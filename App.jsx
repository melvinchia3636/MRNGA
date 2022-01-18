/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */

// Dependencies
import * as React from 'react';
import 'react-native-gesture-handler';

// Components
import { View, Text, ImageBackground } from 'react-native';
import { Avatar, Provider } from 'react-native-paper';

// Navigations
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator, DrawerItem, DrawerItemList,
} from '@react-navigation/drawer';

// Static assets
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AvatarImage from './src/assets/avatar.jpg';

// Misc components
import Header from './src/Header';
import Home from './src/Home';

// Projects
import CurrencyConverter from './src/projects/currencyConverter';
import TodoList from './src/projects/toDoList';

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
            <View style={{
              justifyContent: 'space-between',
              height: '100%',
            }}
            >
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
              <View>
                <DrawerItem
                  label="Settings"
                  icon={({ color }) => (
                    <MaterialCommunityIcons name="cog-outline" size={24} color={color} />
                  )}
                  style={{
                    marginBottom: 0,
                  }}
                />
                <DrawerItem
                  label="Help"
                  icon={({ color }) => (
                    <MaterialCommunityIcons name="help-circle-outline" size={24} color={color} />
                  )}
                  style={{
                    marginBottom: 10,
                  }}
                />
              </View>
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
                <MaterialCommunityIcons name="format-list-bulleted-type" size={24} color={color} />
              ),
              header: (props) => <Header {...props} />,
            }}
            name="Todo List"
            component={TodoList}
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
          <Drawer.Screen
            options={{
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons name="chat-processing-outline" size={24} color={color} />
              ),
              header: (props) => <Header {...props} />,
            }}
            name="Chat App"
            component={Home}
          />
          <Drawer.Screen
            options={{
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons name="weather-cloudy" size={24} color={color} />
              ),
              header: (props) => <Header {...props} />,
            }}
            name="The Weather"
            component={Home}
          />
          <Drawer.Screen
            options={{
              drawerIcon: ({ color }) => (
                <MaterialCommunityIcons name="pencil-outline" size={24} color={color} />
              ),
              header: (props) => <Header {...props} />,
            }}
            name="Personal Blog"
            component={Home}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
