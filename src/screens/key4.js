import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BoxShadow} from 'react-native-shadow';
import moment from 'moment';

import { key4 as styles, global as gstyles } from '../stylesheets';

import { getKey4Data, updateKey4Data } from '../actions/key4';

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

class OneDoorAvatar extends React.Component {
  render() {
    const {source, door} = this.props;
    const image = source ? {uri: source} : require('../assets/images/key4/door.jpg');
    return (
      <View style={[gstyles.container, styles.key4Avatar, door ? styles.key4AvatarOnBorder : {}]}>

        {/*<BoxShadow setting={{
            width:160,
            height:170,
            color:"#f00",
            border:8,
            radius:10,
            opacity:0.5,
            x:0,
            y:3,
            style:{marginVertical:5}
        }}>*/}
          <View style={[gstyles.container, styles.key4AvatarImageWrapper, !door ? styles.key4AvatarImageOffStatus : {}]}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.updateKey(!door)}>
              <FastImage style={[styles.image, styles.key4AvatarImage]} source={image} />
            </TouchableOpacity>
          </View>
        {/*</BoxShadow>*/}
      </View>
    );
  }
}

class Key4ScoresPanel extends React.Component {
  render() {
    const {key4} = this.props;
    const doorScore = key4.door.complete?1:0;
    const keyScore = Object.keys(key4).reduce((s, key) => s + (key4[key].complete?1:0), 0) - doorScore;
    return (
      <View style={[gstyles.container, gstyles.flexRow, styles.scoresContainer]}>
        <View style={[gstyles.container, gstyles.flexColumn, styles.scoreWidget]}>
          <View style={[gstyles.container, gstyles.flexRow, styles.limitScoreText]}>
            <Text style={styles.scoreText}>{doorScore}</Text>
            <Text style={[styles.scoreText, styles.maxScoreLabel]}>/1</Text>
          </View>
          <Text style={styles.scoreLabelText}>DOOR</Text>
        </View>
        <View style={[gstyles.container, gstyles.flexColumn, styles.scoreWidget]}>
          <View style={[gstyles.container, gstyles.flexRow, styles.limitScoreText]}>
            <Text style={styles.scoreText}>{keyScore}</Text>
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
  render() {
    const {key4} = this.props;
    return (
      <View style={[gstyles.container, styles.key4ItemsContainer, gstyles.flexRow]}>
        {
          Object.entries(key4).filter(([key]) => key!=='door').map(([key, item]) =>
            <TouchableOpacity style={styles.key4Item} activeOpacity={0.9} key={key} onPress={() => this.props.updateKey(key, !item.complete)}>
              {
                item.complete && <FastImage style={styles.keyDone} resizeMode={'stretch'} source={require('../assets/images/key4/active-line.png')} />
              }
              <View style={[gstyles.container, gstyles.flexRow, styles.key4ItemWrapper]}>
                <FastImage style={styles.keyImage} source={require('../assets/images/key4/key-active.png')} />
                <View style={[gstyles.container, styles.keyInfo]}>
                  <Text style={[styles.keyTitle]}>{item.target || key.toUpperCase()}</Text>
                  <Text style={[styles.keyLabel]}>{(item.key + '-' + (item.completedDate ? moment(item.completedDate) : moment()).format('dddd')).toUpperCase()}</Text>
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
    const data = {
      door: {
        complete: door,
        completedD
      }
    };
    data['door']
    this.setState({score: {...this.state.score, door}});
  }

  updateKey(key, complete) {
    const data = {};
    data[key] = {
      key,
      complete,
      completedDate: moment().format('Y') + '-' + moment().format('MM') + '-' + moment().format('DD'),
      weekday: moment().isoWeekday(),
    };

    this.props.updateKey4Data({
      weekId: moment().format('Y') + '' + moment().format('WW')
    }, data)
  }

  render() {
    const {key4} = this.props;
    const {score} = this.state;
    return (
      <View style={[gstyles.container, styles.key4statesContainer]}>
        <View style={[gstyles.container, gstyles.flexColumn, styles.topContainer]}>
          <Text style={[styles.title]}>{key4.door.target || 'Get The Main Thing Done Here'}</Text>
          <Text style={[styles.subCaption]}>{'One Door'.toUpperCase()}</Text>
        </View>
        <View style={[gstyles.container, styles.key4AvatarContainer]}>
          <OneDoorAvatar source={key4.door && key4.door.image || ''} door={key4.door && key4.door.complete || false} updateKey={(complete) => this.updateKey('door', complete)} />
        </View>
        <View style={[gstyles.container, styles.middleContainer]}>
          <Key4ScoresPanel key4={key4} />
        </View>
        <ScrollView>
          <View style={gstyles.container}>
            <Key4ItemsPanel key4={key4} updateKey={(key, complete) => this.updateKey(key, complete)} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

class Key4Screen extends React.Component{

  componentDidMount() {
    const weekId = moment().format('Y') + '' + moment().format('WW');
    this.props.getKey4Data({weekId});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.challenge.id !== nextProps.challenge.id && nextProps.challenge.id) {
      const weekId = moment().format('Y') + '' + moment().format('WW');
      this.props.getKey4Data({weekId});
    }
  }

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
  key4: state.key4 || {},
  challenge: state.user && state.user.challenge && state.user.challenge || '',
});

const mapDispatchToProps = {
  getKey4Data,
  updateKey4Data,
};

export default connect(mapStateToProps, mapDispatchToProps)(Key4Screen);
