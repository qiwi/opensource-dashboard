import {
  STATS_INIT,
  STATS_ERR,
  STATS_OK
} from '../actions/stats';

export default (state = {}, action) => {
  switch(action.type) {
    case STATS_INIT:
      return null;
    case STATS_ERR:
      return {...state, _error: action.error};
    case STATS_OK:
      return action.data || state;
    default:
      return state;
  }
}