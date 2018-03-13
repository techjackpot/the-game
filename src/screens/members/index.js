import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
} from 'react-native';
import styles from './styles';

class MembersScreen extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Members Screen
        </Text>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
  };
}

function mapStateToProps(state) {
  return { 
      globals : state.get('globals')
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MembersScreen);
