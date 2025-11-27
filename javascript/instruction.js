import {currentCountry} from "./gameplay.js";
import {hintPenalty} from "./gameplay.js";
import {hintUsed} from "./gameplay.js";
import {livesGenerator} from "./gameplay.js";

const guessInput = document.querySelector(".typing-input");
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
  guessInput.focus();
})

hintButton.addEventListener("click", () => {
  let hintCapital = document.querySelector(".capital-name");
  hintCapital.textContent = currentCountry.capital;
  guessInput.focus();
  if (hintUsed) return; 
  hintPenalty();
  hintUsed = true;
})

// needs to be fixed, does not work with lives now
resetButton.addEventListener("click", () => {
  guessInput.focus();
  const livesContainer = document.querySelector(".life-score");
  let attemptsScore = document.querySelector("#attempts-counter");
  let scoreCounter = document.querySelector("#score-counter");
  attemptsScore.textContent = 5;
  scoreCounter.textContent = 0;
  // lives = 3; vajag so, ja ir apaksa funkcija?
  attempts = 5;
  score = 0;
  livesContainer.innerHTML = "";
  livesGenerator();
})