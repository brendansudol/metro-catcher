import React, { PropTypes } from 'react'

import { formatTime, lines } from '../util'


const Trains = ({trains}) => (
  <div>
    {trains.map((t, i) =>
      <div
        key={i}
        className='mb2 pl1'
        style={{ borderLeft: `5px solid ${lines[t.Line].color}` }}
      >
        <span>{formatTime(t.Min)} ({t.DestinationName})</span>
      </div>
    )}
  </div>
)

Trains.propTypes = {
  trains: PropTypes.array.isRequired
}

export default Trains
