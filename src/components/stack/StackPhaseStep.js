import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import objectAssignDeep from 'object-assign-deep';
import StackPhaseData from '../../constants/stack';
import { __get, __getRandomInt, __dataFilter } from '../../helper';
import { stack as styles, global as gstyles } from '../../stylesheets';

import StackPhaseStepField from './StackPhaseStepField';

class StackPhaseStep extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {};

    this.data = StackPhaseData.data[props.phaseInd].steps[props.stepInd];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.stack.currentStep === this.props.stepInd || nextProps.stack.currentStep - 1 === this.props.stepInd;
  }

  render() {
    return (
      <View style={[gstyles.container, styles.container, styles.stepContainer]}>
        <View style={[gstyles.container, styles.container, styles.fieldsContainer]}>
          {
            this.data.fields.map((field, ind) => <StackPhaseStepField key={field.id} phaseInd={this.props.phaseInd} stepInd={this.props.stepInd} fieldInd={ind} actionInd={this.props.actionInd} />)
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  // currentStep: state.stack.currentStep || 0,
  stack: {...objectAssignDeep(state.stack || {}, {status: { intro: { username: state.user.name }}})}
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(StackPhaseStep);
