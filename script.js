document.getElementById("prediction-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const age = parseFloat(document.getElementById("age").value);
  const bmi = parseFloat(document.getElementById("bmi").value);
  const glucose = parseFloat(document.getElementById("glucose").value);
  const family = parseInt(document.getElementById("family").value);

  // Dataset sederhana: [age, bmi, glucose, family_history, label]
  const dataset = [
    [25, 22.0, 85, 0, 0],
    [45, 28.0, 130, 1, 1],
    [30, 23.5, 90, 0, 0],
    [50, 31.0, 140, 1, 1],
    [28, 21.5, 95, 0, 0],
    [60, 33.5, 160, 1, 1]
  ];

  function calculateStats(data, label) {
    const filtered = data.filter(d => d[4] === label);
    const means = [], variances = [];
    for (let i = 0; i < 4; i++) {
      const values = filtered.map(row => row[i]);
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
      means.push(mean);
      variances.push(variance);
    }
    return { means, variances };
  }

  function gaussian(x, mean, variance) {
    const exponent = Math.exp(-((x - mean) ** 2) / (2 * variance));
    return (1 / Math.sqrt(2 * Math.PI * variance)) * exponent;
  }

  function calculateProbability(stats, input) {
    return input.reduce((prob, val, i) => prob * gaussian(val, stats.means[i], stats.variances[i]), 1);
  }

  const stats0 = calculateStats(dataset, 0);
  const stats1 = calculateStats(dataset, 1);
  const input = [age, bmi, glucose, family];

  const prob0 = calculateProbability(stats0, input);
  const prob1 = calculateProbability(stats1, input);

  const resultBox = document.getElementById("result");

  if (prob1 > prob0) {
    resultBox.textContent = "⚠️ Risiko Diabetes: TINGGI";
    resultBox.className = "warning";
  } else {
    resultBox.textContent = "✅ Risiko Diabetes: RENDAH";
    resultBox.className = "success";
  }

  resultBox.style.display = "block";
});
