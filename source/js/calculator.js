'use strict';

const AREA_MIN = 1;
const AREA_MAX = 300;
const BATHROOM_AREA_MIN = 1;
const BATHROOM_AREA_MAX = 20;
const DOORS_MIN = 1;
const DOORS_MAX = 20;
const COST_PER_DOOR = 8500;
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

const roofInput = document.querySelector('.calculator-form__item--roof');
const bathroomAreaInput = document.querySelector('.calculator-form__item--bathroom-area');
const inputDoor = document.querySelector('.calculator-form__item--input-door');
const slideArea = document.querySelector('.slider--area');
const slideBathroom = document.querySelector('.slider--bathroom');
const sliderPointArea = slideArea.querySelector('.slider__pointer--repairs-area');
const sliderPointBathroom = slideBathroom.querySelector('.slider__pointer--bathroom');
const sliderArea = slideArea.querySelector('.slider__repairs-area');
const sliderBathroomArea = slideBathroom.querySelector('.slider__bathroom-area');

let spaceTypeCost = spaceTypes[spaceTypeInput.value];
let electricityCost = electricityTypes[electricityInput.value];
let repairsTypesCost = repairsTypes[repairsTypesInput.value];
let bathroomRepairCost = isBathroomRepair[bathroomRepairInput.value];
let warmFloorRepairCost = isWarmFloor[warmFloorRepairInput.value];
let roofTypesCost = roofTypes[roofInput.value];
let doorsNumber = Number(doorsInput.value);
let sliderAreaRepairs = parseInt(repairsAreaInput.value);
let sliderbathroomAreaRepairs = parseInt(bathroomAreaInput.value);

/**
 * Вычисляет стоимость ремонта
 * @returns {number} - стоимость ремонта
 */
const calculateResultCost = () => {
  let result = spaceTypeCost * sliderAreaRepairs +
    electricityCost * sliderAreaRepairs +
    repairsTypesCost * sliderAreaRepairs +
    bathroomRepairCost * sliderbathroomAreaRepairs +
    warmFloorRepairCost * sliderAreaRepairs +
    COST_PER_DOOR * doorsNumber +
    roofTypesCost * sliderAreaRepairs;

  result = inputDoor.checked ? result + INPUT_DOOR_PERCENT * result : result;
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
  sliderAreaRepairs = parseInt(repairsAreaInput.value);
  renderResultCost();
};

const bathroomAreaInputHandler = () => {
  sliderbathroomAreaRepairs = parseInt(bathroomAreaInput.value);
  renderResultCost();
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

const sliderPointAreaHandler = (evt) => {
  slideArea.append(sliderPointArea);

  const shiftX = evt.clientX - sliderPointArea.getBoundingClientRect().left;

  const checkBorder = (borderX) => {
    if (borderX < -4) {
      sliderPointArea.style.left = `${-4}px`;
      sliderArea.style.width = `${-4}px`;
      repairsAreaInput.value = `${AREA_MIN} кв. м`;
    } else if (borderX > 299) {
      sliderPointArea.style.left = `${299}px`;
      sliderArea.style.width = `${299}px`;
      repairsAreaInput.value = `${AREA_MAX} кв. м`;
    } else {
      sliderPointArea.style.left = `${borderX}px`;
      sliderArea.style.width = `${borderX}px`;
      repairsAreaInput.value = `${((borderX + 5 ) * AREA_MAX / 304).toFixed()} кв. м`;
    }
  };

  const moveAt = (pageX) => {
    const currentX = pageX - shiftX - slideArea.getBoundingClientRect().left;
    checkBorder(currentX);
    repairsAreaInputHandler();
  };

  moveAt(evt.pageX);

  const onMouseMove = (evt) => {
    moveAt(evt.pageX);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
  });
};

const sliderPointBathroomHandler = (evt) => {
  slideBathroom.append(sliderPointBathroom);

  const shiftX = evt.clientX - sliderPointBathroom.getBoundingClientRect().left;

  const checkBorder = (borderX) => {
    if (borderX < -4) {
      sliderPointBathroom.style.left = `${-4}px`;
      sliderBathroomArea.style.width = `${-4}px`;
      bathroomAreaInput.value = `${BATHROOM_AREA_MIN} кв. м`;
    } else if (borderX > 299) {
      sliderPointBathroom.style.left = `${299}px`;
      sliderBathroomArea.style.width = `${299}px`;
      bathroomAreaInput.value = `${BATHROOM_AREA_MAX} кв. м`;
    } else {
      sliderPointBathroom.style.left = `${borderX}px`;
      sliderBathroomArea.style.width = `${borderX}px`;
      bathroomAreaInput.value = `${((borderX + BATHROOM_AREA_MAX) * BATHROOM_AREA_MAX / 24 / 13).toFixed()} кв. м`;
    }
  };

  const moveAt = (pageX) => {
    const currentX = pageX - shiftX - slideBathroom.getBoundingClientRect().left;
    checkBorder(currentX);
    bathroomAreaInputHandler();
  };

  moveAt(evt.pageX);

  const onMouseMove = (evt) => {
    moveAt(evt.pageX);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
  });
};

spaceTypeInput.addEventListener('change', spaceTypeInputHandler);
electricityInput.addEventListener('change', electricityTypesInputHandler);
repairsTypesInput.addEventListener('change', repairsTypesInputHandler);
bathroomRepairInput.addEventListener('change', bathroomRepairInputHandler);
warmFloorRepairInput.addEventListener('change', warmFloorInputHandler);
doorsInput.addEventListener('input', doorsInputHandler);

roofInput.addEventListener('change', roofInputHandler);

inputDoor.addEventListener('change', () => {
  renderResultCost();
});

sliderPointArea.addEventListener('mousedown', sliderPointAreaHandler);
sliderPointArea.addEventListener('dragstart', () => {
  return false;
});

sliderPointBathroom.addEventListener('mousedown', sliderPointBathroomHandler);
sliderPointBathroom.addEventListener('dragstart', () => {
  return false;
});
