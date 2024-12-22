document.addEventListener("DOMContentLoaded", () => {
  // Default values
  const GDP = 100000; // Total value of goods/services
  const initialMoney = 1000; // Money in circulation
  const incomeDistribution = { low: 0.6, middle: 0.3, high: 0.1 }; // Income groups

  // Link sliders and display values
  const newMoneySlider = document.getElementById("new-money");
  const newMoneyValue = document.getElementById("money-value");
  const populationSlider = document.getElementById("population");
  const populationValue = document.getElementById("population-value");

  newMoneySlider.addEventListener("input", () => {
    newMoneyValue.textContent = newMoneySlider.value;
  });

  populationSlider.addEventListener("input", () => {
    populationValue.textContent = populationSlider.value;
  });

  // Chart instances
  let priceChart = null;
  let incomeChart = null;

  // Handle simulation
  document.getElementById("simulate-button").addEventListener("click", () => {
    const newMoney = parseFloat(newMoneySlider.value);
    const population = parseFloat(populationSlider.value);

    // Inflation calculations
    const totalMoneyAfter = initialMoney + newMoney;
    const priceBefore = GDP / initialMoney;
    const priceAfter = GDP / totalMoneyAfter;
    const inflationRate = ((priceAfter / priceBefore - 1) * 100).toFixed(2);

    // Income group calculations
    const lowIncome = population * incomeDistribution.low * 500;
    const middleIncome = population * incomeDistribution.middle * 1500;
    const highIncome = population * incomeDistribution.high * 5000;

    const adjustedLowIncome = (lowIncome * priceBefore / priceAfter).toFixed(2);
    const adjustedMiddleIncome = (middleIncome * priceBefore / priceAfter).toFixed(2);
    const adjustedHighIncome = (highIncome * priceBefore / priceAfter).toFixed(2);

    // Display results
    document.getElementById("results-section").hidden = false;
    document.getElementById("summary").innerHTML = `
      <strong>Inflation Simulation Results:</strong><br>
      Total Money Supply After Printing: $${totalMoneyAfter.toFixed(2)}<br>
      Inflation Rate: ${inflationRate}%<br>
      Adjusted Purchasing Power:<br>
      - Low Income: $${adjustedLowIncome}<br>
      - Middle Income: $${adjustedMiddleIncome}<br>
      - High Income: $${adjustedHighIncome}
    `;

    // Destroy existing charts if any
    if (priceChart) priceChart.destroy();
    if (incomeChart) incomeChart.destroy();

    // Create Price Chart
    const priceCtx = document.getElementById("price-chart").getContext("2d");
    priceChart = new Chart(priceCtx, {
      type: "bar",
      data: {
        labels: ["Before Printing", "After Printing"],
        datasets: [{
          label: "Price Per Unit",
          data: [priceBefore.toFixed(2), priceAfter.toFixed(2)],
          backgroundColor: ["#4caf50", "#f44336"],
        }]
      },
      options: {
        responsive: true,
      }
    });

    // Create Income Chart
    const incomeCtx = document.getElementById("income-chart").getContext("2d");
    incomeChart = new Chart(incomeCtx, {
      type: "bar",
      data: {
        labels: ["Low Income", "Middle Income", "High Income"],
        datasets: [{
          label: "Adjusted Income",
          data: [adjustedLowIncome, adjustedMiddleIncome, adjustedHighIncome],
          backgroundColor: ["#ff9800", "#4caf50", "#2196f3"],
        }]
      },
      options: {
        responsive: true,
      }
    });
  });
});
