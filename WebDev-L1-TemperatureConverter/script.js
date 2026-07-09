const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convertBtn = document.getElementById("convertBtn");
const resetBtn = document.getElementById("resetBtn");
const swapBtn = document.getElementById("swapBtn");
const copyBtn = document.getElementById("copyBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const exportHistoryBtn = document.getElementById("exportHistoryBtn");
const themeToggle = document.getElementById("themeToggle");
const conversionMode = document.getElementById("conversionMode");
const precisionSelect = document.getElementById("precisionSelect");

const resultText = document.getElementById("resultText");
const errorMessage = document.getElementById("errorMessage");
const resultBox = document.getElementById("resultBox");
const resultBadge = document.getElementById("resultBadge");
const categoryBadge = document.getElementById("categoryBadge");
const historyList = document.getElementById("historyList");
const toast = document.getElementById("toast");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");
const factText = document.getElementById("factText");
const allResultsSection = document.querySelector(".all-results-section");

const thermoFill = document.getElementById("thermoFill");
const thermoLabel = document.getElementById("thermoLabel");

const presetButtons = document.querySelectorAll(".preset-btn");

let historyItems = JSON.parse(localStorage.getItem("temperatureHistory")) || [];

function getUnitSymbol(unit) {
  if (unit === "celsius") return "°C";
  if (unit === "fahrenheit") return "°F";
  return "K";
}

function formatValue(value) {
  const precision = parseInt(precisionSelect.value, 10);
  return Number(value).toFixed(precision);
}

function isBelowAbsoluteZero(value, unit) {
  if (unit === "celsius") return value < -273.15;
  if (unit === "fahrenheit") return value < -459.67;
  if (unit === "kelvin") return value < 0;
  return false;
}

function toCelsius(value, from) {
  if (from === "celsius") return value;
  if (from === "fahrenheit") return (value - 32) * 5 / 9;
  return value - 273.15;
}

function fromCelsius(celsius, to) {
  if (to === "celsius") return celsius;
  if (to === "fahrenheit") return (celsius * 9 / 5) + 32;
  return celsius + 273.15;
}

function convertTemperature(value, from, to) {
  const celsiusValue = toCelsius(value, from);
  return fromCelsius(celsiusValue, to);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function saveHistory() {
  localStorage.setItem("temperatureHistory", JSON.stringify(historyItems));
}

function clearError() {
  errorMessage.textContent = "";
}

function showError(message) {
  errorMessage.textContent = message;
}

function getTemperatureCategory(celsiusValue) {
  if (celsiusValue <= 0) {
    return { label: "Cold", className: "cold" };
  } else if (celsiusValue > 0 && celsiusValue < 15) {
    return { label: "Cool", className: "cool" };
  } else if (celsiusValue >= 15 && celsiusValue < 30) {
    return { label: "Comfortable", className: "comfortable" };
  } else if (celsiusValue >= 30 && celsiusValue < 50) {
    return { label: "Warm", className: "warm" };
  } else {
    return { label: "Hot", className: "hot" };
  }
}

function setCategoryBadge(celsiusValue) {
  const category = getTemperatureCategory(celsiusValue);
  categoryBadge.textContent = category.label;
  categoryBadge.className = `category-badge ${category.className}`;
}

function getTemperatureFact(celsiusValue) {
  if (celsiusValue === -273.15) {
    return "This is absolute zero — the lowest possible temperature in physics.";
  } else if (celsiusValue <= -50) {
    return "Extremely cold temperature range. This is far below normal freezing conditions.";
  } else if (celsiusValue === 0) {
    return "0°C is the freezing point of water under standard atmospheric pressure.";
  } else if (celsiusValue > 0 && celsiusValue < 15) {
    return "Cool temperature range — similar to a chilly winter or early morning day.";
  } else if (celsiusValue >= 15 && celsiusValue < 30) {
    return "This is a comfortable room or outdoor temperature range.";
  } else if (celsiusValue === 37) {
    return "37°C is close to the average normal human body temperature.";
  } else if (celsiusValue >= 30 && celsiusValue < 100) {
    return "This falls into a warm to hot temperature range.";
  } else if (celsiusValue === 100) {
    return "100°C is the boiling point of water at standard atmospheric pressure.";
  } else if (celsiusValue > 100) {
    return "This is above the boiling point of water — a very high temperature range.";
  }
  return "Converted successfully. Temperature insight is based on the Celsius equivalent.";
}

function setAllResults(celsiusValue) {
  const fahrenheitValue = fromCelsius(celsiusValue, "fahrenheit");
  const kelvinValue = fromCelsius(celsiusValue, "kelvin");

  celsiusResult.textContent = `${formatValue(celsiusValue)} °C`;
  fahrenheitResult.textContent = `${formatValue(fahrenheitValue)} °F`;
  kelvinResult.textContent = `${formatValue(kelvinValue)} K`;
}

function updateThermometer(celsiusValue) {
  const min = -50;
  const max = 100;
  const clamped = Math.max(min, Math.min(max, celsiusValue));
  const percentage = ((clamped - min) / (max - min)) * 100;
  thermoFill.style.width = `${percentage}%`;

  const category = getTemperatureCategory(celsiusValue);
  thermoLabel.textContent = `${category.label} • ${formatValue(celsiusValue)} °C`;

  if (category.className === "cold") {
    thermoFill.style.background = "linear-gradient(90deg, #38bdf8, #0ea5e9)";
  } else if (category.className === "cool") {
    thermoFill.style.background = "linear-gradient(90deg, #60a5fa, #3b82f6)";
  } else if (category.className === "comfortable") {
    thermoFill.style.background = "linear-gradient(90deg, #34d399, #22c55e)";
  } else if (category.className === "warm") {
    thermoFill.style.background = "linear-gradient(90deg, #fbbf24, #f59e0b)";
  } else {
    thermoFill.style.background = "linear-gradient(90deg, #fb7185, #ef4444)";
  }
}

function showResult(message) {
  resultText.textContent = message;
  resultBox.classList.add("active");
  resultBadge.textContent = "Converted";

  setTimeout(() => {
    resultBox.classList.remove("active");
  }, 500);
}

function updateModeUI() {
  const mode = conversionMode.value;

  if (mode === "single") {
    allResultsSection.style.display = "none";
    toUnit.disabled = false;
    toUnit.style.opacity = "1";
  } else {
    allResultsSection.style.display = "block";
    toUnit.disabled = true;
    toUnit.style.opacity = "0.7";
  }
}

function renderHistory() {
  historyList.innerHTML = "";

  if (historyItems.length === 0) {
    historyList.innerHTML = "<li>No conversions yet.</li>";
    return;
  }

  historyItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "history-item";

    const content = document.createElement("div");
    content.className = "history-content";
    content.setAttribute("role", "button");
    content.setAttribute("tabindex", "0");
    content.setAttribute("aria-label", "Reuse this conversion");
    content.innerHTML = `
      <strong>${item.result}</strong>
      <small>${item.time}<br>Mode: ${item.modeLabel} | Precision: ${item.precision} decimals</small>
    `;

    content.addEventListener("click", () => reuseHistoryItem(item));
    content.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        reuseHistoryItem(item);
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-history-btn";
    deleteBtn.innerHTML = "&times;";
    deleteBtn.setAttribute("aria-label", "Delete this history item");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteHistoryItem(index);
    });

    li.appendChild(content);
    li.appendChild(deleteBtn);
    historyList.appendChild(li);
  });
}

