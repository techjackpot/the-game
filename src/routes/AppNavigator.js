import React from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import shallowCompare from 'react-addons-shallow-compare';
import { RouteConfigs, StackNavigatorConfig } from './';

export const AppNavigator = StackNavigator(RouteConfigs, StackNavigatorConfig);

export const middleware = createReactNavigationReduxMiddleware(
  "Login",
  state => state.nav,
);
const addListener = createReduxBoundAddListener("Login");

class App extends React.Component {

	render() {
		const {dispatch, nav} = this.props;
		return (
			<AppNavigator
				navigation={addNavigationHelpers({ dispatch, state: nav, addListener })}
			/>
		);
	}
}

const mapStateToProps = state => ({
  nav: state.nav,
});
  
export default connect(mapStateToProps)(App);
