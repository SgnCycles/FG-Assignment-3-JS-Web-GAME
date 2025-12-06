import {currentCountry, hintPenalty, hintUsed, livesGenerator, showCountry} from "./gameplay.js";

const guessInput = document.querySelector(".typing-input");
const rulesButtons = document.querySelectorAll(".rules-button");
const hintButtons = document.querySelectorAll(".hint-button");
const resetButtons = document.querySelectorAll(".reset-button");
let rulesContent = document.querySelector(".instruction");
let actionImage = document.querySelector(".action-image-container");

rulesButtons.forEach(rulesButton => {
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
});

hintButtons.forEach(hintButton => {
  hintButton.addEventListener("click", () => {
    let hintCapital = document.querySelector(".capital-name");
    hintCapital.textContent = currentCountry.capital;
    guessInput.focus();
    if (hintUsed) return; 
    hintPenalty();
  })
});

resetButtons.forEach(resetButton => {
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
});