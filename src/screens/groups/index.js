import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
} from 'react-native';
import styles from './styles';

export default class GroupsScreen extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Groups Screen
        </Text>
      </View>
    );
  }
}
