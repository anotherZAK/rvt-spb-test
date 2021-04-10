'use strict';

const AREA_MIN = 1;
const AREA_MAX = 300;
const BATHROOM_AREA_MIN = 1;
const BATHROOM_AREA_MAX = 20;
const DOORS_MIN = 1;
const DOORS_MAX = 20;
const COST_PER_DOOR = 8500;
const WALLS_PERIMETR_MIN = 1;
const WALLS_PERIMETR_MAX = 5000;
const INPUT_DOOR_PERCENT = 0.05;

const spaceTypes = {
  'new-building': 6000,
  'old-building': 8500,
};

const electricityTypes = {
  'no-electricity': 0,
  'change-electricity': 300,
  'new-electricity': 600,
};

const repairsTypes = {
  'cosmetic': 0,
  'major': 1500,
  'designing': 3000,
};

const isBathroomRepair = {
  'bathroom-repair': 13000,
  'bathroom-norepair': 0,
};

const isWarmFloor = {
  'warm-floor': 200,
  'nowarm-floor': 0,
};

const roofTypes = {
  'noroof': 0,
  'gypsum-roof': 300,
  'ceiling-roof': 450,
  '2xgypsum-roof': 600,
};

const calculationResult = document.querySelector('.calculator__result span');

const spaceTypeInput = document.querySelector('.calculator-form__item--space-type');
const electricityInput = document.querySelector('.calculator-form__item--electricity');
const repairsTypesInput = document.querySelector('.calculator-form__item--repairs-type');
const bathroomRepairInput = document.querySelector('.calculator-form__item--bathroom-repair');
const warmFloorRepairInput = document.querySelector('.calculator-form__item--warm-floor');
const doorsInput = document.querySelector('.calculator-form__item--doors');
const repairsAreaInput = document.querySelector('.calculator-form__item--repairs-area');
const wallsPerimeterInput = document.querySelector('.calculator-form__item--walls-perimeter');
const roofInput = document.querySelector('.calculator-form__item--roof');
const bathroomAreaInput = document.querySelector('.calculator-form__item--bathroom-area');
const inputDoor = document.querySelector('.calculator-form__item--input-door');

let spaceTypeCost = spaceTypes[spaceTypeInput.value];
let electricityCost = electricityTypes[electricityInput.value];
let repairsTypesCost = repairsTypes[repairsTypesInput.value];
let bathroomRepairCost =  isBathroomRepair[bathroomRepairInput.value];
let warmFloorRepairCost = isWarmFloor[warmFloorRepairInput.value];
let roofTypesCost = roofTypes[roofInput.value];
let doorsNumber = Number(doorsInput.value);
let areaRepairs = Number(repairsAreaInput.value);
let wallsPerimeter = Number(wallsPerimeterInput.value);
let bathroomArea = Number(bathroomAreaInput.value);

/**
 * Вычисляет стоимость ремонта
 * @returns {number} - стоимость ремонта
 */
const calculateResultCost = () => {
  let result = spaceTypeCost * areaRepairs +
  electricityCost * areaRepairs +
  repairsTypesCost * areaRepairs +
  bathroomRepairCost * bathroomArea +
  warmFloorRepairCost * areaRepairs +
  COST_PER_DOOR * doorsNumber +
  wallsPerimeter +
  roofTypesCost * areaRepairs;

  result = inputDoor.checked ? result + INPUT_DOOR_PERCENT * result  : result;
  return `${result.toFixed()} руб.`;
};

/**
 * Отрисовывает стомость ремонта на странице
 */
const renderResultCost = () => {
  calculationResult.textContent = calculateResultCost();
};

renderResultCost();

const spaceTypeInputHandler = () => {
  spaceTypeCost = spaceTypes[spaceTypeInput.value];
  renderResultCost();
};

const electricityTypesInputHandler = () => {
  electricityCost = electricityTypes[electricityInput.value];
  renderResultCost();
};

const repairsTypesInputHandler = () => {
  repairsTypesCost = repairsTypes[repairsTypesInput.value];
  renderResultCost();
};

const bathroomRepairInputHandler = () => {
  bathroomRepairCost = isBathroomRepair[bathroomRepairInput.value];
  renderResultCost();
};

const warmFloorInputHandler = () => {
  warmFloorRepairCost = isWarmFloor[warmFloorRepairInput.value];
  renderResultCost();
};

