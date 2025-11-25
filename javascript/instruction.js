import {currentCountry} from "./gameplay.js";

window.addEventListener('load', function () {  

  let rulesButton = document.querySelector(".rules-button");
  let rulesContent = document.querySelector(".instruction");
  let countryGirl = document.querySelector(".country-girl-image-container");
  let hintButton = document.querySelector(".hint-button");
  let resetButton = document.querySelector(".reset-button");

  rulesButton.addEventListener("click", () => {
    if (countryGirl.classList.contains("active")) {
      countryGirl.classList.remove("active");
      rulesContent.classList.add("active");
    } else {
      countryGirl.classList.add("active");
      rulesContent.classList.remove("active");
    }
  })

  hintButton.addEventListener("click", () => {
    let hintCapital = document.querySelector(".capital-name");
    hintCapital.textContent = currentCountry.capital;
  })

  // needs to be fixed, does not work for now
  resetButton.addEventListener("click", () => {
    let numberOfLives = document.querySelector(".life-score");
    let attemptsScore = document.querySelector("#attempts-counter");
    let scoreCounter = document.querySelector("#score-counter");
    numberOfLives.textContent = 3;
    attemptsScore.textContent = 5;
    scoreCounter.textContent = 0;

    lives = 3;
    attempts = 5;
    score = 0;
  })

});
