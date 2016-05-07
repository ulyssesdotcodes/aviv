import React from 'react';

const EventDescription = (props) => {
  const id = props.id,
        ticket_uri = props.ticket_uri,
        maxHeight = props.maxHeight,
        height = props.height,
        children = props.children;

  let ticketEl = ticket_uri ? <div className="purchase"><a href={ticket_uri} target="_blank">Tickets Available</a></div> : undefined

  const facebookLink = `https://facebook.com/${id}`;

  const maxHeightVal = maxHeight < 0 ? 'none' : maxHeight < height ? maxHeight - 100 : maxHeight;

  const showMore = maxHeight < height ? <a className="show-more" onClick={props.expandDescription}> v Show more v </a> : undefined;

  return (
      <div className="info">
        { ticketEl }
        <div className="detail-content" style={{ maxHeight: maxHeightVal }}>
          { children }
        </div>
        { showMore }
        <a className="facebook" href={facebookLink} target="_blank">See Facebook event &gt; </a>
      </div>
    );
};

module.exports = EventDescription;
