const codes = { 'ARR': 'Arriving', 'BRD': 'Boarding' }

export const formatTime = n => {
  if (n.length > 0 && !isNaN(+n)) return `${n} min${+n !== 1 ? 's' : ''}`
  return codes[n] || 'N/A'
}

export const lines = {
  'RD': { name: 'Red', color: '#f63d2d' },
  'BL': { name: 'Blue', color: '#007ac3' },
  'YL': { name: 'Yellow', color: '#ffdf00' },
  'OR': { name: 'Orange', color: '#ff902f' },
  'GR': { name: 'Green', color: '#1e9b58' },
  'SV': { name: 'Silver', color: '#a2a4a1' },
}

export const palette = Object.keys(lines).map(k => lines[k].color)

export const haversine = (lon1, lat1, lon2, lat2) => {
  const radians = deg => deg * Math.PI / 180

  const dlon = radians(lon2 - lon1)
  const dlat = radians(lat2 - lat1)

  const a = Math.pow(Math.sin(dlat / 2), 2) + (
    Math.cos(radians(lat1)) *
    Math.cos(radians(lat2)) *
    Math.pow(Math.sin(dlon / 2), 2)
  )
  const c = 2 * Math.asin(Math.sqrt(a))

  const radius_earth_m = 6371000
  const meters = radius_earth_m * c
  const miles = meters * 0.621371 / 1000.0

  return miles
}
