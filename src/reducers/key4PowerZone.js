import Store from '../store/key4PowerZone';
import objectAssignDeep from 'object-assign-deep';
import merge from 'deepmerge';

export const initialState = Store;

export default function key4PowerZoneReducer(state = initialState, action) {
  switch (action.type) {
    case 'KEY4_POWERZONE_LOAD_DATA': {
      if (action.data) {
        return {...objectAssignDeep(state, action.data)};
      }
      return initialState;
    }

    case 'KEY4_POWERZONE_UPDATE_DATA': {
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
