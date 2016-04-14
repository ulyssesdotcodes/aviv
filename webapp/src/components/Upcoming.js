import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash/fp'

import EventDetail from './EventDetail.js'
import Events from './Events'

var time = 'future';

const Upcoming = (props) => {
  let newProps = _.extend(props, { scrollTo: (y) => window.scrollTo(0, y) });
  return (
    <Events {...newProps} time={ time } />
  )
}

function mapStateToProps(state) {
  return state.events[time] || { items: [] };
}

export default connect(mapStateToProps)(Upcoming);
