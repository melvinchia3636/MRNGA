/* eslint-disable import/no-extraneous-dependencies */
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ref, push, set,
} from 'firebase/database';
import { useList } from 'react-firebase-hooks/database';
import { Avatar } from 'react-native-paper';
import db from '../../firebaseDB';
import { UserDataContext } from '../../../App';

function ChatApp() {
  const [message, setMessage] = useState('');
  const newMessageRef = ref(db, 'messages');
  const [displayMessages] = useList(newMessageRef);
  const { userData } = React.useContext(UserDataContext);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = push(newMessageRef);
      set(newMessage, {
        message: message.trim(),
        user: {
          id: userData.id,
          picture: userData.picture,
          username: userData.name,
        },
        created_at: Date.now(),
      });
      setMessage('');
    }
  };

  return (
    <View style={{
      flex: 1,
      padding: 24,
    }}
    >
      <ScrollView style={{ flex: 1 }}>
        {
        displayMessages.map((e) => (
          <View style={{
            flexDirection: 'row',
            marginVertical: 6,
            alignSelf: userData.id === e.val().user.id ? 'flex-end' : 'flex-start',
          }}
          >
            {userData.id !== e.val().user.id && (
            <Avatar.Image
              source={{ uri: e.val().user.picture }}
              style={{
                backgroundColor: 'white',
                marginRight: 8,
              }}
              size={32}
            />
            )}
            <View
              key={e.val().id}
              style={{
                borderRadius: 16,
                borderBottomRightRadius: userData.id === e.val().user.id ? 6 : 16,
                borderTopLeftRadius: userData.id !== e.val().user.id ? 6 : 16,
                backgroundColor: '#0EA5E9',
                padding: 8,
                paddingHorizontal: 12,
                maxWidth: '50%',
              }}
            >
              <Text style={{
                color: 'white',
              }}
              >
                {e.val().message}
              </Text>
            </View>
            {userData.id === e.val().user.id && (
            <Avatar.Image
              source={{ uri: e.val().user.picture }}
              style={{
                backgroundColor: 'white',
                marginLeft: 8,
                paddingTop: 10,
              }}
              size={32}
            />
            )}
          </View>
        ))
      }
      </ScrollView>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={{ flex: 1 }}
          placeholder="Enter your message here"
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: '#0EA5E9',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            borderRadius: 6,
          }}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ChatApp;
