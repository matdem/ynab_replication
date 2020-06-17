
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
  const divElt = document.createElement("div");
  divElt.className = "category";
  divElt.id = category.name;

  // Add each head colum's category
  for (let property in category) {
    const pElt = document.createElement("p");
    const addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.className = "addCategory"
    addButton.addEventListener("click", function inputCategory() );
    switch (property) {
      case "name":
        pElt.textContent = category.name;
        pElt.appendChild(addButton);
        break;
      case "budgeted": // Add the head title and the total
        pElt.innerHTML = `Budgeted<br />${category.budgeted}$`;
        break;
      case "available": // Add the head title and the total
        pElt.innerHTML = `Available<br />${category.available}$`;
        break;
    }
    divElt.appendChild(pElt);
  }
  budgetElt.appendChild(divElt);
}

// Cost items rows
for (let costItem of budget.costItems) {
  // Create a div for each costItem and set its attributes
  const divElt = document.createElement("div");
  divElt.className = "costItem";
  divElt.classList.add(costItem.category);

  // Add the content of each row
  for (let property in costItem) {
    // Discard the "category" property because it's not in the layout
    if (property !== "category") {
      const pElt = document.createElement("p");
      // Add "$" for numbers
      if (typeof costItem[property] === "number") {
        pElt.textContent = costItem[property] + "$";
      } else {
        pElt.textContent = costItem[property];
      }
      divElt.appendChild(pElt);
    }
  }

  // Classify each row with the good category
  for (let category of budget.categories) {
    const divCategory = document.getElementById(category.name);
    if (divElt.classList.contains(category.name)) {
      budgetElt.insertBefore(divElt, divCategory.nextSibling);
    }
  }
}
