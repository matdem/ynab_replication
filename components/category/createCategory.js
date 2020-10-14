import { createCategoryName } from "./createCategoryName.js";
import { numberCategoryText } from "./numberCategoryText.js";

function createCategory(categoryName, budgetDatas) {
  return `
    <div id=${categoryName} class="category">
      ${createCategoryName(categoryName)}
      ${numberCategoryText("Budgeted", categoryName, budgetDatas)}
      ${numberCategoryText("Available", categoryName, budgetDatas)}
    </div>
  `;
}

export { createCategory };
