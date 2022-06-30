const { createServer } = require('vite');
const path = require('path');

(async () => {
  const argv = process.argv.slice(2);
  const portIdx =
    argv.indexOf('--port') !== -1 ? argv.indexOf('--port') : argv.indexOf('-p');
  // const THREEKIT_ENV = argv.includes('--admin-fts') ? 'admin-fts' : 'preview';
  const PORT = process.env.PORT || portIdx !== -1 ? argv[portIdx + 1] : 3000;

  const server = await createServer({
    configFile: path.resolve(__dirname, '../config/vite.config.js'),
    server: {
      port: PORT,
    },
  });
  await server.listen();

  server.printUrls();
})();
