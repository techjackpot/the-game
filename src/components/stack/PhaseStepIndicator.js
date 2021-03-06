import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import objectAssignDeep from 'object-assign-deep';
import StackPhaseData from '../../constants/stack';
import PhaseStepIndicatorInputBoolean from './PhaseStepIndicatorInputBoolean';
import PhaseStepIndicatorInputText from './PhaseStepIndicatorInputText';
import { stack as styles, global as gstyles } from '../../stylesheets';
import { __get } from '../../helper';

import { moveToNextPhase, moveToNextField } from '../../actions/stack';

class PhaseStepIndicator extends React.Component {

  moveToNextField(force = false) {
    const {stack} = this.props;
    const phaseData = __get([stack.currentPhase], StackPhaseData.data);
    const fieldData = phaseData.steps[stack.currentStep].fields[0];
    let fieldValue = '';
    if (fieldData.type === 'text-multiple') {
      fieldValue = stack.status[phaseData.id].actions[stack.status[phaseData.id].actions.length - 1][fieldData.id];
    } else {
      fieldValue = stack.status[phaseData.id][fieldData.id];
    }
    if (fieldData.type === 'text-multiple' && fieldData.id === 'how') {
      /*__validate(stack.status[phaseData.id])*/ (force || (fieldValue.constructor === Array ? fieldValue.length > 0 : fieldValue !== '')) && this.props.moveToNextField(stack.currentStep+1);
    } else {
      /*__validate(stack.status[phaseData.id])*/ stack.currentStep >= phaseData.steps.length-1 && this.props.moveToNextPhase(stack.currentPhase+1) || stack.currentStep < phaseData.steps.length-1 && (force || (fieldValue.constructor === Array ? fieldValue.length > 0 : fieldValue !== '')) && this.props.moveToNextField(stack.currentStep+1);
    }
  }

  render() {
    const {stack} = this.props;
    const data = __get([stack.currentPhase, 'steps', stack.currentStep, 'fields', 0], StackPhaseData.data);

    if (data === null) return <View />;

    if (data.type === 'info') {
      setTimeout(() => {
        // this.updateState(data.id, true);
        this.moveToNextField(true);
      }, 500);
      return <View />;
    }

    if (data.type === 'choice') {
      return <View />;
    }

    // if (data.type === 'text-multiple' && data.id === 'how') {
    //   return <View />;
    // }

    const IndicatorInput = (() => {
      switch(data.type) {
        case 'driftBoolean':
        case 'blockBoolean':
          return PhaseStepIndicatorInputBoolean;
        default:
          return PhaseStepIndicatorInputText;
      }
    })();

    return (
      <View style={[gstyles.container, gstyles.flexRow, styles.valueIndicatorContainer]}>
        <View style={[gstyles.container, styles.valueIndicator]}>
          <IndicatorInput></IndicatorInput>
        </View>
        <View style={[gstyles.container, styles.moveToNextFieldButtonContainer]}>
          <TouchableOpacity style={[gstyles.container, styles.moveToNextFieldButton]} onPress={() => this.moveToNextField()}>
            <Text style={[styles.moveToNextFieldButtonText]}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  stack: {...objectAssignDeep(state.stack || {}, {status: { intro: { username: state.user.name }}})}
});

const mapDispatchToProps = {
  moveToNextPhase,
  moveToNextField,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhaseStepIndicator);
