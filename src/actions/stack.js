import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import Firebase from '../lib/firebase';
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

export function moveToNextPhase(data) {
	return dispatch => new Promise((resolve) => {
		return resolve(dispatch({
			type: 'STACK_NEXT_PHASE',
			data: initialData,
		}));
	});
}

export function moveToNextField(data) {
	return dispatch => new Promise((resolve) => {
		return resolve(dispatch({
			type: 'STACK_NEXT_FIELD',
			data: initialData,
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
