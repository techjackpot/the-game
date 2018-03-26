import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableHighlight,
  StatusBar,
  Image,
  Modal,
} from 'react-native';
import moment from 'moment';

import { topminiheader as styles, global as gstyles } from '../stylesheets';

import { logout, getUserData } from '../actions/user';

import ProfileScreen from './profile';

class TopMiniHeader extends React.Component{

  state = {
    profileVisible: false,
  };

  setProfileVisible(visible) {
    this.setState({profileVisible: visible});
  }

  handleLogout() {
    this.setProfileVisible(false);
    this.props.userLogout()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(e => console.log(e));
  }

  hideProfileModal() {
    this.setProfileVisible(!this.state.profileVisible);
  }

  render () {
    const {user} = this.props;
    return (
      <View style={[gstyles.container, gstyles.flexRow, gstyles.topNavContainer, styles.wrapper]}>
        <StatusBar hidden={true} />
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.profileVisible}
          style={styles.container}
          onRequestClose={() => {}}
        >
          <ProfileScreen handleLogout={() => this.handleLogout()} hideProfileModal={() => this.hideProfileModal()} />
        </Modal>
        <View style={styles.panel}>
          <Text style={styles.date}>{moment().format('dddd, MMMM Do').toUpperCase()}</Text>
          <Text style={styles.title}>The Game</Text>
        </View>
        <View style={styles.panel}>
          <TouchableHighlight onPress={() => this.setProfileVisible(true)}>
            <Image source={ user.photoURL ? { uri: user.photoURL } : require('../assets/images/avatars/profile.jpg')} style={styles.avatar} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user || {},
});

const mapDispatchToProps = {
  userLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMiniHeader);
