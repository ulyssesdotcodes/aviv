import EventDate from './EventDate'
import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

const Event = (props) => {
  let ticketEl = props.ticket_uri ? <a href={props.ticket_uri} target="_blank">TIX >></a> : <span></span>

  return (
      <div className="event-summary">
        <EventDate time={props.start_time} />
        <div className="title">
          <h1 className="name"> {props.name} </h1>
          <h5 className="attending"><span className="attending-count">{props.attending_count}</span> going</h5>
        </div>
        <div className="tickets">
          {ticketEl}
        </div>
      </div>
    )
  }

export default Event
