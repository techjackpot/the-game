import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import objectAssignDeep from 'object-assign-deep';
import StackPhaseData from '../../constants/stack';
import { __get, __getRandomInt, __dataFilter } from '../../helper';
import { stack as styles, global as gstyles } from '../../stylesheets';

import { updateStackField, moveToNextField, moveToNextPhase } from '../../actions/stack';

import BubbleProgressBar from './BubbleProgressBar';

export const shiftImages = {
  original: require('../../assets/images/stack/original.png'),
  originalBlock: require('../../assets/images/stack/original-block.png'),
  me: require('../../assets/images/stack/me.png'),
  opposite: require('../../assets/images/stack/opposite.png'),
  desired: require('../../assets/images/stack/desired.png'),
  trigger: require('../../assets/images/stack/trigger.png'),
  positive: require('../../assets/images/stack/positive.png'),
  lesson: require('../../assets/images/stack/lesson.png'),
  revelation: require('../../assets/images/stack/revelation.png'),
  action: require('../../assets/images/stack/action.png'),
  bodyDark: require('../../assets/images/core4/icons/body.png'),
  beingDark: require('../../assets/images/core4/icons/being.png'),
  balanceDark: require('../../assets/images/core4/icons/balance.png'),
  businessDark: require('../../assets/images/core4/icons/business.png'),
};

