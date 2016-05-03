import classnames from 'classnames'
import React from 'react'
import ReactAutolink from 'react-autolink'
import ReactDOM from 'react-dom'
import _ from 'lodash'

import EventDate from './EventDate'
import EventSummary from './EventSummary'

const EventDetail = (props) => {
  let ticketEl = props.ticket_uri ? <a href={props.ticket_uri} target="_blank">TIX >></a> : <span></span>

  let description =
    _(props.description.split('\n'))
      .map((p, i) => ReactAutolink.autolink(p, {target: '_blank', key: i}))
      .map((p, i) => <p key={i}>{p}</p>)
      .value();

  let facebookLink = `https://facebook.com/${props.id}`;

  return (
      <div className="event-detail">
        <EventSummary {...props} />
        <div className="details">
          <div className="info">
            <div className="purchase">
              Tickets Available
            </div>
            <div className="description">
              {description}
            </div>
            <a className="facebook" href={facebookLink} target="_blank">See Facebook event &gt; </a>
          </div>
          <img className="poster" src={props.cover.source} />
        </div>
      </div>
    )
  }

export default EventDetail
