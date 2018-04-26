import {
  PROJECT_LIST_INIT,
  PROJECT_LIST_ERR,
  PROJECT_LIST_OK
} from '../actions/projectList';

export default (state = {}, action) => {
  switch(action.type) {
    case PROJECT_LIST_INIT:
      return null;
    case PROJECT_LIST_ERR:
      return {...state, _error: action.error};
    case PROJECT_LIST_OK:
      return action.data || state;
    default:
      return state;
  }
}