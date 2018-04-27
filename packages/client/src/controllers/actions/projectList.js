import {transport} from '../../api';
import {dispatch} from '../../store';

export const PROJECT_LIST_INIT = 'PROJECT_LIST_INIT';
export const PROJECT_LIST_ERR = 'PROJECT_LIST_ERR';
export const PROJECT_LIST_OK = 'PROJECT_LIST_OK';

export function getProjectList(id) {
  dispatch({
    type: PROJECT_LIST_INIT,
    data: {id}
  });

  return transport.get('http://localhost:8080/project')
    .then(data => dispatch({
      type: PROJECT_LIST_OK,
      data: data
    }))
    .catch(e => dispatch({
      type: PROJECT_LIST_ERR,
      error: e
    }));
}

export default {
  getProjectList
}