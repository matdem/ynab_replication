class Budget {
  constructor(year, month) {
    this.year = year;
    this.month = month;
    this.categories = [];
    this.costItems = [];
  }
  addCategory(categoryName) {
    const category = new Category(categoryName);
    return this.categories.push(category);
  }
  addCostItem(costItemName, category) {
    const costItem = new CostItem(costItemName, category);
    return this.costItems.push(costItem);
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

class Transaction {
  constructor(date, amount, account, category, costItem) {
    this.date = date;
    this.amount = amount;
    this.account = account;
    this.category = category;
    this.costItem = costItem;
  }
}
const budget2020 = new Budget(2020, "May");
budget2020.addCategory("Voitures");
budget2020.addCostItem("Essence", "Voitures");
console.log(budget2020);
