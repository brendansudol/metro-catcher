import React, { Component } from 'react'

import { palette } from '../util'


class Icon extends Component {
  state = { idx: 0 }

  componentDidMount() {
    this.interval = setInterval(this.cycle, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  cycle = () => {
    this.setState(prevState => ({ idx: prevState.idx + 1 }))
  }

  render() {
    const color = palette[this.state.idx % palette.length]

    return (
      <svg
        className='mr1 align-middle'
        width='50'
        height='50'
        viewBox='0 0 45 45'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g stroke='none' fill='none'>
          <circle fill='#263238' cx='22.5' cy='22.5' r='22.5'></circle>
          <polygon fill='#546E7A' points='31 31 28 31 30 37 33 37'></polygon>
          <polygon fill='#546E7A' points='15 31 18 31 16 37 13 37'></polygon>
          <path
            d='M30,8 L16,8 C13.239,8 11,10.239 11,13 L11,29 C11,31.209 12.791,33 15,33 L31,33 C33.209,33 35,31.209 35,29 L35,13 C35,10.239 32.761,8 30,8 L30,8 Z'
            fill={color}
            style={{ transition: 'fill .4s ease-out' }}
          ></path>
          <circle fill='#E3F2FD' cx='31' cy='28' r='2'></circle>
          <circle fill='#E3F2FD' cx='15' cy='28' r='2'></circle>
          <path d='M22,23 L15,23 C13.895,23 13,22.105 13,21 L13,16 C13,14.895 13.895,14 15,14 L22,14 L22,23 L22,23 Z' fill='#35495D'></path>
          <path d='M24,14 L31,14 C32.105,14 33,14.895 33,16 L33,21 C33,22.105 32.105,23 31,23 L24,23 L24,14 L24,14 Z' fill='#35495D'></path>
          <path d='M27,12 L19,12 C18.448,12 18,11.552 18,11 L18,11 C18,10.448 18.448,10 19,10 L27,10 C27.552,10 28,10.448 28,11 L28,11 C28,11.552 27.552,12 27,12 L27,12 Z' fill='#E3F2FD'></path>
        </g>
      </svg>
    )
  }
}

export default Icon
