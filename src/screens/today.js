import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import gstyles, { today as styles } from '../stylesheets';

export default class TodayScreen extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Today Screen
        </Text>
      </View>
    );
  }
}
