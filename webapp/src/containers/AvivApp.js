import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import _ from 'lodash/fp'

import Header from '../components/Header'

class AvivApp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var moreButton;

    return (
      <div>
        <Header title="Aviv" />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AvivApp);
