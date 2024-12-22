// script.js
document.getElementById("simulate-button").addEventListener("click", () => {
  const initialMoney = parseFloat(document.getElementById("initial-money").value);
  const goods = parseFloat(document.getElementById("goods").value);
  const productionCost = parseFloat(document.getElementById("production-cost").value);
  const newMoney = parseFloat(document.getElementById("new-money").value);
  const population = parseFloat(document.getElementById("population").value);

  // Economy calculations
  const totalMoneyBefore = initialMoney;
  const totalMoneyAfter = initialMoney + newMoney;

  const priceBefore = totalMoneyBefore / goods;
  const priceAfter = totalMoneyAfter / goods;

  const inflationRate = (priceAfter / priceBefore - 1) * 100;

  // Production calculations
  const productionCapacity = goods / productionCost;
  const productionCostAfter = productionCost * (1 + inflationRate / 100);
  const newProductionCapacity = goods / productionCostAfter;

  // Income group impact
  const lowIncome = (population * 0.6) * 500; // 60% of population with $500 each
  const middleIncome = (population * 0.3) * 1500; // 30% of population with $1500 each
  const highIncome = (population * 0.1) * 5000; // 10% of population with $5000 each

  const adjustedLowIncome = lowIncome / (priceAfter / priceBefore);
  const adjustedMiddleIncome = middleIncome / (priceAfter / priceBefore);
  const adjustedHighIncome = highIncome / (priceAfter / priceBefore);

  // Update the results section
  document.getElementById("results-section").hidden = false;

  const summary = `
    Initial Money Supply: $${initialMoney.toFixed(2)}<br>
    New Money Printed: $${newMoney.toFixed(2)}<br>
    Total Money Supply: $${totalMoneyAfter.toFixed(2)}<br>
    Price Per Unit Before: $${priceBefore.toFixed(2)}<br>
    Price Per Unit After: $${priceAfter.toFixed(2)}<br>
    Inflation Rate: ${inflationRate.toFixed(2)}%<br>
    New Production Capacity: ${newProductionCapacity.toFixed(2)} Units<br>
    Low-Income Group: Adjusted Value $${adjustedLowIncome.toFixed(2)}<br>
    Middle-Income Group: Adjusted Value $${adjustedMiddleIncome.toFixed(2)}<br>
    High-Income Group: Adjusted Value $${adjustedHighIncome.toFixed(2)}<br>
  `;
  document.getElementById("summary").innerHTML = summary;

  // Visualizations
  const priceChartCtx = document.getElementById("price-chart").getContext("2d");
  new Chart(priceChartCtx, {
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

  const incomeChartCtx = document.getElementById("income-chart").getContext("2d");
  new Chart(incomeChartCtx, {
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

  const productionChartCtx = document.getElementById("production-chart").getContext("2d");
  new Chart(productionChartCtx, {
    type: "line",
    data: {
      labels: ["Before Inflation", "After Inflation"],
      datasets: [{
        label: "Production Capacity",
        data: [productionCapacity, newProductionCapacity],
        borderColor: "#9c27b0",
        fill: false,
      }]
    }
  });
});
