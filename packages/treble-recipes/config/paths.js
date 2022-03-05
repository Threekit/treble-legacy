const path = require("path");

const appRoot = path.join(__dirname, "..");
const recipesSrc = path.join(appRoot, "src");
const recipesBuild = path.join(appRoot, "dist");
const recipesBuildJs = path.join(recipesBuild, "threekit-recipes.js");

const recipesJs = path.join(recipesSrc, "index.js");

module.exports = {
  recipesBuild,
  recipesJs,
  recipesBuildJs,
};
