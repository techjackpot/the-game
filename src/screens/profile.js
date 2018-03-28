import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import gstyles, { profile as styles } from '../stylesheets';

export default class ProfileScreen extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.handleLogout()}>
          <Text style={styles.welcome}>
            Log out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.hideProfileModal()}>
          <Text style={styles.welcome}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
