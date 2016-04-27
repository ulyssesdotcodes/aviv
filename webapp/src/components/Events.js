import { fetchEventsIfNeeded, invalidateEvents, loadMore, selectEvent } from '../actions'
import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Scroll from 'react-scroll'

import EventDetail from './EventDetail'
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
  }

  componentWillUnmount() {
    window.onscroll = undefined;
  }

  loadMore() {
    this.props.dispatch(loadMore(this.props.time));
  }

  onScroll() {
    if(document.getElementsByTagName('body')[0].clientHeight - window.scrollY < 1000) {
      this.loadMore();
    }
  }

  render() {
    let selectEventP = _.partial(_.flowRight(this.props.dispatch, selectEvent), this.props.time);
    var els = this.props.items ? this.props.items.map((event, i) => {
      let select = (e) => {
        // Figure out the current detail height minus the title (which will stay) if that detail is above this one.
        let offset =  0;

        if (this._detail) {
          offset = this._detail.offsetTop < e.target.offsetTop ? this._detail.clientHeight - this._detail.querySelector(".event-summary").clientHeight : 0;
        }

        window.scroll(0, window.scrollY - offset);

        offset += 32; // Scroll padding
        Scroll.animateScroll.scrollTo(e.target.offsetTop - offset, { duration: 250 });
        selectEventP(event.id);
      }
      let eventProps = _.extend(event, { time: this.props.time });
      if(event.id == this.props.selected) {
        let height = this._detail ? this._detail.querySelector(".event-summary").clientHeight : 0;
        return (
            <div ref={(d) => this._detail=d } key={i}>
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
