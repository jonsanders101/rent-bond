const colors = require('colors');

/* eslint-disable no-console */

const nodeEnv = process.env.NODE_ENV;

const modeConsoleOutput = () => {
  if (nodeEnv === 'production') {
    return 'PRODUCTION'.magenta;
  }
  if (nodeEnv === 'development') {
    return 'DEV'.cyan;
  }
  return 'nodeEnv not set!';
};

console.log(
  'Starting'.green,
  'Rent Bond'.green.bold,
  'in'.green,
  modeConsoleOutput(),
  'mode...'.green
);
