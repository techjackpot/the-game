import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
} from 'react-native';
import styles from './styles';

class Key4Screen extends React.Component{
  render () {
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} />
        <Text style={styles.welcome}>
          Key4 Screen
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

export default connect(mapStateToProps, mapDispatchToProps)(Key4Screen);
