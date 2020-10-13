import { Budget } from "../classes/Budget.js";

function createCostItem(budgetDatas, costItemName, categoryName) {
  const costItem = budgetDatas.getCostItem(costItemName, categoryName);

  return `
    <div class="costItem ${categoryName}">
      <input class="costItemCheckbox" type="checkbox">
      <div class="costItemName">${costItemName}</div>
      <div class="budgeted number">
        ${Budget.currencyFormat(costItem.budgeted)}
      </div>
      <div class="available number">
        ${Budget.currencyFormat(costItem.available)}
      </div>
    </div>
  `;
}

export { createCostItem };
