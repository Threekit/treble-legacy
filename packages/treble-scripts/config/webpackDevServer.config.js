module.exports = ({ port }) => ({
  allowedHosts: 'all',
  port,
  hot: true,
  historyApiFallback: {
    index: 'index.html',
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  },
  // Enable gzip compression of generated files.
  compress: true,
  watchFiles: ['src/**/*', 'public/**/*'],
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
  },
});
