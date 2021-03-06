'use strict';

const AREA_MIN = 1;
const AREA_MAX = 300;
const BATHROOM_AREA_MIN = 1;
const BATHROOM_AREA_MAX = 20;
const DOORS_MIN = 0;
const DOORS_MAX = 20;
const COST_PER_DOOR = 8500;
const INPUT_DOOR_PERCENT = 0.05;
const SLIDER_SHIFT = 4;

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
const inputDoorText = document.querySelector('.calculator-form__item--input-door ~ p');
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
 * ?????????????????????? ??????????????????, ???????????????? ???????????? ?????????? ?????????????? 3-???? ??????????????
 * @param {number} num - ?????????????? ????????????
 * @returns {string} - ?????????????????????????????????? ????????????
 */
const formatResult = (num) => {
  const result = num.toString();
  return result.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
};

/**
 * ?????????????????? ?????????????????? ??????????????
 * @returns {number} - ?????????????????? ??????????????
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
  return `${formatResult(result.toFixed())} ??????.`;
};

/**
 * ???????????????????????? ???????????????? ?????????????? ???? ????????????????
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

  if (!isBathroomRepair[bathroomRepairInput.value]) {
    slideBathroom.classList.add('slider--hide');
    inputDoor.classList.add('calculator-form__item--extra-margin');
  } else {
    slideBathroom.classList.remove('slider--hide');
    inputDoor.classList.remove('calculator-form__item--extra-margin');
  }
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

const inputDoorHandler = () => {
  renderResultCost();
  if (inputDoor.checked) {
    inputDoorText.textContent = '????';
  } else {
    inputDoorText.textContent = '??????';
  }
};

const doorsInputHandler = () => {
  if (!doorsInput.value) {
    doorsInput.value = '';
    doorsNumber = 0;
    doorsInput.setCustomValidity(`?????????????????????? ?????????????? - ${DOORS_MIN}`);
  } else if (doorsInput.value > DOORS_MAX) {
    doorsInput.value = DOORS_MAX;
    doorsNumber = DOORS_MAX;
    doorsInput.setCustomValidity(`???????????????????????? ?????????????? - ${DOORS_MAX}`);
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
  const sliderAreaMaxLenght = parseInt(getComputedStyle(repairsAreaInput).width) - 19;
  const rangeChange = AREA_MAX / (AREA_MAX + SLIDER_SHIFT);

  const checkBorder = (borderX) => {
    if (borderX < -SLIDER_SHIFT) {
      sliderPointArea.style.left = `${-SLIDER_SHIFT}px`;
      sliderArea.style.width = `${-SLIDER_SHIFT}px`;
      repairsAreaInput.value = `${AREA_MIN} ????.??`;
    } else if (borderX > sliderAreaMaxLenght) {
      sliderPointArea.style.left = `${sliderAreaMaxLenght}px`;
      sliderArea.style.width = `${sliderAreaMaxLenght}px`;
      repairsAreaInput.value = `${AREA_MAX} ????.??`;
    } else {
      sliderPointArea.style.left = `${borderX}px`;
      sliderArea.style.width = `${borderX}px`;
      repairsAreaInput.value = `${((borderX + SLIDER_SHIFT + 1) * rangeChange).toFixed()} ????.??`;
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
  const sliderbathroomAreaMaxLenght = parseInt(getComputedStyle(bathroomAreaInput).width) - 17;
  const rangeChange = 11;

  const checkBorder = (borderX) => {
    if (borderX < -SLIDER_SHIFT) {
      sliderPointBathroom.style.left = `${-SLIDER_SHIFT}px`;
      sliderBathroomArea.style.width = `${-SLIDER_SHIFT}px`;
      bathroomAreaInput.value = `${BATHROOM_AREA_MIN} ????.??`;
    } else if (borderX > sliderbathroomAreaMaxLenght) {
      sliderPointBathroom.style.left = `${sliderbathroomAreaMaxLenght}px`;
      sliderBathroomArea.style.width = `${sliderbathroomAreaMaxLenght}px`;
      bathroomAreaInput.value = `${BATHROOM_AREA_MAX} ????.??`;
    } else {
      sliderPointBathroom.style.left = `${borderX}px`;
      sliderBathroomArea.style.width = `${borderX}px`;
      bathroomAreaInput.value = `${((borderX + BATHROOM_AREA_MAX) / rangeChange).toFixed()} ????.??`;
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
inputDoor.addEventListener('change', inputDoorHandler);

sliderPointArea.addEventListener('mousedown', sliderPointAreaHandler);
sliderPointArea.addEventListener('dragstart', () => {
  return false;
});

sliderPointBathroom.addEventListener('mousedown', sliderPointBathroomHandler);
sliderPointBathroom.addEventListener('dragstart', () => {
  return false;
});
