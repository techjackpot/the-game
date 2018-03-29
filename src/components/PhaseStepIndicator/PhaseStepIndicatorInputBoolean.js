import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import StackPhaseData from '../../constants/stack';
import { __get, __dataFilter } from '../../helper';
import objectAssignDeep from 'object-assign-deep';
import { stack as styles, global as gstyles } from '../../stylesheets';

import { updateStackField } from '../../actions/stack';

class PhaseStepIndicatorInputBoolean extends React.Component {

  updateState(key, val) {
    const {currentPhase, status} = this.props.stack;

    this.props.updateStackField({
      phase: __get([currentPhase, 'id'], StackPhaseData.data),
      field: key,
      data: val,
    });
  }

  render() {
    const {stack} = this.props;
    const data = __get([stack.currentPhase, 'steps', stack.currentStep, 'fields', 0], StackPhaseData.data);
    const cVal = stack.status[__get([stack.currentPhase, 'id'], StackPhaseData.data)][data.id];
    return (
      <View style={[gstyles.container, gstyles.flexRow]}>
        {
          [true,false].map((val, ind) =>
            <TouchableOpacity
              key={ind}
              activeOpacity={0.9}
              style={[styles.valueIndicatorInputBoolean, cVal===val ? styles.valueIndicatorInputBooleanSelected : {}]}
              onPress={() => this.updateState(data.id, val)}
            >
              <Text style={[styles.valueIndicatorInputBooleanText, cVal===val? styles.valueIndicatorInputBooleanTextSelected : {}]}>{val ? 'Yes' : 'No'}</Text>
            </TouchableOpacity>)
        }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    stack: {...objectAssignDeep(state.stack || {}, {status: { intro: { username: state.user.name }}})}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    updateStackField: fieldData => dispatch(updateStackField(fieldData)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhaseStepIndicatorInputBoolean);
