/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { View, Button, Text } from 'react-native';
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
      justifyContent: 'center',
      height: '100%',
    }}
    >
      <Animated.View style={[{
        transformOrigin: 'center',
      }, animatedStyles]}
      >
        <Ionicons name="logo-react" size={156} color="#61dbfb" />
      </Animated.View>
      <Text style={{
        marginTop: 12,
        marginBottom: 20,
        fontSize: 18,
      }}
      >
        Make React Native Great Again
      </Text>
    </View>
  );
}
