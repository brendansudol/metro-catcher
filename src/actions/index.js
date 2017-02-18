export const REQUEST_TRAINS = 'REQUEST_TRAINS'
export const RECEIVE_TRAINS = 'RECEIVE_TRAINS'
export const SELECT_STATION = 'SELECT_STATION'
export const INVALIDATE_STATION = 'INVALIDATE_STATION'

export const selectStation = station => ({
  type: SELECT_STATION,
  station
})

export const invalidateStation = station => ({
  type: INVALIDATE_STATION,
  station
})

export const requestTrains = station => ({
  type: REQUEST_TRAINS,
  station
})

export const receiveTrains = (station, json) => ({
  type: RECEIVE_TRAINS,
  station,
  trains: [json],
  receivedAt: Date.now()
})

const fetchTrains = station => dispatch => {
  dispatch(requestTrains(station))
  return fetch(`https://ipinfo.io/json`)
    .then(response => response.json())
    .then(json => dispatch(receiveTrains(station, json)))
}

const shouldFetchTrains = (state, station) => {
  const trains = state.trainsByStation[station]
  if (!trains) {
    return true
  }
  if (trains.isFetching) {
    return false
  }
  return trains.didInvalidate
}

export const fetchTrainsIfNeeded = station => (dispatch, getState) => {
  if (shouldFetchTrains(getState(), station)) {
    return dispatch(fetchTrains(station))
  }
}
