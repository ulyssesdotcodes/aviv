import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import MediaQuery from 'react-responsive'
import _ from 'lodash/fp'

import Footer from '../components/Footer'
import Header from '../components/Header'

class AvivApp extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    var moreButton;

    return (
      <div>
        <Header title="Aviv" address="496 Morgan Ave" motto="All ages forever" email="avivbrooklyn@gmail.com" />
        <MediaQuery 
        <div className="content">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AvivApp);
