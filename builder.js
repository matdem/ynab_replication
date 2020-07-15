// Use "tiny_fp_lib.js"

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
}

class Category {
  constructor(name, budgeted = 0, available = 0) {
    this.name = name;
    this.budgeted = budgeted;
    this.available = available;
    this.costItems = [];
  }
}

class CostItem {
  constructor(name, budgeted = 0, available = 0) {
    this.name = name;
    this.budgeted = budgeted;
    this.available = available;
  }
}

function output(elt) {
  console.log(elt);
}

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
