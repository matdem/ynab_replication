import { Category } from "./Category.js";
import { CostItem } from "./CostItem.js";
import { indexOfName } from "../../tiny_fp_lib.js";

class Budget {
  constructor(year) {
    this.year = year;
    this.categories = [];
  }

  hasCategory(categoryName) {
    return this.categories
      .map((category) => category.name)
      .includes(categoryName);
  }

  hasCostItem(costItemName, categoryName) {
    var category = this.getCategory(categoryName);
    return category.costItems
      .map((costItem) => costItem.name)
      .includes(costItemName);
  }

  addCategory(name) {
    if (!this.hasCategory(name)) {
      this.categories = [...this.categories, new Category(name)];
    } else {
      alert("This category already exists.\nSelect another name, please.");
    }

    return this;
  }

  addCostItem(name, categoryName) {
    if (this.hasCategory(categoryName)) {
      if (!this.hasCostItem(name, categoryName)) {
        var category = this.getCategory(categoryName);
        category.costItems = [...category.costItems, new CostItem(name)];
      } else {
        alert(
          `The cost item "${name}" already exists.\nPlease chose another name.`
        );
      }
    } else {
      alert(
        `The category "${categoryName}" doesn't exist.\nPlease, create it before to add it a cost item.`
      );
    }

    return this;
  }

  getCategory(categoryName) {
    if (this.hasCategory(categoryName)) {
      var categoryIndex = indexOfName(categoryName, this.categories);

      return this.categories[categoryIndex];
    } else {
      console.error("Category not created yet");
    }
  }

  getCategoryBudgeted(categoryName) {
    var category = this.getCategory(categoryName),
      total = category.costItems
        .map((obj) => obj.budgeted)
        .reduce((sum, value) => sum + value);

    return total;
  }

  setCategoryBudgeted(categoryName) {
    var category = this.getCategory(categoryName);
    category.budgeted = this.getCategoryBudgeted(categoryName);

    return this;
  }

  getCostItem(costItemName, categoryName) {
    var category = this.getCategory(categoryName),
      costItemIndex = indexOfName(costItemName, category.costItems);

    return category.costItems[costItemIndex];
  }

  setCostItemBudgeted(number, costItemName, categoryName) {
    var costItem = this.getCostItem(costItemName, categoryName);
    costItem.budgeted = number;
    this.setCategoryBudgeted(categoryName);

    return this;
  }

  getCostItemBudgeted(costItemName, categoryName) {
    var costItem = getCostItem(costItemName, categoryName);

    return costItem.budgeted;
  }

  static getCategoryTotal(property, categoryName) {
    const categories = this.categories;
    const categoryIndex = indexOfName(categoryName, categories);

    return categories[categoryIndex].costItems
      .map((item) => item[property])
      .reduce((sum, value) => sum + value, 0);
  }

  static currencyFormat(num) {
    num = String(num.toFixed(2));
    const part1 = num.match(/^[-\d]+/g)[0];
    const part2 = num.match(/\d*$/g)[0];

    function formatPart1(part) {
      return part
        .split("")
        .reverse()
        .reduceRight((prev, current, index) => {
          return index % 3 !== 0 || index === 0
            ? prev + current
            : prev + current + " ";
        }, "");
    }

    return `${formatPart1(part1)},${part2}$`;
  }
}

export { Budget };
