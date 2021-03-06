import Store from '../store/core4';
import objectAssignDeep from 'object-assign-deep';
import merge from 'deepmerge';

export const initialState = Store;

export default function core4Reducer(state = initialState, action) {
  switch (action.type) {
    case 'CORE4_LOAD_DATA': {
      if (action.data) {
        return {...merge(state, action.data)};
      }
      return initialState;
    }
    case 'CORE4_UPDATE_DATA': {
    	if (action.data) {
        return state;
        // return {...merge(state, action.data)};
	    }
      return initialState;
    }
    default:
      return state;
  }
}
