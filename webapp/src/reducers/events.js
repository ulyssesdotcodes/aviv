import {
  INVALIDATE_EVENTS, REQUEST_EVENTS, REQUEST_MORE_EVENTS, RECEIVE_EVENTS, RECEIVE_MORE_EVENTS, SELECT_EVENT
} from '../actions'

var initalEvents = {
  isFetching: false,
  isFetchingMore: false,
  didInvalidate: false,
  items: []
}

function events(state = {
  isFetching: false,
  isFetchingMore: false,
  didInvalidate: false,
  items: [],
  selected: -1
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
      next: action.next,
      selected: action.time != 'past' ? action.events[0].id : -1
    });
  case RECEIVE_MORE_EVENTS:
    return Object.assign({}, state, {
      isFetching: false,
      isFetchingMore: false,
      didInvalidate: false,
      items: state.items.concat(action.events),
      next: action.next
    });
  case SELECT_EVENT:
    return Object.assign({}, state, {
      selected: action.id
    });
  default:
    return state;
  }
}

function eventsByTime(state = {}, action) {
  switch(action.type) {
  case INVALIDATE_EVENTS:
  case RECEIVE_EVENTS:
  case RECEIVE_MORE_EVENTS:
  case REQUEST_EVENTS:
  case REQUEST_MORE_EVENTS:
  case SELECT_EVENT:
    return Object.assign({}, state, {
      [action.time]: events(state[action.time], action)
    })
  default:
    return state;
  }
}

export default eventsByTime;


