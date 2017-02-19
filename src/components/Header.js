import React from 'react'


const Header = () => (
  <h1 className='mb3 h3 caps'>
    <img
      className='mr1 align-middle'
      width='50'
      height='50'
      alt='metro'
      src={`${process.env.PUBLIC_URL}/metro.svg`}
    />
    DC Metro Catcher
  </h1>
)

export default Header
