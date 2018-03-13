// const firebase = require("firebase");
// require("firebase/firestore");

import firebase from 'react-native-firebase';

import {
    FIREBASE_CONFIG
} from './config';

// Initialize the Firebase SDK
const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);

export default firebaseApp;