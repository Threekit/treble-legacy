import test from './test';
import clickToSelect from './player-tools/click-to-select';
import turntable from './animations/turntable';
import wobble from './animations/wobble';
import validateAttributeValue from './rules/validateAttributeValue';
import handleListPositioning from './scene/handleListPositioning';

const threekitRecipes = {
  test,
  clickToSelect,
  turntable,
  wobble,
  validateAttributeValue,
  handleListPositioning,
};

if (!window.threekitRecipes?.[Object.keys(threekitRecipes)[0]])
  window.threekitRecipes = Object.assign(
    {},
    window.threekitRecipes,
    threekitRecipes
  );
