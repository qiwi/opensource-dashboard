import { createStore, applyMiddleware, combineReducers } from 'redux'
import { logger } from 'redux-logger'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import reduceReducers from 'reduce-reducers'
import createHistory from 'history/createBrowserHistory';
import statsReducer from './controllers/reducers/stats'
import projectReducer from './controllers/reducers/project'
import projectListReducer from './controllers/reducers/projectList'

const initial = {
  stats: null,
  projectList: null,
  project: null
}
const history =  createHistory({ basename: `/` });
const appReducer = combineReducers({
  router: routerReducer,
  stats: statsReducer,
  project: projectReducer,
  projectList: projectListReducer
});
const routerMdw = routerMiddleware(history);
const reducer = reduceReducers(appReducer);
const store = createStore(reducer, initial, applyMiddleware(routerMdw, logger));

export {history}
export const dispatch = store.dispatch;
export default store;

