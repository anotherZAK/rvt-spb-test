'use strict';
'use strict';

const spaceTypes = {
  'new-building': 6000,
  'old-building': 8500,
};

let calculationResult = document.querySelector('.calculation__result p');
let spaceTypeInput = document.querySelector('.calculator-form__item--space-type');
calculationResult.textContent = 'Итого: 15000';



const calculateResultCost = () => {
  return `Итого: ${spaceTypeCost * 1 * 2}`;
};

const renderResultCost = () => {
  calculationResult.textContent = calculateResultCost();
};

let spaceTypeCost;


spaceTypeInput.addEventListener('change', () => {
  spaceTypeCost = spaceTypes[spaceTypeInput.value];
  console.log(spaceTypeCost);
  renderResultCost();
});

console.log(spaceTypeCost);
