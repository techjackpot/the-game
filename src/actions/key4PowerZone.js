import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import Firebase from '../lib/firebase';
import initialData from '../store/key4PowerZone';
import moment from 'moment';
import { __get, __set } from '../helper';

function getKey4PowerZoneDataDetails(dispatch, state, daySet) {
  const UID = state.user.uid;
  const {weekId} = daySet;
  const challengeId = state.user && state.user.challenge && state.user.challenge.id || '';

  if (!challengeId) return false;

  const status_listener = Firebase.firestore().collection('users').doc(UID).collection('apps').doc('ww').collection('challenges').doc(challengeId).collection('weeks').doc(weekId).collection('key4').doc('metrics').onSnapshot((snapshot) => {
    if (snapshot.exists) {
      const data = snapshot.data() || {};
      return dispatch({
        type: 'KEY4_POWERZONE_LOAD_DATA',
        data,
      });
    }
    return false;
  });
  return status_listener;
}

export function getKey4PowerZoneData(daySet) {
  return (dispatch, getState) => new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((loggedIn) => {
      if (loggedIn) {
        return resolve(getKey4PowerZoneDataDetails(dispatch, getState(), daySet));
      }
      return () => new Promise(() => resolve());
    });
  });
}

function updateKey4PowerZoneDataDetails(dispatch, state, daySet, data) {
  const UID = state.user.uid;
  const {weekId} = daySet;
  const challengeId = state.user && state.user.challenge && state.user.challenge.id || '';

  if (!challengeId) return false;
  return Firebase.firestore().collection('users').doc(UID).collection('apps').doc('ww').collection('challenges').doc(challengeId).collection('weeks').doc(weekId).collection('key4').doc('metrics').set(data, {merge: true}).then(() => {
    return dispatch({
      type: 'KEY4_POWERZONE_UPDATE_DATA',
      data,
    });
  }).catch(() => {
    return false;
  });
}

export function updateKey4PowerZoneData(daySet, data) {
  return (dispatch, getState) => new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((loggedIn) => {
      if (loggedIn) {
        return resolve(updateKey4PowerZoneDataDetails(dispatch, getState(), daySet, data));
      }
      return () => new Promise(() => resolve());
    });
  });
}