export const choiceData = {
  original: {
    image: shiftImages.originalBlock,
    text: ['drift','story']
  },
  me: {
    image: shiftImages.me,
    text: ['shift','meStory']
  },
  opposite: {
    image: shiftImages.opposite,
    text: ['shift','oppositeStory']
  },
  desired: {
    image: shiftImages.desired,
    text: ['shift','desiredStory']
  },
};

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

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.loading !== nextState.loading;
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
  shouldComponentUpdate(nextProps, nextState) {
    return false;
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
  constructor(props) {
    super(props);
  
    this.state = {};

    this.data = StackPhaseData.data[props.phaseInd].steps[props.stepInd].fields[props.fieldInd];
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

  addMoreAction() {

    const {stack} = this.props;
    stack.status.light.actions.push({
      what: '',
      must: '',
      how: ''
    });

    this.props.updateStackField({
      phase: 'light',
      field: 'actions',
      data: stack.status.light.actions
    }).then(() => {
      this.props.moveToNextField(2, true);
    });

  }

  finishAddingAction() {
    const {stack} = this.props;
    this.props.moveToNextPhase(stack.currentPhase+1);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.phaseInd === this.props.stack.currentPhase && this.props.stepInd === this.props.stack.currentStep;
  }

  render() {
    const {stack, phaseInd, stepInd, actionInd} = this.props;
    const data = this.data;
    const phaseId = __get([phaseInd, 'id'], StackPhaseData.data);
    const currentPhaseId = __get([stack.currentPhase, 'id'], StackPhaseData.data);
    let value_array = [phaseId, data.id];
    if (actionInd !== undefined) {
      value_array = [phaseId, 'actions', actionInd, data.id];
    }
    let value = __get(value_array, stack.status);
    if (typeof value === "boolean") {
      value = value ? 'Yes' : 'No';
    }
    let chosenImage = null;
    if (phaseId === 'shift' && data.id === 'why') {
      if (stack.status.shift.choice === 'original') {
        chosenImage = shiftImages.original;
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
              <FastImage style={styles.fieldShiftImage} source={shiftImages.originalBlock} />
              <Text style={styles.fieldLabelBubble}>{stack.status.drift.story}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'shift' && data.id === 'meEvidence' && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>Your "me" story is:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <FastImage style={styles.fieldShiftImage} source={shiftImages.me} />
              <Text style={styles.fieldLabelBubble}>{stack.status.shift.meStory}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'shift' && data.id === 'oppositeStory' && (
          [
            <StackPhaseStepFieldBubbleContent noBubble={true} key={0}>
              <Text style={styles.fieldLabelBubble}>Your "original" story is:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <FastImage style={styles.fieldShiftImage} source={shiftImages.originalBlock} />
                <Text style={styles.fieldLabelBubble}>{stack.status.drift.story}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>,
            <StackPhaseStepFieldBubbleContent noBubble={true} key={1}>
              <Text style={styles.fieldLabelBubble}>Turns to:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <FastImage style={styles.fieldShiftImage} source={shiftImages.me} />
                <Text style={styles.fieldLabelBubble}>{stack.status.shift.meStory}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>
          ]
        ) }
        { phaseId === 'shift' && data.id === 'oppositeEvidence' && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>Your "opposite" story is:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <FastImage style={styles.fieldShiftImage} source={shiftImages.opposite} />
              <Text style={styles.fieldLabelBubble}>{stack.status.shift.oppositeStory}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'shift' && data.id === 'desiredStory' && (
          [
            <StackPhaseStepFieldBubbleContent noBubble={true} key={0}>
              <Text style={styles.fieldLabelBubble}>Your "original" story is:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <FastImage style={styles.fieldShiftImage} source={shiftImages.originalBlock} />
                <Text style={styles.fieldLabelBubble}>{stack.status.drift.story}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>,
            <StackPhaseStepFieldBubbleContent noBubble={true} key={1}>
              <Text style={styles.fieldLabelBubble}>Turns to:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <FastImage style={styles.fieldShiftImage} source={shiftImages.me} />
                <Text style={styles.fieldLabelBubble}>{stack.status.shift.meStory}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>,
            <StackPhaseStepFieldBubbleContent noBubble={true} key={2}>
              <Text style={styles.fieldLabelBubble}>Turns to:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <FastImage style={styles.fieldShiftImage} source={shiftImages.opposite} />
                <Text style={styles.fieldLabelBubble}>{stack.status.shift.oppositeStory}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>
          ]
        ) }
        { phaseId === 'shift' && data.id === 'desiredEvidence' && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>Your "desired" story is:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <FastImage style={styles.fieldShiftImage} source={shiftImages.desired} />
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
              <FastImage style={styles.fieldShiftImage} source={chosenImage} />
              <Text style={styles.fieldLabelBubble}>{stack.status.shift.chosen}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'lift' && data.id === 'why' && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>{stack.status.intro.username}, the situation that triggered you was:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <FastImage style={styles.fieldShiftImage} source={shiftImages.trigger} />
              <Text style={styles.fieldLabelBubble}>{stack.status.dark.trigger}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'lift' && data.id === 'what' && (
          [
            <StackPhaseStepFieldBubbleContent noBubble={true} key={0}>
              <Text style={styles.fieldLabelBubble}>{stack.status.intro.username}, the situation that triggered you was:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <FastImage style={styles.fieldShiftImage} source={shiftImages.trigger} />
                <Text style={styles.fieldLabelBubble}>{stack.status.dark.trigger}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>,
            <StackPhaseStepFieldBubbleContent noBubble={true} key={1}>
              <Text style={styles.fieldLabelBubble}>This was positive because:</Text>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <FastImage style={styles.fieldShiftImage} source={shiftImages.positive} />
                <Text style={styles.fieldLabelBubble}>{stack.status.lift.why}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>
          ]
        ) }
        { phaseId === 'lift' && (data.id === 'body' || data.id === 'being' || data.id === 'balance' || data.id === 'business') && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>The lesson was:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <FastImage style={styles.fieldShiftImage} source={shiftImages.lesson} />
              <Text style={styles.fieldLabelBubble}>{stack.status.lift.what}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'light' && (data.id === 'why' || data.id === 'action') && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>Your revelation is:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <FastImage style={styles.fieldShiftImage} source={shiftImages.revelation} />
              <Text style={styles.fieldLabelBubble}>{stack.status.light.revelation}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'light' && (data.id === 'must' || data.id === 'how') && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <Text style={styles.fieldLabelBubble}>Your action item in the next 48 hours is:</Text>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <FastImage style={styles.fieldShiftImage} source={shiftImages.action} />
              <Text style={styles.fieldLabelBubble}>{stack.status.light.actions[actionInd].what}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }

        { data.type === 'text-multiple' && (
          <StackPhaseStepFieldBubbleContent noBubble={true} contentType={'label'}>
            <Text style={styles.fieldLabelBubble}>{__dataFilter(data.label, stack.status.intro, actionInd+1)}</Text>
          </StackPhaseStepFieldBubbleContent>
        ) }

        { data.type !== 'text-multiple' && !!data.label && (
          <StackPhaseStepFieldBubbleContent noBubble={data.type==='info' || data.type==='blockBoolean'} contentType={'label'}>
            <Text style={styles.fieldLabelBubble}>{__dataFilter(data.label, stack.status.intro)}</Text>
          </StackPhaseStepFieldBubbleContent>
        ) }

        { data.type === 'blockBoolean' && phaseId === 'shift' && data.id === 'originalWant' && (
            <StackPhaseStepFieldBubbleContent>
              <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
                <FastImage style={styles.fieldShiftImage} source={shiftImages.originalBlock} />
                <Text style={styles.fieldLabelBubble}>{stack.status.drift.story}</Text>
              </View>
            </StackPhaseStepFieldBubbleContent>
        ) }
        { data.type === 'blockBoolean' && phaseId === 'shift' && data.id === 'meWant' && (
          <StackPhaseStepFieldBubbleContent>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <FastImage style={styles.fieldShiftImage} source={shiftImages.me} />
              <Text style={styles.fieldLabelBubble}>{stack.status.shift.meStory}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { data.type === 'blockBoolean' && phaseId === 'shift' && data.id === 'oppositeWant' && (
          <StackPhaseStepFieldBubbleContent>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <FastImage style={styles.fieldShiftImage} source={shiftImages.opposite} />
              <Text style={styles.fieldLabelBubble}>{stack.status.shift.oppositeStory}</Text>
            </View>
          </StackPhaseStepFieldBubbleContent>
        ) }
        { data.type === 'blockBoolean' && phaseId === 'shift' && data.id === 'desiredWant' && (
          <StackPhaseStepFieldBubbleContent>
            <View style={[gstyles.container, gstyles.flexRow, styles.container, styles.fieldShiftImageLabelContainer]}>
              <FastImage style={styles.fieldShiftImage} source={shiftImages.desired} />
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
                  onPress={() => this.updateChoice(type)}
                >
                  <FastImage style={[styles.fieldChoiceValueImage]} source={choiceData[type].image} />
                  <Text style={styles.fieldChoiceValueText}>{__get(choiceData[type].text, stack.status)}</Text>
                </TouchableOpacity>
              )
            }
          </View>
        ) }
        { (data.type!=='text-multiple') && (data.id !== 'choice') && (!!value && (phaseInd < stack.currentPhase || (phaseInd == stack.currentPhase && stepInd < stack.currentStep))) && (
            <StackPhaseStepFieldBubbleValue><Text>{value}</Text></StackPhaseStepFieldBubbleValue>
        ) }
        
        { (data.type==='text-multiple') && (data.id !== 'choice') && (!!value && (phaseInd < stack.currentPhase || (phaseInd == stack.currentPhase && (stepInd < stack.currentStep || actionInd < stack.status.light.actions.length-1)))) && (
            <StackPhaseStepFieldBubbleValue><Text>{value}</Text></StackPhaseStepFieldBubbleValue>
        ) }

        { phaseId === 'lift' && data.id === 'body' && !!stack.status.lift.body && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <FastImage style={styles.fieldShiftImage} source={shiftImages.bodyDark} />
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'lift' && data.id === 'being' && !!stack.status.lift.being && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <FastImage style={styles.fieldShiftImage} source={shiftImages.beingDark} />
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'lift' && data.id === 'balance' && !!stack.status.lift.balance && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <FastImage style={styles.fieldShiftImage} source={shiftImages.balanceDark} />
          </StackPhaseStepFieldBubbleContent>
        ) }
        { phaseId === 'lift' && data.id === 'business' && !!stack.status.lift.business && (
          <StackPhaseStepFieldBubbleContent noBubble={true}>
            <FastImage style={styles.fieldShiftImage} source={shiftImages.businessDark} />
          </StackPhaseStepFieldBubbleContent>
        ) }
        { currentPhaseId === 'light' && actionInd === stack.status.light.actions.length-1 && phaseId === 'light' && data.id === 'how' && stack.currentStep>4 && (
          <View style={[gstyles.container, gstyles.flexRow, styles.addMoreActionButtonContainer]}>
            <TouchableOpacity style={styles.addMoreActionButton} onPress={() => this.addMoreAction()}><Text style={styles.addMoreActionButtonText}>Add Another Action</Text></TouchableOpacity>
            <TouchableOpacity style={styles.addMoreActionButton} onPress={() => this.finishAddingAction()}><Text style={styles.addMoreActionButtonText}>Next</Text></TouchableOpacity>
          </View>
        ) }
      </View>
    );
  }
}


const mapStateToProps = state => ({
  // currentStep: state.stack.currentStep || 0,
  stack: {...objectAssignDeep(state.stack || {}, {status: { intro: { username: state.user.name }}})}
});

const mapDispatchToProps = {
  updateStackField,
  moveToNextField,
  moveToNextPhase
};

export default connect(mapStateToProps, mapDispatchToProps)(StackPhaseStepField);
