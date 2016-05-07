import classnames from 'classnames'
import React, { Component } from 'react'
import ReactAutolink from 'react-autolink'
import ReactDOM from 'react-dom'
import _ from 'lodash'

import EventDate from './EventDate'
import EventDescription from './EventDescription'
import EventSummary from './EventSummary'

const EventDetail = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxDescriptionHeight: -1,
      height: -1
    }
  }

  shrinkDescription(e) {
    const height = ReactDOM.findDOMNode(this.refs.description).clientHeight;
    this.setState({ maxDescriptionHeight: e.target.clientHeight, height });
  }

  expandDescription() {
    this.setState({ maxDescriptionHeight: this.state.height })
  }

  render() {
    const description =
      _(this.props.description.split('\n'))
        .map((p, i) => ReactAutolink.autolink(p, {target: '_blank', key: i}))
        .map((p, i) => <p key={i}>{p}</p>)
        .value();

    const descriptionProps = _.extend({}, this.props, {
      height: this.state.height,
      maxHeight: this.state.maxDescriptionHeight,
      expandDescription: this.expandDescription.bind(this)
    });

    return (
        <div className="event-detail">
          <EventSummary { ...this.props }/>
          <div className="details">
            <EventDescription { ...descriptionProps } >
              <div className="description" ref="description">
                { description }
              </div>
            </EventDescription>
            <div className="poster" >
              <img onLoad={ this.shrinkDescription.bind(this) } src={this.props.cover.source} />
            </div>
          </div>
        </div>
      )
    }
  }

export default EventDetail
