import {transport} from '../../api';
import {dispatch} from '../../store';

export const PROJECT_INIT = 'PROJECT_INIT';
export const PROJECT_ERR = 'PROJECT_ERR';
export const PROJECT_OK = 'PROJECT_OK';

export function getProject(id) {
  dispatch({
    type: PROJECT_INIT,
    data: {id}
  });

  return transport.get('http://localhost:8080/project/' + id)
    .then(data => dispatch({
      type: PROJECT_OK,
      data: data
    }))
    .catch(e => dispatch({
      type: PROJECT_ERR,
      error: e
    }));
}

export default {
  getProject
}