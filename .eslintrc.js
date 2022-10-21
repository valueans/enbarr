module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  rules: {
    'react-native/no-inline-styles': 0,
    'eslint-comments/no-unlimited-disable': 0,
    semi: ['error', 'never'],
    curly: 'off',
    'comma-dangle': ['error', 'never'],
    'prettier/prettier': [
      'error',
      {
        semi: false,
        parser: 'babel',
        trailingComma: 'none',
        arrowParens: 'avoid'
      }
    ]
  }
}
