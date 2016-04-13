import React from 'react'
import { connect } from 'react-redux'

import Events from './Events'

var time = 'future';

const Upcoming = (props) => {
  return (
    <Events {...props} time={ time } />
  )
}

function mapStateToProps(state) {
  return state.events[time] || {};
}

export default connect(mapStateToProps)(Upcoming);
