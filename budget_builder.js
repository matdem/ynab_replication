class Budget {
  constructor(year, month) {
    this.year = year;
    this.month = month;
    this.categories = [];
    // this.costItems = [];
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

class CostItem extends Category {
  constructor(name, budgeted, available) {
    super(name, budgeted, available);
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
function hasValue(value, prop, object) {
  return object[prop] === value;
}

function addCategory(categoryName, budget) {
  let budgetUpdated = Object.assign({}, budget);
  budgetUpdated.categories = [
    ...budgetUpdated.categories,
    new Category(categoryName),
  ];
  return budgetUpdated;
}

function addCostItem(costItemName, categoryName, budget) {
  let budgetUpdated = Object.assign({}, budget);
  let categoryIndex = indexOfName(categoryName, budgetUpdated.categories);
  let category = budgetUpdated.categories[categoryIndex];
  category.costItems = [...category.costItems, new CostItem(costItemName)];

  return budgetUpdated;
}

function setProp(prop, value, obj) {
  let objUpdated = Object.assign({}, ...obj);
  objUpdated[prop] = value;
  return objUpdated;
}

let budget2020 = new Budget(2020, "May");
// budget2020 = addCategory("Voitures", budget2020);
budget2020 = pipe(
  partial(addCategory, "Voitures"),
  partial(addCategory, "Obligations"),
  partial(addCostItem, "Essence", "Voitures")
)(budget2020);
/* let setVoituresCategory = partial(addCategory, "Voitures");
budget2020 = setVoituresCategory(budget2020);
budget2020 = addCategory("Maison", budget2020);
budget2020 = addCostItem("Essence", "Voitures", budget2020); */
console.log(budget2020);
