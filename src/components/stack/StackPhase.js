import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';
import objectAssignDeep from 'object-assign-deep';
import StackPhaseData from '../../constants/stack';
import { __get } from '../../helper';
import { stack as styles, global as gstyles } from '../../stylesheets';
import { updateStackField, moveToNextField } from '../../actions/stack';

import StackPhaseStep from './StackPhaseStep';

class StackPhase extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {};

    this.data = StackPhaseData.data[props.phaseInd];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.stack.currentPhase === this.props.phaseInd;
  }

  updateChoice(val) {
    const {currentPhase, currentStep, status} = this.props.stack;

    if (!status.shift.choice) {
      this.props.moveToNextField(currentStep + 1);
    }

    this.props.updateStackField({
      phase: 'shift',
      field: 'choice',
      data: val,
    });

    const chosen = (val !== 'original') ? status.shift[val +'Story'] : status.drift.story;
    this.props.updateStackField({
      phase: 'shift',
      field: 'chosen',
      data: chosen,
    });

  }

  render() {
    const {stack} = this.props;
    return (
      <View style={[gstyles.container, styles.container, styles.phaseContainer]}>
        <View style={[gstyles.container, styles.container, styles.phaseLabel]}><Text style={styles.phaseLabelText}>{this.data.title.toUpperCase()}</Text></View>
        <View style={[gstyles.container, styles.container, styles.stepsContainer]}>
          {
            this.data.steps.filter((step, ind) => this.data.id!==__get([stack.currentPhase, 'id'], StackPhaseData.data) || ind<=stack.currentStep).map((step, ind) => <StackPhaseStep key={step.id} phaseInd={this.props.phaseInd} stepInd={ind} data={step} updateChoice={(val) => this.updateChoice(val)} />)
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  stack: {...objectAssignDeep(state.stack || {}, {status: { intro: { username: state.user.name }}})}
});

const mapDispatchToProps = {
  moveToNextField,
  updateStackField,
};

export default connect(mapStateToProps, mapDispatchToProps)(StackPhase);
