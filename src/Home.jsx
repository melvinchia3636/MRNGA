/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import {
  View, Text,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
  cancelAnimation,
  interpolate,
} from 'react-native-reanimated';
import * as Google from 'expo-google-app-auth';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { UserDataContext } from '../App';

export default function Home() {
  const { userData, setUserData } = React.useContext(UserDataContext);

  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '30162995463-ocj9s83ink0nts3a0dk10ec7am1epg7a.apps.googleusercontent.com',
        // iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        setUserData(result.user);
        AsyncStorageLib.setItem('userData', result.user);
      } else {
        console.log('cancelled');
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const signOut = () => {
    setUserData({});
    AsyncStorageLib.setItem('userData', '{}');
  };

  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        { rotate: `${offset.value}deg` },
        {
          scale: interpolate(
            offset.value,
            [0, 360],
            [0, 1],
          ),
        },
      ],
      opacity: interpolate(
        offset.value,
        [0, 360],
        [0, 1],
      ),
    }),
  );

  useEffect(() => {
    offset.value = withRepeat(withTiming(360, {
      duration: 2000,
      easing: Easing.linear,
    }), -1, true);
    return () => cancelAnimation(offset);
  }, []);

  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '95%',
      marginVertical: 20,
    }}
    >
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.7,
      }}
      >
        <Animated.View style={[{
          transformOrigin: 'center',
        }, animatedStyles]}
        >
          <Ionicons name="logo-react" size={248} color="#61dbfb" />
        </Animated.View>
        <Text style={{
          marginTop: 12,
          fontSize: 24,
          color: '#334155',
        }}
        >
          Make
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            textTransform: 'uppercase',
            fontSize: 42,
            letterSpacing: 3,
            fontWeight: 'bold',
            color: '#334155',
          }}
        >
          React Native
        </Text>
        <Text style={{
          marginBottom: 20,
          fontSize: 24,
          color: '#334155',
        }}
        >
          Great Again
        </Text>
      </View>
      <View style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        {userData && JSON.stringify(userData) !== '{}' ? (
          <>
            <Text>
              You&apos;re logged in,
              {' '}
              {userData.name}
              !
            </Text>
            <Button mode="contained" onPress={signOut} color="#0EA5E9" style={{ marginTop: 12, width: '90%', paddingVertical: 6 }} labelStyle={{ fontSize: 16 }}>Log out</Button>
          </>
        ) : (
          <Button mode="contained" onPress={signIn} color="#0EA5E9" style={{ marginTop: 12, width: '90%', paddingVertical: 6 }} labelStyle={{ fontSize: 16 }}>Sign In</Button>
        )}
      </View>
    </View>
  );
}
