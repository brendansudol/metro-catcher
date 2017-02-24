export const REQUEST_TRAINS = 'REQUEST_TRAINS'
export const RECEIVE_TRAINS = 'RECEIVE_TRAINS'
export const SELECT_STATION = 'SELECT_STATION'
export const REQUEST_LOCATION = 'REQUEST_LOCATION'
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION'
export const FAIL_LOCATION = 'FAIL_LOCATION'


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

export const fetchTrains = station => dispatch => {
  dispatch(requestTrains(station))
  const url = 'https://api.wmata.com/StationPrediction.svc/json/' +
              `GetPrediction/${station}?api_key=1e44298a93a74eae8488a86395a7adeb`
  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveTrains(station, json)))
    .catch(error => console.log(error))
}

export const selectStation = station => ({
  type: SELECT_STATION,
  station
})

export const changeStation = station => dispatch => {
  dispatch(selectStation(station))
  window.location.hash = station
}

export const requestLocation = () => ({
  type: REQUEST_LOCATION
})

export const receiveLocation = pos => ({
  type: RECEIVE_LOCATION,
  coords: pos.coords
})

export const failLocation = () => ({
  type: FAIL_LOCATION,
})

const fetchLocation = () => dispatch => {
  dispatch(requestLocation())

  navigator.geolocation.getCurrentPosition(
    (position) => dispatch(receiveLocation(position)),
    (error) => dispatch(failLocation()),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  )
}

export const fetchLocationIfPossible = () => (dispatch, getState) => {
  const { isAvailable } = getState().userLocation

  if (!isAvailable) return
  if (!navigator.geolocation) return dispatch(failLocation())
  return dispatch(fetchLocation())
}
