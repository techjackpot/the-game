import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import gstyles, { profile as styles } from '../stylesheets';

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
