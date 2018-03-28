import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../routes/AppNavigator';

const router = AppNavigator.router;
const authNavAction = router.getActionForPathAndParams('Auth');
const initialNavState = router.getStateForAction(authNavAction);

const navReducer = (state = initialNavState, action) => {
  return router.getStateForAction(action, state);
};

export default navReducer;
