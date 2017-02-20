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
  trains: json['Trains'] || [],
  receivedAt: Date.now()
})

const fetchTrains = station => dispatch => {
  dispatch(requestTrains(station))
  const url = 'https://api.wmata.com/StationPrediction.svc/json/' +
              `GetPrediction/${station}?api_key=1e44298a93a74eae8488a86395a7adeb`
  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveTrains(station, json)))
    .catch(error => console.log(error))
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
