import EventDate from './EventDate'
import EventSummary from './EventSummary'
import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

const EventDetail = (props) => {
  let ticketEl = props.ticket_uri ? <a href={props.ticket_uri} target="_blank">TIX >></a> : <span></span>

  return (
      <div className="event-detail">
        <EventSummary {...props} />
        <div>
          <img src={props.cover.source} />
          <p> {props.description} </p>
        </div>
      </div>
    )
  }

export default EventDetail
