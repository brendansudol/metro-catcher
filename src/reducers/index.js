import { combineReducers } from 'redux'

import {
  REQUEST_TRAINS, RECEIVE_TRAINS, SELECT_STATION,
  REQUEST_LOCATION, RECEIVE_LOCATION, FAIL_LOCATION,
} from '../actions'


const isEligible = t => t.DestinationCode && t.Min.length && t.Line !== '--'

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
        items: action.trains.filter(isEligible),
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const selectedStation = (state = '', action) => {
  switch (action.type) {
    case SELECT_STATION:
      return action.station
    default:
      return state
  }
}

const userLocation = (state = {
  isAvailable: true,
  isLocating: false,
  location: null,
}, action) => {
  switch (action.type) {
    case REQUEST_LOCATION:
      return {
        ...state,
        isLocating: true,
      }
    case RECEIVE_LOCATION:
      return {
        ...state,
        isLocating: false,
        location: {
          lat: action.coords.latitude,
          lon: action.coords.longitude,
        }
      }
    case FAIL_LOCATION:
      return {
        ...state,
        isLocating: false,
        isAvailable: false,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  trainsNearby,
  selectedStation,
  userLocation,
})

export default rootReducer
