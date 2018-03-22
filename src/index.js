import React from 'react';
import { StatusBar, Platform, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import EStyleSheet from 'react-native-extended-stylesheet';

import AppWithNavigationState from './routes/AppNavigator';
import Loading from './screens/loading';

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === 'android') StatusBar.setHidden(true);


EStyleSheet.build({
  $bgMain: '#121212'
});


const Root = ({ store, persistor }) => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loading />}
        persistor={persistor}
      >
        <AppWithNavigationState />
      </PersistGate>
    </Provider>
  )
};

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
};

export default Root;
