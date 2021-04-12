/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};


var AREA_MIN = 1;
var AREA_MAX = 300;
var BATHROOM_AREA_MIN = 1;
var BATHROOM_AREA_MAX = 20;
var DOORS_MIN = 0;
var DOORS_MAX = 20;
var COST_PER_DOOR = 8500;
var INPUT_DOOR_PERCENT = 0.05;
var SLIDER_SHIFT = 4;
var spaceTypes = {
  'new-building': 6000,
  'old-building': 8500
};
var electricityTypes = {
  'no-electricity': 0,
  'change-electricity': 300,
  'new-electricity': 600
};
var repairsTypes = {
  'cosmetic': 0,
  'major': 1500,
  'designing': 3000
};
var isBathroomRepair = {
  'bathroom-repair': 13000,
  'bathroom-norepair': 0
};
var isWarmFloor = {
  'warm-floor': 200,
  'nowarm-floor': 0
};
var roofTypes = {
  'noroof': 0,
  'gypsum-roof': 300,
  'ceiling-roof': 450,
  '2xgypsum-roof': 600
};
var calculationResult = document.querySelector('.calculator__result span');
var spaceTypeInput = document.querySelector('.calculator-form__item--space-type');
var electricityInput = document.querySelector('.calculator-form__item--electricity');
var repairsTypesInput = document.querySelector('.calculator-form__item--repairs-type');
var bathroomRepairInput = document.querySelector('.calculator-form__item--bathroom-repair');
var warmFloorRepairInput = document.querySelector('.calculator-form__item--warm-floor');
var doorsInput = document.querySelector('.calculator-form__item--doors');
var repairsAreaInput = document.querySelector('.calculator-form__item--repairs-area');
var roofInput = document.querySelector('.calculator-form__item--roof');
var bathroomAreaInput = document.querySelector('.calculator-form__item--bathroom-area');
var inputDoor = document.querySelector('.calculator-form__item--input-door');
var inputDoorText = document.querySelector('.calculator-form__item--input-door ~ p');
var slideArea = document.querySelector('.slider--area');
var slideBathroom = document.querySelector('.slider--bathroom');
var sliderPointArea = slideArea.querySelector('.slider__pointer--repairs-area');
var sliderPointBathroom = slideBathroom.querySelector('.slider__pointer--bathroom');
var sliderArea = slideArea.querySelector('.slider__repairs-area');
var sliderBathroomArea = slideBathroom.querySelector('.slider__bathroom-area');
var spaceTypeCost = spaceTypes[spaceTypeInput.value];
var electricityCost = electricityTypes[electricityInput.value];
var repairsTypesCost = repairsTypes[repairsTypesInput.value];
var bathroomRepairCost = isBathroomRepair[bathroomRepairInput.value];
var warmFloorRepairCost = isWarmFloor[warmFloorRepairInput.value];
var roofTypesCost = roofTypes[roofInput.value];
var doorsNumber = Number(doorsInput.value);
var sliderAreaRepairs = parseInt(repairsAreaInput.value);
var sliderbathroomAreaRepairs = parseInt(bathroomAreaInput.value);
/**
 * Форматирует результат, вставляя пробел после каждого 3-го символа
 * @param {number} num - входные данные
 * @returns {string} - отформатированные данные
 */

var formatResult = function formatResult(num) {
  var result = num.toString();
  return result.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
};
/**
 * Вычисляет стоимость ремонта
 * @returns {number} - стоимость ремонта
 */


var calculateResultCost = function calculateResultCost() {
  var result = spaceTypeCost * sliderAreaRepairs + electricityCost * sliderAreaRepairs + repairsTypesCost * sliderAreaRepairs + bathroomRepairCost * sliderbathroomAreaRepairs + warmFloorRepairCost * sliderAreaRepairs + COST_PER_DOOR * doorsNumber + roofTypesCost * sliderAreaRepairs;
  result = inputDoor.checked ? result + INPUT_DOOR_PERCENT * result : result;
  return "".concat(formatResult(result.toFixed()), " \u0440\u0443\u0431.");
};
/**
 * Отрисовывает стомость ремонта на странице
 */


var renderResultCost = function renderResultCost() {
  calculationResult.textContent = calculateResultCost();
};

renderResultCost();

var spaceTypeInputHandler = function spaceTypeInputHandler() {
  spaceTypeCost = spaceTypes[spaceTypeInput.value];
  renderResultCost();
};

var electricityTypesInputHandler = function electricityTypesInputHandler() {
  electricityCost = electricityTypes[electricityInput.value];
  renderResultCost();
};

var repairsTypesInputHandler = function repairsTypesInputHandler() {
  repairsTypesCost = repairsTypes[repairsTypesInput.value];
  renderResultCost();
};

