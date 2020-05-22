// Creation of a table with budget's datas from "./budget_datas.js"
const budgetElt = document.getElementById("budget");

// Categories rows
for (let category of budget.categories) {
  // Calculate total budgeted and total available
  for (let item of budget.costItems) {
    if (category.name === item.category) {
      category.totalBudgeted += item.budgeted;
      category.totalAvailable += item.available;
    }
  }

  // Create a div for each category and set its attributes
  const div = document.createElement("div");
  div.className = "category";
  div.id = category.name;

  // Add each head colum's category
  for (let property in category) {
    const p = document.createElement("p");
    switch (property) {
      case "name":
        p.textContent = category.name;
        break;
      case "totalBudgeted": // Add the head title and the total
        p.innerHTML = `Budgeted<br />${category.totalBudgeted}$`;
        break;
      case "totalAvailable": // Add the head title and the total
        p.innerHTML = `Available<br />${category.totalAvailable}$`;
        break;
    }
    div.appendChild(p);
  }
  budgetElt.appendChild(div);
}

// Cost items rows
for (let costItem of budget.costItems) {
  // Create a div for each costItem with its attributes
  const div = document.createElement("div");
  div.className = "costItem";
  div.classList.add(costItem.category);

  // Add the content of each row
  for (let a = 0; a < Object.values(costItem).length; a++) {
    // Discard the "category" property because it's not in the layout
    if (Object.keys(costItem)[a] !== "category") {
      const p = document.createElement("p");
      // Add "$" for numbers
      if (typeof Object.values(costItem)[a] === "number") {
        p.textContent = Object.values(costItem)[a] + "$";
      } else {
        p.textContent = Object.values(costItem)[a];
      }
      div.appendChild(p);
    }
  }

  // Classify each row with the good category
  for (let category of budget.categories) {
    const divCategory = document.getElementById(category.name);
    if (div.classList.contains(category.name)) {
      budgetElt.insertBefore(div, divCategory.nextSibling);
    }
  }
}
