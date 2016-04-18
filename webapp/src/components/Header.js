import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import { fetchEventsIfNeeded, invalidateEvents, loadMore } from '../actions'
import EventSummary from './EventSummary'

const Header = (props) => {

  return (
    <div className="header">
      <h1 className="title">{props.title}</h1>
      <h3 className="motto">All ages, all the time.</h3>
      <ul className="links">
        <li><IndexLink to="/" activeClassName="selected">Upcoming</IndexLink></li>
        <li><Link to="/past" activeClassName="selected">Past</Link></li>
      </ul>
    </div>
  )
}

export default Header
