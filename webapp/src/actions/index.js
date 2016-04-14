import fetch from 'isomorphic-fetch';

export const INVALIDATE_EVENTS = 'INVALIDATE_EVENTS';

var server = "http://venues.upopple.com/"

export function invalidateEvents(time) {
  return {
    type: INVALIDATE_EVENTS,
    time
  };
}

export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export function requestEvents(time) {
  return {
    type: REQUEST_EVENTS,
    time
  };
}

export const REQUEST_MORE_EVENTS = 'REQUEST_MORE_EVENTS';
export function requestMoreEvents(time) {
  return {
    type: REQUEST_MORE_EVENTS,
    time
  };
}


export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export function receiveEvents(time, json) {
  return {
    type: RECEIVE_EVENTS,
    time,
    events: json.events,
    next: json.next
  };
}

export const RECEIVE_MORE_EVENTS = 'RECEIVE_MORE_EVENTS';
export function receiveMoreEvents(time, json) {
  return {
    type: RECEIVE_MORE_EVENTS,
    events: json.events,
    next: json.next,
    time
  };
}

export const SELECT_EVENT = 'SELECT_EVENT';
export function selectEvent(time, id) {
  return {
    type: SELECT_EVENT,
    time,
    id
  };
}

export function fetchEvents(time) {
  return function(dispatch){
    dispatch(requestEvents(time));

    const timeFlag = time == 'past' ? true : false;

    return fetch(`${server}/events?past=${timeFlag}`, {}, 'GET')
      .then((response) => response.json())
      .then((json => dispatch(receiveEvents(time, json))))
      .catch((err) => console.log("ALERT ALERT", err));
  }
}

function shouldFetchEvents(state, time) {
  const events = state.events[time];
  if(!events){
    return true;
  } else if (events.isFetching) {
    return false;
  } else {
    return events.didInvalidate;
  }
}

export function fetchEventsIfNeeded(time) {
  return (dispatch, getState) => {
    if(shouldFetchEvents(getState(), time)) {
      return dispatch(fetchEvents(time));
    }
  }
}

export function loadMore(time) {
  return (dispatch, getState) => {
    const events = getState().events[time];
    if(!events || !events.next || events.isFetchingMore) {
      return;
    }

    dispatch(requestMoreEvents(time))

    return fetch(`${server}/events?${events.next}`, {}, 'GET')
      .then((response) => response.json())
      .then((json => dispatch(receiveMoreEvents(time, json))))
      .catch((err) => console.log("ALERT ALERT", err));
  }
}
