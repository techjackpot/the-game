import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import gstyles, { movie as styles } from '../stylesheets';

export default class MovieScreen extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Movie Screen
        </Text>
      </View>
    );
  }
}
