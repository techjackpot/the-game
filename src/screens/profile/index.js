import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
} from 'react-native';
import styles from './styles';

export default class ProfileScreen extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Profile Screen
        </Text>
      </View>
    );
  }
}
