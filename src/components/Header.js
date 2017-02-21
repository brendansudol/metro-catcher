import React from 'react'

import IconMetro from './IconMetro'
import IconRunning from './IconRunning'


const Header = () => (
  <header className='py3'>
    <IconMetro />
    <IconRunning />
    <h1 className='inline-block h3'>DC Metro Catcher</h1>
  </header>
)

export default Header
