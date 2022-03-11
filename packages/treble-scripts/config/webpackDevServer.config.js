module.exports = ({ port, useRecipes }) => {
  const watchFiles = ['src/**/*', 'public/**/*'];

  if (useRecipes) watchFiles.push('recipes/**/*');

  return {
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
    watchFiles,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  };
};
