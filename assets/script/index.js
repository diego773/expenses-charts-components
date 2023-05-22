const tableBody = document.querySelector(".graph-list-container");

const getData = async () => {
  const url = "../data.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Data fetch failed");
    }
    const data = await response.json();
    displayGraph(data);
  } catch (error) {
    console.error("There was an error with your fetch operation", error);
  }
};

const displayGraph = (data) => {
  data.forEach((expenses) => {
    const barRow = document.createElement("tr");
    const amountHeader = document.createElement("th");
    const barData = document.createElement("td");

    barRow.classList.add("graph-list-row");
    amountHeader.classList.add("amount");
    barData.classList.add("bar-graph");

    amountHeader.setAttribute("data-set", "hidden");

    const roundedExpense = Math.round(expenses.amount);
    barData.style.height = roundedExpense * 2.9 + "px";

    barRow.appendChild(amountHeader);
    barRow.appendChild(barData);

    const daysHeader = document.createElement("th");

    daysHeader.textContent = expenses.day;

    daysHeader.classList.add("graph-list-days");
    barRow.classList.add("graph-list-row");

    barRow.appendChild(daysHeader);
    tableBody.appendChild(barRow);

    barData.onmouseover = (event) => {
      let eventData = event.target;
      eventData = amountHeader;

      let state = eventData.getAttribute("data-state");
      eventData.dataset.state = "hidden";

      if (state === "visible") {
        eventData.textContent = "";
        eventData.setAttribute("data-set", "hidden");
      } else {
        eventData.textContent = `$${expenses.amount}`;
        eventData.dataset.state = "visible";
      }
    };

    barData.onmouseout = (event) => {
      let eventData = event.target;
      eventData = amountHeader;

      let state = eventData.getAttribute("data-state");
      eventData.dataset.state = "hidden";

      if (state === "visible") {
        eventData.textContent = "";
        eventData.setAttribute("data-set", "hidden");
      } else {
        eventData.textContent = `$${expenses.amount}`;
        eventData.dataset.state = "visible";
      }
    };
  });

  highLightCurrentBar();
};

const highLightCurrentBar = () => {
  const currentDay = (new Date().getDay() - 1 + 7) % 7;
  const currentBar = document.querySelectorAll(".bar-graph")[currentDay];

  if (currentBar) {
    currentBar.style.backgroundColor = "var(--cyan)";
  }
};

getData();
