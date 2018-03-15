import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
} from 'react-native';
import styles from './styles';

export default class Key4Screen extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <Text style={styles.welcome}>
          Key4 Screen
        </Text>
      </View>
    );
  }
}
