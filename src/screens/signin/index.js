import React, { Component } from 'react';
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
  StatusBar
} from 'react-native';

import firebaseApp from '@firebasehelper';

import DropdownAlert from 'react-native-dropdownalert';

import Spinner from 'react-native-loading-spinner-overlay';
import TextField from '../../components/md-textinput';
import AuthService from '../../services/authservice';
import styles from './styles';
var {height, width} = Dimensions.get('window');

import { connect } from 'react-redux';
import { setMainNav } from '@actions/globals';

class SigninScreen extends React.Component{

  constructor(props) {
    
    super(props);
    this.state = {
      isloggingin   : false,
      email         : '',
      password      : '',
      ratio         : width/414,
      invalidAuth   : false,
      authChecked   : false
    };
  }

  componentWillMount() {
    this.props.setMainNav(this.props.navigation);
    AuthService.requireSignIn().then((user) => {
      this.setState({
        isloggingin   : false,
      });
      this.props.navigation.navigate('Main');
    }).catch((err) => {
      this.setState({
        authChecked: true
      });
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.authChecked) {
      return false;
    }
    return true;
  }
  
  onSignin() {
    // if(this.state.email == '' || this.state.password == '') {
    //   return;
    // }
    this.setState({isloggingin: true});

    AuthService.signin(this.state.email, this.state.password)
      .then((uid) => {
        this.setState({isloggingin: false});
        this.props.navigation.navigate('Main');
      })
      .catch((err) => {
        // console.log('login failed', err)
        this.setState({
          isloggingin : false,
          email       : '',
          password    : '',
          invalidAuth : true,
        });
        this.dropdown.alertWithType('error', 'Error', err.message);
      })
  }

  onClose(data) {
    this.setState({
      invalidAuth : false
    });
  }

  render () {
    return (
      <ImageBackground 
        style  = {styles.backgroundimage}
        source = {require('../../assets/images/signin_background.png')}
      >
        <StatusBar hidden={true} />
        <View style = {[styles.container, {opacity: (this.state.authChecked ? 1 : 0)}]}>
          <Spinner 
              visible = {this.state.isloggingin} 
              textContent = {"Signing in..."} 
              textStyle={{color: '#FFF'}} 
              overlayColor    = 'rgba(0, 0, 0, 0.5)'
          />
          
          <View style = {styles.topspace}>
            <View style = {styles.logoarea}>
              <Image 
                style  = { styles.logoimage }
                source = { require('../../assets/images/logo.png') }
                resizeMode = {'contain'}
              >  
              </Image>
            </View>
            <View style={styles.apptitle}>
              <Text style={styles.warriorchar}>W</Text>
              <Text style={styles.warriorchar}>A</Text>
              <Text style={styles.warriorchar}>R</Text>
              <Text style={styles.warriorchar}>R</Text>
              <Text style={styles.warriorchar}>I</Text>
              <Text style={styles.warriorchar}>O</Text>
              <Text style={styles.warriorchar}>R</Text>
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
              onPress       = {()=>this.onSignin()}
          >
              <Text style = {styles.signinbuttontext}>
                  SIGN IN
              </Text>
          </TouchableOpacity>
          <DropdownAlert ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} />
          <TouchableOpacity
              activeOpacity = {0.6} 
              style         = {styles.forgotpasswordbutton} 
              
          >
              <Text style = {styles.forgotpasswordbuttontext}>
                  FORGOT PASSWORD
              </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
      dispatch,
      setMainNav: value => dispatch(setMainNav(value))
  };
}

function mapStateToProps(state) {
  return { 
      globals : state.get('globals'),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);