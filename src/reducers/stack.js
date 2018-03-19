import Store from '../store/stack';
import objectAssignDeep from 'object-assign-deep';

export const initialState = Store;

export default function stackReducer(state = initialState, action) {
  switch (action.type) {
    case 'STACK_LOAD_DATA': {
    	if (action.data) {
        return {...objectAssignDeep(state, action.data)};
	    }
      return initialState;
    }
    case 'STACK_NEXT_PHASE': {
    	if (action.data) {
        if (action.data.currentPhase > state.currentPhase) {
          return {...state, currentPhase: action.data.currentPhase};
        }
        return {...state};
	    }
      return initialState;
    }
    case 'STACK_NEXT_FIELD': {
    	if (action.data) {
	      return {
	        ...state,
	      };
	    }
      return initialState;
    }
    case 'STACK_UPDATE_FIELD': {
    	if (action.data) {
	      return {...objectAssignDeep(state, action.data)};
	    }
      return initialState;
    }
    default:
      return state;
  }
}