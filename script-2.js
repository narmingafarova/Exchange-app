const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

function setOptions() {
  const endpoint =
    "https://v6.exchangerate-api.com/v6/20e49a23166b80429f369f49/latest/USD";

  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      const options = Object.keys(data.conversion_rates);

      currencyEl_one.innerHTML = options.map(
        (option) =>
          `<option value="${option}" ${
            option === "USD" && "selected"
          }>${option}</option>`
      );
      currencyEl_two.innerHTML = options.map(
        (option) =>
          `<option value="${option}" ${
            option === "AZN" && "selected"
          }>${option}</option>`
      );
      calculate();
    });
}

function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  const endpoint = `https://v6.exchangerate-api.com/v6/20e49a23166b80429f369f49/latest/${currency_one}`;

  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currency_two];
      rateEl.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

setOptions();

currencyEl_one.addEventListener("change", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});
