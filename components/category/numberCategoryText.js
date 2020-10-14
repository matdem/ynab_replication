import { Budget } from "../classes/Budget.js";

function numberCategoryText(property, categoryName, budgetDatas) {
  let toLowerCaseProperty = property.toLowerCase();

  return `
    <div class=${toLowerCaseProperty}>
      ${property}
      <br />
      ${Budget.currencyFormat(
        budgetDatas.getCategoryTotal(toLowerCaseProperty, categoryName)
      )}
    </div>
  `;
}

export { numberCategoryText };
