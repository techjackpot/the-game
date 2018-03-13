import Types from './actionTypes';

export const setMainNav = nav =>
({type: Types.SET_MAINNAV, value: nav});

export const setTabIndex = index =>
({type: Types.SET_TABINDEX, value: index});
