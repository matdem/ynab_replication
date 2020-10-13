import { createCategoryForm } from "./createCategoryForm.js";

function createCategoryName(categoryName) {
  return `
    <div class="categoryName">
      ${categoryName}
      <div class="addButton">+</div>
      ${createCategoryForm()}
    </div>
  `;
}

export { createCategoryName };
