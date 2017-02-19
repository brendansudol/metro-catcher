import React, { PropTypes } from 'react'


const Picker = ({ value, onChange, options }) => (
  <div>
    <select
      onChange={e => onChange(e.target.value)}
      value={value}
    >
      {options.map(o =>
        <option key={o.code} value={o.code}>
          {o.name}
        </option>
      )}
    </select>
  </div>
)

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Picker
