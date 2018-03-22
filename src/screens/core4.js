import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import moment from 'moment';

import { core4 as styles, global as gstyles } from '../stylesheets';

import { getCore4Data, updateCore4Data } from '../actions/core4';

const elitesAssets = {
  fitness: {
    background: require('../assets/images/core4/fitness.jpg'),
    icon: require('../assets/images/core4/icons/body.png')
  },
  fuel: {
    background: require('../assets/images/core4/fuel.jpg'),
    icon: require('../assets/images/core4/icons/body.png')
  },
  meditation: {
    background: require('../assets/images/core4/meditation.jpg'),
    icon: require('../assets/images/core4/icons/being.png')
  },
  memoirs: {
    background: require('../assets/images/core4/memoirs.jpg'),
    icon: require('../assets/images/core4/icons/being.png')
  },
  partner: {
    background: require('../assets/images/core4/partner.jpg'),
    icon: require('../assets/images/core4/icons/balance.png')
  },
  posterity: {
    background: require('../assets/images/core4/posterity.jpg'),
    icon: require('../assets/images/core4/icons/balance.png')
  },
  discover: {
    background: require('../assets/images/core4/discover.jpg'),
    icon: require('../assets/images/core4/icons/business.png')
  },
  declare: {
    background: require('../assets/images/core4/declare.jpg'),
    icon: require('../assets/images/core4/icons/business.png')
  },
};

class Core4Elites extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  toggleStatus(taskGroup, task) {
    const {challengeId, core4} = this.props;
    const data = {tasks: {}};
    data.tasks[taskGroup] = {};
    data.tasks[taskGroup][task] = !core4.tasks[taskGroup][task];
    data.completedTasks = core4.completedTasks + 0.5 * (!core4.tasks[taskGroup][task]?1:-1);
    this.props.updateCore4Data(
      {
        challengeId,
        weekId: core4.weekId,
        dayId: core4.dayId,
      },
      data
    );
  }

  render() {
    const {core4} = this.props;
    const {tasks} = core4;
    return (
      <View style={[gstyles.container, styles.elitesContainer, gstyles.flexRow]}>
        {
          Object.entries(tasks).map(([taskGroup, tasks]) => 
            Object.entries(tasks).map(([task, done]) => 
              <TouchableOpacity activeOpacity={0.9} style={styles.eliteContainer} key={task} onPress={() => this.toggleStatus(taskGroup, task)}>
                <View style={[gstyles.container, done === true ? styles.eliteActive : {}]}>
                  <View style={[gstyles.container, gstyles.flexRow, styles.eliteBackground]}>
                    <View style={styles.backgroundWhiteSpace}></View>
                    <Image style={styles.eliteBackgroudImage} resizeMode={'cover'} source={elitesAssets[task].background} />
                  </View>
                  <View style={[gstyles.container, styles.eliteCategoryContainer, done === false ? styles.eliteInactive : {}]}>
                    <View style={[gstyles.container, styles.eliteCategory]}>
                      <Image style={styles.eliteCategoryIcon} resizeMode={'contain'} source={elitesAssets[task].icon} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          )
        }
      </View>
    );
  }
}

class Core4ScoreStatusPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zone: {
        active: false,
        score: 3
      },
      power: {
        active: false,
        score: 4
      }
    };
  }

  render () {
    const {zone, power} = this.state;
    const {score} = this.props;
    return (
      <View style={[gstyles.container, gstyles.flexRow, styles.statusPanel]}>
        <View style={[gstyles.container, gstyles.flexColumn, styles.scoreBoard]}>
          <View style={[gstyles.container, gstyles.flexRow, styles.core4Scores]}>
            <Text style={[styles.scoreText, styles.totalScore]}>{score}</Text>
            <Text style={[styles.scoreText, styles.maxScore]}>/4</Text>
          </View>
          <View style={[styles.horizontalBar, !zone.active && !power.active ? {display: 'none'} : {}]} />
          <View style={[styles.addonScores, gstyles.flexRow]}>
            { zone.active && (
                <View style={[gstyles.container, gstyles.flexColumn, styles.addonScoreArea]}>
                  <View style={styles.addonScoreLabel}><Text style={styles.addonScoreLabelText}>ZONE</Text></View>
                  <Text style={[styles.scoreText, styles.addonScore]}>{zone.score}</Text>
                </View>
              )
            }
            { power.active && (
                <View style={[gstyles.container, gstyles.flexColumn, styles.addonScoreArea]}>
                  <View style={styles.addonScoreLabel}><Text style={styles.addonScoreLabelText}>POWER</Text></View>
                  <Text style={[styles.scoreText, styles.addonScore]}>{power.score}</Text>
                </View>
              )
            }
          </View>
        </View>
        <View style={[gstyles.container, styles.statusBoard]}>
          <Image style={styles.statusLevel} resizeMode={'contain'} source={require('../assets/images/stack/power-active.png')} />
        </View>
      </View>
    );
  }
}

class Core4Screen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      score: 3.5
    };
  }

  componentDidMount() {
    const {challengeId} = this.props;
    const weekId = moment().format('Y') + '' + moment().format('WW');
    const dayId = moment().format('Y') + '' + moment().format('MM') + '' + moment().format('DD');
    this.props.getCore4Data({challengeId, weekId, dayId});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.challengeId !== nextProps.challengeId) {
      const {challengeId} = nextProps;
      const weekId = moment().format('Y') + '' + moment().format('WW');
      const dayId = moment().format('Y') + '' + moment().format('MM') + '' + moment().format('DD');
      this.props.getCore4Data({challengeId, weekId, dayId});
    }
  }

  updateScore(score) {
    this.setState({score});
  }
  render () {
    const {score} = this.state;
    const {core4} = this.props;
    return (
      <View style={[gstyles.container, gstyles.gameContainer, gstyles.core4Container]}>
        {/*<View style={[gstyles.container, styles.dateNavigation]}>
          <TouchableOpacity>
            <Text style={[styles.dateOption, styles.activeDateOption]}>Today</Text>
          </TouchableOpacity>
          <View style={styles.dateNavigationSeparator}></View>
          <TouchableOpacity>
            <Text style={styles.dateOption}>This Week</Text>
          </TouchableOpacity>
        </View>*/}
        <ScrollView>
          <View style={gstyles.container}>
            <Core4ScoreStatusPanel score={core4.completedTasks} />
          </View>
          <View style={gstyles.container}>
            <Core4Elites {...this.props}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    core4: state.core4 || {},
    challengeId: state.user.challengeId || '',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getCore4Data: (daySet) => dispatch(getCore4Data(daySet)),
    updateCore4Data: (daySet, data) => dispatch(updateCore4Data(daySet, data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Core4Screen);

