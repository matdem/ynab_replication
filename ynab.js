// Creation of a table with budget's datas from "./budget_datas.js"
const budgetElt = document.getElementById("budget");

// Categories rows
for (let category of budget.categories) {
  // Calculate total budgeted and total available
  for (let item of budget.costItems) {
    if (category.name === item.category) {
      category.budgeted += item.budgeted;
      category.available += item.available;
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
      case "budgeted": // Add the head title and the total
        p.innerHTML = `Budgeted<br />${category.budgeted}$`;
        break;
      case "available": // Add the head title and the total
        p.innerHTML = `Available<br />${category.available}$`;
        break;
    }
    div.appendChild(p);
  }
  budgetElt.appendChild(div);
}

// Cost items rows
for (let costItem of budget.costItems) {
  // Create a div for each costItem and set its attributes
  const div = document.createElement("div");
  div.className = "costItem";
  div.classList.add(costItem.category);

  // Add the content of each row
  for (let property in costItem) {
    // Discard the "category" property because it's not in the layout
    if (property !== "category") {
      const p = document.createElement("p");
      // Add "$" for numbers
      if (typeof costItem[property] === "number") {
        p.textContent = costItem[property] + "$";
      } else {
        p.textContent = costItem[property];
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
