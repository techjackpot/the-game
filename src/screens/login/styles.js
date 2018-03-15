import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');
var ratio = width / 414;

const styles = StyleSheet.create({
    backgroundimage: {
      flex  : 1
    },
    container: {
      flex            : 1,
      alignItems      : 'center',
    },
    topspace: {
      height          : '40%',
      width           : '100%',
      alignItems      : 'center',
      justifyContent  : 'flex-end',
      paddingBottom   : 20 * ratio
    },
    logoarea: {
      height          : '50%',
      width           : '100%',
      justifyContent  : 'flex-end',
      alignItems      : 'center'
    },
    logoimage: {
      height: '90%'
    },
    apptitle: {
      flexDirection : 'row',
      marginTop     : 20 * ratio,
      height        : 70 * ratio
    },
    warriorchar: {
      fontFamily   : 'AgencyFB-Light',
      color        : '#000000',
      fontSize     : 45 * ratio,
      paddingRight : 2,
      paddingLeft  : 2,
      marginTop    : Platform.OS === 'ios' ? 6 : 5,
    },
    chatchar: {
      fontFamily   : 'AgencyFB-Bold',
      color        : '#000000',
      fontSize     : 48 * ratio,     
      paddingRight : 2,
      paddingLeft  : 2
    },
    keyboardavoidingview: {
      paddingTop: 100 * ratio
    },
    inputfieldarea: {
      marginLeft  : 10,
      marginRight : 10
    },
    signinbutton: {
      margin          : 10,
      width           : 300 * ratio,
      height          : 60  * ratio,
      backgroundColor : '#488fcc',
      justifyContent  : 'center'
    },
    signinbuttontext: {
      fontSize  : 14,
      textAlign : 'center',
      color     : '#ffffff'
    },
    forgotpasswordbutton: {
      margin          : 10,
      width           : 300 * ratio,
      height          : 15  * ratio,
      backgroundColor : 'transparent',
      justifyContent  : 'center'
    },
    forgotpasswordbuttontext: {
      fontSize  : 14,
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textAlign : 'center',
      color     : '#6c6c6c'
    },
});

export default styles;