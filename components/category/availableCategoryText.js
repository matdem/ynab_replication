import { Budget } from "../classes/Budget.js";

function availableCategoryText(categoryName) {
  return `
    <div class="available">
      Available
      <br />
      ${Budget.currencyFormat(
        Budget.getCategoryTotal("available", categoryName)
      )}
    </div>
  `;
}

export { availableCategoryText };
