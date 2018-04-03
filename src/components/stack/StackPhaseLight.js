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

import StackPhaseStep from './StackPhaseStep';

class StackPhaseLight extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {};

    this.data = StackPhaseData.data[props.phaseInd];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.stack.currentPhase === this.props.phaseInd;
  }

  render() {
    const {stack} = this.props;
    const {actions} = stack.status.light;
    return (
      <View style={[gstyles.container, styles.container, styles.phaseContainer]}>
        <View style={[gstyles.container, styles.container, styles.phaseLabel]}><Text style={styles.phaseLabelText}>{this.data.title.toUpperCase()}</Text></View>
        <View style={[gstyles.container, styles.container, styles.stepsContainer]}>
          {
            this.data.steps.filter((step, ind) => ind<=stack.currentStep && ind<=1).map((step, ind) => <StackPhaseStep key={step.id} phaseInd={this.props.phaseInd} stepInd={ind} />)
          }
          {
            actions.map((action, actionInd) => this.data.steps.filter((step, ind) => ind>=2 && (actionInd<actions.length-1 ? true: ind<=stack.currentStep)).map((step, ind) => <StackPhaseStep key={step.id} phaseInd={this.props.phaseInd} stepInd={ind+2} actionInd={actionInd} />))
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
};

export default connect(mapStateToProps, mapDispatchToProps)(StackPhaseLight);
