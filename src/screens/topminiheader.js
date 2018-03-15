import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import gstyles, { topminiheader as styles } from '../stylesheets';

import { logout, getUserData } from '../actions/user';

class TopMiniHeader extends React.Component{

  componentDidMount = () => this.props.getUserData();

  handleLogout() {
    console.log(this.state);
    console.log(this.props);
    this.props.userLogout()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(e => console.log(e));
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
  userLogout: logout,
  getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMiniHeader);
