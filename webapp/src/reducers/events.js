import {
  INVALIDATE_EVENTS, REQUEST_EVENTS, REQUEST_MORE_EVENTS, RECEIVE_EVENTS, RECEIVE_MORE_EVENTS
} from '../actions'

function events(state = {
  isFetching: false,
  isFetchingMore: false,
  didInvalidate: false,
  items: []
}, action) {
  switch(action.type){
  case INVALIDATE_EVENTS:
    return Object.assign({}, state, {
      didInvalidate: true
    });
  case REQUEST_EVENTS:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
  case REQUEST_MORE_EVENTS:
    return Object.assign({}, state, {
      isFetchingMore: true,
      didInvalidate: false
    });
  case RECEIVE_EVENTS:
    return Object.assign({}, state, {
      isFetching: false,
      isFetchingMore: false,
      didInvalidate: false,
      items: action.events,
      next: action.next
    });
  case RECEIVE_MORE_EVENTS:
    return Object.assign({}, state, {
      isFetching: false,
      isFetchingMore: false,
      didInvalidate: false,
      items: state.items.concat(action.events),
      next: action.next
    });
  default:
    return state;
  }
}

export default events;


