import { fetchEventsIfNeeded } from './actions'
import AvivApp from './containers/AvivApp.js'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import venueEventsApp from './reducers/index'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

const loggerMiddleware = createLogger()

let store = createStore(venueEventsApp, applyMiddleware(thunk));

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').venueEventsApp
    store.replaceReducer(nextRootReducer)
  });
}

render(
  <Provider store={store}>
    <AvivApp />
  </Provider>,
  document.getElementById('root')
)


