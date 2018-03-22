import status from './status';
import user from './user';
import nav from './nav';
import stack from './stack';
import core4 from './core4';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  status,
  user,
  nav,
  stack,
  core4,
};
