/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue, useAnimatedStyle, withTiming, Easing, withRepeat, cancelAnimation,
} from 'react-native-reanimated';
import { useEffect } from 'react/cjs/react.development';

export default function Home() {
  const offset = useSharedValue('0deg');
  const animatedStyles = useAnimatedStyle(
    () => ({ transform: [{ rotate: offset.value }] }),
  );
  useEffect(() => {
    offset.value = withRepeat(
      withTiming(360, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
    );
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
          <Ionicons name="logo-react" size={196} color="#61dbfb" />
        </Animated.View>
        <Text style={{
          marginTop: 12,
          fontSize: 16,
          color: '#334155',
        }}
        >
          Make
        </Text>
        <Text style={{
          textTransform: 'uppercase',
          fontSize: 28,
          letterSpacing: 3,
          fontWeight: 'bold',
          color: '#334155',
        }}
        >
          React Native
        </Text>
        <Text style={{
          marginBottom: 20,
          fontSize: 16,
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
        <Button mode="contained" color="#0EA5E9" style={{ marginTop: 12, width: '90%' }}>Sign In</Button>
        <Button color="#334155" style={{ marginTop: 12 }} labelStyle={{ fontSize: 10 }}>Create Account</Button>
      </View>
    </View>
  );
}
