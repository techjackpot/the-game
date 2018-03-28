import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  View,
  Text
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import moment from 'moment';

import TopMiniHeader from './topminiheader';

import Core4Screen from './core4';
import Key4Screen from './key4';
import StackScreen from './stack';
// import TimelineScreen from './timeline';
// import DashboardScreen from './dashboard';
// import TodayScreen from './today';
// import MovieScreen from './movie';
// import GroupsScreen from './groups';
// import NotificationScreen from './notification';

import Loading from './loading';

import { main as styles, global as gstyles } from '../stylesheets';

import { getUserData } from '../actions/user';
import { getCore4Data } from '../actions/core4';
import { getKey4Data } from '../actions/key4';

// const TodayNav = StackNavigator(
//   {
//     Today: {
//       screen: TodayScreen,
//     },
//   },
//   {
//     initialRouteName: 'Today',
//     navigationOptions: {
//       gesturesEnabled: false
//     },
//     headerMode: 'none',
//   }
// );

// const MovieNav = StackNavigator(
//   {
//     Movie: {
//       screen: MovieScreen,
//     },
//   },
//   {
//     initialRouteName: 'Movie',
//     navigationOptions: {
//       gesturesEnabled: false
//     },
//     headerMode: 'none',
//   }
// );

// const Core4Nav = StackNavigator(
//   {
//     Core4: {
//       screen: Core4Screen,
//     },
//   },
//   {
//     initialRouteName: 'Core4',
//     navigationOptions: {
//       gesturesEnabled: false,
//     },
//     headerMode: 'none',
//   }
// );
// const Key4Nav = StackNavigator(
//   {
//     Key4: {
//       screen: Key4Screen,
//     },
//   },
//   {
//     initialRouteName: 'Key4',
//     navigationOptions: {
//       gesturesEnabled: false
//     },
//     headerMode: 'none',
//   }
// );
// const StackNav = StackNavigator(
//   {
//     Stack: {
//       screen: StackScreen,
//     },
//   },
//   {
//     initialRouteName: 'Stack',
//     navigationOptions: {
//       gesturesEnabled: false
//     },
//     headerMode: 'none',
//   }
// );
// const TimelineNav = StackNavigator(
//   {
//     Timeline: {
//       screen: TimelineScreen,
//     },
//   },
//   {
//     initialRouteName: 'Timeline',
//     navigationOptions: {
//       gesturesEnabled: false
//     },
//     headerMode: 'none',
//   }
// );
// const DashboardNav = StackNavigator(
//   {
//     Dashboard: {
//       screen: DashboardScreen,
//     },
//   },
//   {
//     initialRouteName: 'Dashboard',
//     navigationOptions: {
//       gesturesEnabled: false
//     },
//     headerMode: 'none',
//   }
// );

const GameNav = TabNavigator( 
  {
    Core4: {
      screen: Core4Screen,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => <Text style={[styles.topBarLabel, focused ? styles.activeTabBarLabel : {}, {color: tintColor}]}>CORE4</Text>
      }
    },
    Key4: {
      screen: Key4Screen,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => <Text style={[styles.topBarLabel, focused ? styles.activeTabBarLabel : {}, {color: tintColor}]}>KEY4</Text>
      }
    },
    Stack: {
      screen: StackScreen,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => <Text style={[styles.topBarLabel, focused ? styles.activeTabBarLabel : {}, {color: tintColor}]}>STACK</Text>
      }
    },
    /*Timeline: {
      screen: TimelineScreen,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => <Text style={[styles.topBarLabel, focused ? styles.activeTabBarLabel : {}, {color: tintColor}]}>TIMELINE</Text>
      }
    },
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: {
        tabBarLabel: ({focused, tintColor}) => <Text style={[styles.topBarLabel, focused ? styles.activeTabBarLabel : {}, {color: tintColor}]}>DASHBOARD</Text>
      }
    }*/
  },
  {
    initialRouteName: 'Core4',
    tabBarPosition: 'top',
    animationEnabled: false,
    navigationOptions: {
      gesturesEnabled: false,
    },
    tabBarOptions: {
      showIcon: false,
      iconStyle: {margin: 0, padding: 0, height: 0, maxHeight: 0},
      tabStyle: styles.topBarTab,
      indicatorStyle: styles.topBarIndicator,
      labelStyle: styles.topBarLabel,
      style: styles.topBar,
      activeTintColor: '#ffffff',
      inactiveTintColor: '#4b4b4b',
      upperCaseLabel: false,
      forceInset: {
        bottom: 'never',
      }
    }
  }
);

