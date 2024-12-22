// script.js
document.getElementById("simulate-button").addEventListener("click", () => {
  const initialMoney = parseFloat(document.getElementById("initial-money").value);
  const goods = parseFloat(document.getElementById("goods").value);
  const newMoney = parseFloat(document.getElementById("new-money").value);

  // Calculate prices before and after printing money
  const totalMoneyBefore = initialMoney;
  const totalMoneyAfter = initialMoney + newMoney;

  const priceBefore = totalMoneyBefore / goods;
  const priceAfter = totalMoneyAfter / goods;

  // Update the results section
  document.getElementById("results-section").hidden = false;

  const summary = `
    Initial Money Supply: $${initialMoney.toFixed(2)}<br>
    New Money Printed: $${newMoney.toFixed(2)}<br>
    Total Money Supply: $${totalMoneyAfter.toFixed(2)}<br>
    Price Per Unit Before: $${priceBefore.toFixed(2)}<br>
    Price Per Unit After: $${priceAfter.toFixed(2)}<br>
    Inflation Rate: ${(priceAfter / priceBefore * 100 - 100).toFixed(2)}%
  `;
  document.getElementById("summary").innerHTML = summary;

  // Chart visualization
  const ctx = document.getElementById("price-chart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Before Printing", "After Printing"],
      datasets: [{
        label: "Price Per Unit",
        data: [priceBefore, priceAfter],
        backgroundColor: ["#4caf50", "#f44336"],
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});
