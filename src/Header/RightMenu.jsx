/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Menu } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function RightMenu() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <View style={{}}>
      <Menu
        contentStyle={{
          paddingVertical: 8,
        }}
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        anchor={(
          <TouchableOpacity onPress={() => setShowMenu(true)}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              style={{ color: 'white' }}
            />
          </TouchableOpacity>
  )}
      >
        <Menu.Item
          titleStyle={{
            fontSize: 12,
          }}
          onPress={() => {}}
          icon={() => (
            <MaterialCommunityIcons
              name="information-outline"
              size={24}
              style={{ color: 'black' }}
            />
          )}
          title="About"
          style={{
            height: 40,
          }}
        />
        <Menu.Item
          titleStyle={{
            fontSize: 12,
          }}
          onPress={() => {}}
          icon={() => (
            <MaterialCommunityIcons
              name="comment-multiple-outline"
              size={24}
              style={{ color: 'black' }}
            />
          )}
          title="FAQ"
          style={{
            height: 40,
          }}
        />
        <Menu.Item
          titleStyle={{
            fontSize: 12,
          }}
          style={{
            height: 40,
          }}
          onPress={() => {}}
          icon={() => (
            <MaterialCommunityIcons
              name="pencil-outline"
              size={24}
              style={{ color: 'black' }}
            />
          )}
          title="Feedback"
        />
      </Menu>
    </View>
  );
}

export default RightMenu;
