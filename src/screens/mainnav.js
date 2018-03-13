import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Core4Screen from './core4';
import Key4Screen from './key4';
import StackScreen from './stack';
import TimelineScreen from './timeline';
import DashboardScreen from './dashboard';
import ProfileScreen from './profile';
import TodayScreen from './today';
import MovieScreen from './movie';
import MembersScreen from './members';
import NotificationScreen from './notification';

import TopMiniHeader from './topminiheader';

// import AuthService from '../services/authservice';

import { connect } from 'react-redux';
import { setTabIndex } from '@actions/globals'

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

const TodayNav = StackNavigator(
  {
    Today: {
      screen: TodayScreen,
    },
  },
  {
    initialRouteName: 'Today',
    navigationOptions: {
      gesturesEnabled: false
    },
    headerMode: 'none',
  }
);

const MovieNav = StackNavigator(
  {
    Movie: {
      screen: MovieScreen,
    },
  },
  {
    initialRouteName: 'Movie',
    navigationOptions: {
      gesturesEnabled: false
    },
    headerMode: 'none',
  }
);

const Core4Nav = StackNavigator(
  {
    Core4: {
      screen: Core4Screen,
    },
  },
  {
    initialRouteName: 'Core4',
    navigationOptions: {
      gesturesEnabled: false,
    },
    headerMode: 'none',
  }
);
const Key4Nav = StackNavigator(
  {
    Key4: {
      screen: Key4Screen,
    },
  },
  {
    initialRouteName: 'Key4',
    navigationOptions: {
      gesturesEnabled: false
    },
    headerMode: 'none',
  }
);
const StackNav = StackNavigator(
  {
    Stack: {
      screen: StackScreen,
    },
  },
  {
    initialRouteName: 'Stack',
    navigationOptions: {
      gesturesEnabled: false
    },
    headerMode: 'none',
  }
);
const TimelineNav = StackNavigator(
  {
    Timeline: {
      screen: TimelineScreen,
    },
  },
  {
    initialRouteName: 'Timeline',
    navigationOptions: {
      gesturesEnabled: false
    },
    headerMode: 'none',
  }
);
const DashboardNav = StackNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
    },
  },
  {
    initialRouteName: 'Dashboard',
    navigationOptions: {
      gesturesEnabled: false
    },
    headerMode: 'none',
  }
);

const GameNav = TabNavigator( 
  {
    Core4: {
      screen: Core4Nav,
    },
    Key4: {
      screen: Key4Nav,
    },
    Stack: {
      screen: StackNav,
    },
    Timeline: {
      screen: TimelineNav,
    },
    Dashboard: {
      screen: DashboardNav,
    }
  },
  {
    initialRouteName: 'Core4',
    tabBarPosition: 'top',
    navigationOptions: {
      gesturesEnabled: false
    },
    tabBarOptions: {
      showIcon: false
    }
  }
);

const MembersNav = StackNavigator(
  {
    Members: {
      screen: MembersScreen,
    },
  },
  {
    initialRouteName: 'Members',
    navigationOptions: {
      gesturesEnabled: false
    },
    headerMode: 'none',
  }
);

const NotificationNav = StackNavigator(
  {
    Notification: {
      screen: NotificationScreen,
    },
  },
  {
    initialRouteName: 'Notification',
    navigationOptions: {
      gesturesEnabled: false
    },
    headerMode: 'none',
  }
);

const MainTabNavigator = TabNavigator({
    Today: { screen: TodayNav },
    Movie: { screen: MovieNav },
    Game: { screen: GameNav },
    Members: { screen: MembersNav},
    Notification: { screen: NotificationNav}
  }, {
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    initialRouteName: 'Game',
  }
); 

class MainNavScreen extends React.Component {

  constructor(props)
  {
    super(props);
  }
  
  componentDidMount() {
  }

  _onNav = (prevState, nextState) => {
    this.props.setTabIndex(nextState.index);
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: 'black'}}>
        <TopMiniHeader />
        <MainTabNavigator style={{backgroundColor: 'black'}} onNavigationStateChange={this._onNav}/>
      </View>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
      setTabIndex: value => dispatch(setTabIndex(value))
  };
}

function mapStateToProps(state) {
  return { 
      globals : state.get('globals'),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavScreen);