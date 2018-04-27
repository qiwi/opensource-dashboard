import {transport} from '../../api';
import {dispatch} from '../../store';

export const STATS_INIT = 'STATS_INIT';
export const STATS_ERR = 'STATS_ERR';
export const STATS_OK = 'STATS_OK';

export function getStats(id) {
  dispatch({
    type: STATS_INIT,
    data: {id}
  });

  return transport.get('http://localhost:8080/stats')
    .then(data => dispatch({
      type: STATS_OK,
      data: data
    }))
    .catch(e => dispatch({
      type: STATS_ERR,
      error: e
    }));
}

export default {
  getStats
}