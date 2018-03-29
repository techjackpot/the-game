import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ProgressViewIOS,
  Platform,
  Keyboard
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import moment from 'moment';

import { stack as styles, global as gstyles } from '../stylesheets';

import StackPhaseData from '../constants/stack';

import { getStackData, moveToNextPhase, moveToNextField, updateStackField, finishStack } from '../actions/stack';

import { __get, __set, __validate, __getRandomInt, __dataFilter } from '../helper';

import objectAssignDeep from 'object-assign-deep';

import PhaseStepIndicator from '../components/PhaseStepIndicator';
import BubbleProgressBar from '../components/BubbleProgressBar';


const choiceData = {
  original: {
    image: require('../assets/images/stack/original-block.png'),
    text: ['drift','story']
  },
  me: {
    image: require('../assets/images/stack/me.png'),
    text: ['shift','meStory']
  },
  opposite: {
    image: require('../assets/images/stack/opposite.png'),
    text: ['shift','oppositeStory']
  },
  desired: {
    image: require('../assets/images/stack/desired.png'),
    text: ['shift','desiredStory']
  },
};


/*
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
          <TextInput style={styles.fieldInputValue} placeholderTextColor={'#2c2c2c'} placeholder={data.placeholder || ''} 
            autoCorrect={false}
            underlineColorAndroid='transparent'
          />
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
*/


class StackPhaseStepFieldBubbleContent extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      loading: props.contentType === 'label',
      progress: 0,
    };
    this._isMounted = false;
    this.duration = 500 + __getRandomInt(500);
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.state.loading) {
      setTimeout(() => {
        this._isMounted && this.setState({
          loading: false,
        });
      }, this.duration);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {loading} = this.state;
    if (loading) {
      return <View style={[gstyles.container, {marginVertical: 18}]}><BubbleProgressBar duration={this.duration} /></View>
    }
    const {noBubble} = this.props;
    return (
      <View style={[gstyles.container, styles.container, styles.fieldBubbleContent, styles.fieldLabelContainer, styles.fieldLabelContainerBubble]}>
        <View style={[gstyles.container, styles.container, styles.fieldLabelContainer]}>{this.props.children}</View>
        { !noBubble && (
          <View style={styles.fieldLabelBubbleArrow}>
            <View style={styles.fieldLabelBubbleArrowBox} />
          </View>
        ) }
      </View>
    );
  }
}


class StackPhaseStepFieldBubbleValue extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }
  render() {
    const {noBubble} = this.props;

    return (
      <View style={[gstyles.container, styles.container, styles.fieldBubbleContent, styles.fieldLabelValueContainer, styles.fieldLabelValueContainerBubble]}>
        <Text style={styles.fieldLabelValueBubble}>{this.props.children}</Text>
        { !noBubble && (
          <View style={styles.fieldLabelValueBubbleArrow}>
            <View style={styles.fieldLabelValueBubbleArrowBox} />
          </View>
        ) }
      </View>
    );
  }
}

