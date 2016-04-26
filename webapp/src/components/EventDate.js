import classnames from 'classnames'
import moment from 'moment'
import React from 'react'
import ReactDOM from 'react-dom'

const EventDate = (props) => {
  let eventDateClass = classnames('event-date', { 'oneline': props.oneline });
  let date = moment(props.time);

  return (
      <div className={eventDateClass}>
        <span className="day-of-week">{date.format('dddd')}</span>
        <span className="date">{date.format('MMM D')}</span>
        <span className="time">{date.format('h:mm A')}</span>
      </div>
    )
  }

export default EventDate
