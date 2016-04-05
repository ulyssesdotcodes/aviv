import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchEventsIfNeeded, invalidateEvents } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class AvivApp extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(fetchPostsIfNeeded('venue'))
  }
}
