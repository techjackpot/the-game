import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

const About = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={'#ffffff'} />
  </View>
);

export default About;
