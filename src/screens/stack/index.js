import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
} from 'react-native';
import styles from './styles';

export default class StackScreen extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Stack Screen
        </Text>
      </View>
    );
  }
}
