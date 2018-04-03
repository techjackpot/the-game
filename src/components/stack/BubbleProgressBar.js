import React from 'react';
import ProgressBar from 'react-native-progress/Bar';

import { stack as styles, global as gstyles } from '../../stylesheets';

export default class BubbleProgressBar extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      progress: 0,
    };
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    const {duration} = this.props;
    let timer = setInterval(() => {
      const {progress} = this.state;
      this._isMounted && this.setState({progress: progress + 0.02})
      if (progress >= 1) clearInterval(timer);
    }, duration / 200);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.progress <= 1;
  }
  render() {
    const {progress} = this.state;
    return <ProgressBar width={300} height={2} borderRadius={2} borderWidth={0} unfilledColor={'#414141'} progress={progress} color={'#bb0000'} />;
  }
}
