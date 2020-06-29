class Budget {
  constructor(year) {
    this.year = year;
    this.categories = [];
  }

  addCategory(name) {
    this.categories = [...this.categories, new Category(name)];

    return this;
  }

  addCostItem(name, categoryName) {
    var category = this.getCategory(categoryName);

    category.costItems = [...category.costItems, new CostItem(name)];

    return this;
  }

  getCategory(categoryName) {
    var categoryIndex = indexOfName(categoryName, this.categories);

    return this.categories[categoryIndex];
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

function indexOfName(name, arrOfobj) {
  return arrOfobj.map((obj) => obj.name).indexOf(name);
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
  .setCostItemBudgeted(45, "Fuel", "Cars")
  .setCostItemBudgeted(35, "Internet", "Obligations");

output(budget);
