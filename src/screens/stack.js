import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import moment from 'moment';

import { stack as styles, global as gstyles } from '../stylesheets';

import StackPhaseData from '../constants/stack';

import { getStackData, moveToNextPhase, moveToNextField, updateStackField } from '../actions/stack';

import { __get, __set, __validate } from '../helper';

class StackPhaseStepFieldInput extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }
  render() {
    const {data} = this.props;
    return (
      <View style={[gstyles.container, styles.container]}>
        <View style={[gstyles.container, styles.container, styles.fieldValueContainer, styles.fieldInputValueContainer]}>
          <TextInput style={styles.fieldInputValue} placeholderTextColor={'#2c2c2c'} placeholder={data.placeholder || ''} />
        </View>
      </View>
    );
  }
}

class StackPhaseStepFieldSingle extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }
  render() {
    const {data} = this.props;
    return (
      <View style={[gstyles.container, styles.container]}>
        <View style={[gstyles.container, gstyles.flexRow, styles.fieldValueContainer, styles.fieldSingleValueContainer]}>
          {
            data.options.map((val, ind) => <TouchableOpacity key={ind} activeOpacity={0.9} style={[styles.fieldSingleValue]}><Text style={[styles.fieldSingleValueText]}>{val.toUpperCase()}</Text></TouchableOpacity>)
          }
        </View>
      </View>
    );
  }
}

class StackPhaseStepField extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {};
    // this.props.updateIndicator()
  }
  render() {
    const {data, stack, phaseInd, stepInd} = this.props;
    const phaseId = __get([phaseInd, 'id'], StackPhaseData.data);
    // let Layout;
    // switch(data.type) {
    //   case 'text':
    //     Layout = StackPhaseStepFieldInput;
    //     break;
    //   case 'single':
    //     Layout = StackPhaseStepFieldSingle;
    //     break;
    //   case 'multiple':
    //     Layout = StackPhaseStepFieldMultiple;
    //     break;
    //   default:
    //     Layout = StackPhaseStepFieldInput;
    //     break;
    // }
    return (
      <View style={[gstyles.container, styles.container, styles.fieldContainer]}>
        <View style={[styles.fieldTrackPointer, {top: 16}]} />
        { !!data.label && (
          <View style={[gstyles.container, styles.container, styles.fieldLabelContainer, styles.fieldLabelContainerBubble]}>
            <Text style={styles.fieldLabelBubble}>{data.label}</Text>
            <View style={[styles.fieldLabelBubbleArrow]}>
              <View style={[styles.fieldLabelBubbleArrowBox]} />
            </View>
          </View>
        ) }
        {
          (phaseInd < stack.currentPhase || (phaseInd == stack.currentPhase && stepInd < stack.currentStep)) && (
            <View style={[gstyles.container, styles.container, styles.fieldLabelValueContainer, styles.fieldLabelValueContainerBubble]}>
              <Text style={styles.fieldLabelValueBubble}>{__get([phaseId, data.id], stack.status)}</Text>
              <View style={[styles.fieldLabelValueBubbleArrow]}>
                <View style={[styles.fieldLabelValueBubbleArrowBox]} />
              </View>
            </View>
          )
        }
      </View>
    );
  }
}

class StackPhaseStep extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render() {
    const {data} = this.props;
    return (
      <View style={[gstyles.container, styles.container, styles.stepContainer]}>
        <View style={[gstyles.container, styles.container, styles.fieldsContainer]}>
          {
            data.fields.map((field, ind) => <StackPhaseStepField key={field.id} phaseInd={this.props.phaseInd} stepInd={this.props.stepInd} fieldInd={ind} data={field} stack={this.props.stack} />)
          }
        </View>
      </View>
    );
  }
}

class StackPhase extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render() {
    const {data, stack} = this.props;
    return (
      <View style={[gstyles.container, styles.container, styles.phaseContainer]}>
        <View style={[gstyles.container, styles.container, styles.phaseLabel]}><Text style={styles.phaseLabelText}>{data.title.toUpperCase()}</Text></View>
        <View style={[gstyles.container, styles.container, styles.stepsContainer]}>
          {
            data.steps.filter((step, ind) => data.id!==StackPhaseData.data[stack.currentPhase].id || ind<=stack.currentStep).map((step, ind) => <StackPhaseStep key={step.id} phaseInd={this.props.phaseInd} stepInd={ind} data={step} stack={this.props.stack} />)
          }
        </View>
      </View>
    );
  }
}

