import promisify from 'es6-promisify';

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


export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export function receiveEvents(venue, json) {
  return {
    type: RECEIVE_EVENTS,
    venue,
    events: json.data
  };
}

export function fetchEvents(venue) {
  return function(dispatch){
    dispatch(requestEvents(venue));

    const api = promisify(FB.api);

    return api('/278407115702132/events', {}, 'GET')
      .then((response) => response.json())
      .then((events) => console.log("Got events ", events))
      .then((json => dispatch(receiveEvents(venue, json))))
      .catch((err) => console.log("ALERT ALERT", err));
  }
}

function shouldFetchEvents(state, venue) {
  const events = state.items;
  console.log("events", events)
  if(!events){
    return true;
  } else if (events.isFetching) {
    return false;
  } else {
    return events.didInvalidate;
  }
}

export function fetchEventsIfNeeded(venue) {
  return (dispatch, getState) => {
    if(shouldFetchEvents(getState(), venue)) {
      return dispatch(fetchEvents(venue));
    } else {
      return Promise.resolve();
    }
  }
}
