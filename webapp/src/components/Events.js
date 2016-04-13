import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchEventsIfNeeded, invalidateEvents, loadMore } from '../actions'
import EventSummary from './EventSummary'

const Events = class extends Component {
  constructor(props) {
    super(props)
    this.loadMore = this.loadMore.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      scroll: window.scrollY
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchEventsIfNeeded(this.props.time))
    window.onscroll = this.onScroll
  }

  componentWillUnmount() {
    window.onscroll = undefined;
  }

  loadMore() {
    this.props.dispatch(loadMore(this.props.time))
  }

  onScroll() {
    if(document.getElementsByTagName('body')[0].clientHeight - window.scrollY < 1000) {
      this.loadMore();
    }
    this.setState({scroll: window.scrollY});
  }

  render() {
    var els = this.props.items ? this.props.items.map((event, i) => <EventSummary {...event} key={i} />) : []

    return (
      <div className="events" onScroll={this.onScroll}>
        {els}
      </div>
    )
  }
}

export default Events
