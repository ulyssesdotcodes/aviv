import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import AvivApp from './AvivApp.js';
import todoApp from '../reducers';

const store = createStore(todoApp);

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <AvivApp />
        </Provider>
      </div>
    );
  }
}
