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

/************************************
 *              LOGIC               *
 ***********************************/
request_body = {
  company_name: "agreen",
  office_address: "",
  mobile: "",
  office_telephone: "",
  office_fax: "",
  po_box: "",
  email: "",
  detailed_activities: "",
  client_description: "",
  company_background: "",
  business_nature: "",
  associated_company: "",
  customers: [
    {
      name: "",
      origin: "",
      product: "",
    },
    {
      name: "",
      origin: "",
      product: "",
    },
  ],
  supplires: [
    {
      name: "",
      origin: "",
      product: "",
    },
    {
      name: "",
      origin: "",
      product: "",
    },
  ],
  products_handeled_by_company: [
    {
      product_name: "",
      variety: "",
      origin: "",
      quality_per_ton: "",
    },
    {
      product_name: "",
      variety: "",
      origin: "",
      quality_per_ton: "",
    },
  ],
  annual_imported_for_egyptian: {
    egyptian_citrus_variety: ["data1", "data2", "data3"],
    annual_quantity: ["data1", "data2", "data3"],
  },
  annual_imported_citrus_from_other_countris: {
    country_citrus_variety: ["data1", "data2", "data3"],
    annual_quantity: ["data1", "data2", "data3"],
  },
  turnover_annual_expected: "",
  net_profit: "",
  number_of_warehouses_and_offices_owned: "",
  employees_number: "",
  website: "",
  cold_rooms_owned_by_the_company: "",
  name_of_cities_countries_in_are_selling: "",
  places_of_company_branches_over_the_world: "",
  additional_information: "",
};

/************************************
 *            Selection             *
 ***********************************/
const submit = selectElement("#submit-survey");
const form = selectElement("#survey-form");
/************************************
 *        Action Functions          *
 ***********************************/
form.addEventListener("submit", function (event) {
  event.preventDefault();
});
submit.addEventListener("click", function (event) {
  const surveyObject = collectData();
  const surveyJson = JSON.stringify(surveyObject.entries);
  console.log(surveyObject);
});
/************************************
 *      Standalone Functions        *
 ***********************************/
function selectElement(selection) {
  const element = document.querySelector(selection);
  return element;
}

function getInputData(selection) {
  const element = document.querySelector(selection);
  return element.value;
}

function selectTable(tableSelection, objectNames) {
  const rows = getTableRows(tableSelection);
  const tableData = getAllRowValues(rows, objectNames);
  return tableData;
}

function getTableRows(tableSelection) {
  const table = document.querySelector(tableSelection);
  const rows = table.querySelectorAll(".table-row");
  return rows;
}

function getAllRowValues(rows, objectNames) {
  const result = [];
  rows.forEach((row) => {
    const textareas = row.querySelectorAll(".table-area");
    const rowObject = {};
    textareas.forEach((textarea, index) => {
      rowObject[`${objectNames[index]}`] = textarea.value;
    });
    result.push(rowObject);
  });
  return result;
}

function getSingleRowValues(tableSelection) {
  const dataSingleRow = [];
  const row = document.querySelector(tableSelection);
  const textareas = row.querySelectorAll(".table-area");
  textareas.forEach((textarea, index) => {
    if (textarea.value != "") {
      dataSingleRow.push(textarea.value);
    }
  });
  return dataSingleRow;
}

function collectData() {
  let surveyData = {};
  const companyName = getInputData("#name");
  const officeAddress = getInputData("#office-address");
  const mobile = getInputData("#mobile");
  const telephone = getInputData("#telephone");
  const fax = getInputData("#fax");
  const po = getInputData("#po");
  const email = getInputData("#email");
  const activities = getInputData("#activities");
  const clientDecription = getInputData("#client-decription");
  const backgroundOfCompany = getInputData("#background-of-company");
  const natureOfBusiness = getInputData("#nature-of-business");
  const associateCompanies = getInputData("#associate-companies");
  const turnoverAnnualExpected = getInputData("#turnover-annual-expected");
  const netProfit = getInputData("#net-profit");
  const numberOfWarehouses = getInputData(
    "#number-of-warehouses-and-offices-owned"
  );
  const noOfEmployee = getInputData("#no-of-employee");
  const website = getInputData("#website");
  const coldRooms = getInputData(
    "#cold-rooms-owned-by-the-company-and-its-capacity"
  );
  const nameOfCities = getInputData(
    "#name-of-cities-and-countries-in-which-company-are-selling"
  );
  const placesOfCompany = getInputData(
    "#places-of-company-branches-over-the-world"
  );
  const additionalInformation = getInputData("#additional-information");

  //////// Table Selcttions
  const tableCustomer = selectTable(".table-customers", [
    "name",
    "origin",
    "product",
  ]);
  const tableSuppliers = selectTable(".table-suppliers", [
    "name",
    "origin",
    "product",
  ]);
  const nameOfProducts = selectTable(".table-name-of-products", [
    "product_name",
    "variety",
    "origin",
    "quality_per_ton",
  ]);

  const egyptianCitrus = getSingleRowValues("#egyptian-citrus");
  const annualQuantity = getSingleRowValues("#annual-quantity");
  const countryCitrus = getSingleRowValues("#country-citrus");
  const countryAnnualQuantity = getSingleRowValues("#country-annual-quantity");

  surveyData = {
    company_name: companyName,
    office_address: officeAddress,
    mobile: mobile,
    office_telephone: telephone,
    office_fax: fax,
    po_box: po,
    email: email,
    detailed_activities: activities,
    client_description: clientDecription,
    company_background: backgroundOfCompany,
    business_nature: natureOfBusiness,
    associated_company: associateCompanies,
    customers: tableCustomer,
    supplires: tableSuppliers,
    products_handeled_by_company: nameOfProducts,
    annual_imported_for_egyptian: {
      egyptian_citrus_variety: egyptianCitrus,
      annual_quantity: annualQuantity,
    },
    annual_imported_citrus_from_other_countris: {
      country_citrus_variety: countryCitrus,
      annual_quantity: countryAnnualQuantity,
    },
    turnover_annual_expected: turnoverAnnualExpected,
    net_profit: netProfit,
    number_of_warehouses_and_offices_owned: numberOfWarehouses,
    employees_number: noOfEmployee,
    website: website,
    cold_rooms_owned_by_the_company: coldRooms,
    name_of_cities_countries_in_are_selling: nameOfCities,
    places_of_company_branches_over_the_world: placesOfCompany,
    additional_information: additionalInformation,
  };

  return surveyData;
}
