// script.js

// Default realistic data
const GDP = 100000; // Total value of goods/services ($)
const initialMoney = 1000; // Money in circulation ($)
const productionCostPerUnit = 10; // Average cost to produce one unit of goods ($)
const incomeDistribution = {
  low: 0.6,  // 60% of population
  middle: 0.3, // 30% of population
  high: 0.1,   // 10% of population
};

document.getElementById("new-money").addEventListener("input", (e) => {
  document.getElementById("money-value").textContent = e.target.value;
});

document.getElementById("population").addEventListener("input", (e) => {
  document.getElementById("population-value").textContent = e.target.value;
});

document.getElementById("simulate-button").addEventListener("click", () => {
  const newMoney = parseFloat(document.getElementById("new-money").value);
  const population = parseFloat(document.getElementById("population").value);

  // Calculate inflation
  const totalMoneyAfter = initialMoney + newMoney;
  const priceBefore = GDP / initialMoney;
  const priceAfter = GDP / totalMoneyAfter;
  const inflationRate = (priceAfter / priceBefore - 1) * 100;

  // Calculate impact on income groups
  const lowIncome = (population * incomeDistribution.low) * 500;
  const middleIncome = (population * incomeDistribution.middle) * 1500;
  const highIncome = (population * incomeDistribution.high) * 5000;

  const adjustedLowIncome = lowIncome / (priceAfter / priceBefore);
  const adjustedMiddleIncome = middleIncome / (priceAfter / priceBefore);
  const adjustedHighIncome = highIncome / (priceAfter / priceBefore);

  // Update UI
  document.getElementById("results-section").hidden = false;

  const summary = `
    Total Money Supply After Printing: $${totalMoneyAfter.toFixed(2)}<br>
    Inflation Rate: ${inflationRate.toFixed(2)}%<br>
    Adjusted Purchasing Power:<br>
    - Low Income: $${adjustedLowIncome.toFixed(2)}<br>
    - Middle Income: $${adjustedMiddleIncome.toFixed(2)}<br>
    - High Income: $${adjustedHighIncome.toFixed(2)}<br>
  `;
  document.getElementById("summary").innerHTML = summary;

  // Charts
  new Chart(document.getElementById("price-chart").getContext("2d"), {
    type: "bar",
    data: {
      labels: ["Before Printing", "After Printing"],
      datasets: [{
        label: "Price Per Unit",
        data: [priceBefore, priceAfter],
        backgroundColor: ["#4caf50", "#f44336"],
      }]
    }
  });

  new Chart(document.getElementById("income-chart").getContext("2d"), {
    type: "bar",
    data: {
      labels: ["Low Income", "Middle Income", "High Income"],
      datasets: [{
        label: "Adjusted Income",
        data: [adjustedLowIncome, adjustedMiddleIncome, adjustedHighIncome],
        backgroundColor: ["#ff9800", "#4caf50", "#2196f3"],
      }]
    }
  });
});
