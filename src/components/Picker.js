import React, { PropTypes } from 'react'


const Picker = ({ value, onChange, options }) => {
  const sx = {
    select: {
      border: '1px solid #ccc',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      height: '2.25rem',
      lineHeight: 1.75,
      maxWidth: '100%',
    }
  }

  return (
    <div className='mb3'>
      <select
        onChange={e => onChange(e.target.value)}
        value={value}
        style={sx.select}
      >
        {options.map(o =>
          <option key={o.code} value={o.code}>
            {o.name}
          </option>
        )}
      </select>
    </div>
  )
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker
