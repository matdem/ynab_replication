// Budget's Datas
var budget = {
  year: 2019,
  categories: [
    {
      name: "Obligations",
      budgeted: 0,
      available: 0
    },
    {
      name: "Voitures",
      budgeted: 0,
      available: 0
    }
  ],
  costItems: [
    {
      name: "Hypothèque",
      category: "Obligations",
      budgeted: 100,
      available: 150
    },
    {
      name: "Sogetel",
      category: "Obligations",
      budgeted: 116,
      available: 0
    },
    {
      name: "Essence",
      category: "Voitures",
      budgeted: 50,
      available: 30
    },
    {
      name: "Entretien",
      category: "Voitures",
      budgeted: 100,
      available: 70
    }
  ]
};

for (let category of budget.categories) {
  for (let item of budget.costItems) {
    if (category.name === item.category) {
      category.budgeted += item.budgeted;
      category.available += item.available;
    }
  }
}

// Creation of a table with budget's datas
var budgetElt = document.getElementById("budget");

// Categories rows
for (let i = 0; i < budget.categories.length; i++) {
  let category = budget.categories[i];

  let div = document.createElement("div");
  div.className = "category";
  div.id = category.name;

  var p = document.createElement("p");

  // Add each head colum's category
  for (let a = 0; a < Object.values(category).length; a++) {
    var p = document.createElement("p");
    var value = Object.keys(category)[a];
    switch (value) {
      case "name":
        p.textContent = category.name;
        break;
      case "budgeted":
        p.innerHTML = `Budgeted<br />${category.budgeted}$`;
        break;
      case "available":
        p.innerHTML = `Available<br />${category.available}$`;
        break;
    }
    div.appendChild(p);
  }
  budgetElt.appendChild(div);
}

// Cost items rows
for (let i = 0; i < budget.costItems.length; i++) {
  var costItem = budget.costItems[i];

  var div = document.createElement("div");
  div.className = "costItem";
  div.classList.add(costItem.category);

  for (var a = 0; a < Object.values(costItem).length; a++) {
    if (Object.keys(costItem)[a] !== "category") {
      var p = document.createElement("p");

      // Add "$" for numbers
      if (typeof Object.values(costItem)[a] === "number") {
        p.textContent = Object.values(costItem)[a] + "$";
      } else {
        p.textContent = Object.values(costItem)[a];
      }
    }
    div.appendChild(p);
  }
  for (let category of budget.categories) {
    var divCategory = document.getElementById(category.name);
    if (div.classList.contains(category.name)) {
      budgetElt.insertBefore(div, divCategory.nextSibling);
    }
  }
}
