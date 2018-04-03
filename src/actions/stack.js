import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import Firebase from '../lib/firebase';
import moment from 'moment';
import initialData from '../store/stack';
import { __get, __set } from '../helper';

export function getStackData(date) {
  return dispatch => new Promise((resolve) => {
    return resolve(dispatch({
      type: 'STACK_LOAD_DATA',
      data: initialData,
    }));
  });
}

export function moveToNextPhase(nextPhase) {
	const data = __set(['currentPhase'], nextPhase);
	return dispatch => new Promise((resolve) => {
		return resolve(dispatch({
			type: 'STACK_NEXT_PHASE',
			data: data,
		}));
	});
}

export function moveToNextField(nextStep, force = false) {
	const data = __set(['currentStep'], nextStep);
	data.force = force;
	return dispatch => new Promise((resolve) => {
		return resolve(dispatch({
			type: 'STACK_NEXT_FIELD',
			data: data,
		}));
	});
}

export function updateStackField(fieldData) {
	const data = __set([fieldData.field, fieldData.phase, 'status'], fieldData.data);
	return dispatch => new Promise((resolve) => {
		return resolve(dispatch({
			type: 'STACK_UPDATE_FIELD',
			data: data,
		}));
	});
}

export function finishStack() {
	return (dispatch, getState) => new Promise(async (resolve) => {
    await statusMessage(dispatch, 'loading', true);
		const {user, stack} = getState();
		const UID = user.uid;
	  const challengeId = user && user.challenge && user.challenge.id || '';

	  if (!challengeId) return false;

		const weekId = moment().format('Y') + '' + moment().format('WW');

		const data = stack.status;

    // situation & clear are not questions, so we will subtract them from the total
    // 49 questions
    let runningTotal = 46.75;
    let total = Object.keys(data).reduce((s, type) => s + Object.keys(data[type]).reduce((t, key) => t + data[type][key]!==''?1:0 ,0), 0);
    let result = (total / runningTotal).toFixed(2);

		data.date = new Date();
		data.progress = result;

		return Firebase.firestore().collection('users').doc(UID).collection('apps').doc('ww').collection('challenges').doc(challengeId).collection('weeks').doc(weekId).collection('stacks').add(data).then(() => {
      setTimeout(async () => {
        resolve();
        await statusMessage(dispatch, 'loading', false);
      }, 1000); // Resolve after 1s so that user sees a message
			return resolve(dispatch({
				type: 'STACK_FINISH',
			}));
		}).catch(() => {
			return () => new Promise(() => resolve());
		});
	});
}
