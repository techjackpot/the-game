import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import gstyles, { stack as styles } from '../stylesheets';

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
