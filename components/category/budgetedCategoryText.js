import { Budget } from "../classes/Budget.js";

function budgetedCategoryText(categoryName) {
  return `
    <div class="budgeted">
      Budgeted
      <br />
      ${Budget.currencyFormat(
        Budget.getCategoryTotal("budgeted", categoryName)
      )}
    </div>
  `;
}

export { budgetedCategoryText };
