import Store from '../store/key4';
import objectAssignDeep from 'object-assign-deep';
import merge from 'deepmerge';

export const initialState = Store;

export default function key4Reducer(state = initialState, action) {
  switch (action.type) {
    case 'KEY4_LOAD_DATA': {
      if (action.data) {
        return {...objectAssignDeep(state, action.data)};
      }
      return initialState;
    }
    case 'KEY4_UPDATE_DATA': {
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