function addToHistory(resultMessage, rawValue, from, to, mode, precision) {
  const time = new Date().toLocaleString();

  historyItems.unshift({
    result: resultMessage,
    time,
    rawValue,
    from,
    to,
    mode,
    modeLabel: mode === "all" ? "All Units" : "Single Conversion",
    precision
  });

  if (historyItems.length > 10) {
    historyItems.pop();
  }

  saveHistory();
  renderHistory();
}

function reuseHistoryItem(item) {
  temperatureInput.value = item.rawValue;
  fromUnit.value = item.from;
  toUnit.value = item.to;
  conversionMode.value = item.mode;
  precisionSelect.value = item.precision;
  updateModeUI();
  performConversion(false);
  showToast("History item loaded.");
}

function deleteHistoryItem(index) {
  historyItems.splice(index, 1);
  saveHistory();
  renderHistory();
  showToast("History item deleted.");
}

function exportHistory() {
  if (historyItems.length === 0) {
    showToast("No history to export.");
    return;
  }

  const lines = historyItems.map((item, i) => {
    return `${i + 1}. ${item.result} | ${item.time} | ${item.modeLabel} | Precision: ${item.precision}`;
  });

  const text = "Temperature Converter History\n\n" + lines.join("\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "temperature-history.txt";
  a.click();

  URL.revokeObjectURL(url);
  showToast("History exported.");
}

function resetDisplayState() {
  resultText.textContent = "Your converted temperature will appear here.";
  resultBadge.textContent = "Ready";
  categoryBadge.textContent = "--";
  categoryBadge.className = "category-badge neutral";
  celsiusResult.textContent = "--";
  fahrenheitResult.textContent = "--";
  kelvinResult.textContent = "--";
  factText.textContent = "Enter a value to see a related temperature fact or insight.";
  thermoFill.style.width = "0%";
  thermoLabel.textContent = "Waiting for input";
}

function performConversion(addHistory = false) {
  const rawValue = temperatureInput.value.trim();
  const from = fromUnit.value;
  const to = toUnit.value;
  const mode = conversionMode.value;
  const precision = precisionSelect.value;

  clearError();
  updateModeUI();

  if (rawValue === "") {
    resetDisplayState();
    return;
  }

  const value = parseFloat(rawValue);

  if (isNaN(value)) {
    showError("Please enter a valid numeric value.");
    return;
  }

  if (isBelowAbsoluteZero(value, from)) {
    showError("Temperature below absolute zero is not physically possible.");
    return;
  }

  const celsiusValue = toCelsius(value, from);
  const targetUnit = mode === "all" ? to : to;
  const convertedValue = convertTemperature(value, from, targetUnit);

  const resultMessage =
    mode === "single"
      ? `${value} ${getUnitSymbol(from)} = ${formatValue(convertedValue)} ${getUnitSymbol(to)}`
      : `${value} ${getUnitSymbol(from)} converted successfully into all units`;

  showResult(resultMessage);
  setCategoryBadge(Number(celsiusValue.toFixed(2)));
  updateThermometer(Number(celsiusValue.toFixed(2)));
  factText.textContent = getTemperatureFact(Number(celsiusValue.toFixed(2)));

  if (mode === "all") {
    setAllResults(celsiusValue);
  } else {
    celsiusResult.textContent = "--";
    fahrenheitResult.textContent = "--";
    kelvinResult.textContent = "--";
  }

  if (addHistory) {
    addToHistory(resultMessage, value, from, to, mode, precision);
  }
}

convertBtn.addEventListener("click", () => {
  performConversion(true);
});

resetBtn.addEventListener("click", () => {
  temperatureInput.value = "";
  fromUnit.value = "celsius";
  toUnit.value = "fahrenheit";
  conversionMode.value = "single";
  precisionSelect.value = "2";
  clearError();
  updateModeUI();
  resetDisplayState();
  showToast("Converter reset.");
});

swapBtn.addEventListener("click", () => {
  if (conversionMode.value === "all") {
    showToast("Swap works in Single Conversion mode.");
    return;
  }

  const temp = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = temp;
  performConversion(false);
  showToast("Units swapped.");
});

copyBtn.addEventListener("click", async () => {
  const text = resultText.textContent.trim();

  if (!text || text === "Your converted temperature will appear here.") {
    showToast("No result to copy.");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showToast("Result copied to clipboard.");
  } catch (error) {
    showToast("Copy failed.");
  }
});

clearHistoryBtn.addEventListener("click", () => {
  historyItems = [];
  saveHistory();
  renderHistory();
  showToast("History cleared.");
});

exportHistoryBtn.addEventListener("click", exportHistory);

temperatureInput.addEventListener("input", () => performConversion(false));
fromUnit.addEventListener("change", () => performConversion(false));
toUnit.addEventListener("change", () => performConversion(false));
conversionMode.addEventListener("change", () => performConversion(false));
precisionSelect.addEventListener("change", () => performConversion(false));

temperatureInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    performConversion(true);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    resetBtn.click();
  }
});

presetButtons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const unit = button.dataset.unit;

    temperatureInput.value = value;
    fromUnit.value = unit;
    performConversion(false);
    showToast(`Preset applied: ${value} ${getUnitSymbol(unit)}`);
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeToggle.textContent = "☀";
    localStorage.setItem("temperatureTheme", "light");
  } else {
    themeToggle.textContent = "🌙";
    localStorage.setItem("temperatureTheme", "dark");
  }
});

function loadTheme() {
  const savedTheme = localStorage.getItem("temperatureTheme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀";
  } else {
    themeToggle.textContent = "🌙";
  }
}

loadTheme();
renderHistory();
updateModeUI();

// Auto-open dropdown on hover / focus
[fromUnit, toUnit, conversionMode, precisionSelect].forEach(select => {
  select.addEventListener("mouseenter", () => {
    select.focus();
    try {
      select.click();
    } catch (e) {}
  });

  select.addEventListener("focus", () => {
    try {
      select.click();
    } catch (e) {}
  });
});