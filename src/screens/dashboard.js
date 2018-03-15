import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import gstyles, { dashboard as styles } from '../stylesheets';

export default class DashboardScreen extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Dashboard Screen
        </Text>
      </View>
    );
  }
}
