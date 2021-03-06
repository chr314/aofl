const path = require('path');

const projectFileNames = {
  GENERATED_CONFIG: ['.aofl.json'],
  CONFIG: ['.aofl.js'],
};

const environments = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test'
};

const resources = {
  WEBPACK_CONFIG: path.join(__dirname, 'webpack-config'),
  CUSTOM_ELEMENTS_ES5_ADAPTER: path.join(__dirname, 'webpack-config', 'custom-elements-es5-adapter.js')
};

module.exports = {
  projectFileNames,
  environments,
  resources
};
