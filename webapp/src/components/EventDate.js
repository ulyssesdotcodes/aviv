import classnames from 'classnames'
import moment from 'moment'
import React from 'react'
import ReactDOM from 'react-dom'

const EventDate = (props) => {
  let eventDateClass = classnames();
  let date = moment(props.time);

  return (
      <div className="event-date">
        <div className="date">
          <span className="day-of-week">{date.format('ddd')}</span> <span className="date">{date.format('Do')}</span>
        </div>
        <div className="time">
          {date.format('ha')}
        </div>
      </div>
    )
  }

export default EventDate
