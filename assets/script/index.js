const tableBody = document.querySelector(".graph-list-container");

const fetchData = async (dataUrl) => {
  dataUrl = "../data.json";
  try {
    const response = await fetch(dataUrl);
    if (response.ok) {
      console.log("response", response);
    }
    const data = await response.json();
    console.log("data", data);
    displaygraph(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const displaygraph = (data) => {
  data.forEach((expense) => {
    const roundedExpense = Math.round(expense.amount);
    console.log("rounded", roundedExpense);
    const tableRow = document.createElement("tr");
    const tableHeader = document.createElement("th");
    const tableData = document.createElement("td");
    const tableSubHeader = document.createElement("span");

    tableHeader.textContent = expense.day;
    tableSubHeader.textContent = `$${expense.amount}`;
    // tableData.textContent = expense.amount;

    tableHeader.classList.add("graph-list-days");
    tableData.classList.add("bar-graph");
    tableRow.classList.add("graph-list-row");
    tableSubHeader.classList.add("amount");

    tableData.style.height = roundedExpense * 2.9 + "px";
    console.log((tableData.style.height = roundedExpense * 2.9 + "px"));

    tableRow.appendChild(tableHeader);
    tableRow.appendChild(tableData);
    tableRow.appendChild(tableSubHeader);

    tableBody.appendChild(tableRow);
  });
};

fetchData();
