const path = require('path');
const { build } = require('vite');

(async () => {
  const argv = process.argv.slice(2);
  // const THREEKIT_ENV = argv.includes('--admin-fts') ? 'admin-fts' : 'preview';
  const useRecipes = argv.includes('--recipes');

  await build({
    configFile: path.resolve(__dirname, '../config/vite.config.js'),
    build: {
      assetsDir: '',
      outDir: 'build',
      rollupOptions: {
        input: Object.assign(
          {
            'treble-app': path.resolve(process.cwd(), 'index.html'),
          },
          useRecipes
            ? {
                recipes: path.resolve(process.cwd(), 'recipes/index.js'),
              }
            : {}
        ),
        output: {
          entryFileNames: `[name].js`,
          assetFileNames: `[name][extname]`,
        },
      },
    },
  });
})();
