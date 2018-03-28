import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { global as gstyles } from '../stylesheets';
import { NavigationActions } from 'react-navigation';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const isLoggedIn = !!this.props.user.uid;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this._navigateTo(isLoggedIn ? 'Main' : 'Login');
  };


  _navigateTo = (routeName: string) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={gstyles.container}>
        <ActivityIndicator />
        <StatusBar hidden={true} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user || {}
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);

