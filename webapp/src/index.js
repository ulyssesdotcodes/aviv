import { fetchEventsIfNeeded } from './actions'
import AvivApp from './containers/AvivApp'
import About from './components/About'
import Past from './components/Past'
import Upcoming from './components/Upcoming'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, hashHistory } from 'react-router'
import venueEventsApp from './reducers/index'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

require('./stylesheets/main.scss')

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
    <Router history={hashHistory}>
      <Route path="/" component={AvivApp}>
        <IndexRoute component={Upcoming} />
        <Route path="/past" component={Past} />
        <Route path="/about" component={About} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)


