/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-cycle */
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
  const [groupedMessages, setGroupedMessages] = useState([]);
  const { userData } = React.useContext(UserDataContext);
  const scrollViewRef = React.useRef();

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = push(newMessageRef);
      set(newMessage, {
        message: message.trim(),
        user: {
          email: userData.email,
          picture: userData.picture,
          username: userData.name,
        },
        created_at: Date.now(),
      });
      setMessage('');
    }
  };

  React.useEffect(() => {
    const messages = [];
    if (displayMessages.length) {
      for (let msg of displayMessages) {
        console.log(msg);
        msg = msg.val();
        if (msg.user.email === messages[messages.length - 1]?.user.email) {
          messages[messages.length - 1].message.push(msg.message);
        } else {
          msg.message = [msg.message];
          messages.push(msg);
        }
      }
      setGroupedMessages(messages);
      console.log(messages);
    }
  }, [displayMessages]);

  return (
    <View style={{
      flex: 1,
      padding: 16,
      paddingTop: 0,
    }}
    >
      <ScrollView
        style={{ flex: 1 }}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {
        groupedMessages.map((e) => (
          <View style={{
            flexDirection: userData.email === e.user.email ? 'row-reverse' : 'row',
            marginVertical: 8,
            alignItems: 'flex-end',
            alignSelf: userData.email === e.user.email ? 'flex-end' : 'flex-start',
          }}
          >
            <Avatar.Image
              source={{ uri: e.user.picture }}
              style={{
                backgroundColor: 'white',
                marginHorizontal: 8,
              }}
              size={32}
            />
            <View
              style={{ maxWidth: '50%', marginVertical: -2 }}
            >
              {e.message.map((msg) => (
                <View style={{
                  alignSelf: userData.email !== e.user.email ? 'flex-start' : 'flex-end',
                  borderRadius: 16,
                  borderBottomRightRadius: userData.email === e.user.email ? 6 : 16,
                  borderTopLeftRadius: userData.email !== e.user.email ? 6 : 16,
                  backgroundColor: '#0EA5E9',
                  padding: 8,
                  marginVertical: 2,
                  paddingHorizontal: 12,
                }}
                >
                  <Text
                    style={{
                      color: 'white',
                    }}
                  >
                    {msg}
                  </Text>
                </View>
              ))}

            </View>
          </View>
        ))
      }
      </ScrollView>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
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
