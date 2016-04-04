import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { fetchEvents } from './actions'
import venueEventsApp from './reducers'

const loggerMiddleware = createLogger()

let store = createStore(venueEventsApp, applyMiddleware(thunkMiddleware, loggerMiddleware ));

store.dispatch(fetchPostsIfNeeded('278407115702132')).then(() => console.log(store.getState()))
