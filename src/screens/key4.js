import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import gstyles, { key4 as styles } from '../stylesheets';

export default class Key4Screen extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Key4 Screen
        </Text>
      </View>
    );
  }
}
