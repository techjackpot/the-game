import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {Modal, Text, TouchableHighlight, View, Slider, StyleSheet} from 'react-native';
import { getCore4Data, updateCore4Data } from '../actions/core4';
import { getKey4Data, updateKey4Data } from '../actions/core4';
import { getKey4PowerZoneData, updateKey4PowerZoneData } from '../actions/key4PowerZone';

import gstyles, { powerzone as styles } from '../stylesheets';

var _ = require('lodash');

const valueIndex = [4,3,2,1,0];

function calculateKey4Targets(key4Targets) {
      let score = 0;

      _.forEach(key4Targets, (target) => {
          if (target.key !== 'door') {
              score += (target.complete) ? 1 : 0;
          }
      });

      return score;
  }

class PowerZoneScreen extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount(){

    const { type } = this.props;
    let data  = {};
    let score = 0;

    if(type !== undefined) {

      if(type === "key4" && this.props.key4PowerZone !== undefined) {
        data = this.props.key4PowerZone;
        score = calculateKey4Targets(this.props.key4);
      }

      if(type === "core4" && this.props.core4 !== undefined) {
        data  = this.props.core4;
        score = this.props.core4.completedTasks;
      }

      this.setState({
        hidePowerZoneModal: this.props.hidePowerZoneModal,
        power:  data.power !== undefined ? data.power : 0,
        zone:   data.zone  !== undefined ? data.zone  : 0,
        score: score,
      });
    }
  }

  handleUpdate(){

    const data = {};
    if(this.state.power !== undefined) {
      data['power'] = this.state.power;
    }
    if(this.state.zone !== undefined) {
      data['zone'] = this.state.zone;
    }

    if(this.props.type === "core4") {
      this.props.updateCore4Data(
        {
          weekId: this.props.core4.weekId,
          dayId: this.props.core4.dayId,
        },
        data
      );
    }

    if(this.props.type === "key4") {
      this.props.updateKey4PowerZoneData(
        {
          weekId: this.props.core4.weekId,
          dayId: this.props.core4.dayId,
        },
        data
      );
    }

    this.props.hidePowerZoneModal();
  }

  render() {

    const that = this;
    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{this.props.type && this.props.type.toUpperCase()}</Text>
        </View>
        <View style={styles.topContainer}>
          <Text style={styles.header}>POWER</Text>
          <Text style={this.state.score > 3.5 ? styles.header : styles.header_noborder}>{ this.state.score > 3.5 ? 'ZONE' : ''}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.column}>
            {
              ['ABLAZE','ACTIVE','AWAKE','ASLEEP',''].map((item, index) => <Text key={item} style={[styles.y_labels, index ===  valueIndex[that.state.power] ? styles.active : {}]}>{item}</Text>)
            }
          </View>
          <View style={[styles.column, styles.column_slider]}>
            <Slider
              style={styles.slider}
              step={1}
              minimumValue={0}
              maximumValue={4}
              maximumTrackTintColor={"#03A9F4"}
              minimumTrackTintColor={"#4DD0E1"}
              thumbTintColor={"#03A9F4"}
              value={this.state.power}
              onValueChange={val => this.setState({ power: val })}
             />
          </View>
          <View style={[styles.column, styles.score_column]}>
            {
              [4,3,2,1,0].map((item) => <Text key={item} style={styles.score}>{item}</Text>)
            }
          </View>
            <View style={[styles.column, styles.column_slider]}>
            { this.state.score > 3.5 && (
              <Slider
                style={styles.slider}
                step={1}
                minimumValue={0}
                maximumValue={4}
                maximumTrackTintColor={"#03A9F4"}
                minimumTrackTintColor={"#4DD0E1"}
                thumbTintColor={"#03A9F4"}
                value={this.state.zone}
                onValueChange={val => this.setState({ zone: val })}
               />
            )}
          </View>
          <View style={styles.column}>
            { this.state.score > 3.5 && (
              ['12AM','NOON','10AM','8AM',''].map((item, index) => <Text key={item} style={[styles.y_labels, index ===  valueIndex[that.state.zone] ? styles.active : {}]}>{item}</Text>)
            )}
          </View>
        </View>
        <TouchableHighlight style={{position: 'absolute', top: 10, right: 10}}
          onPress={this.handleUpdate}>
          <Text style={styles.close}>X</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  core4: state.core4 || {},
  key4: state.key4 || {},
  key4PowerZone: state.key4PowerZone || {}
});

const mapDispatchToProps = {
  getKey4Data,
  getCore4Data,
  updateCore4Data,
  getKey4PowerZoneData,
  updateKey4PowerZoneData,
};

export default connect(mapStateToProps, mapDispatchToProps)(PowerZoneScreen);
