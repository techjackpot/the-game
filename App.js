import React from 'react';
import Root from './src/index';
import configureStore from './src/store/index';
// import StackScreen from './src/screens/stack';

const { persistor, store } = configureStore();

export default function App() {
  return <Root store={store} persistor={persistor} />;
}

// export default function App() {
// 	return <StackScreen />;
// }