class StackPhasePit extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };

    this.core4Icons = {
      body: require('../assets/images/core4/icons/body.png'),
      being: require('../assets/images/core4/icons/being.png'),
      balance: require('../assets/images/core4/icons/balance.png'),
      business: require('../assets/images/core4/icons/business.png'),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.stack.status.intro) !== JSON.stringify(nextProps.stack.status.intro)) {
      this.forceUpdate();
    }
  } 

  updatePitState(key, val, multi) {
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
    })

    if (currentPhase === 0) {
      __validate(intro) && this.props.moveToNextPhase(1);
    }
  }

  render() {
    const {data} = this.props;
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
                          <Image style={[styles.fieldSingleValueImage]} source={this.core4Icons[type]} />
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

class PhaseStepIndicator extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {

    };
  }

  moveToNextField() {
    const {stack} = this.props;
    const phaseData = __get([stack.currentPhase], StackPhaseData.data);
    let fieldValue = stack.status[phaseData.id][phaseData.steps[stack.currentStep].fields[0].id];
    __validate(stack.status[phaseData.id]) && this.props.moveToNextPhase(stack.currentPhase+1) || stack.currentStep < phaseData.steps.length-1 && (fieldValue.constructor === Array ? fieldValue.length > 0 : fieldValue !== '') && this.props.moveToNextField(stack.currentStep+1);

  }

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

    // let Layout;
    // switch(data.type) {
    //   case 'text':
    //     Layout = StackPhaseStepFieldInput;
    //     break;
    //   case 'single':
    //     Layout = StackPhaseStepFieldSingle;
    //     break;
    //   case 'multiple':
    //     Layout = StackPhaseStepFieldMultiple;
    //     break;
    //   default:
    //     Layout = StackPhaseStepFieldInput;
    //     break;
    // }
    return (
      <View style={[gstyles.container, gstyles.flexRow, styles.valueIndicatorContainer]}>
        <View style={[gstyles.container, styles.valueIndicator]}>
          <TextInput
            style={styles.valueIndicatorInput}
            placeholderTextColor={'#6b6b6b'}
            placeholder={data.placeholder || ''}
            value={stack.status[__get([stack.currentPhase, 'id'], StackPhaseData.data)][data.id]}
            onChangeText={(text) => this.updateState(data.id, text)}
          />
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

class StackScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  componentWillMount() {
    this.props.getStackData(moment().format('dddd, MMMM Do'));
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.stack) !== JSON.stringify(nextProps.stack)) {
      this.forceUpdate();
    }
  }

  moveNext() {
    const {stack} = this.props;
    this.props.moveToNextPhase(stack.currentPhase + 1);
  }
  restart() {
    this.props.getStackData(new Date());
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.stack) !== JSON.stringify(nextProps.stack)) {
      this.forceUpdate();
    }
  } 


  render () {
    const {stack} = this.props;
    const {currentPhase, currentStep} = stack;
    return (
      <View style={[gstyles.container, styles.container, gstyles.gameContainer, gstyles.stackContainer, styles.stackContainer]}>
        <StatusBar hidden={true} />
        <View style={[gstyles.container, styles.container, styles.stackPhasesContainer, currentPhase>0 ? styles.withIndicator : {}]}>
          <ScrollView
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{        
                this.scrollView.scrollToEnd({animated: true});
            }}
          >
            <View style={[styles.fieldTrackBar]} />
            <View style={[gstyles.container, styles.container, styles.phasesContainer]}>
              <StackPhasePit
                data={StackPhaseData.data[0]}
                {...this.props}
              />
              {
                StackPhaseData.data.filter((phase, ind) => ind!==0 && ind <= stack.currentPhase).map((phase, ind) => <StackPhase key={phase.id} phaseInd={ind+1} data={phase} {...this.props} />)
              }
            </View>
            {/*<View style={[gstyles.container, gstyles.flexRow, styles.nextButtonContainer]}>
              <TouchableOpacity style={styles.nextButton} onPress={() => this.moveNext()}><Text style={styles.nextButtonText}>• Next •</Text></TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={() => this.restart()}><Text style={styles.nextButtonText}>• Restart •</Text></TouchableOpacity>
            </View>*/}
          </ScrollView>
          {
            currentPhase>0 && <PhaseStepIndicator {...this.props} />
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    stack: state.stack || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getStackData: date => dispatch(getStackData(date)),
    moveToNextPhase: nextPhase => dispatch(moveToNextPhase(nextPhase)),
    moveToNextField: nextField => dispatch(moveToNextField(nextField)),
    updateStackField: fieldData => dispatch(updateStackField(fieldData)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StackScreen);
