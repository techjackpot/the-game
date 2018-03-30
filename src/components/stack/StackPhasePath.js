import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import objectAssignDeep from 'object-assign-deep';
import { stack as styles, global as gstyles } from '../../stylesheets';

import { getStackData, updateStackField, finishStack } from '../../actions/stack';

export const powerlevels = {
  'alive': {
    state: 'ALIVE',
    name: 'NEARLY DEAD',
    image: require('../../assets/images/stack/power-alive.png'),
    icon: require('../../assets/images/warriorfit/alive.png')
  },
  'awake': {
    state: 'AWAKE',
    name: 'IN THE GAME',
    image: require('../../assets/images/stack/power-awake.png'),
    icon: require('../../assets/images/warriorfit/awake.png')
  },
  'active': {
    state: 'ACTIVE',
    name: 'BULLET PROOF',
    image: require('../../assets/images/stack/power-active.png'),
    icon: require('../../assets/images/warriorfit/active.png')
  },
  'ablaze': {
    state: 'ABLAZE',
    name: 'SUPER HUMAN',
    image: require('../../assets/images/stack/power-ablaze.png'),
    icon: require('../../assets/images/warriorfit/ablaze.png')
  }
};

export const feelings = ['aware', 'joy', 'hope', 'certainty', 'faith', 'peace', 'expansion', 'empathy', 'power', 'love', 'gratitude', 'awake', 'trust', 'supported', 'awe', 'focus', 'curious', 'creativity', 'happy', 'open', 'inspiration'];

class StackPhasePath extends React.Component {
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
    return !!this.state.isEditing;
  }
  componentWillUnmount() {
    this.setState({isEditing: false});
  }

  finishStackAndMove() {
    this.props.finishStack().then(() => {
      this.props.getStackData(new Date()).then(() => {
        this.props.navigation.navigate('Core4');
      });
    })
  }

  updatePathState(key, val, multi) {
    !this.state.isEditing && this.setState({isEditing: true});

    const {currentPhase, status} = this.props.stack;
    const {light} = status;

    if (multi) {
      let exists = light[key].indexOf(val);
      if (exists > -1) {
        light[key].splice(exists, 1)
      } else {
        light[key].push(val);
      }
    } else {
      light[key] = val;
    }

    this.props.updateStackField({
      phase: 'light',
      field: key,
      data: light[key]
    }).then(() => {
      this.state.isEditing && this.setState({isEditing: false});
    })
  }

  render() {
    const {stack} = this.props;
    return (
      <View style={[gstyles.container, styles.container, styles.phaseContainer]}>
        <View style={[gstyles.container, styles.container, styles.phaseLabel]}><Text style={styles.phaseLabelText}>{'THE PATH'}</Text></View>
        <View style={[gstyles.container, styles.container, styles.stepsContainer]}>
          <View style={[gstyles.container, styles.container, styles.stepContainer]}>
            <View style={[gstyles.container, styles.container, styles.fieldsContainer]}>
              <View style={[gstyles.container, styles.container, styles.fieldContainer]}>
                <View style={[styles.fieldTrackPointer]} />
                <View style={[gstyles.container, styles.container]}>
                  <View style={[gstyles.container, styles.container, styles.fieldLabelContainer]}>
                    <Text style={styles.fieldLabel}>{stack.status.intro.username}, at the end of this stack, what level of power are you feeling?</Text>
                  </View>
                  <View style={[gstyles.container, gstyles.flexRow, styles.fieldValueContainer, styles.fieldPathValueContainer]}>
                    {
                      Object.entries(powerlevels).map(([level, data]) =>
                        <TouchableOpacity
                          key={level}
                          activeOpacity={0.9}
                          style={[styles.fieldPathLevelValue, stack.status.light.power===level ? styles.fieldPathLevelValueSelected : {}]}
                          onPress={() => this.updatePathState('power', level)}
                        >
                          <Text style={styles.fieldPathLevelText}>{data.state}</Text>
                          <Image resizeMode={'contain'} style={[styles.fieldPathLevelValueImage]} source={data.image} />
                          <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldPathLevelNameContainer, stack.status.light.power===level ? styles.fieldPathLevelNameContainerSelected : {}]}>
                            <Image style={[styles.fieldPathLevelValueIcon]} source={data.icon} />
                            <Text style={[styles.fieldPathLevelName, stack.status.light.power===level ? styles.fieldPathLevelNameSelected : {}]}>{data.name}</Text>
                          </View>
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
                    <Text style={styles.fieldLabel}>What best describes your current state of being?</Text>
                  </View>
                  <View style={[gstyles.container, gstyles.flexRow, styles.fieldValueContainer, styles.fieldSingleValueContainer]}>
                    {
                      feelings.map((feeling) =>
                      <TouchableOpacity
                        key={feeling}
                        activeOpacity={0.9}
                        style={[styles.fieldSingleValue, stack.status.light.feeling.indexOf(feeling) > -1 ? styles.fieldValueSelected : {}]}
                        onPress={() => this.updatePathState('feeling', feeling, true)}
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
        {
          stack.status.light.feeling.length>0 && stack.status.light.power!=='' && (
            <View style={[gstyles.container, gstyles.flexRow, styles.nextButtonContainer]}>
              <TouchableOpacity style={styles.nextButton} onPress={() => this.finishStackAndMove()}><Text style={styles.nextButtonText}>FINISH</Text></TouchableOpacity>
            </View>
          )
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  stack: {...objectAssignDeep(state.stack || {}, {status: { intro: { username: state.user.name }}})}
});

const mapDispatchToProps = {
  getStackData,
  updateStackField,
  finishStack,
};

export default connect(mapStateToProps, mapDispatchToProps)(StackPhasePath);
