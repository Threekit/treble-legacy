import test from './test';
import clickToSelect from './player-tools/click-to-select';
import turntable from './animations/turntable';
import wobble from './animations/wobble';
import validateAttributeValue from './rules/validateAttributeValue';
import handleListPositioning from './scene/handleListPositioning';

const trebleRecipes = {
  test,
  clickToSelect,
  turntable,
  wobble,
  validateAttributeValue,
  handleListPositioning,
};

if (!window.trebleRecipes?.[Object.keys(trebleRecipes)[0]])
  window.trebleRecipes = Object.assign({}, window.trebleRecipes, trebleRecipes);
