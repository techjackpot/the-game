import React from 'react';
import { connect } from 'react-redux';
import {
  TextInput,
} from 'react-native';
import StackPhaseData from '../../constants/stack';
import { __get, __dataFilter } from '../../helper';
import objectAssignDeep from 'object-assign-deep';
import { stack as styles, global as gstyles } from '../../stylesheets';

import { updateStackField } from '../../actions/stack';

class PhaseStepIndicatorInputText extends React.Component {

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
    return (
      <TextInput
        style={styles.valueIndicatorInput}
        placeholderTextColor={'#6b6b6b'}
        placeholder={__dataFilter(data.placeholder, stack.status.intro) || ''}
        value={stack.status[__get([stack.currentPhase, 'id'], StackPhaseData.data)][data.id]}
        onChangeText={(text) => this.updateState(data.id, text)}
        autoCorrect={false}
        underlineColorAndroid='transparent'
      />
    );
  }
}

const mapStateToProps = state => ({
  stack: {...objectAssignDeep(state.stack || {}, {status: { intro: { username: state.user.name }}})}
});

const mapDispatchToProps = {
  updateStackField,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhaseStepIndicatorInputText);
