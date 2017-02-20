import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { selectStation, fetchTrainsIfNeeded, invalidateStation } from '../actions'
import Header from '../components/Header'
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
    dispatch(fetchTrainsIfNeeded(selectedStation))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedStation !== this.props.selectedStation) {
      const { dispatch, selectedStation } = nextProps
      dispatch(fetchTrainsIfNeeded(selectedStation))
    }
  }

  handleChange = nextStation => {
    this.props.dispatch(selectStation(nextStation))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedStation } = this.props
    dispatch(invalidateStation(selectedStation))
    dispatch(fetchTrainsIfNeeded(selectedStation))
  }

  render() {
    const {
      stations,
      selectedStation,
      trains,
      isFetching,
      lastUpdated,
    } = this.props
    const isEmpty = trains.length === 0

    return (
      <div className='p3 md-col-8 mx-auto'>
        <Header />
        <Picker
          value={selectedStation}
          onChange={this.handleChange}
          options={stations}
        />
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
        {isEmpty
          ? (isFetching ? <h3>Loading...</h3> : <h3>No train information at this time</h3>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Trains trains={trains} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedStation, trainsByStation } = state
  const {
    isFetching,
    lastUpdated,
    items: trains
  } = trainsByStation[selectedStation] || {
    isFetching: true,
    items: []
  }

  return {
    selectedStation,
    trains,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
