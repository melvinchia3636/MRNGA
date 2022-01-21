/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  View, Pressable, Text, StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getHeaderTitle } from '@react-navigation/elements';
import RightMenu from './RightMenu';

export default function Header({
  navigation, route, options,
}) {
  return (
    <>
      <View
        style={{
          height: 60,
          backgroundColor: '#0EA5E9',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}
      >
        <View style={{
          backgroundColor: '#0EA5E9',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        >
          <Pressable
            onPress={navigation.toggleDrawer}
            title="Info"
          >
            <MaterialCommunityIcons name="menu" size={28} color="white" />
          </Pressable>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              marginLeft: 32,
            }}
          >
            {getHeaderTitle(options, route.name)}
          </Text>
        </View>
        <RightMenu />
      </View>
      <StatusBar backgroundColor="#0284C7" />
    </>
  );
}
