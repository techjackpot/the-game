
import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';

import firebase from 'react-native-firebase';

import WarriorGame from './src';

import { Provider } from 'react-redux';
import configureStore from './src/configureStore';

const store = configureStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <WarriorGame />
      </Provider>
    );
  }
}
