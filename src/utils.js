/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  View, Pressable, Text, StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getHeaderTitle } from '@react-navigation/elements';

export default function Header({
  navigation, route, options, color,
}) {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: color,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
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
          fontSize: 16,
          marginLeft: 12,
        }}
      >
        {getHeaderTitle(options, route.name)}
      </Text>
      <StatusBar />
    </View>
  );
}
