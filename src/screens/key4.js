import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import moment from 'moment';

import { key4 as styles, global as gstyles } from '../stylesheets';

import { getUserData } from '../actions/user';

class WeekNavigator extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      weekId: moment().week(),
    };
  }

  gotoPrevWeek() {
    this.setState({weekId: this.state.weekId - 1});
  }
  gotoNextWeek() {
    this.setState({weekId: this.state.weekId + 1});
  }

  render() {
    const {weekId} = this.state;
    return (
      <View style={[gstyles.container, gstyles.flexRow, styles.weekNavigatorContainer]}>
        <TouchableOpacity onPress={() => this.gotoPrevWeek()}>
          <Text style={[styles.weekText, styles.weekNavButton]}>&lt;</Text>
        </TouchableOpacity>
        <Text style={[styles.weekText, styles.weekLabel]}>{moment().week(weekId).startOf('week').format('MMM Do')} - {moment().week(weekId).endOf('week').format('MMM Do')}</Text>
        <TouchableOpacity onPress={() => this.gotoNextWeek()}>
          <Text style={[styles.weekText, styles.weekNavButton]}>&gt;</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Avatar extends React.Component {
  render() {
    const {source, door} = this.props;
    return (
      <View style={[gstyles.container, styles.key4Avatar]}>
        <View style={[gstyles.container, styles.key4AvatarImageWrapper, door === 0 ? styles.key4AvatarImageOffStatus : {}]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.updateDoor((door+1)%2)}>
            <Image style={[styles.image, styles.key4AvatarImage]} source={{uri: source}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class Key4ScoresPanel extends React.Component {
  render() {
    const {score} = this.props;
    return (
      <View style={[gstyles.container, gstyles.flexRow, styles.scoresContainer]}>
        <View style={[gstyles.container, gstyles.flexColumn, styles.scoreWidget]}>
          <View style={[gstyles.container, gstyles.flexRow, styles.limitScoreText]}>
            <Text style={styles.scoreText}>{score.door}</Text>
            <Text style={[styles.scoreText, styles.maxScoreLabel]}>/1</Text>
          </View>
          <Text style={styles.scoreLabelText}>DOOR</Text>
        </View>
        <View style={[gstyles.container, gstyles.flexColumn, styles.scoreWidget]}>
          <View style={[gstyles.container, gstyles.flexRow, styles.limitScoreText]}>
            <Text style={styles.scoreText}>{score.keys}</Text>
            <Text style={[styles.scoreText, styles.maxScoreLabel]}>/4</Text>
          </View>
          <Text style={styles.scoreLabelText}>KEYS</Text>
        </View>
        {/*<View style={[gstyles.container, gstyles.flexColumn, styles.scoreWidget]}>
          <Text style={styles.scoreText}>{score.zone}</Text>
          <Text style={styles.scoreLabelText}>ZONE</Text>
        </View>
        <View style={[gstyles.container, gstyles.flexColumn, styles.scoreWidget]}>
          <Text style={styles.scoreText}>{score.power}</Text>
          <Text style={styles.scoreLabelText}>POWER</Text>
        </View>*/}
      </View>
    );
  }
}

class Key4ItemsPanel extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      items: {
        key1: {
          key: 'Key 1',
          name: 'Monday',
          title: 'Get the new app done',
          done: true,
        },
        key2: {
          key: 'Key 2',
          name: 'Tuesday',
          title: 'Code up the InVision app',
          done: true,
        },
        key3: {
          key: 'Key 3',
          name: 'Wednesday',
          title: 'Team Meeting',
          done: false,
        },
        key4: {
          key: 'Key 4',
          name: 'Saturday',
          title: 'What can we do?',
          done: false,
        },
      },
    };

    this.updateKeys(this.state.items);
  }

  updateKeys(items) {
    this.props.updateKeys(Object.entries(items).reduce((c, [key,{done}]) => c + (!!done?1:0), 0));
  }

  toggleStatus = (key) => {
    const {items} = this.state;
    items[key].done = !items[key].done;
    this.setState({items});

    this.updateKeys(items);
  }

  render() {
    const {items} = this.state;
    return (
      <View style={[gstyles.container, styles.key4ItemsContainer, gstyles.flexRow]}>
        {
          Object.entries(items).map(([key, item]) => 
            <TouchableOpacity style={styles.key4Item} activeOpacity={0.9} key={key} onPress={() => this.toggleStatus(key)}>
              {
                item.done && <Image style={styles.keyDone} resizeMode={'stretch'} source={require('../assets/images/key4/active-line.png')} />
              }
              <View style={[gstyles.container, gstyles.flexRow, styles.key4ItemWrapper]}>
                <Image style={styles.keyImage} source={require('../assets/images/key4/key-active.png')} />
                <View style={[gstyles.container, styles.keyInfo]}>
                  <Text style={[styles.keyTitle]}>{item.title}</Text>
                  <Text style={[styles.keyLabel]}>{(item.key + '-' + item.name).toUpperCase()}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    );
  }
}

class Key4States extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: {
        door: 1,
        keys: 3,
        zone: 3,
        power: 2,
      },
    };
  }

  updateDoor(door) {
    this.setState({score: {...this.state.score, door}});
  }

  updateKeys(keys) {
    this.setState({score: {...this.state.score, keys}});
  }

  render() {
    const {user} = this.props;
    const {score} = this.state;
    return (
      <View style={[gstyles.container, styles.key4statesContainer]}>
        <View style={[gstyles.container, gstyles.flexColumn, styles.topContainer]}>
          <Text style={[styles.title]}>Get The Main Thing Done Here</Text>
          <Text style={[styles.subCaption]}>{'One Door'.toUpperCase()}</Text>
        </View>
        <View style={[gstyles.container, styles.middleContainer]}>
          <View style={[gstyles.container, styles.key4AvatarContainer]}>
            <Avatar source={user.doorImage || ''} door={score.door} updateDoor={(door) => this.updateDoor(door)} />
          </View>
          <Key4ScoresPanel score={score}/>
        </View>
        <ScrollView>
          <View style={gstyles.container}>
            <Key4ItemsPanel updateKeys={(keys) => this.updateKeys(keys)} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

class Key4Screen extends React.Component{
  render () {
    return (
      <View style={[gstyles.container, gstyles.gameContainer, gstyles.key4Container]}>
        {/*<WeekNavigator />*/}
        <Key4States {...this.props}/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user || {},
});

const mapDispatchToProps = {
  getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Key4Screen);
