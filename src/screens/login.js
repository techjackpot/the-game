import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import DropdownAlert from 'react-native-dropdownalert';
import Spinner from 'react-native-loading-spinner-overlay';
import TextField from '../components/md-textinput';
import Loading from '../screens/loading';
const {height, width} = Dimensions.get('window');
import moment from 'moment';

import { login as styles, global as gstyles } from '../stylesheets';

import { login } from '../actions/user';

const loginBackground = require('../assets/images/signin_background.png');

class LoginScreen extends React.Component{

  static defaultProps = {
    error: null,
    user: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.user && props.user.email) ? props.user.email : '',
      password: '',
      ratio: width/414,
    };
  }

  handleSubmit() {
    this.props.onFormSubmit(this.state)
      .then(() => {
        this.props.navigation.navigate('Main');
      })
      .catch(e => this.dropdown.alertWithType('error', 'Error', e.message || e));
  }

  onClose(data) {
    // data = {type, title, message, action}
  }

  render () {
    const { loading, error } = this.props;

    return (
      <ImageBackground 
        style  = {styles.backgroundimage}
        source = {loginBackground}
      >
        <View style = {[styles.container/*, {opacity: (this.state.authChecked ? 1 : 0)}*/]}>
          {/*<Spinner 
              visible = {loading} 
              textContent = {"Signing in..."} 
              textStyle={{color: '#FFF'}} 
              overlayColor    = 'rgba(0, 0, 0, 0.5)'
          />*/}

          { loading && <Loading /> }
          
          <View style = {styles.topspace}>
            <View style = {styles.logoarea}>
              <Image 
                style  = { styles.logoimage }
                source = { require('../assets/images/logo.png') }
                resizeMode = {'contain'}
              >  
              </Image>
            </View>
            <View style={styles.apptitle}>
              <Text style={styles.chatchar}>T</Text>
              <Text style={styles.chatchar}>H</Text>
              <Text style={styles.chatchar}>E</Text>
              <Text style={styles.chatchar}> </Text>
              <Text style={styles.chatchar}>G</Text>
              <Text style={styles.chatchar}>A</Text>
              <Text style={styles.chatchar}>M</Text>
              <Text style={styles.chatchar}>E</Text>
            </View>
          </View>
          <KeyboardAvoidingView behavior='position' contentContainerStyle={styles.keyboardavoidingview}>
            <View style = {styles.inputfieldarea}>
              <TextField 
                  label          = {'EMAIL'} 
                  highlightColor = {'#00BCD4'} 
                  labelColor     = {'#ffffff'}
                  textColor      = {'#ffffff'}
                  inputStyle     = {{width: 300 * this.state.ratio, 
                                    fontSize: 22 * this.state.ratio, 
                                    color: '#ffffff'}}
                  keyboardType   = 'email-address'
                  autoCapitalize = {'none'} 
                  value          = {this.state.email}
                  onChangeText   = {(text) => this.setState({email: text})}
              />
            </View>
            <View style = {styles.inputfieldarea}>
              <TextField 
                  label          = {'PASSWORD'} 
                  highlightColor = {'#00BCD4'} 
                  labelColor     = {'#ffffff'}
                  textColor      = {'#ffffff'}
                  secureTextEntry= {true} 
                  inputStyle     = {{width: 300 * this.state.ratio, 
                                    fontSize: 22 * this.state.ratio, 
                                    color: '#ffffff'}}
                  autoCapitalize = {'none'}  
                  value          = {this.state.password}
                  onChangeText   = {(text) => this.setState({password: text})}
              />
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity
              activeOpacity = {0.6} 
              style         = {styles.signinbutton} 
              onPress       = {() => this.handleSubmit()}
          >
              <Text style = {styles.signinbuttontext}>
                  SIGN IN
              </Text>
          </TouchableOpacity>
          <DropdownAlert ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} />
          {/*<TouchableOpacity
              activeOpacity = {0.6} 
              style         = {styles.forgotpasswordbutton} 
              
          >
              <Text style = {styles.forgotpasswordbuttontext}>
                  FORGOT PASSWORD
              </Text>
          </TouchableOpacity>*/}
        </View>
      </ImageBackground>
    );
  }
}


const Login = ({
  onFormSubmit,
  user,
  isLoading,
  infoMessage,
  errorMessage,
  successMessage,
  navigation,
}) => (
  <LoginScreen
    user={user}
    loading={isLoading}
    info={infoMessage}
    error={errorMessage}
    success={successMessage}
    onFormSubmit={onFormSubmit}
    navigation={navigation}
  />
);

Login.propTypes = {
  user: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  infoMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

Login.defaultProps = {
  infoMessage: null,
  errorMessage: null,
  successMessage: null,
};

const mapStateToProps = state => {
  return {
    user: state.user || {},
    isLoading: state.status.loading || false,
    infoMessage: state.status.info || null,
    errorMessage: state.status.error || null,
    successMessage: state.status.success || null,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    onFormSubmit: data => dispatch(login(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
