import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import gstyles, { groups as styles } from '../stylesheets';

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