const roofInputHandler = () => {
  roofTypesCost = roofTypes[roofInput.value];
  renderResultCost();
};

const repairsAreaInputHandler = () => {
  if (!repairsAreaInput.value || Number(repairsAreaInput.value) === 0) {
    repairsAreaInput.value = '';
    areaRepairs = 0;
    repairsAreaInput.setCustomValidity(`Минимальное знаение - ${AREA_MIN}`);
  } else if (repairsAreaInput.value > AREA_MAX) {
    repairsAreaInput.value = AREA_MAX;
    areaRepairs = AREA_MAX;
    repairsAreaInput.setCustomValidity(`Максимальное знаение - ${AREA_MAX}`);
  } else {
    areaRepairs = Number(repairsAreaInput.value);
    repairsAreaInput.setCustomValidity('');
  }
  renderResultCost();
  repairsAreaInput.reportValidity();
};

const doorsInputHandler = () => {
  if (!doorsInput.value || Number(doorsInput.value) === 0) {
    doorsInput.value = '';
    doorsNumber = 0;
    doorsInput.setCustomValidity(`Минимальное знаение - ${DOORS_MIN}`);
  } else if (doorsInput.value > DOORS_MAX) {
    doorsInput.value = DOORS_MAX;
    doorsNumber = DOORS_MAX;
    doorsInput.setCustomValidity(`Максимальное знаение - ${DOORS_MAX}`);
  } else {
    doorsNumber = Number(doorsInput.value);
    doorsInput.setCustomValidity('');
  }
  renderResultCost();
  doorsInput.reportValidity();
};

const wallsPerimeterInputHandler = () => {
  if (!wallsPerimeterInput.value || Number(wallsPerimeterInput.value) === 0) {
    wallsPerimeterInput.value = '';
    wallsPerimeter = 0;
    wallsPerimeterInput.setCustomValidity(`Минимальное знаение - ${WALLS_PERIMETR_MIN}`);
  } else if (wallsPerimeterInput.value > WALLS_PERIMETR_MAX) {
    wallsPerimeterInput.value = WALLS_PERIMETR_MAX;
    wallsPerimeter = WALLS_PERIMETR_MAX;
    wallsPerimeterInput.setCustomValidity(`Максимальное знаение - ${WALLS_PERIMETR_MAX}`);
  } else {
    wallsPerimeter = Number(wallsPerimeterInput.value);
    wallsPerimeterInput.setCustomValidity('');
  }
  renderResultCost();
  wallsPerimeterInput.reportValidity();
};

const bathroomAreaInputHandler = () => {
  if (!bathroomAreaInput.value || Number(bathroomAreaInput.value) === 0) {
    bathroomAreaInput.value = '';
    bathroomArea = 0;
    bathroomAreaInput.setCustomValidity(`Минимальное знаение - ${BATHROOM_AREA_MIN}`);
  } else if (bathroomAreaInput.value > BATHROOM_AREA_MAX) {
    bathroomAreaInput.value = BATHROOM_AREA_MAX;
    bathroomArea = BATHROOM_AREA_MAX;
    bathroomAreaInput.setCustomValidity(`Максимальное знаение - ${BATHROOM_AREA_MAX}`);
  } else {
    bathroomArea = Number(bathroomAreaInput.value);
    bathroomAreaInput.setCustomValidity('');
  }
  renderResultCost();
  bathroomAreaInput.reportValidity();
};

spaceTypeInput.addEventListener('change', spaceTypeInputHandler);
electricityInput.addEventListener('change', electricityTypesInputHandler);
repairsTypesInput.addEventListener('change', repairsTypesInputHandler);
bathroomRepairInput.addEventListener('change', bathroomRepairInputHandler);
warmFloorRepairInput.addEventListener('change', warmFloorInputHandler);
doorsInput.addEventListener('input', doorsInputHandler);
repairsAreaInput.addEventListener('input', repairsAreaInputHandler);
wallsPerimeterInput.addEventListener('input', wallsPerimeterInputHandler);
roofInput.addEventListener('change', roofInputHandler);
bathroomAreaInput.addEventListener('input', bathroomAreaInputHandler);
inputDoor.addEventListener('change', () => {
  renderResultCost();
});
