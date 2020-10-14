import { Budget } from "./components/classes/Budget.js";
import { createCategory } from "./components/category/createCategory.js";
import { createCostItem } from "./components/costItem/createCostItem.js";

var budget = new Budget(2020);
budget
  .addCategory("Cars")
  .addCategory("Obligations")
  .addCostItem("Fuel", "Cars")
  .addCostItem("Maintenance", "Cars")
  .addCostItem("Mortage", "Obligations")
  .addCostItem("Internet", "Obligations")
  .setCostItemBudgeted(20, "Maintenance", "Cars")
  .setCostItemBudgeted(120, "Mortage", "Obligations")
  .setCostItemBudgeted(12543.23, "Fuel", "Cars")
  .setCostItemBudgeted(35, "Internet", "Obligations");

function hasCategoryElt(categoryName) {
  let category = document.getElementById(categoryName);
  return category != null || category != undefined;
}

function isInCategory(costItemName, categoryName) {
  let costItem = document.getElementsByClassName("costItem");
  for (let i = 0; i < costItem.length; i += 1) {
    let names = costItem[i].getElementsByClassName("costItemName");
    if (costItem[i].classList.contains(categoryName)) {
      for (let j = 0; j < names.length; j += 1) {
        return names[j].textContent == costItemName;
      }
    }
  }
}

function displayBudget(budgetDatas) {
  const budgetElt = document.getElementById("budget");

  /* if (costItemElt.classList.contains(categoryName)) {
    return budgetElt.insertBefore(costItemElt, categoryElt.nextSibling);
  } */

  budgetDatas.categories.map((category) => {
    if (!hasCategoryElt(category.name)) {
      budgetElt.innerHTML += createCategory(category.name, budgetDatas);
    }

    category.costItems.map((costItem) => {
      if (!isInCategory(costItem.name, category.name)) {
        budgetElt.innerHTML += createCostItem(
          costItem.name,
          category.name,
          budgetDatas
        );
      }
    });
  });
  return budgetElt;
}

console.log(budget);
displayBudget(budget);
