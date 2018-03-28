import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import Firebase from '../lib/firebase';
import initialData from '../store/key4';
import moment from 'moment';
import { __get, __set } from '../helper';

function getKey4DataDetails(dispatch, state, daySet) {
	const UID = state.user.uid;
	const {weekId} = daySet;
  const challengeId = state.user && state.user.challenge && state.user.challenge.id || '';

  if (!challengeId) return false;

	const listener = Firebase.firestore().collection('users').doc(UID).collection('apps').doc('ww').collection('challenges').doc(challengeId).collection('weeks').doc(weekId).collection('key4Targets').onSnapshot((querySnapshot) => {
		const data = {};
    querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data();
    });
		return dispatch({
			type: 'KEY4_LOAD_DATA',
			data,
		});
	});
}

export function getKey4Data(daySet) {
	return (dispatch, getState) => new Promise((resolve) => {
		Firebase.auth().onAuthStateChanged((loggedIn) => {
			if (loggedIn) {
				return resolve(getKey4DataDetails(dispatch, getState(), daySet));
			}
			return () => new Promise(() => resolve());
		});
	});
}


function updateKey4DataDetails(dispatch, state, daySet, data) {
	const UID = state.user.uid;
	const {weekId} = daySet;
  const challengeId = state.user && state.user.challenge && state.user.challenge.id || '';

  if (!challengeId) return false;

  const promises = [];
  Object.keys(data).map((key) => {
	promises.push(Firebase.firestore().collection('users').doc(UID).collection('apps').doc('ww').collection('challenges').doc(challengeId).collection('weeks').doc(weekId).collection('key4Targets').doc(key).set(data[key], {merge: true}));
  });

  Promise.all(promises).then(() => {
	return dispatch({
		type: 'KEY4_UPDATE_DATA',
		data,
	});
  }).catch(() => {
  	return false;
  })
}

export function updateKey4Data(daySet, data) {
	return (dispatch, getState) => new Promise((resolve) => {
		Firebase.auth().onAuthStateChanged((loggedIn) => {
			if (loggedIn) {
				return resolve(updateKey4DataDetails(dispatch, getState(), daySet, data));
			}
			return () => new Promise(() => resolve());
		});
	});
}
