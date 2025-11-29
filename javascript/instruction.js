import {currentCountry, hintPenalty, hintUsed, livesGenerator, showCountry} from "./gameplay.js";

const guessInput = document.querySelector(".typing-input");
let rulesButton = document.querySelector(".rules-button");
let rulesContent = document.querySelector(".instruction");
let actionImage = document.querySelector(".action-image-container");
let hintButton = document.querySelector(".hint-button");
let resetButton = document.querySelector(".reset-button");

rulesButton.addEventListener("click", () => {
  if (actionImage.classList.contains("active")) {
    actionImage.classList.remove("active");
    rulesContent.classList.add("active");
  } else {
    actionImage.classList.add("active");
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
})

resetButton.addEventListener("click", () => {
  guessInput.focus();
  const livesContainer = document.querySelector(".life-score");
  const attemptsScore = document.querySelector("#attempts-counter");
  const scoreCounter = document.querySelector("#score-counter");

  attemptsScore.textContent = 5;
  scoreCounter.textContent = 0;
  livesContainer.innerHTML = "";

  livesGenerator();
  showCountry();
})