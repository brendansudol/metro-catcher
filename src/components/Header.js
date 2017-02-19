import React from 'react'


const Header = () => {
  const sx = {
    h: {
      fontSize: 20,
      marginBottom: 32,
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
    img: {
      marginRight: 8,
      verticalAlign: 'middle',
    },
  }

  return (
    <h1 style={sx.h}>
      <img
        width='50'
        alt='metro'
        src={`${process.env.PUBLIC_URL}/metro.svg`}
        style={sx.img}
      />
      Metro Catcher
    </h1>
  )
}

export default Header
