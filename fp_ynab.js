// Use "budget datas"
// Use "tiny_fp_lib.js"

function createElement(htmlTag) {
  return document.createElement(htmlTag);
}

function addIdAttribute(idName, element) {
  let elementCopied = element;
  elementCopied.id = idName;
  return elementCopied;
}

function addClassName(className, element) {
  let elementCopied = element;
  elementCopied.classList.add(className);
  return elementCopied;
}

function addAttribute(attributeType, attributeName, element) {
  let elementCopied = element;
  elementCopied.setAttribute(attributeType, attributeName);
  return elementCopied;
}

function addClassName2(element, ...className) {
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
    .reduce((sum, value) => sum + value);
}

function currencyFormat(num) {
  num = String(num);
  const part1 = num.match(/^\d+/g)[0];
  const part2 = num.match(/\d*$/g)[0];

  function formatPart1(part) {
    let partSpaced = "";
    let len = part.length - 1;
    for (let i = len; i >= 0; i--) {
      if (i % 3 !== 0 || i === 0) {
        partSpaced += part[len - i];
      } else if (i % 3 === 0) {
        partSpaced += part[len - i] + " ";
      }
    }
    return partSpaced;
  }

  function formatPart2(part) {
    let part2only2 = "";
    if (part == part1) {
      part2only2 += "00";
    } else if (part.length == 1) {
      part2only2 += part + "0";
    } else if (part.length == 2) {
      part2only2 += part;
    } else if (part.length > 2) {
      part2only2 += part[0];
      if (Number(part[2]) >= 5) {
        part2only2 += String(Number(part[1]) + 1);
      } else {
        part2only2 += part[1];
      }
    }
    return part2only2;
  }

  let part1Formated = formatPart1(part1);
  let part2Formated = formatPart2(part2);

  return `${part1Formated},${part2Formated}$`;
}

function toggleCategoryForm(element) {
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

function addElement(type, className, textElement) {
  let setElementt = compose(
    partial(addClassName, className),
    partial(addTextElement, textElement)
  );
  let element = setElementt(createElement(type));
  return element;
}

function addElement2(type, textElement, ...classNames) {
  let setElement = compose(
    partialRight(addClassName2, ...classNames),
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

function createCategoryForm() {
  let categoryFormElt = addElement("div", "categoryForm", "");

  let setInputElt = compose(
    partial(addIdAttribute, "inputCategory"),
    partial(addAttribute, "type", "text")
  );
  let inputElt = setInputElt(createElement("input"));
  inputElt.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
    }
  });

  let cancelButton = addElement("button", "cancelButton", "Cancel");
  cancelButton.addEventListener("click", function () {
    categoryFormElt.style.display = "none";
  });

  let confirmButton = addElement("button", "confimButton", "Add");

  return append(categoryFormElt, inputElt, confirmButton, cancelButton);
}

function createCategoryName(categoryName) {
  let categoryNameElt = addElement("p", "categoryName", categoryName);
  let categoryFormElt = createCategoryForm();
  let addButtonElt = addElement("div", "button", "+");
  addButtonElt.addEventListener("click", function () {
    categoryFormElt.style.display = "block";
  });

  return append(categoryNameElt, addButtonElt, categoryFormElt);
}

function createCategory(categoryName) {
  let categoryElt = addElement("div", "category", "");

  let budgetedText =
    "Budgeted" +
    "<br>" +
    currencyFormat(totalCostItems("budgeted", categoryName));
  let budgetedElt = addElement("p", "budgeted", budgetedText);

  let availableText =
    "Available" +
    "<br />" +
    currencyFormat(totalCostItems("available", categoryName));
  let availableElt = addElement("p", "available", availableText);

  return append(
    categoryElt,
    createCategoryName(categoryName),
    budgetedElt,
    availableElt
  );
}

function createACategoryRow(categoryName) {
  let budgetElt = document.getElementById("budget");
  let categoryElt = createCategory(categoryName);

  return append(budgetElt, categoryElt);
}

function createCostItem(costItemName, categoryName) {
  const categoryIndex = indexOfName(categoryName, budget.categories);
  const category = budget.categories[categoryIndex];
  const costItemIndex = indexOfName(costItemName, category.costItems);
  const costItem = category.costItems[costItemIndex];

  let costItemElt = addElement("div", "costItem", "");

  let costItemNameElt = addElement("p", "costItemName", costItemName);

  let budgetedElt = addElement2(
    "p",
    currencyFormat(costItem.budgeted),
    "budgeted",
    "number"
  );

  let availableElt = addElement2(
    "p",
    currencyFormat(costItem.available),
    "available",
    "number"
  );

  return append(costItemElt, costItemNameElt, budgetedElt, availableElt);
}

function createACostItemRow(costItemName, categoryName) {
  let budgetElt = document.getElementById("budget");
  let costItemElt = createCostItem(costItemName, categoryName);

  return append(budgetElt, costItemElt);
}

budget.categories.map((category) => {
  createACategoryRow(category.name);

  category.costItems.map((costItem) => {
    createACostItemRow(costItem.name, category.name);
  });
});
