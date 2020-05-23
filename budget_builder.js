class Budget {
  constructor(year, month) {
    this.year = year;
    this.month = month;
    this.categories = [];
    this.costItems = [];
  }
  addCategory(categoryName) {
    return this.categories.push(new Category(categoryName));
  }
  addCostItem(costItemName, category) {
    return this.costItems.push(new CostItem(costItemName, category));
  }
}

class Category {
  constructor(name, budgeted = 0, available = 0) {
    this.name = name;
    this.budgeted = budgeted;
    this.available = available;
  }
}

class CostItem extends Category {
  constructor(name, category, budgeted, available) {
    super(name, budgeted, available);
    this.category = category;
  }
}

const budget2020 = new Budget(2020, "May");
budget2020.addCategory("Voitures");
budget2020.addCostItem("Essence", "Voitures");
console.log(budget2020);

