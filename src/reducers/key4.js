import Store from '../store/key4';
import objectAssignDeep from 'object-assign-deep';

export const initialState = Store;

export default function core4Reducer(state = initialState, action) {
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
        // return {...objectAssignDeep(state, action.data)};
	    }
      return initialState;
    }
    default:
      return state;
  }
}
