import Store from '../store/stack';
import objectAssignDeep from 'object-assign-deep';
import merge from 'deepmerge';

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
          return {...state, currentPhase: action.data.currentPhase, currentStep: 0};
        }
        return {...state};
	    }
      return initialState;
    }
    case 'STACK_NEXT_FIELD': {
    	if (action.data) {
        if (action.data.currentStep > state.currentStep) {
          return {...state, currentStep: action.data.currentStep};
	      }
        return {...state};
	    }
      return initialState;
    }
    case 'STACK_UPDATE_FIELD': {
      if (action.data) {
        return {...objectAssignDeep(state, action.data)};
      }
      return initialState;
    }
    case 'STACK_FINISH': {
    	if (action.data) {
	      // return {...merge(state, action.data)};
	    }
      return initialState;
    }
    default:
      return state;
  }
}
