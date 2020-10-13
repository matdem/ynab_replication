class Category {
  constructor(name, budgeted = 0, available = 0) {
    this.name = name;
    this.budgeted = budgeted;
    this.available = available;
    this.costItems = [];
  }
}

export { Category };
