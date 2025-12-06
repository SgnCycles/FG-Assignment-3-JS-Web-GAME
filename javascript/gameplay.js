export let currentCountry;
export let hintUsed = false;
export const hintPenalty = () => {
  if (hintUsed) return;
  if (attemptsLeft <= 2) {
  document.querySelector(".capital-name").style.display = "none";
  return;
  }
  hintUsed = true;
  attemptsLeft -= 2;
  attemptsCounter.textContent = attemptsLeft;
};

export const livesGenerator = () => {
  const maxLives = 3;
  lives = maxLives;
  const livesContainer = document.querySelector(".life-score");

  for (let i = 0; i < maxLives; i++) {
    const heartItem = document.createElement("img");
    heartItem.classList.add("heart-item");
    heartItem.src = "./website_images/pixel_heart.webp";
    livesContainer.appendChild(heartItem);
  }
};

export const showCountry = () => {
  attemptsLeft = 5;
  attemptsCounter.textContent = attemptsLeft;
  hintUsed = false;
  randomCountry();
  showCountryFlag(currentCountry);
  countryNameGenerator(currentCountry);
  guess.value = "";
  guess.focus();
  const hintCapital = document.querySelector(".capital-name");
  hintCapital.textContent = "";

  const countryGirlImageMobile = document.querySelector(".action-image-container-mobile .country-girl-image");
  countryGirlImageMobile.classList.remove("hide");

  setTimeout(() => {
    countryGirlImageMobile.classList.add("hide");
  }, 2000);
};

const scoreCounter = document.querySelector("#score-counter");
const attemptsCounter = document.querySelector("#attempts-counter");
const livesLostContainer = document.querySelector(".life-score");
const countryGirlImage = document.querySelectorAll(".country-girl-image");
const correctAnswerMessage = document.querySelectorAll(".girl-correct-image");
const wrongAnswerMessage = document.querySelectorAll(".girl-incorrect-image");
const endGameMessage = document.querySelectorAll(".you-loose-image");
const youWonMessage = document.querySelectorAll(".you-won-image");
let guess = document.querySelector(".typing-input");
let inputLetters = document.querySelector(".letter-generator");
let lives;
let score = 0;
scoreCounter.textContent = score;
let attemptsLeft;
let currentCountryName;
let remainingCountries = Array.from(COUNTRIES);
hintUsed = false;
let gameOver = false;

document.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  guess.focus({preventScroll:true});
});

const randomCountry = () => {
let randomIndex = Math.floor(Math.random() * remainingCountries.length);
currentCountry = remainingCountries[randomIndex];
remainingCountries = remainingCountries.filter(country => country !== currentCountry);
return currentCountry; 
};

const showCountryFlag = (currentCountry) => {
let flagImage = document.querySelector(".country-flag-image");
flagImage.src = currentCountry.flag;
flagImage.alt = `${currentCountry.name} flag`;
};

const countryNameGenerator = (currentCountry) => {
  currentCountryName = currentCountry.name;
  let inputElement = "";

  for (let i = 0; i <currentCountryName.length; i++) {
    let countryLetter = currentCountryName[i].toLowerCase();
    if (countryLetter === " ") {
      inputElement += `<span class="letter-space"></span><br>`
    } else {
      inputElement += `<input type="text" class="letter-circle" name="country-letter" readonly>`; 
    }
  };
  inputLetters.innerHTML = inputElement;
};

const updateCircles = (typedGuess) => {
  const circles = inputLetters.querySelectorAll(".letter-circle");
  const inputCircles = document.querySelectorAll(".letter-circle");
  for (let i = 0; i < circles.length; i++) {
    if (typedGuess[i]) {
      circles[i].value = typedGuess[i];
      inputCircles[i].classList.remove("present");
      inputCircles[i].classList.remove("correct");
    } else {
      circles[i].value = "";
      inputCircles[i].classList.remove("present");
      inputCircles[i].classList.remove("correct");
    } 
  }
};

guess.addEventListener("input", () => {
  const currentCountryName = currentCountry.name.toUpperCase().replace(/\s+/g, "");
  let typedGuess = guess.value.toUpperCase();
  typedGuess = typedGuess.replace(/[^A-Z]/g, "");
  typedGuess = typedGuess.slice(0, currentCountryName.length);
  guess.value = typedGuess;
  updateCircles(typedGuess);
});

guess.addEventListener("keydown", (e) => {
  if (gameOver) return;
  currentCountryName = currentCountry.name.toUpperCase().replace(/\s+/g, "").trim();
  const typedGuess = guess.value.toUpperCase().replace(/\s+/g, "").trim();
  if (e.key === "Enter" && typedGuess.length === currentCountryName.length) {
    checkGuess(typedGuess);
  }
});

