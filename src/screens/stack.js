import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import objectAssignDeep from 'object-assign-deep';
import StackPhaseData from '../constants/stack';
import { stack as styles, global as gstyles } from '../stylesheets';
import { getStackData } from '../actions/stack';
import PhaseStepIndicator from '../components/stack/PhaseStepIndicator';
import StackPhasePath from '../components/stack/StackPhasePath';
import StackPhasePit from '../components/stack/StackPhasePit';
import StackPhase from '../components/stack/StackPhase';

class StackScreen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      keyboard: false,
    };
  }

  componentWillMount() {
    this.props.getStackData(new Date());
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState({keyboard: true}));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({keyboard: false}));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render () {
    const {currentPhase} = this.props;
    const {keyboard} = this.state;
    return (
      <View style={[gstyles.container, styles.container, gstyles.gameContainer, gstyles.stackContainer, styles.stackContainer]}>
        <View style={[gstyles.container, styles.container, styles.stackPhasesContainer, currentPhase>0 && currentPhase<=StackPhaseData.data.length-1 ? styles.withIndicator : {}, keyboard ? styles.withKeyboard : {}]}>
          <ScrollView
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight) => {
                this.scrollView.scrollToEnd({animated: true});
            }}
          >
            <View style={[styles.fieldTrackBar]} />
            <View style={[gstyles.container, styles.container, styles.phasesContainer]}>
              <StackPhasePit />
              {
                StackPhaseData.data.filter((phase, ind) => ind!==0 && ind <= currentPhase).map((phase, ind) => <StackPhase key={phase.id} phaseInd={ind+1} />)
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
  currentPhase: state.stack.currentPhase || 0,
});

const mapDispatchToProps = {
  getStackData,
};

export default connect(mapStateToProps, mapDispatchToProps)(StackScreen);
