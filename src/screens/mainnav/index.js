import React, { Component } from 'react';
import {
  Image,
  View,
  Text
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Core4Screen from '../core4';
import Key4Screen from '../key4';
import StackScreen from '../stack';
import TimelineScreen from '../timeline';
import DashboardScreen from '../dashboard';
import ProfileScreen from '../profile';
import TodayScreen from '../today';
import MovieScreen from '../movie';
import GroupsScreen from '../groups';
import NotificationScreen from '../notification';

import TopMiniHeader from '../topminiheader';

// import AuthService from '../services/authservice';

import { connect } from 'react-redux';
import { setTabIndex } from '@actions/globals'

import styles from './styles';

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
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => <Text style={[styles.topBarLabel, focused ? styles.activeTabBarLabel : {}, {color: tintColor}]}>CORE4</Text>
      }
    },
    Key4: {
      screen: Key4Nav,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => <Text style={[styles.topBarLabel, focused ? styles.activeTabBarLabel : {}, {color: tintColor}]}>KEY4</Text>
      }
    },
    Stack: {
      screen: StackNav,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => <Text style={[styles.topBarLabel, focused ? styles.activeTabBarLabel : {}, {color: tintColor}]}>STACK</Text>
      }
    },
    Timeline: {
      screen: TimelineNav,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => <Text style={[styles.topBarLabel, focused ? styles.activeTabBarLabel : {}, {color: tintColor}]}>TIMELINE</Text>
      }
    },
    Dashboard: {
      screen: DashboardNav,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => <Text style={[styles.topBarLabel, focused ? styles.activeTabBarLabel : {}, {color: tintColor}]}>DASHBOARD</Text>
      }
    }
  },
  {
    initialRouteName: 'Core4',
    tabBarPosition: 'top',
    navigationOptions: {
      gesturesEnabled: false,
    },
    tabBarOptions: {
      showIcon: false,
      tabStyle: styles.topBarTab,
      indicatorStyle: styles.topBarIndicator,
      labelStyle: styles.topBarLabel,
      style: styles.topBar,
      activeTintColor: '#ffffff',
      inactiveTintColor: '#4b4b4b',
      upperCaseLabel: false,
    }
  }
);

const GroupsNav = StackNavigator(
  {
    Groups: {
      screen: GroupsScreen,
    },
  },
  {
    initialRouteName: 'Groups',
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
    Today: {
      screen: TodayNav,
      navigationOptions: {
        showLabel: false,
        tabBarIcon: ({ tintColor }) => <Image style={styles.bottomIcon} resizeMode={'contain'} source={require('../../assets/icons/magazine.png')} />,
        showIcon: true
      },
    },
    Movie: {
      screen: MovieNav,
      navigationOptions: {
        showLabel: false,
        tabBarIcon: ({ tintColor }) => <Image style={styles.bottomIcon} resizeMode={'contain'} source={require('../../assets/icons/tv.png')} />,
        showIcon: true
      },
    },
    Game: {
      screen: GameNav,
      navigationOptions: {
        showLabel: false,
        tabBarIcon: ({ tintColor }) => <Image style={styles.bottomIcon} resizeMode={'contain'} source={require('../../assets/icons/game.png')} />,
        showIcon: true
      },
    },
    Groups: {
      screen: GroupsNav,
      navigationOptions: {
        showLabel: false,
        tabBarIcon: ({ tintColor }) => <Image style={styles.bottomIcon} resizeMode={'contain'} source={require('../../assets/icons/groups.png')} />,
        showIcon: true
      },
    },
    Notification: {
      screen: NotificationNav,
      navigationOptions: {
        showLabel: false,
        tabBarIcon: ({ tintColor }) => <Image style={styles.bottomIcon} resizeMode={'contain'} source={require('../../assets/icons/bell.png')} />,
        showIcon: true
      },
    }
  }, {
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    initialRouteName: 'Game',
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#131313'
      },
    }
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