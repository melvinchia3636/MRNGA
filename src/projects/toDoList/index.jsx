/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Pressable, View, Text, ScrollView,
} from 'react-native';
import Animated, {
  Layout,
  SlideInLeft,
  SlideOutRight,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Button, FAB, Snackbar, TextInput,
} from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

const styles = {
  taskView: {
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    width: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  listView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  bottomRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
  },
  textInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
};

function Task({ name, onRemove }) {
  return (
    <Animated.View
      entering={SlideInLeft}
      exiting={SlideOutRight}
      layout={Layout}
      style={[styles.taskView]}
    >
      <Text
        style={{
          fontSize: 16,
        }}
      >
        {name}
      </Text>
      <Pressable
        style={{
          padding: 10,
          borderRadius: 4,
        }}
        onPress={onRemove}
      >
        <MaterialCommunityIcons name="minus" color="#EF4444" size={16} />
      </Pressable>
    </Animated.View>
  );
}

function ToDoIndex({ navigation }) {
  const [inputValue, setInputValue] = useState('');
  const [taskList, setParticipantList] = useState([]);
  const [snackVisible, setSnackVisible] = useState(false);

  const addParticipant = () => {
    setParticipantList(
      [{ name: inputValue, id: Date.now().toString() }].concat(taskList),
    );
    setInputValue('');
  };

  const removeParticipant = (id) => {
    setParticipantList(
      taskList.filter((participant) => participant.id !== id),
    );
  };

  return (
    <View style={[styles.listView]}>
      {Boolean(taskList.length)
        && (
        <ScrollView style={[{ width: '100%' }]}>
          {taskList.map((task) => (
            <Task
              key={task.id}
              name={task.name}
              onRemove={() => removeParticipant(task.id)}
            />
          ))}
        </ScrollView>
        )}
      <FAB
        style={{
          position: 'absolute',
          margin: 20,
          right: 0,
          bottom: 0,
          backgroundColor: '#0EA5E9',
          padding: 8,
          borderRadius: 100,
        }}
        icon={() => <MaterialCommunityIcons name="plus" color="white" size={32} style={{ margin: -4 }} />}
        color="white"
        uppercase={false}
        onPress={() => navigation.navigate('create', { setSnackVisible })}
      />
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        action={{
          label: <Text style={{ color: '#0EA5E9' }}>OK</Text>,
          onPress: () => {
            // Do something
          },
        }}
        style={{
          zIndex: 9999,
          padding: 6,
          fontSize: 12,
          backgroundColor: 'white',
          bottom: 16
        }}
      >
        <Text style={{ color: '#334155' }}>Task added successfully.</Text>
      </Snackbar>
    </View>
  );
}

function CreateTodo({ navigation, ...props }) {
  return (
    <View style={{ padding: 20, justifyContent: 'space-between', height: '100%' }}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="pencil" size={28} color="#334155" />
          <Text style={{ marginLeft: 12, color: '#334155' }}>Add New Task</Text>
        </View>
        <TextInput
          label={<Text style={{ fontSize: 12 }}>Task Name</Text>}
          selectionColor="#0EA5E9"
          activeUnderlineColor="#0EA5E9"
          style={{
            marginTop: 24,
            fontSize: 14,
            height: 76,
            backgroundColor: '#F1F5F9',
          }}
        />
        <TextInput
          label={<Text style={{ fontSize: 12 }}>Task Description</Text>}
          selectionColor="#0EA5E9"
          activeUnderlineColor="#0EA5E9"
          style={{
            marginTop: 16,
            fontSize: 14,
            height: 76,
            backgroundColor: '#F1F5F9',
          }}
        />
      </View>
      <View>
        <Button
          mode="contained"
          color="#0EA5E9"
          icon={() => <MaterialCommunityIcons name="plus" size={26} color="white" />}
          labelStyle={{ fontSize: 12, fontWeight: 'bold' }}
          style={{ paddingVertical: 8 }}
          onPress={() => {
            navigation.goBack();
            props.route.params.setSnackVisible(true);
          }}
        >
          Add Task
        </Button>
        <Button
          color="#334155"
          labelStyle={{ fontSize: 12, fontWeight: 'bold' }}
          style={{ paddingVertical: 8, marginTop: 8 }}
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function Todo() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="index" component={ToDoIndex} />
      <Stack.Screen options={{ presentation: 'modal' }} name="create" component={CreateTodo} />
    </Stack.Navigator>
  );
}
