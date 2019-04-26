import { createStore, applyMiddleware, combineReducers } from 'redux'
import { logger } from 'redux-logger'
import { connectRouter, routerMiddleware as rm } from 'connected-react-router'

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
const routerReducer = connectRouter(history)
const routerMiddleware = rm(history)
const appReducer = combineReducers({
  router: routerReducer,
  stats: statsReducer,
  project: projectReducer,
  projectList: projectListReducer
});
const reducer = reduceReducers(appReducer);
const store = createStore(reducer, initial, applyMiddleware(routerMiddleware, logger));

export {history}
export const dispatch = store.dispatch;
export default store;
