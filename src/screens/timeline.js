import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import gstyles, { timeline as styles } from '../stylesheets';

export default class TimelineScreen extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Timeline Screen
        </Text>
      </View>
    );
  }
}
