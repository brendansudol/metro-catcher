import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeStation, fetchTrains, fetchLocationIfPossible } from '../actions'
import '../css/layout.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Location from '../components/Location'
import Picker from '../components/Picker'
import Trains from '../components/Trains'


class App extends Component {
  static propTypes = {
    selectedStation: PropTypes.string.isRequired,
    trains: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedStation } = this.props
    dispatch(fetchTrains(selectedStation))
    dispatch(fetchLocationIfPossible())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedStation !== this.props.selectedStation) {
      const { dispatch, selectedStation } = nextProps
      dispatch(fetchTrains(selectedStation))
    }
  }

  handleChange = nextStation => {
    this.props.dispatch(changeStation(nextStation))
  }

  handleRefreshClick = e => {
    e.preventDefault()
    const { dispatch, selectedStation } = this.props
    dispatch(fetchTrains(selectedStation))
  }

  render() {
    const {
      isFetching,
      lastUpdated,
      stations,
      selectedStation,
      trains,
      userLocation
    } = this.props
    const isEmpty = trains.length === 0

    return (
      <div className='px3 mx-auto app' style={{ maxWidth: 500 }}>
        <Header />
        <main>
          <Picker
            value={selectedStation}
            onChange={this.handleChange}
            options={stations}
          />
          {isEmpty
            ? (isFetching ? <h3>Loading...</h3> : <h3>No train information at this time</h3>)
            : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                <Trains trains={trains} />
              </div>
          }
          <Location station={selectedStation} {...userLocation} />
          <p>
            {lastUpdated &&
              <span>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
              </span>
            }
            {!isFetching &&
              <a href="#!" onClick={this.handleRefreshClick}>Refresh</a>
            }
          </p>
        </main>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { trainsNearby, selectedStation, userLocation } = state
  const { isFetching, lastUpdated, items: trains } = trainsNearby

  return {
    isFetching,
    lastUpdated,
    selectedStation,
    trains,
    userLocation
  }
}

export default connect(mapStateToProps)(App)