class StackPhaseStepField extends React.Component {
  render() {
    const {data, stack, phaseInd, stepInd} = this.props;
    const phaseId = __get([phaseInd, 'id'], StackPhaseData.data);
    let value = __get([phaseId, data.id], stack.status);
    if (typeof value === "boolean") {
      value = value ? 'Yes' : 'No';
    }
    let chosenImage = null;
    if (phaseId === 'shift' && data.id === 'why') {
      if (stack.status.shift.choice === 'original') {
        chosenImage = require('../assets/images/stack/original.png');
      } else {
        chosenImage = choiceData[stack.status.shift.choice].image;
      }
    }
    return (
      <View style={[gstyles.container, styles.container, styles.fieldContainer]}>
        <View style={[styles.fieldTrackPointer, {top: 16}]} />
        { phaseId === 'drift' && (data.id === 'feelings' || data.id === 'thoughts' || data.id === 'evidence' || data.id === 'possibilities') && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>Your story is:</Text>
            <Text style={styles.fieldLabelBubble}>{stack.status.drift.story}</Text>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'shift' && data.id === 'meStory' && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>Your "original" story is:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/original-block.png')} />
              <Text style={styles.fieldLabelBubble}>{stack.status.drift.story}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'shift' && data.id === 'meEvidence' && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>Your "me" story is:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/me.png')} />
              <Text style={styles.fieldLabelBubble}>{stack.status.shift.meStory}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'shift' && data.id === 'oppositeStory' && (
          [
            <StackPhaseStepFieldBubbleContent noBubble={true} key={0}>
              <Text style={styles.fieldLabelBubble}>Your "original" story is:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/original-block.png')} />
                <Text style={styles.fieldLabelBubble}>{stack.status.drift.story}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>,
            <StackPhaseStepFieldBubbleContent noBubble={true} key={1}>
              <Text style={styles.fieldLabelBubble}>Turns to:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/me.png')} />
                <Text style={styles.fieldLabelBubble}>{stack.status.shift.meStory}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>
          ]
        ) }
        { phaseId === 'shift' && data.id === 'oppositeEvidence' && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>Your "opposite" story is:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/opposite.png')} />
              <Text style={styles.fieldLabelBubble}>{stack.status.shift.oppositeStory}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'shift' && data.id === 'desiredStory' && (
          [
            <StackPhaseStepFieldBubbleContent noBubble={true} key={0}>
              <Text style={styles.fieldLabelBubble}>Your "original" story is:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/original-block.png')} />
                <Text style={styles.fieldLabelBubble}>{stack.status.drift.story}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>,
            <StackPhaseStepFieldBubbleContent noBubble={true} key={1}>
              <Text style={styles.fieldLabelBubble}>Turns to:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/me.png')} />
                <Text style={styles.fieldLabelBubble}>{stack.status.shift.meStory}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>,
            <StackPhaseStepFieldBubbleContent noBubble={true} key={2}>
              <Text style={styles.fieldLabelBubble}>Turns to:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/opposite.png')} />
                <Text style={styles.fieldLabelBubble}>{stack.status.shift.oppositeStory}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>
          ]
        ) }
        { phaseId === 'shift' && data.id === 'desiredEvidence' && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>Your "desired" story is:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/desired.png')} />
              <Text style={styles.fieldLabelBubble}>{stack.status.shift.desiredStory}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { data.type === 'blockBoolean' && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>{stack.status.intro.username}, you said you wanted:</Text>
            <Text style={styles.fieldLabelBubble}>{stack.status.drift.you}</Text>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'shift' && data.id === 'why' && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <Image style={styles.fieldShiftImage} source={chosenImage} />
              <Text style={styles.fieldLabelBubble}>{stack.status.shift.chosen}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'lift' && data.id === 'why' && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>{stack.status.intro.username}, the situation that triggered you was:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/trigger.png')} />
              <Text style={styles.fieldLabelBubble}>{stack.status.dark.trigger}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'lift' && data.id === 'what' && (
          [
            <StackPhaseStepFieldBubbleContent noBubble={true} key={0}>
              <Text style={styles.fieldLabelBubble}>{stack.status.intro.username}, the situation that triggered you was:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/trigger.png')} />
                <Text style={styles.fieldLabelBubble}>{stack.status.dark.trigger}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>,
            <StackPhaseStepFieldBubbleContent noBubble={true} key={1}>
              <Text style={styles.fieldLabelBubble}>This was positive because:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/positive.png')} />
                <Text style={styles.fieldLabelBubble}>{stack.status.lift.why}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>
          ]
        ) }
        { phaseId === 'lift' && (data.id === 'body' || data.id === 'being' || data.id === 'balance' || data.id === 'business') && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>The lesson was:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/lesson.png')} />
              <Text style={styles.fieldLabelBubble}>{stack.status.lift.what}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'light' && (data.id === 'why' || data.id === 'action') && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>Your revelation is:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/revelation.png')} />
              <Text style={styles.fieldLabelBubble}>{stack.status.light.revelation}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'light' && (data.id === 'must' || data.id === 'how') && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>Your action item in the next 48 hours is:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/action.png')} />
              <Text style={styles.fieldLabelBubble}>{stack.status.light.what}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }

        { !!data.label && (
          <StackPhaseStepFieldBubbleContent noBubble={data.type==='info' || data.type==='blockBoolean'} contentType={'label'}>
            <Text style={styles.fieldLabelBubble}>{__dataFilter(data.label, stack.status.intro)}</Text>
          </StackPhaseStepFieldBubbleContent>
        ) }

        { data.type === 'blockBoolean' && phaseId === 'shift' && data.id === 'originalWant' && (
            <StackPhaseStepFieldBubbleContent>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/original-block.png')} />
                <Text style={styles.fieldLabelBubble}>{stack.status.drift.story}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>
        ) }
        { data.type === 'blockBoolean' && phaseId === 'shift' && data.id === 'meWant' && (
          <StackPhaseStepFieldBubbleContent>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/me.png')} />
              <Text style={styles.fieldLabelBubble}>{stack.status.shift.meStory}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { data.type === 'blockBoolean' && phaseId === 'shift' && data.id === 'oppositeWant' && (
          <StackPhaseStepFieldBubbleContent>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/opposite.png')} />
              <Text style={styles.fieldLabelBubble}>{stack.status.shift.oppositeStory}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { data.type === 'blockBoolean' && phaseId === 'shift' && data.id === 'desiredWant' && (
          <StackPhaseStepFieldBubbleContent>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <Image style={styles.fieldShiftImage} source={require('../assets/images/stack/desired.png')} />
              <Text style={styles.fieldLabelBubble}>{stack.status.shift.desiredStory}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'shift' && data.id === 'choice' && (
          <View style={[gstyles.container, styles.fieldValueContainer, styles.fieldChoiceValueContainer]}>
            {
              ['original', 'me', 'opposite', 'desired'].map((type) =>
                <TouchableOpacity
                  key={type}
                  activeOpacity={0.9}
                  style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldChoiceValue, stack.status.shift.choice === type ? styles.fieldChoiceValueSelected : {}]}
                  onPress={() => this.props.updateChoice(type)}
                >
                  <Image style={[styles.fieldChoiceValueImage]} source={choiceData[type].image} />
                  <Text style={styles.fieldChoiceValueText}>{__get(choiceData[type].text, stack.status)}</Text>
                </TouchableOpacity>
              )
            }
          </View>
        ) }
        { (!!value && (phaseInd < stack.currentPhase || (phaseInd == stack.currentPhase && stepInd < stack.currentStep))) && (data.id !== 'choice') && (
            <StackPhaseStepFieldBubbleValue><Text>{value}</Text></StackPhaseStepFieldBubbleValue>
        ) }
        { phaseId === 'lift' && data.id === 'body' && !!stack.status.lift.body && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Image style={styles.fieldShiftImage} source={require('../assets/images/core4/icons/body-dark.png')} />
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'lift' && data.id === 'being' && !!stack.status.lift.being && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Image style={styles.fieldShiftImage} source={require('../assets/images/core4/icons/being-dark.png')} />
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'lift' && data.id === 'balance' && !!stack.status.lift.balance && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Image style={styles.fieldShiftImage} source={require('../assets/images/core4/icons/balance-dark.png')} />
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'lift' && data.id === 'business' && !!stack.status.lift.business && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Image style={styles.fieldShiftImage} source={require('../assets/images/core4/icons/business-dark.png')} />
          </StackPhaseStepFieldBubbleContent>
        ) }
      </View>
    );
  }
}

class StackPhaseStep extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.stack.currentStep === this.props.stepInd || nextProps.stack.currentStep - 1 === this.props.stepInd;
  }

  render() {
    const {data} = this.props;
    return (
      <View style={[gstyles.container, styles.container, styles.stepContainer]}>
        <View style={[gstyles.container, styles.container, styles.fieldsContainer]}>
          {
            data.fields.map((field, ind) => <StackPhaseStepField key={field.id} phaseInd={this.props.phaseInd} stepInd={this.props.stepInd} fieldInd={ind} data={field} stack={this.props.stack} updateChoice={(val) => this.props.updateChoice(val)} />)
          }
        </View>
      </View>
    );
  }
}

class StackPhase extends React.Component {

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
    const {data, stack} = this.props;
    return (
      <View style={[gstyles.container, styles.container, styles.phaseContainer]}>
        <View style={[gstyles.container, styles.container, styles.phaseLabel]}><Text style={styles.phaseLabelText}>{data.title.toUpperCase()}</Text></View>
        <View style={[gstyles.container, styles.container, styles.stepsContainer]}>
          {
            data.steps.filter((step, ind) => data.id!==__get([stack.currentPhase, 'id'],StackPhaseData.data) || ind<=stack.currentStep).map((step, ind) => <StackPhaseStep key={step.id} phaseInd={this.props.phaseInd} stepInd={ind} data={step} stack={this.props.stack} updateChoice={(val) => this.updateChoice(val)} />)
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
      isEditing: false,
    };

    this.core4Icons = {
      body: require('../assets/images/core4/icons/body.png'),
      being: require('../assets/images/core4/icons/being.png'),
      balance: require('../assets/images/core4/icons/balance.png'),
      business: require('../assets/images/core4/icons/business.png'),
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

class StackPhasePath extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isEditing: false,
    };

    this.powerlevels = {
      'alive': {
        state: 'ALIVE',
        name: 'NEARLY DEAD',
        image: require('../assets/images/stack/power-alive.png'),
        icon: require('../assets/images/warriorfit/alive.png')
      },
      'awake': {
        state: 'AWAKE',
        name: 'IN THE GAME',
        image: require('../assets/images/stack/power-awake.png'),
        icon: require('../assets/images/warriorfit/awake.png')
      },
      'active': {
        state: 'ACTIVE',
        name: 'BULLET PROOF',
        image: require('../assets/images/stack/power-active.png'),
        icon: require('../assets/images/warriorfit/active.png')
      },
      'ablaze': {
        state: 'ABLAZE',
        name: 'SUPER HUMAN',
        image: require('../assets/images/stack/power-ablaze.png'),
        icon: require('../assets/images/warriorfit/ablaze.png')
      }
    };

    this.feelings = ['aware', 'joy', 'hope', 'certainty', 'faith', 'peace', 'expansion', 'empathy', 'power', 'love', 'gratitude', 'awake', 'trust', 'supported', 'awe', 'focus', 'curious', 'creativity', 'happy', 'open', 'inspiration'];
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
                      Object.entries(this.powerlevels).map(([level, data]) =>
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
                      this.feelings.map((feeling) =>
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
              <TouchableOpacity style={styles.nextButton} onPress={() => this.props.finishStackAndMove()}><Text style={styles.nextButtonText}>FINISH</Text></TouchableOpacity>
            </View>
          )
        }
      </View>
    );
  }
}


class StackScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      keyboard: false,
    };
  }

  componentWillMount() {
    this.props.getStackData(new Date());
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this._keyboardDidShow());
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this._keyboardDidHide());
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    this.setState({keyboard: true});
  }

  _keyboardDidHide() {
    this.setState({keyboard: false});
  }

  moveNext() {
    const {stack} = this.props;
    this.props.moveToNextPhase(stack.currentPhase + 1);
  }
  restart() {
    this.props.getStackData(new Date());
  }

  finishStackAndMove() {
    this.props.finishStack().then(() => {
      this.props.getStackData(new Date()).then(() => {
        this.props.navigation.navigate('Core4');
      });
    })
  }

  render () {
    const {stack} = this.props;
    const {currentPhase, currentStep} = stack;
    const {keyboard} = this.state;
    return (
      <View style={[gstyles.container, styles.container, gstyles.gameContainer, gstyles.stackContainer, styles.stackContainer]}>
        <View style={[gstyles.container, styles.container, styles.stackPhasesContainer, currentPhase>0 && currentPhase<=StackPhaseData.data.length-1 ? styles.withIndicator : {}, keyboard ? styles.withKeyboard : {}]}>
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
              {
                StackPhaseData.data.length-1 < stack.currentPhase && <StackPhasePath finishStackAndMove={() => this.finishStackAndMove()} {...this.props} />
              }
            </View>
            {/*<View style={[gstyles.container, gstyles.flexRow, styles.nextButtonContainer]}>
              <TouchableOpacity style={styles.nextButton} onPress={() => this.moveNext()}><Text style={styles.nextButtonText}>• Next •</Text></TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={() => this.restart()}><Text style={styles.nextButtonText}>• Restart •</Text></TouchableOpacity>
            </View>*/}
          </ScrollView>
          {
            currentPhase>0 && currentPhase<=StackPhaseData.data.length-1 && <PhaseStepIndicator />
          }
        </View>
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
    getStackData: date => dispatch(getStackData(date)),
    moveToNextPhase: nextPhase => dispatch(moveToNextPhase(nextPhase)),
    moveToNextField: nextField => dispatch(moveToNextField(nextField)),
    updateStackField: fieldData => dispatch(updateStackField(fieldData)),
    finishStack: () => dispatch(finishStack()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StackScreen);
