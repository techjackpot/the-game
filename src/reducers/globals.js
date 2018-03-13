import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import Types from '@actions/actionTypes';

export const initialState = Immutable({
  mainNav : null,
  tabIndex: 0
});

const setMainNav = (state, action) => ({
  ...state, 
  mainNav: action.value
});

const setTabIndex = (state, action) => ({
  ...state, 
  tabIndex: action.value
});

const actionHandlers = {
  [Types.SET_MAINNAV]  : setMainNav,
  [Types.SET_TABINDEX] : setTabIndex,
};

export default createReducer(initialState, actionHandlers);
