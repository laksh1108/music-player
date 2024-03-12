const path = require('path');

module.exports = {
  entry: './src/index.js', // Replace with your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      assert: require.resolve('assert/'),
      url: require.resolve('url/')
    }
  }
};