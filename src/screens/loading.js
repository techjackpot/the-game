import React from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';

import gstyles, { loading as styles } from '../stylesheets';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={'#ffffff'} />
  </View>
);

export default Loading;
