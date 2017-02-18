import React, { PropTypes } from 'react'


const Trains = ({trains}) => (
  <div>
    {trains.map((t, i) =>
      <pre key={i}>{JSON.stringify(t, null, 2)}</pre>
    )}
  </div>
)

Trains.propTypes = {
  trains: PropTypes.array.isRequired
}

export default Trains
