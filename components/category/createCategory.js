import { createCategoryName } from "./createCategoryName.js";
import { budgetedCategoryText } from "./budgetedCategoryText.js";
import { availableCategoryText } from "./availableCategoryText.js";

function createCategory(categoryName) {
  return `
    <div id=${categoryName} class="category">
      ${createCategoryName(categoryName)}
      ${budgetedCategoryText(categoryName)}
      ${availableCategoryText(categoryName)}
    </div>
  `;
}

export { createCategory };
