import React from 'react'

import { stationLookup } from '../data/stations'
import { haversine } from '../util'


const Location = ({ isAvailable, isLocating, location, station }) => {
  if (!isAvailable || !location) return null

  const stationInfo = stationLookup(station)
  const { lon: lon1, lat: lat1 } = location
  const { lon: lon2, lat: lat2 } = stationInfo
  const distance = haversine(lon1, lat1, lon2, lat2)

  return (
    <div className='mb3 p2 h6 border'>
      Distance to metro:
      <pre>{distance} miles</pre>
      Your location:
      <pre>{JSON.stringify(location, null, 2)}</pre>
      Station location:
      <pre>{JSON.stringify(stationInfo, null, 2)}</pre>
    </div>
  )
}

export default Location
