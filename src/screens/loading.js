import React from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';

import { loading as styles, global as gstyles } from '../stylesheets';

const Loading = () => (
  <View style={gstyles.container}>
    <ActivityIndicator size="large" color={'#ffffff'} />
  </View>
);

export default Loading;
