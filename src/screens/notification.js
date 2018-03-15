import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import gstyles, { notification as styles } from '../stylesheets';

export default class NotificationScreen extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Notification Screen
        </Text>
      </View>
    );
  }
}
