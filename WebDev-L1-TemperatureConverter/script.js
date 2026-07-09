const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convertBtn = document.getElementById("convertBtn");
const resetBtn = document.getElementById("resetBtn");
const swapBtn = document.getElementById("swapBtn");
const resultText = document.getElementById("resultText");
const errorMessage = document.getElementById("errorMessage");
const resultBox = document.getElementById("resultBox");
const historyList = document.getElementById("historyList");

let historyItems = [];

function getUnitSymbol(unit) {
  if (unit === "celsius") return "°C";
  if (unit === "fahrenheit") return "°F";
  return "K";
}

function isBelowAbsoluteZero(value, unit) {
  if (unit === "celsius") return value < -273.15;
  if (unit === "fahrenheit") return value < -459.67;
  if (unit === "kelvin") return value < 0;
  return false;
}

function convertTemperature(value, from, to) {
  let celsiusValue;

  // Convert input to Celsius first
  if (from === "celsius") {
    celsiusValue = value;
  } else if (from === "fahrenheit") {
    celsiusValue = (value - 32) * 5 / 9;
  } else if (from === "kelvin") {
    celsiusValue = value - 273.15;
  }

  // Convert Celsius to target unit
  let convertedValue;
  if (to === "celsius") {
    convertedValue = celsiusValue;
  } else if (to === "fahrenheit") {
    convertedValue = (celsiusValue * 9 / 5) + 32;
  } else if (to === "kelvin") {
    convertedValue = celsiusValue + 273.15;
  }

  return convertedValue;
}

function addToHistory(text) {
  historyItems.unshift(text);

  if (historyItems.length > 5) {
    historyItems.pop();
  }

  historyList.innerHTML = "";
  historyItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function showResult(message) {
  resultText.textContent = message;
  resultBox.classList.add("active");

  setTimeout(() => {
    resultBox.classList.remove("active");
  }, 500);
}

convertBtn.addEventListener("click", () => {
  const value = parseFloat(temperatureInput.value);
  const from = fromUnit.value;
  const to = toUnit.value;

  errorMessage.textContent = "";

  if (temperatureInput.value.trim() === "") {
    errorMessage.textContent = "Please enter a temperature value.";
    return;
  }

  if (isNaN(value)) {
    errorMessage.textContent = "Please enter a valid numeric value.";
    return;
  }

  if (isBelowAbsoluteZero(value, from)) {
    errorMessage.textContent =
      "Temperature below absolute zero is not physically possible.";
    return;
  }

  const convertedValue = convertTemperature(value, from, to);
  const fromSymbol = getUnitSymbol(from);
  const toSymbol = getUnitSymbol(to);

  const resultMessage = `${value} ${fromSymbol} = ${convertedValue.toFixed(2)} ${toSymbol}`;
  showResult(resultMessage);
  addToHistory(resultMessage);
});

resetBtn.addEventListener("click", () => {
  temperatureInput.value = "";
  fromUnit.value = "celsius";
  toUnit.value = "fahrenheit";
  errorMessage.textContent = "";
  resultText.textContent = "Your converted temperature will appear here.";
  resultBox.classList.remove("active");
  historyItems = [];
  historyList.innerHTML = "<li>No conversions yet.</li>";
});

swapBtn.addEventListener("click", () => {
  const temp = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = temp;
});

temperatureInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    convertBtn.click();
  }
});