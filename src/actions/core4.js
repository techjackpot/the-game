import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import Firebase from '../lib/firebase';
import initialData from '../store/core4';
import moment from 'moment';
import { __get, __set } from '../helper';

function getCore4DataDetails(dispatch, state, daySet) {
	const UID = state.user.uid;
	const {weekId, dayId} = daySet;
  const challengeId = state.user && state.user.challenge && state.user.challenge.id || '';

  if (!challengeId) return false;

	const status_listener = Firebase.firestore().collection('users').doc(UID).collection('apps').doc('ww').collection('challenges').doc(challengeId).collection('weeks').doc(weekId).collection('core4').doc(dayId).onSnapshot((snapshot) => {
		if (snapshot.exists) {
			const data = snapshot.data() || {};
			return dispatch({
				type: 'CORE4_LOAD_DATA',
				data,
			});
		}
		return false;
	});
}

export function getCore4Data(daySet) {
	return (dispatch, getState) => new Promise((resolve) => {
		Firebase.auth().onAuthStateChanged((loggedIn) => {
			if (loggedIn) {
				return resolve(getCore4DataDetails(dispatch, getState(), daySet));
			}
			return () => new Promise(() => resolve());
		});
	});
}


function updateCore4DataDetails(dispatch, state, daySet, data) {
	const UID = state.user.uid;
	const {weekId, dayId} = daySet;
  const challengeId = state.user && state.user.challenge && state.user.challenge.id || '';

  if (!challengeId) return false;
  
  data.updatedAt = moment().toDate().getTime();

	Firebase.firestore().collection('users').doc(UID).collection('apps').doc('ww').collection('challenges').doc(challengeId).collection('weeks').doc(weekId).collection('core4').doc(dayId).set(data, {merge: true}).then(() => {
		return dispatch({
			type: 'CORE4_UPDATE_DATA',
			data,
		});
	}).catch(() => {
		return false;
	});
}

export function updateCore4Data(daySet, data) {
	return (dispatch, getState) => new Promise((resolve) => {
		Firebase.auth().onAuthStateChanged((loggedIn) => {
			if (loggedIn) {
				return resolve(updateCore4DataDetails(dispatch, getState(), daySet, data));
			}
			return () => new Promise(() => resolve());
		});
	});
}
