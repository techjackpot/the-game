import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import objectAssignDeep from 'object-assign-deep';
import StackPhaseData from '../../constants/stack';
import { __get, __validate } from '../../helper';
import { stack as styles, global as gstyles } from '../../stylesheets';

import { moveToNextPhase, updateStackField } from '../../actions/stack';

export const core4Icons = {
  body: require('../../assets/images/core4/icons/body.png'),
  being: require('../../assets/images/core4/icons/being.png'),
  balance: require('../../assets/images/core4/icons/balance.png'),
  business: require('../../assets/images/core4/icons/business.png'),
};

const data = StackPhaseData.data[0];

class StackPhasePit extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isEditing: false,
    };
  }

  componentDidMount() {
    this.setState({isEditing: true});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!this.state.isEditing || this.props.stack.currentPhase === 0;
  }
  componentWillUnmount() {
    this.setState({isEditing: false});
  }

  updatePitState(key, val, multi) {
    !this.state.isEditing && this.setState({isEditing: true});

    const {currentPhase, status} = this.props.stack;
    const {intro} = status;

    if (multi) {
      let exists = intro[key].indexOf(val);
      if (exists > -1) {
        intro[key].splice(exists, 1)
      } else {
        intro[key].push(val);
      }
    } else {
      intro[key] = val;
    }

    this.props.updateStackField({
      phase: 'intro',
      field: key,
      data: intro[key]
    }).then(() => {
      this.state.isEditing && this.setState({isEditing: false});
    })

    if (currentPhase === 0) {
      __validate(intro) && this.props.moveToNextPhase(1);
    }
  }

  render() {
    const {intro} = this.props.stack.status;
    return (
      <View style={[gstyles.container, styles.container, styles.phaseContainer]}>
        <View style={[gstyles.container, styles.container, styles.phaseLabel]}><Text style={styles.phaseLabelText}>{'THE PIT'}</Text></View>
        <View style={[gstyles.container, styles.container, styles.stepsContainer]}>
          <View style={[gstyles.container, styles.container, styles.stepContainer]}>
            <View style={[gstyles.container, styles.container, styles.fieldsContainer]}>
              <View style={[gstyles.container, styles.container, styles.fieldContainer]}>
                <View style={[styles.fieldTrackPointer, {top: 24}]} />
                <View style={[gstyles.container, styles.container]}>
                  <View style={[gstyles.container, styles.container, styles.fieldValueContainer, styles.fieldInputValueContainer]}>
                    <TextInput
                      style={[styles.fieldInputValue, styles.fieldInputValueBig]}
                      placeholderTextColor={'#2c2c2c'}
                      placeholder={__get(['steps', 0, 'fields', 0, 'placeholder'], data)}
                      onChangeText={(text) => this.updatePitState('title', text)}
                      value={intro.title}
                      autoCorrect={false}
                      underlineColorAndroid='transparent'
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[gstyles.container, styles.container, styles.stepContainer]}>
            <View style={[gstyles.container, styles.container, styles.fieldsContainer]}>
              <View style={[gstyles.container, styles.container, styles.fieldContainer]}>
                <View style={[styles.fieldTrackPointer]} />
                <View style={[gstyles.container, styles.container]}>
                  <View style={[gstyles.container, styles.container, styles.fieldLabelContainer]}>
                    <Text style={styles.fieldLabel}>{__get(['steps', 1, 'fields', 0, 'label'], data).toUpperCase()}</Text>
                  </View>
                  <View style={[gstyles.container, gstyles.flexRow, styles.fieldValueContainer, styles.fieldSingleValueContainer]}>
                    {
                      __get(['steps', 1, 'fields', 0, 'options'], data).map((type) =>
                        <TouchableOpacity
                          key={type}
                          activeOpacity={0.9}
                          style={[styles.fieldSingleValue, intro.core4===type ? styles.fieldValueSelected : {}]}
                          onPress={() => this.updatePitState('core4', type)}
                        >
                          <Image style={[styles.fieldSingleValueImage]} source={core4Icons[type]} />
                        </TouchableOpacity>
                      )
                    }
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[gstyles.container, styles.container, styles.stepContainer]}>
            <View style={[gstyles.container, styles.container, styles.fieldsContainer]}>
              <View style={[gstyles.container, styles.container, styles.fieldContainer]}>
                <View style={[styles.fieldTrackPointer]} />
                <View style={[gstyles.container, styles.container]}>
                  <View style={[gstyles.container, styles.container, styles.fieldLabelContainer]}>
                    <Text style={styles.fieldLabel}>{__get(['steps', 2, 'fields', 0, 'label'], data).toUpperCase()}</Text>
                  </View>
                  <View style={[gstyles.container, styles.container, styles.fieldValueContainer, styles.fieldInputValueContainer]}>
                    <TextInput
                      style={styles.fieldInputValue}
                      placeholderTextColor={'#2c2c2c'}
                      placeholder={__get(['steps', 2, 'fields', 0, 'placeholder'], data)}
                      onChangeText={(text) => this.updatePitState('who', text)}
                      value={intro.who}
                      autoCorrect={false}
                      underlineColorAndroid='transparent'
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[gstyles.container, styles.container, styles.stepContainer]}>
            <View style={[gstyles.container, styles.container, styles.fieldsContainer]}>
              <View style={[gstyles.container, styles.container, styles.fieldContainer]}>
                <View style={[styles.fieldTrackPointer]} />
                <View style={[gstyles.container, styles.container]}>
                  <View style={[gstyles.container, styles.container, styles.fieldLabelContainer]}>
                    <Text style={styles.fieldLabel}>{__get(['steps', 3, 'fields', 0, 'label'], data).toUpperCase()}</Text>
                  </View>
                  <View style={[gstyles.container, gstyles.flexRow, styles.fieldValueContainer, styles.fieldSingleValueContainer]}>
                    {
                      __get(['steps', 3, 'fields', 0, 'options'], data).map((feeling) =>
                      <TouchableOpacity
                        key={feeling}
                        activeOpacity={0.9}
                        style={[styles.fieldSingleValue, intro.feeling.indexOf(feeling) > -1 ? styles.fieldValueSelected : {}]}
                        onPress={() => this.updatePitState('feeling', feeling, true)}
                      >
                        <Text style={[styles.fieldSingleValueText]}>{feeling.toUpperCase()}</Text>
                      </TouchableOpacity>)
                    }
                  </View>
                </View>
              </View>
            </View>
          </View>
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
  updateStackField,
};

export default connect(mapStateToProps, mapDispatchToProps)(StackPhasePit);
