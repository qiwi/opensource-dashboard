import {
  PROJECT_INIT,
  PROJECT_ERR,
  PROJECT_OK
} from '../actions/project';

export default (state = {}, action) => {
  switch(action.type) {
    case PROJECT_INIT:
      return null;
    case PROJECT_ERR:
      return {...state, _error: action.error};
    case PROJECT_OK:
      return action.data || state;
    default:
      return state;
  }
}