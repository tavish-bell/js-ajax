"use strict";

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  evt.preventDefault();
  fetch("/fortune")
    .then((response) => response.text())
    .then((serverdata) => {
      document.querySelector("#fortune-text").innerHTML = serverdata;
    });
}

document
  .querySelector("#get-fortune-button")
  .addEventListener("click", showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = "/weather.json";
  const zipcode = document.querySelector("#zipcode-field").value;
  const newUrl = new URLSearchParams({ zipcode: zipcode }).toString();
  const finalUrl = `${url}?${newUrl}`;
  fetch(finalUrl)
    .then((response) => response.json())
    .then((serverData) => {
      document.querySelector("#weather-info").innerHTML = serverData.forecast;
    });
}

document.querySelector("#weather-form").addEventListener("submit", showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  const melonType = document.querySelector("#melon-type-field").value;
  const quantity = document.querySelector("#qty-field").value;
  const formInput = {
    melon_type: melonType,
    qty: quantity,
  };

  fetch("/order-melons.json", {
    method: "POST",
    body: JSON.stringify(formInput),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((serverData) => {
      if (serverData.code === "ERROR") {
        document.querySelector("#order-status").classList.add("order-error");
      } else if (serverData.code !== "ERROR") {
        document.querySelector("#order-status").classList.remove("order-error");
      }
      document.querySelector("#order-status").innerHTML = serverData.msg;
    });

  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector("#order-form").addEventListener("submit", orderMelons);

function getDog(evt) {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((apiData) => {
      const apiImage = `<img src='${apiData.message}'>`;
      if (document.querySelector("img") !== null) {
        document.querySelector("img").remove();
      }

      document
        .querySelector("#dog-image")
        .insertAdjacentHTML("afterbegin", apiImage);
    });
}

document.querySelector("#get-dog-image").addEventListener("click", getDog);
