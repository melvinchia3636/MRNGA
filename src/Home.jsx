/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import {
  View, Text, Alert,
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
import jwtDecode from 'jwt-decode';
import * as AuthSession from 'expo-auth-session';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { UserDataContext } from '../App';

const auth0ClientId = 'mlBB7azm9BaD8GSRkPnTSy03Z71wX7zy';
const auth0Domain = 'https://dev-uj9e-526.us.auth0.com';

function toQueryString(params) {
  return `?${Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')}`;
}

export default function Home() {
  const { userData, setUserData } = React.useContext(UserDataContext);

  const handleResponse = (response) => {
    if (response.error) {
      Alert('Authentication error', response.error_description || 'something went wrong');
      return;
    }

    const jwtToken = response.id_token;
    const decoded = jwtDecode(jwtToken);

    const data = decoded;
    setUserData(data);
    AsyncStorageLib.setItem('userData', JSON.stringify(data));
  };

  const login = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();

    const queryParams = toQueryString({
      client_id: auth0ClientId,
      redirect_uri: redirectUrl,
      response_type: 'id_token',
      scope: 'openid profile email',
      nonce: 'nonce',
    });
    const authUrl = `${auth0Domain}/authorize${queryParams}`;
    const response = await AuthSession.startAsync({ authUrl });

    if (response.type === 'success') {
      handleResponse(response.params);
    }
  };

  const logout = async () => {
    const returnUrl = 'com.mrnga://dev-uj9e-526.us.auth0.com/android/com.mrnga/callback';

    await WebBrowser.openBrowserAsync(
      `${auth0Domain}/v2/logout?client_id=${auth0ClientId}&returnTo=${returnUrl}`,
    );

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
            <Button mode="contained" onPress={logout} color="#0EA5E9" style={{ marginTop: 12, width: '90%', paddingVertical: 6 }} labelStyle={{ fontSize: 16 }}>Log out</Button>
          </>
        ) : (
          <Button mode="contained" onPress={login} color="#0EA5E9" style={{ marginTop: 12, width: '90%', paddingVertical: 6 }} labelStyle={{ fontSize: 16 }}>Sign In</Button>
        )}
      </View>
    </View>
  );
}
