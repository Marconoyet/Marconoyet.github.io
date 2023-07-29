const mobileInput = document.querySelector("#mobile");
const telephoneInput = document.querySelector("#telephone");
const faxInput = document.querySelector("#fax");
const poInput = document.querySelector("#po");

// table selection customers
const addRowBtnCustomers = document.querySelector("#add-row-btn-customers");
const removeRowBtnCustomers = document.querySelector(
  "#remove-row-btn-customers"
);
const tableCustomers = document.querySelector(".table-customers");
// table selection suppliers
const addRowBtnSuppliers = document.querySelector("#add-row-btn-suppliers");
const removeRowBtnSuppliers = document.querySelector(
  "#remove-row-btn-suppliers"
);
const tableSuppliers = document.querySelector(".table-suppliers");

// table name of product
const addRowBtnNameOdfProducts = document.querySelector(
  "#add-row-btn-name-of-products"
);
const removeRowBtnNameOdfProducts = document.querySelector(
  "#remove-row-btn-name-of-products"
);
const tableNameOfProducts = document.querySelector(".table-name-of-products");

const validateNumberInput = (event) => {
  const input = event.target;
  const inputValue = input.value.trim();

  const numericValue = inputValue.replace(/[^\d]/g, "");

  input.value = numericValue;
};

const addNewRow = (tableContainer, removeRowBtn, num = 3) => {
  removeRowBtn.classList.remove("disabled-button");
  const newRow = document.createElement("div");
  const divsInTable = tableContainer.querySelectorAll("div.table-row");
  const lastDiv = divsInTable[divsInTable.length - 1];
  if (lastDiv.className.includes("second")) {
    newRow.className = "table-row";
  } else {
    newRow.className = "second table-row";
  }

  for (let i = 0; i < num; i++) {
    const newCell = document.createElement("textarea");
    newCell.className = "table-area ";
    if (i === num - 1) {
      newCell.className = "table-area last-child";
      newCell.cols = 5;
      newCell.rows = 3;
    }
    newRow.appendChild(newCell);
  }

  tableContainer.appendChild(newRow);
};

const removeRow = (tableContainer, removeRowBtn) => {
  const rows = tableContainer.querySelectorAll("div.table-row");
  if (rows.length == 3) {
    removeRowBtn.classList.add("disabled-button");
  }
  if (rows.length > 2) {
    tableContainer.removeChild(rows[rows.length - 1]);
  }
};
document.addEventListener("DOMContentLoaded", function () {
  mobileInput.addEventListener("input", validateNumberInput);
  telephoneInput.addEventListener("input", validateNumberInput);
  faxInput.addEventListener("input", validateNumberInput);
  poInput.addEventListener("input", validateNumberInput);
  addRowBtnCustomers.addEventListener("click", () =>
    addNewRow(tableCustomers, removeRowBtnCustomers)
  );
  removeRowBtnCustomers.addEventListener("click", () =>
    removeRow(tableCustomers, removeRowBtnCustomers)
  );
  addRowBtnSuppliers.addEventListener("click", () =>
    addNewRow(tableSuppliers, removeRowBtnSuppliers)
  );
  removeRowBtnSuppliers.addEventListener("click", () =>
    removeRow(tableSuppliers, removeRowBtnSuppliers)
  );

  addRowBtnNameOdfProducts.addEventListener("click", () =>
    addNewRow(tableNameOfProducts, removeRowBtnNameOdfProducts, 4)
  );
  removeRowBtnNameOdfProducts.addEventListener("click", () =>
    removeRow(tableNameOfProducts, removeRowBtnNameOdfProducts)
  );
});
