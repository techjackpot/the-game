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

    const phaseId = __get([currentPhase, 'id'], StackPhaseData.data);
    

    if (phaseId === 'light' && (key === 'what' || key === 'must' || key === 'how')) {
      status.light.actions[status.light.actions.length - 1][key] = val;
      this.props.updateStackField({
        phase: phaseId,
        field: 'actions',
        data: status.light.actions,
      })
    } else {
      this.props.updateStackField({
        phase: phaseId,
        field: key,
        data: val,
      });
    }
  }

  render() {
    const {stack} = this.props;
    const data = __get([stack.currentPhase, 'steps', stack.currentStep, 'fields', 0], StackPhaseData.data);
    let value = '';
    let phaseId = __get([stack.currentPhase, 'id'], StackPhaseData.data);
    if (data.type === 'text-multiple') {
      value = stack.status[phaseId].actions[stack.status[phaseId].actions.length - 1][data.id];
    } else {
      value = stack.status[phaseId][data.id];
    }
    return (
      <TextInput
        style={styles.valueIndicatorInput}
        placeholderTextColor={'#6b6b6b'}
        placeholder={__dataFilter(data.placeholder, stack.status.intro) || ''}
        value={value}
        onChangeText={(text) => this.updateState(data.id, text)}
        autoCorrect={false}
        underlineColorAndroid='transparent'
        multiline={true}
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
