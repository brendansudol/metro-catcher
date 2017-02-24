import React from 'react'

import { stationLookup } from '../data/stations'
import { haversine } from '../util'


const MPH_RUN = 8
const MPH_WALK = 3

const Location = ({ isAvailable, isLocating, location, station }) => {
  if (!isAvailable || !location) return null

  const stationInfo = stationLookup(station)
  const { lon: lon1, lat: lat1 } = location
  const { lon: lon2, lat: lat2 } = stationInfo
  const distance = haversine(lon1, lat1, lon2, lat2)
  const minsRun = Math.round(distance / MPH_RUN * 60)
  const minsWalk = Math.round(distance / MPH_WALK * 60)
  const fmt = m => `${m} minute${m !== 1 ? 's' : ''}`

  return (
    <div className='mb3 p2 h5' style={{
      backgroundColor: '#eee',
      borderRadius: 5
    }}>
      You are <strong>{distance.toFixed(1)} miles</strong> from this station.
      You can make it there in <strong>{fmt(minsRun)}</strong> if you
      run ({MPH_RUN}mph) or <strong>{fmt(minsWalk)}</strong> if you walk
      ({MPH_WALK}mph). Good luck!
    </div>
  )
}

export default Location
