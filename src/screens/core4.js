import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import gstyles, { core4 as styles } from '../stylesheets';

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
      elites: {
        fitness       : true,
        fuel          : false,
        meditation    : false,
        memoirs       : false,
        partner       : false,
        posterity     : false,
        discover      : true,
        declare       : false,
        fuel          : true,
      }
    };
  }

  toggleStatus = (elite) => {
    const {elites} = this.state;
    elites[elite] = !elites[elite];
    this.setState({elites});
  }

  render() {
    const {elites} = this.state;
    return (
      <View style={[styles.container, styles.elitesContainer, styles.flexRow]}>
        {
          Object.entries(elites).map(([elite, status]) => 
            <TouchableOpacity activeOpacity={0.9} style={styles.eliteContainer} key={elite} onPress={() => this.toggleStatus(elite)}>
              <View style={[styles.container, status === true ? styles.eliteActive : {}]}>
                <View style={[styles.container, styles.flexRow, styles.eliteBackground]}>
                  <View style={styles.backgroundWhiteSpace}></View>
                  <Image style={styles.eliteBackgroudImage} resizeMode={'cover'} source={elitesAssets[elite].background} />
                </View>
                <View style={[styles.container, styles.eliteCategoryContainer, status === false ? styles.eliteInactive : {}]}>
                  <View style={[styles.container, styles.eliteCategory]}>
                    <Image style={styles.eliteCategoryIcon} resizeMode={'contain'} source={elitesAssets[elite].icon} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
        active: true,
        score: 3
      },
      power: {
        active: true,
        score: 4
      },
      score: 3.5
    };
  }
  render () {
    const {score, zone, power} = this.state;
    return (
      <View style={[styles.container, styles.flexRow, styles.statusPanel]}>
        <View style={[styles.container, styles.flexColumn, styles.scoreBoard]}>
          <View style={[styles.container, styles.flexRow, styles.core4Scores]}>
            <Text style={[styles.scoreText, styles.totalScore]}>{score}</Text>
            <Text style={[styles.scoreText, styles.maxScore]}>/4</Text>
          </View>
          <View style={[styles.horizontalBar, !zone.active && !power.active ? {display: 'none'} : {}]} />
          <View style={[styles.addonScores, styles.flexRow]}>
            { zone.active && (
                <View style={[styles.container, styles.flexColumn, styles.addonScoreArea]}>
                  <View style={styles.addonScoreLabel}><Text style={styles.addonScoreLabelText}>ZONE</Text></View>
                  <Text style={[styles.scoreText, styles.addonScore]}>{zone.score}</Text>
                </View>
              )
            }
            { power.active && (
                <View style={[styles.container, styles.flexColumn, styles.addonScoreArea]}>
                  <View style={styles.addonScoreLabel}><Text style={styles.addonScoreLabelText}>POWER</Text></View>
                  <Text style={[styles.scoreText, styles.addonScore]}>{power.score}</Text>
                </View>
              )
            }
          </View>
        </View>
        <View style={[styles.container, styles.statusBoard]}>
          <Image style={styles.statusLevel} resizeMode={'contain'} source={require('../assets/images/stack/power-active.png')} />
        </View>
      </View>
    );
  }
}

export default class Core4Screen extends React.Component {
  render () {
    return (
      <View style={gstyles.core4.pageContainer}>
        <View style={[styles.container, styles.dateNavigation]}>
          <TouchableOpacity>
            <Text style={[styles.dateOption, styles.activeDateOption]}>Today</Text>
          </TouchableOpacity>
          <View style={styles.dateNavigationSeparator}></View>
          <TouchableOpacity>
            <Text style={styles.dateOption}>This Week</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <Core4ScoreStatusPanel />
          </View>
          <View style={styles.container}>
            <Core4Elites />
          </View>
        </ScrollView>
      </View>
    );
  }
}
