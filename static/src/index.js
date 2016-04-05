import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { fetchEventsIfNeeded } from './actions'
import venueEventsApp from './reducers'

const loggerMiddleware = createLogger()

let store = createStore(venueEventsApp, applyMiddleware(thunkMiddleware, loggerMiddleware ));

window.fbAsyncInit = () => {
  FB.init({
    appId      : '212022015831331',
    xfbml      : true,
    version    : 'v2.5'
  });
  store.dispatch(fetchEventsIfNeeded('278407115702132')).then(() => console.log(store.getState()))
}
