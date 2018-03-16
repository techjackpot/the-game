import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import gstyles, { profile as styles } from '../stylesheets';

import { logout, getUserData } from '../actions/user';

class ProfileScreen extends React.Component{

  componentDidMount = () => this.props.getUserData();

  handleLogout() {
    this.props.handleLogout();
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.handleLogout()}>
          <Text style={styles.welcome}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user || {},
});

const mapDispatchToProps = {
  getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
