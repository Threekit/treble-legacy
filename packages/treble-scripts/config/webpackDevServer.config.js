module.exports = ({ port }) => ({
  allowedHosts: 'all',
  port,
  hot: true,
  historyApiFallback: {
    index: 'index.html',
  },
  watchFiles: ['src/**/*', 'public/**/*'],
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
  },
});
