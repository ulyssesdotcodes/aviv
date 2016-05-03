import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import { fetchEventsIfNeeded, invalidateEvents, loadMore } from '../actions'
import EventSummary from './EventSummary'

const Header = (props) => {

  return (
    <div className="header">
      <span className="title">{props.title}</span>
      <div className="meta">
        <ul className="slash-list">
          <li className="address"><a href="https://www.google.com/maps/place/AVIV/@40.7211274,-73.9404534,17z/data=!3m1!4b1!4m2!3m1!1s0x89c2594d04dc49ab:0xb6e99401cab84820" target="_blank">{props.address}</a></li>
          <li className="motto">{props.motto}</li>
        </ul>
        <ul className="slash-list">
          <li><IndexLink to="/" activeClassName="selected">Upcoming</IndexLink></li>
          <li><Link to="/past" activeClassName="selected">Past</Link></li>
          <li><Link to="/about" activeClassName="selected">About</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Header
