import React from 'react'
import { connect } from 'react-redux'

import Events from './Events'

var time = 'past';

const Past = (props) => {
  return (
    <Events {...props} time={ time } />
  )
}

function mapStateToProps(state) {
  return state.events[time] || {};
}
export default connect(mapStateToProps)(Past);