var bathroomRepairInputHandler = function bathroomRepairInputHandler() {
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

var warmFloorInputHandler = function warmFloorInputHandler() {
  warmFloorRepairCost = isWarmFloor[warmFloorRepairInput.value];
  renderResultCost();
};

var roofInputHandler = function roofInputHandler() {
  roofTypesCost = roofTypes[roofInput.value];
  renderResultCost();
};

var repairsAreaInputHandler = function repairsAreaInputHandler() {
  sliderAreaRepairs = parseInt(repairsAreaInput.value);
  renderResultCost();
};

var bathroomAreaInputHandler = function bathroomAreaInputHandler() {
  sliderbathroomAreaRepairs = parseInt(bathroomAreaInput.value);
  renderResultCost();
};

var inputDoorHandler = function inputDoorHandler() {
  renderResultCost();

  if (inputDoor.checked) {
    inputDoorText.textContent = 'Да';
  } else {
    inputDoorText.textContent = 'Нет';
  }
};

var doorsInputHandler = function doorsInputHandler() {
  if (!doorsInput.value) {
    doorsInput.value = '';
    doorsNumber = 0;
    doorsInput.setCustomValidity("\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0435\u043D\u0438\u0435 - ".concat(DOORS_MIN));
  } else if (doorsInput.value > DOORS_MAX) {
    doorsInput.value = DOORS_MAX;
    doorsNumber = DOORS_MAX;
    doorsInput.setCustomValidity("\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0435\u043D\u0438\u0435 - ".concat(DOORS_MAX));
  } else {
    doorsNumber = Number(doorsInput.value);
    doorsInput.setCustomValidity('');
  }

  renderResultCost();
  doorsInput.reportValidity();
};

var sliderPointAreaHandler = function sliderPointAreaHandler(evt) {
  slideArea.append(sliderPointArea);
  var shiftX = evt.clientX - sliderPointArea.getBoundingClientRect().left;
  var sliderAreaMaxLenght = parseInt(getComputedStyle(repairsAreaInput).width) - 19;
  var rangeChange = AREA_MAX / (AREA_MAX + SLIDER_SHIFT);

  var checkBorder = function checkBorder(borderX) {
    if (borderX < -SLIDER_SHIFT) {
      sliderPointArea.style.left = "".concat(-SLIDER_SHIFT, "px");
      sliderArea.style.width = "".concat(-SLIDER_SHIFT, "px");
      repairsAreaInput.value = "".concat(AREA_MIN, " \u043A\u0432.\u043C");
    } else if (borderX > sliderAreaMaxLenght) {
      sliderPointArea.style.left = "".concat(sliderAreaMaxLenght, "px");
      sliderArea.style.width = "".concat(sliderAreaMaxLenght, "px");
      repairsAreaInput.value = "".concat(AREA_MAX, " \u043A\u0432.\u043C");
    } else {
      sliderPointArea.style.left = "".concat(borderX, "px");
      sliderArea.style.width = "".concat(borderX, "px");
      repairsAreaInput.value = "".concat(((borderX + SLIDER_SHIFT + 1) * rangeChange).toFixed(), " \u043A\u0432.\u043C");
    }
  };

  var moveAt = function moveAt(pageX) {
    var currentX = pageX - shiftX - slideArea.getBoundingClientRect().left;
    checkBorder(currentX);
    repairsAreaInputHandler();
  };

  moveAt(evt.pageX);

  var onMouseMove = function onMouseMove(evt) {
    moveAt(evt.pageX);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', onMouseMove);
  });
};

var sliderPointBathroomHandler = function sliderPointBathroomHandler(evt) {
  slideBathroom.append(sliderPointBathroom);
  var shiftX = evt.clientX - sliderPointBathroom.getBoundingClientRect().left;
  var sliderbathroomAreaMaxLenght = parseInt(getComputedStyle(bathroomAreaInput).width) - 17;
  var rangeChange = 11;

  var checkBorder = function checkBorder(borderX) {
    if (borderX < -SLIDER_SHIFT) {
      sliderPointBathroom.style.left = "".concat(-SLIDER_SHIFT, "px");
      sliderBathroomArea.style.width = "".concat(-SLIDER_SHIFT, "px");
      bathroomAreaInput.value = "".concat(BATHROOM_AREA_MIN, " \u043A\u0432.\u043C");
    } else if (borderX > sliderbathroomAreaMaxLenght) {
      sliderPointBathroom.style.left = "".concat(sliderbathroomAreaMaxLenght, "px");
      sliderBathroomArea.style.width = "".concat(sliderbathroomAreaMaxLenght, "px");
      bathroomAreaInput.value = "".concat(BATHROOM_AREA_MAX, " \u043A\u0432.\u043C");
    } else {
      sliderPointBathroom.style.left = "".concat(borderX, "px");
      sliderBathroomArea.style.width = "".concat(borderX, "px");
      bathroomAreaInput.value = "".concat(((borderX + BATHROOM_AREA_MAX) / rangeChange).toFixed(), " \u043A\u0432.\u043C");
    }
  };

  var moveAt = function moveAt(pageX) {
    var currentX = pageX - shiftX - slideBathroom.getBoundingClientRect().left;
    checkBorder(currentX);
    bathroomAreaInputHandler();
  };

  moveAt(evt.pageX);

  var onMouseMove = function onMouseMove(evt) {
    moveAt(evt.pageX);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', function () {
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
sliderPointArea.addEventListener('dragstart', function () {
  return false;
});
sliderPointBathroom.addEventListener('mousedown', sliderPointBathroomHandler);
sliderPointBathroom.addEventListener('dragstart', function () {
  return false;
});
/******/ })()
;
//# sourceMappingURL=bundle.js.map