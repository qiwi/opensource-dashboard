import React, { Component, Fragment } from 'react';
import './App.css';

import {Provider} from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

import store, {history} from './store';
import Router from './router';
import {Root, GlobalStyle} from './components/Layout'


class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <Root>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <div>
                <Router/>
              </div>
            </ConnectedRouter>
          </Provider>
        </Root>
      </Fragment>
    );
  }
}

export default App;
