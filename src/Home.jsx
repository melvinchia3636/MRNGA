/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
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
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';
import { UserDataContext } from '../App';

WebBrowser.maybeCompleteAuthSession();

export default function Home() {
  const { userData, setUserData } = React.useContext(UserDataContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '30162995463-sqfpq467ftfikojjv21fd849ns54vqu2.apps.googleusercontent.com',
    iosClientId: '30162995463-sqfpq467ftfikojjv21fd849ns54vqu2.apps.googleusercontent.com',
    androidClientId: '30162995463-sqfpq467ftfikojjv21fd849ns54vqu2.apps.googleusercontent.com',
    webClientId: '30162995463-sqfpq467ftfikojjv21fd849ns54vqu2.apps.googleusercontent.com',
  });
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${authentication.accessToken}`).then((res) => setUserData(res.data));
    }
  }, [response]);

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
        <Button mode="contained" onPress={() => promptAsync()} icon={() => <Ionicons name="logo-google" size={24} color="white" />} color="#0EA5E9" style={{ marginTop: 12, width: '90%', paddingVertical: 6 }} labelStyle={{ fontSize: 16 }}>Sign In with google</Button>
      </View>
    </View>
  );
}
