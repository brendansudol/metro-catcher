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
