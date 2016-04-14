import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchEventsIfNeeded, invalidateEvents, loadMore, selectEvent } from '../actions'
import EventDetail from './EventDetail'
import EventSummary from './EventSummary'
import _ from 'lodash'

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
  }

  render() {
    let selectEventP = _.partial(_.flowRight(this.props.dispatch, selectEvent), this.props.time);
    var els = this.props.items ? this.props.items.map((event, i) => {
      let select = _.partial(selectEventP, event.id);
      let eventProps = _.extend(event, { time: this.props.time });
      if(event.id == this.props.selected) {
        return (
          <div ref={(ref) => { if(ref && i !=0) this.props.scrollTo(ref.offsetTop); }} key={i} >
            <EventDetail {...eventProps} />
          </div>
        )
      }
      else {
        return <EventSummary {...eventProps} key={i} onClick={select} />
      }
    }) : [];

    return (
      <div className="events" onScroll={this.onScroll}>
        {els}
      </div>
    )
  }
}

export default Events
