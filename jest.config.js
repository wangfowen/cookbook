module.exports = {
  verbose: true,
  preset: "react-native",
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    "node_modules/(?!react-native|react-navigation)/"
  ],
  setupFiles: [
    "./jestSetup.js"
  ]
};