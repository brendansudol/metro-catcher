import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import 'basscss/css/basscss.css'

import { selectStation } from './actions'
import { stations, stationLookup } from './data/stations'
import reducer from './reducers'
import App from './containers/App'


const middleware = [ thunk, createLogger() ]
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

const hash = window.location.hash.slice(1)
const initialStation = stationLookup(hash) ? hash : 'C02'

store.dispatch(selectStation(initialStation))

render(
  <Provider store={store}>
    <App stations={stations} />
  </Provider>,
  document.getElementById('root')
)