const showCorrectGuessMessage = () => {
  const inputCircles = inputLetters.querySelectorAll(".letter-circle");
  inputCircles.forEach(input => {
    input.classList.add("correct");
  });

  correctAnswerMessage.forEach(message => message.classList.add("active"));
  countryGirlImage.forEach(image => image.classList.add("hide"));
};

const hideCorrectGuessMessage = () => {
  correctAnswerMessage.forEach(message => message.classList.remove("active"));
  countryGirlImage.forEach(image => image.classList.remove("hide"));
};

const showIncorrectMessage = () => {
  wrongAnswerMessage.forEach(message => message.classList.add("active"));
  countryGirlImage.forEach(image => image.classList.add("hide"));
};

const hideIncorrectMessage = () => {
  wrongAnswerMessage.forEach(message => message.classList.remove("active"));
  countryGirlImage.forEach(image => image.classList.remove("hide"));
  const countryGirlImageMobile = document.querySelector(".action-image-container-mobile .country-girl-image");
  countryGirlImageMobile.classList.add("hide");
};

const updateLivesTablo = () => {
  const heartItem = document.querySelectorAll(".heart-item");
  heartItem[lives - 1].style.display = "none";
  livesLostContainer.classList.add("lost");
  lives--;
};

const correctGuessCase = () => {
  score+=attemptsLeft;
  scoreCounter.textContent = score;
  showCorrectGuessMessage();

  if (remainingCountries.length === 0) {
    gameOver = true;
    setTimeout(() => {
      youWonMessage.forEach(message => message.classList.add("active"));
      countryGirlImage.forEach(image => image.classList.add("hide"));
      correctAnswerMessage.forEach(correctMessage => correctMessage.classList.remove("active"));
    }, 2000);

    setTimeout(() => {
      window.location.href = "./index.html";
    }, 4000);
    return;
  } 
    setTimeout(() => {
      hideCorrectGuessMessage();
      countryGirlImage.forEach(image => image.classList.remove("hide"));
      showCountry();
    }, 1000);
};

const incorrectGuessCase = () => {
  attemptsLeft--;
  attemptsCounter.textContent = attemptsLeft;
  updateCircles("");
  guess.value = "";
  guess.focus();
  
  showIncorrectMessage();
  setTimeout(() => {
   hideIncorrectMessage();
  }, 1000);
};

const lastAttemptGuess = () => {
  showIncorrectMessage();
  updateCircles(currentCountry.name.toUpperCase().replace(/\s+/g, ""));
  const inputCircles = inputLetters.querySelectorAll(".letter-circle");
  inputCircles.forEach(input => {
    input.classList.add("show");
  });

  setTimeout(() => {
    hideIncorrectMessage();
    updateLivesTablo();
  
    if (lives === 0) {
      gameOver = true;
      endGameMessage.forEach(message => message.classList.add("active"));
      countryGirlImage.forEach(image => image.classList.add("hide"));
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 4000);
    } else {
      showCountry();
    }
  }, 2000);
};

const markLetters = (typedGuess, currentCountryName) => {
  const inputCircles = document.querySelectorAll(".letter-circle");
  let remainingLetters = currentCountryName.split("");

  for (let i = 0; i < currentCountryName.length; i++) {
    inputCircles[i].classList.remove("correct", "present");
    if(typedGuess[i]) {
      inputCircles[i].value = typedGuess[i].toUpperCase();
    }
    if (typedGuess[i] === currentCountryName[i]) {
      inputCircles[i].classList.add("correct");
     remainingLetters[i] = null;
    }
  }

  for (let j = 0; j < currentCountryName.length; j++) {
    if (inputCircles[j].classList.contains("correct")) continue;
    const guessedLetter = typedGuess[j];
    if (!guessedLetter) continue;

    const letterIndex = remainingLetters.indexOf(guessedLetter);
    if (letterIndex !== -1) {
      inputCircles[j].classList.add("present");
      remainingLetters[letterIndex] = null;
    }
  }
};

const checkGuess = (typedGuess) => {
  const typedGuessToCheck = typedGuess.toLowerCase().replace(/\s+/g, "");
  const currentCountryToCheck = currentCountry.name.toLowerCase().replace(/\s+/g, "");

  if (typedGuessToCheck === currentCountryToCheck) {
    correctGuessCase();

  } else if (attemptsLeft > 1) {
    incorrectGuessCase();
    markLetters(typedGuessToCheck, currentCountryToCheck);
  } else {
    lastAttemptGuess();
  }
};

showCountry();
livesGenerator();