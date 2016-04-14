import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash/fp'

import Events from './Events'

var time = 'past';

const Past = (props) => {
  let newProps = _.extend(props, { scrollTo: (y) => window.scrollTo(0, y) });
  return (
    <Events {...newProps} time={ time } />
  )
}

function mapStateToProps(state) {
  return state.events[time] || {};
}
export default connect(mapStateToProps)(Past);
