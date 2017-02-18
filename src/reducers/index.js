import { combineReducers } from 'redux'
import {
  SELECT_STATION, INVALIDATE_STATION,
  REQUEST_TRAINS, RECEIVE_TRAINS
} from '../actions'


const selectedStation = (state = 'vienna', action) => {
  switch (action.type) {
    case SELECT_STATION:
      return action.station
    default:
      return state
  }
}

const trains = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_STATION:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_TRAINS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_TRAINS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.trains,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const trainsByStation = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_STATION:
    case RECEIVE_TRAINS:
    case REQUEST_TRAINS:
      return {
        ...state,
        [action.station]: trains(state[action.station], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  trainsByStation,
  selectedStation
})

export default rootReducer
