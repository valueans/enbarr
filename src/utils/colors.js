const COLORS = {
  color1: '#617D86',
  color2: '#2F3C4C',
  color3: '#302F32',
  color4: '#DBE2E0',
  color5: '#CDCABF',
  color6: '#AFA89F',
  color7: '#CBC9C5',
  color8: '#F0ECE4',
  color9: '#EEEAE7',
  color10: '#313033',
  color11: '#f4f4f4',
  color12: '#a4a4a4',
  color13: '#0a0aa4',
  color14: '#bab9b9',
  color15: '#e1e1e1',
  color16: '#868686',
  color17: '#666666',
  color18: '#7a7a7a',
  color19: '#f4f3f2',
  white: '#ffffff',
  black: '#000000',
  grey:'#CCCCCC',
  green1: '#42FF00',

  red1: '#FF0009',
  red2: '#800020',
  red3: '#EA0000',
};

export default COLORS;

const opacity = [
  {code: '00', id: 0},
  {code: '0C', id: 5},
  {code: '19', id: 10},
  {code: '26', id: 15},
  {code: '33', id: 20},
  {code: '3F', id: 25},
  {code: '4C', id: 30},
  {code: '59', id: 35},
  {code: '66', id: 40},
  {code: '72', id: 45},
  {code: '7F', id: 50},
  {code: '8C', id: 55},
  {code: '99', id: 60},
  {code: 'A5', id: 65},
  {code: 'B2', id: 70},
  {code: 'BF', id: 75},
  {code: 'CC', id: 80},
  {code: 'D8', id: 85},
  {code: 'E5', id: 90},
  {code: 'F2', id: 95},
  {code: 'FF', id: 100},
];

export const ColorShade = (color, shade) => {
  const index = opacity.findIndex(item => item.id == shade);

  return `${color}${opacity[index].code}`;
};
