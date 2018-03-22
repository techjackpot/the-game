import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../routes/AppNavigator';

const router = AppNavigator.router;
const loginNavAction = router.getActionForPathAndParams('Login');
const initialNavState = router.getStateForAction(loginNavAction);

const navReducer = (state = initialNavState, action) => {
  return router.getStateForAction(action, state);
};

export default navReducer;
