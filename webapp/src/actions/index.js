import fetch from 'isomorphic-fetch';

export const INVALIDATE_EVENTS = 'INVALIDATE_EVENTS';

export function invalidateEvents(venue) {
  return {
    type: INVALIDATE_EVENTS,
    venue
  };
}

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export function requestEvents(venue) {
  return {
    type: REQUEST_EVENTS,
    venue
  };
}

export const REQUEST_MORE_EVENTS = 'REQUEST_MORE_EVENTS';
export function requestMoreEvents() {
  return {
    type: REQUEST_MORE_EVENTS
  };
}


export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export function receiveEvents(venue, json) {
  return {
    type: RECEIVE_EVENTS,
    venue,
    events: json.events,
    next: json.next
  };
}

export const RECEIVE_MORE_EVENTS = 'RECEIVE_MORE_EVENTS';
export function receiveMoreEvents(json) {
  return {
    type: RECEIVE_MORE_EVENTS,
    events: json.events,
    next: json.next
  };
}

export function fetchEvents(venue) {
  return function(dispatch){
    dispatch(requestEvents(venue));

    return fetch('http://localhost:3000/events?past=true', {}, 'GET')
      .then((response) => response.json())
      .then((json => dispatch(receiveEvents(venue, json))))
      .catch((err) => console.log("ALERT ALERT", err));
  }
}

function shouldFetchEvents(state, venue) {
  const events = state.items;
  if(!events){
    return true;
  } else if (state.isFetching) {
    return false;
  } else {
    return state.didInvalidate;
  }
}

export function fetchEventsIfNeeded(venue) {
  return (dispatch, getState) => {
    if(shouldFetchEvents(getState(), venue)) {
      return dispatch(fetchEvents(venue));
    }
  }
}

export function loadMore() {
  return (dispatch, getState) => {
    dispatch(requestMoreEvents())

    const events = getState().events;
    return fetch(`http://localhost:3000/events?${events.next}`, {}, 'GET')
      .then((response) => response.json())
      .then((json => dispatch(receiveMoreEvents(json))))
      .catch((err) => console.log("ALERT ALERT", err));
  }
}
