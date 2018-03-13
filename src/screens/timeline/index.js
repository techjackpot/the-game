import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
} from 'react-native';
import styles from './styles';

class TimelineScreen extends React.Component{
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

export default connect(mapStateToProps, mapDispatchToProps)(TimelineScreen);
