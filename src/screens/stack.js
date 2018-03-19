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

import { stack as styles, global as gstyles } from '../stylesheets';

import { StackPhaseData_Pit, StackPhaseData } from '../constants/stack';

import { getStackData, moveToNextPhase, moveToNextField, updateStackField } from '../actions/stack';

import { __get, __set } from '../helper';

class StackPhaseStepFieldInput extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }
  render() {
    const {data} = this.props;
    return (
      <View style={[gstyles.container, styles.container]}>
        { !!data.label && (
          <View style={[gstyles.container, styles.container, styles.fieldLabelContainer]}>
            <Text style={styles.fieldLabel}>{data.label.toUpperCase()}</Text>
          </View>
        ) }
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
        { !!data.label && (
          <View style={[gstyles.container, styles.container, styles.fieldLabelContainer]}>
            <Text style={styles.fieldLabel}>{data.label.toUpperCase()}</Text>
          </View>
        ) }
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
  }
  render() {
    const {data} = this.props;
    let Layout;
    switch(data.type) {
      case 'text':
        Layout = StackPhaseStepFieldInput;
        break;
      case 'single':
        Layout = StackPhaseStepFieldSingle;
        break;
      case 'multiple':
        Layout = StackPhaseStepFieldMultiple;
        break;
      default:
        Layout = StackPhaseStepFieldInput;
        break;
    }
    return (
      <View style={[gstyles.container, styles.container, styles.fieldContainer]}>
        <View style={[styles.fieldTrackPointer]} />
        <Layout data={data} />
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
            data.fields.map((field) => <StackPhaseStepField key={field.id} data={field} />)
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
    const {data} = this.props;
    return (
      <View style={[gstyles.container, styles.container, styles.phaseContainer]}>
        <View style={[gstyles.container, styles.container, styles.phaseLabel]}><Text style={styles.phaseLabelText}>{data.title.toUpperCase()}</Text></View>
        <View style={[gstyles.container, styles.container, styles.stepsContainer]}>
          {
            data.steps.map((step) => <StackPhaseStep key={step.id} data={step} />)
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
      intro: {
          title: '',
          core4: '',
          who: '',
          feeling: [],
      },
    };

    this.core4Icons = {
      body: require('../assets/images/core4/icons/body.png'),
      being: require('../assets/images/core4/icons/being.png'),
      balance: require('../assets/images/core4/icons/balance.png'),
      business: require('../assets/images/core4/icons/business.png'),
    };
  }
  render() {
    const {data} = this.props;
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
                      onChangeText={(text) => this.props.updateStackField({
                            phase: 'intro',
                            field: 'title',
                            data: text
                        })
                      }
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
                      __get(['steps', 1, 'fields', 0, 'options'], data).map((type) => <TouchableOpacity key={type} activeOpacity={0.9} style={[styles.fieldSingleValue]}><Image style={[styles.fieldSingleValueImage]} source={this.core4Icons[type]} /></TouchableOpacity>)
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
                    <TextInput style={styles.fieldInputValue} placeholderTextColor={'#2c2c2c'} placeholder={__get(['steps', 2, 'fields', 0, 'placeholder'], data)} />
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
                      __get(['steps', 3, 'fields', 0, 'options'], data).map((feeling) => <TouchableOpacity key={feeling} activeOpacity={0.9} style={[styles.fieldSingleValue]}><Text style={[styles.fieldSingleValueText]}>{feeling.toUpperCase()}</Text></TouchableOpacity>)
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

class StackScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      currentStep: 0,
    };
  }

  componentWillMount() {
    // this.props.getStackData(new Date());
  }

  moveNext() {
    console.log('done');
  }
  restart() {
    this.props.getStackData(new Date());
  }

  render () {
    const {step} = this.props;
    return (
      <View style={[gstyles.container, styles.container, gstyles.gameContainer, gstyles.stackContainer, styles.stackContainer]}>
        <StatusBar hidden={true} />
        <View style={[gstyles.container, styles.container, styles.stackPhasesContainer]}>
          <ScrollView>
            <View style={[styles.fieldTrackBar]} />
            <View style={[gstyles.container, styles.container, styles.phasesContainer]}>
              <StackPhasePit data={StackPhaseData_Pit} {...this.props} />
              {
                StackPhaseData.data.filter((phase, key) => key<=step).map(phase => <StackPhase key={phase.id} data={phase} />)
              }
            </View>
            <View style={[gstyles.container, gstyles.flexRow, styles.nextButtonContainer]}>
              <TouchableOpacity style={styles.nextButton} onPress={() => this.moveNext()}><Text style={styles.nextButtonText}>• Next •</Text></TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={() => this.restart()}><Text style={styles.nextButtonText}>• Restart •</Text></TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  stack: state.stack || {}
});

const mapDispatchToProps = {
  getStackData,
  moveToNextPhase,
  moveToNextField,
  updateStackField,
};

export default connect(mapStateToProps, mapDispatchToProps)(StackScreen);
