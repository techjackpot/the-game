import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Dimensions,
} from 'react-native';
import objectAssignDeep from 'object-assign-deep';
import StackPhaseData from '../constants/stack';
import { stack as styles, global as gstyles } from '../stylesheets';
import { getStackData } from '../actions/stack';
import PhaseStepIndicator from '../components/stack/PhaseStepIndicator';
import StackPhasePath from '../components/stack/StackPhasePath';
import StackPhasePit from '../components/stack/StackPhasePit';
import StackPhaseLight from '../components/stack/StackPhaseLight';
import StackPhase from '../components/stack/StackPhase';
import ProgressBar from 'react-native-progress/Bar';
import { __isSameDay } from '../helper';
import moment from 'moment';

const {height, width} = Dimensions.get('window');

class StackScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      keyboard: false,
    };
  }

  componentWillMount() {
    if (this.props.stackDate !== moment().format('dddd, MMMM Do')) {
      this.props.getStackData(new Date());
    }
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({keyboard: true});
      setTimeout(() => {
        const {currentPhase} = this.props;
        (currentPhase>0 && currentPhase<=StackPhaseData.data.length-1) && this.scrollView && this.scrollView.scrollToEnd();
      });
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({keyboard: false});
      setTimeout(() => {
        const {currentPhase} = this.props;
        (currentPhase>0 && currentPhase<=StackPhaseData.data.length-1) && this.scrollView && this.scrollView.scrollToEnd();
      });
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render () {
    const {currentPhase, progress} = this.props;
    const {keyboard} = this.state;
    return (
      <View style={[gstyles.container, styles.container, gstyles.gameContainer, gstyles.stackContainer, styles.stackContainer]}>
        <View style={[gstyles.container, styles.container, styles.stackPhasesContainer, currentPhase>0 && currentPhase<=StackPhaseData.data.length-1 ? styles.withIndicator : {}, keyboard ? styles.withKeyboard : {}]}>
          <View style={styles.overallProgressView}>
            <ProgressBar width={width} height={2} borderRadius={2} borderWidth={0} unfilledColor={'#414141'} progress={progress} color={'#bb0000'} />
          </View>
          <ScrollView
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight) => {
                this.scrollView.scrollToEnd();
            }}
          >
            <View style={[styles.fieldTrackBar]} />
            <View style={[gstyles.container, styles.container, styles.phasesContainer]}>
              <StackPhasePit />
              {
                StackPhaseData.data.filter((phase, ind) => ind!==0 && ind <= currentPhase).map((phase, ind) => phase.id==='light' ? <StackPhaseLight key={phase.id} phaseInd={ind+1} /> : <StackPhase key={phase.id} phaseInd={ind+1} />)
              }
              {
                StackPhaseData.data.length-1 < currentPhase && <StackPhasePath navigation={this.props.navigation} />
              }
            </View>
          </ScrollView>
          {
            currentPhase>0 && currentPhase<=StackPhaseData.data.length-1 && <PhaseStepIndicator />
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  stackDate: state.stack.date,
  currentPhase: state.stack.currentPhase || 0,
  progress: state.stack.progress || 0,
});

const mapDispatchToProps = {
  getStackData,
};

export default connect(mapStateToProps, mapDispatchToProps)(StackScreen);
