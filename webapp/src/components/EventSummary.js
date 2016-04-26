import EventDate from './EventDate'
import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

const Event = (props) => {
  let ticketEl = props.ticket_uri ? <a href={props.ticket_uri} target="_blank">TIX >></a> : <span></span>

  let attendingText = props.time == 'past' ? "went" : "going";

  return (
      <div className="event-summary" onClick={props.onClick}>
        <div className="date" >
          <EventDate time={props.start_time} oneline={true} />
        </div>
        <div className="name">
          <span> {props.name} </span>
        </div>
      </div>
    )
  }

export default Event
