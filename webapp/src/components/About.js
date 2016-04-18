import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import { fetchEventsIfNeeded, invalidateEvents, loadMore } from '../actions'
import EventSummary from './EventSummary'

const About = (props) => {

  return (
    <div className="about">
      <div>
        <p className="blurb"> Aviv is a multi use art and performance space in Greenpoint, Brooklyn. Aviv was founded in November 2014 out of the ashes of Emet, a defunct loft space in Bushwick. </p>
      </div>

      <ul className="people">
        <li> Founders: Olivia Russin, Stuart Sliomon, Zack Wheeler </li>
        <li> Inhouse Booker: Tyler Kane of Ipsum </li>
        <li> Head of Sound: Jon Jurrow </li>
        <li> Tech Manager: Ulysses Popple </li>
        <li> Lieutenant Manager: Jim Testa </li>
      </ul>

      <div>
        <p>Currently featuring murals and installations by:</p>
        <p>Olivia Russin, Kristan Liu-Wong, Vreni Stollberger, Laura Knetzger, Christina Scott, Chelsea Elizabeth Birenberg, Prashast Thapan, Emma Dold, and Miles Joyner</p>
      </div>
    </div>
  )
}

export default About
