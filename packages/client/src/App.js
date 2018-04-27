import React, { Component } from 'react';
import './App.css';
import { render } from 'react-dom'

import {Provider} from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import store, {history} from './store';
import Router from './router';
import {Root} from './components/Layout'


class App extends Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              <Router/>
            </div>
          </ConnectedRouter>
        </Provider>
      </Root>
    );
  }
}

export default App;
