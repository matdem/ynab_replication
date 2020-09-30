// Use "builder.js" Use "tiny_fp_lib.js"
function createElement(htmlTag) {
  return document.createElement(htmlTag);
}

function addAttribute(attributeType, attributeName, element) {
  let elementCopied = element;
  elementCopied.setAttribute(attributeType, attributeName);
  return elementCopied;
}

function addClassName(element, ...className) {
  let elementCopied = element;
  className.map((eachClass) => elementCopied.classList.add(eachClass));
  return elementCopied;
}

function addTextElement(text, element) {
  let elementCopied = element;
  elementCopied.innerHTML = text;
  return elementCopied;
}

function totalCostItems(property, categoryName) {
  const categories = budget.categories;
  const categoryIndex = indexOfName(categoryName, categories);

  return categories[categoryIndex].costItems
    .map((item) => item[property])
    .reduce((sum, value) => sum + value, 0);
}

function currencyFormat(num) {
  num = String(num.toFixed(2));
  const part1 = num.match(/^[-\d]+/g)[0];
  const part2 = num.match(/\d*$/g)[0];

  function formatPart1(part) {
    return part
      .split("")
      .reverse()
      .reduceRight((prev, current, index) => {
        return index % 3 !== 0 || index === 0
          ? prev + current
          : prev + current + " ";
      }, "");
  }

  return `${formatPart1(part1)},${part2}$`;
}

function addElement(type, textElement, ...classNames) {
  let setElement = compose(
    partialRight(addClassName, ...classNames),
    partial(addTextElement, textElement)
  );
  let element = setElement(createElement(type));

  return element;
}

function append(parent, ...children) {
  let parentCopied = parent;
  children.map((child) => parentCopied.appendChild(child));
  return parentCopied;
}

function hasCategoryElt(categoryName) {
  let category = document.getElementById(categoryName);
  return category != null || category != undefined;
}

function isInCategory(costItemName, categoryName) {
  let costItem = document.getElementsByClassName("costItem");
  for (let i = 0; i < costItem.length; i += 1) {
    let names = costItem[i].getElementsByClassName("costItemName");
    if (costItem[i].classList.contains(categoryName)) {
      for (let j = 0; j < names.length; j += 1) {
        if (names[j].textContent == costItemName) {
          return true;
        }
      }
    }
  }
  return false;
}

let budgetTable = {
  createCategoryForm: function createCategoryForm(categoryName) {
    let events = {
      displayNone() {
        inputElt.value = "";
        categoryFormElt.style.display = "none";
      },

      addCostItemElt() {
        budget.addCostItem(inputElt.value, categoryName);
        displayBudget(budget, budgetTable);
        this.displayNone(inputElt);
      },

      getInputEltFocus() {
        inputElt.focus();
      },
    };

    let categoryFormElt = addElement("div", "", "categoryForm");
    categoryFormElt.addEventListener("blur", events.displayNone);

    let inputElt = createElement("input");
    inputElt.setAttribute("type", "text");
    inputElt.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        events.addCostItemElt();
      }
    });

    let cancelButton = addElement("button", "Cancel", "cancelButton");
    cancelButton.addEventListener("click", events.displayNone);

    let confirmButton = addElement("button", "Add", "confimButton");
    confirmButton.addEventListener("click", () => {
      events.addCostItemElt();
    });

    return append(categoryFormElt, inputElt, confirmButton, cancelButton);
  },

  createCategoryName: function createCategoryName(categoryName) {
    let categoryNameElt = addElement("div", categoryName, "categoryName");
    let categoryFormElt = budgetTable.createCategoryForm(categoryName);
    let addButtonElt = addElement("div", "+", "button");
    addButtonElt.addEventListener("click", function () {
      categoryFormElt.style.display = "block";
      var inputElt = document
        .getElementById(categoryName)
        .querySelector("input");
      inputElt.focus();
    });

    return append(categoryNameElt, addButtonElt, categoryFormElt);
  },

  createCategory: function createCategory(categoryName) {
    let categoryElt = addElement("div", "", "category");
    categoryElt.id = categoryName;

    let budgetedText =
      "Budgeted" +
      "<br>" +
      currencyFormat(totalCostItems("budgeted", categoryName));
    let budgetedElt = addElement("div", budgetedText, "budgeted");

    let availableText =
      "Available" +
      "<br />" +
      currencyFormat(totalCostItems("available", categoryName));
    let availableElt = addElement("div", availableText, "available");

    return append(
      categoryElt,
      budgetTable.createCategoryName(categoryName),
      budgetedElt,
      availableElt
    );
  },

  createACategoryRow: function createACategoryRow(categoryName) {
    let budgetElt = document.getElementById("budget");
    let categoryElt = budgetTable.createCategory(categoryName);

    return append(budgetElt, categoryElt);
  },

  createInputBudgetedForm: function createInputBudgetedForm(
    costItemName,
    categoryName
  ) {
    let costItem = budget.getCostItem(costItemName, categoryName);

    let inputBudgeted = createElement("input");
    inputBudgeted.setAttribute("type", "text");
  },

  createCostItem: function createCostItem(costItemName, categoryName) {
    let costItem = budget.getCostItem(costItemName, categoryName);

    let costItemElt = addElement("div", "", "costItem", categoryName);

    let checkBoxElt = addElement("input", "", "cost-item-checkbox");
    checkBoxElt.setAttribute("type", "checkbox");

    let costItemNameElt = addElement("div", costItemName, "costItemName");

    let budgetedElt = addElement(
      "div",
      currencyFormat(costItem.budgeted),
      "budgeted",
      "number"
    );
    budgetedElt.addEventListener("click", (e) => {});
    let availableElt = addElement(
      "div",
      currencyFormat(costItem.available),
      "available",
      "number"
    );

    return append(
      costItemElt,
      checkBoxElt,
      costItemNameElt,
      budgetedElt,
      availableElt
    );
  },

  createACostItemRow: function createACostItemRow(costItemName, categoryName) {
    let budgetElt = document.getElementById("budget");
    let costItemElt = budgetTable.createCostItem(costItemName, categoryName);
    let categoryElt = document.getElementById(categoryName);

    if (costItemElt.classList.contains(categoryName)) {
      return budgetElt.insertBefore(costItemElt, categoryElt.nextSibling);
    }
  },
};

function displayBudget(budget, budgetTable) {
  budget.categories.map((category) => {
    if (!hasCategoryElt(category.name)) {
      budgetTable.createACategoryRow(category.name);
    }

    category.costItems.map((costItem) => {
      if (!isInCategory(costItem.name, category.name)) {
        budgetTable.createACostItemRow(costItem.name, category.name);
      }
    });
  });
}

displayBudget(budget, budgetTable);
