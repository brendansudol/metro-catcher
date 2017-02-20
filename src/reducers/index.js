import { combineReducers } from 'redux'

import { SELECT_STATION, REQUEST_TRAINS, RECEIVE_TRAINS } from '../actions'


const selectedStation = (state = 'C05', action) => {
  switch (action.type) {
    case SELECT_STATION:
      return action.station
    default:
      return state
  }
}

const trainsNearby = (state = {
  isFetching: false,
  items: [],
}, action) => {
  switch (action.type) {
    case REQUEST_TRAINS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_TRAINS:
      return {
        ...state,
        isFetching: false,
        items: action.trains.filter(t => t.DestinationCode && t.Line !== '--'),
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedStation,
  trainsNearby,
})

export default rootReducer
