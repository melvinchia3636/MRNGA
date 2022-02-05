/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TextInput, Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  Layout,
  SlideInLeft,
  SlideOutRight,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  FAB,
  Checkbox,
} from 'react-native-paper';
import Swipeout from 'react-native-swipeout';

function Task({
  taskList, setTaskList, onRemove, id, index,
}) {
  const swipeBtns = [{
    component: (
      <Pressable
        onPress={onRemove}
        style={{
          backgroundColor: '#F43F5E',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          flexDirection: 'row',
        }}
      >
        <MaterialCommunityIcons name="delete" size={24} color="white" />
        <Text style={{
          color: 'white',
          marginRight: 4,
        }}
        >
          Delete
        </Text>
      </Pressable>
    ),
    backgroundColor: 'white',
  }];

  return (
    <Animated.View
      entering={SlideInLeft.delay(index * 100)}
      exiting={SlideOutRight}
      layout={Layout}
      style={{
        borderColor: '#E2E8F0',
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        borderWidth: 1,
        width: '100%',
        padding: 10,
        marginVertical: 4,
      }}
    >
      <Swipeout
        right={swipeBtns}
        autoClose={true}
        backgroundColor="transparent"
        buttonWidth={96}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        >
          <TextInput
            style={{
              fontSize: 16,
              paddingHorizontal: 4,
              flex: 0.95,
              textDecorationLine: taskList[id].completed ? 'line-through' : 'none',
              textDecorationStyle: 'solid',
            }}
            contentStyle={{
            }}
            autoFocus={true}
            placeholder="Empty task"
            value={taskList[id].task}
            editable={!taskList[id].completed}
            maxLength={40}
            onChangeText={(e) => {
              const newTaskList = { ...taskList };
              newTaskList[id].task = e;
              setTaskList(newTaskList);
            }}
          />
          <Checkbox
            status={taskList[id].completed ? 'checked' : ''}
            color="#0EA5E9"
            onPress={() => {
              const newTaskList = { ...taskList };
              newTaskList[id].completed = !newTaskList[id].completed;
              setTaskList(newTaskList);
            }}
          />
        </View>
      </Swipeout>
    </Animated.View>
  );
}

export default function Todo() {
  const [taskList, setTaskList] = useState({});

  useEffect(async () => {
    const value = await AsyncStorage.getItem('tasks');
    if (value !== null) {
      setTaskList(JSON.parse(value));
    }
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  const removeTask = (id) => {
    const newTaskList = { ...taskList };
    delete newTaskList[id];
    setTaskList(newTaskList);
  };

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: JSON.stringify(taskList) !== '{}' ? 'space-between' : 'center',
      height: '100%',
      padding: 16,
      backgroundColor: '#FFFFFF',
    }}
    >
      {JSON.stringify(taskList) !== '{}' ? (
        <ScrollView style={[{ width: '100%' }]}>
          {Object.keys(taskList).map((id, index) => (
            <Task
              key={id}
              id={id}
              index={index}
              taskList={taskList}
              setTaskList={setTaskList}
              onRemove={() => removeTask(id)}
            />
          ))}
        </ScrollView>
      ) : (
        <Text style={{
          color: '#CBD5E1',
          fontSize: 20,
        }}
        >
          No task available.
        </Text>
      )}
      <FAB
        style={{
          position: 'absolute',
          margin: 20,
          right: 0,
          bottom: 0,
          backgroundColor: '#0EA5E9',
          padding: 6,
          borderRadius: 100,
        }}
        icon={() => <MaterialCommunityIcons name="plus" color="white" size={32} style={{ margin: -5 }} />}
        color="white"
        uppercase={false}
        onPress={() => {
          const newTaskList = {};
          newTaskList[Date.now()] = { task: '', completed: false, id: Date.now() };
          setTaskList({ ...newTaskList, ...taskList });
        }}
      />
    </View>
  );
}