// const GroupsNav = StackNavigator(
//   {
//     Groups: {
//       screen: GroupsScreen,
//     },
//   },
//   {
//     initialRouteName: 'Groups',
//     navigationOptions: {
//       gesturesEnabled: false
//     },
//     headerMode: 'none',
//   }
// );

// const NotificationNav = StackNavigator(
//   {
//     Notification: {
//       screen: NotificationScreen,
//     },
//   },
//   {
//     initialRouteName: 'Notification',
//     navigationOptions: {
//       gesturesEnabled: false
//     },
//     headerMode: 'none',
//   }
// );

const MainTabNavigator = TabNavigator({
    /*Today: {
      screen: TodayNav,
      navigationOptions: {
        showLabel: false,
        tabBarIcon: ({ tintColor }) => <Image style={styles.bottomIcon} resizeMode={'contain'} source={require('../assets/icons/magazine.png')} />,
        showIcon: true
      },
    },
    Movie: {
      screen: MovieNav,
      navigationOptions: {
        showLabel: false,
        tabBarIcon: ({ tintColor }) => <Image style={styles.bottomIcon} resizeMode={'contain'} source={require('../assets/icons/tv.png')} />,
        showIcon: true
      },
    },*/
    Game: {
      screen: GameNav,
      navigationOptions: {
        showLabel: false,
        tabBarIcon: ({ focused, tintColor }) => <View style={[gstyles.container, styles.gameIconContainer]}><Image style={styles.bottomIcon} resizeMode={'contain'} source={focused ? require('../assets/icons/game-active.png') : require('../assets/icons/game.png')} /></View>,
        showIcon: true
      },
    },
    /*Groups: {
      screen: GroupsNav,
      navigationOptions: {
        showLabel: false,
        tabBarIcon: ({ tintColor }) => <Image style={styles.bottomIcon} resizeMode={'contain'} source={require('../assets/icons/groups.png')} />,
        showIcon: true
      },
    },
    Notification: {
      screen: NotificationNav,
      navigationOptions: {
        showLabel: false,
        tabBarIcon: ({ tintColor }) => <Image style={styles.bottomIcon} resizeMode={'contain'} source={require('../assets/icons/bell.png')} />,
        showIcon: true
      },
    }*/
  }, {
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    initialRouteName: 'Game',
    lazy: false,
    animationEnabled: false,
    tabBarOptions: {
      showLabel: false,
      showIcon: 'true',
      style: {
        backgroundColor: '#131313',
        height: 60,
        position: 'absolute',
        padding: 0,
        margin: 0,
        bottom: 0,
        left: 5,
        right: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      },
      indicatorStyle: {
        height: 0,
      },
      labelStyle: { padding: 0, margin: 0, height: 0, maxHeight: 0, },
      iconStyle: { height: 45, width: 45, padding: 0, margin: 0 },
    }
  }
); 

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {};

    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    if (!this.props.user.uid) {
      this.props.navigation.navigate('Auth');
    } else {
      const weekId = moment().format('Y') + '' + moment().format('WW');
      const dayId = moment().format('Y') + '' + moment().format('MM') + '' + moment().format('DD');
      this.props.getCore4Data({weekId, dayId});
      this.props.getKey4Data({weekId});
    }
  }

  render() {
    const {loading} = this.props;
    return (
      <View style={[gstyles.mainContainer]}>
        { loading && <Loading /> }
        <TopMiniHeader navigation={this.props.navigation} />
        <MainTabNavigator />
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.user || {},
    loading: state.status.loading || false,
  }
};

const mapDispatchToProps = {
  getUserData,
  getCore4Data,
  getKey4Data,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
