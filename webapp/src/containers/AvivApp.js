import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchEventsIfNeeded, invalidateEvents, loadMore } from '../actions'
import Infinite from 'react-infinite'

class AvivApp extends Component {
  constructor(props) {
    super(props)
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.props.dispatch(loadMore());
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(fetchEventsIfNeeded('venue'))
  }

  render() {
    var moreButton;

    console.log("props", this.props)

    if(this.props.next) {
      if(this.props.isFetchingMore) {
        moreButton = <span>...</span>
      }
      else {
        moreButton = this.props.next ? <a onClick={this.loadMore}> More </a> : undefined;
      }
    }

    var itemStyle = {
      height: 200
    }

    var els = this.props.items.map((event, i) => <li key={i} style={itemStyle}>{event.name}</li>)

    return (
      <div>
        <Infinite elementHeight={200}
      infiniteLoadBeginEdgeOffset={200}
      onInfiniteLoad={this.loadMore}
      useWindowAsScrollContainer
      isInfiniteLoading={this.props.isFetchingMore}
        >
          {els}
        </Infinite>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.events;
}

export default connect(mapStateToProps)(AvivApp);
