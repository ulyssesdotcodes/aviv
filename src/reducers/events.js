import {
  INVALIDATE_EVENTS, REQUEST_EVENTS, RECEIVE_EVENTS
} from '../actions'

function events(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch(action.type){
  case INVALIDATE_EVENTS:
    return Object.assign({}, state, {
      didInvalidate: true
    });
  case REQUEST_POSTS:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
  case RECEIVE_EVENTS:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.events
    });
  default:
    return state;
  }
}

export default events;


