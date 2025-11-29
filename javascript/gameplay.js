export let currentCountry;
export let hintUsed = false;
export const hintPenalty = () => {
  if (hintUsed) return;
  if (attemptsLeft <= 2) {
  document.querySelector(".capital-name").style.display = "none";
  return;
  }
  //otherwise - apply a hint and do the penalty.
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
};

const scoreCounter = document.querySelector("#score-counter");
const attemptsCounter = document.querySelector("#attempts-counter");
const correctAnswerMessage = document.querySelector(".girl-correct-image");
const countryGirlImage = document.querySelector(".country-girl-image");
const wrongAnswerMessage = document.querySelector(".girl-incorrect-image");
const endGameMessage = document.querySelector(".you-loose-image");
const livesLostContainer = document.querySelector(".life-score");
let inputLetters = document.querySelector(".letter-generator");
let guess = document.querySelector(".typing-input");
let score = 0;
scoreCounter.textContent = score;
let lives;
let attemptsLeft;
let remainingCountries = Array.from(COUNTRIES);
hintUsed = false;

// FUNCTION - PICKING A RANDOM COUNTRY
const randomCountry = () => {
let randomIndex = Math.floor(Math.random() * remainingCountries.length);
currentCountry = remainingCountries[randomIndex];
remainingCountries = remainingCountries.filter(country => country !== currentCountry);
return currentCountry; 
};

// FUNCTION - SHOW THE CHOSEN COUNTRY FLAG
const showCountryFlag = (currentCountry) => {
let flagImage = document.querySelector(".country-flag-image");
flagImage.src = currentCountry.flag;
flagImage.alt = `${currentCountry.name} flag.`;
};

// FUNCTION - SHOW THE CHOSEN COUNTRY NAME CIRCLES
const countryNameGenerator = (currentCountry) => {
  let currentCountryName = currentCountry.name;
  let inputElement = "";

  console.log(currentCountryName); //testing

  for (let i = 0; i <currentCountryName.length; i++) {
    let countryLetter = currentCountryName[i].toLowerCase();
    if (countryLetter === " ") {
      inputElement += `<span class="letter-space"></span><br>`
    } else {
      inputElement += `<input type="text" class="letter-circle" name="country-letter" readonly>`; //for each letter add a circle on hmtl
    }
  };
  inputLetters.innerHTML = inputElement;
};

// FUNCTION - generate the country name letter circles with guess
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

//FUNCTION - handling the input
guess.addEventListener("input", () => {
  const currentCountryName = currentCountry.name.toUpperCase().replace(/\s+/g, "");
  let typedGuess = guess.value.toUpperCase();
  typedGuess = typedGuess.replace(/[^A-Z]/g, "");

  typedGuess = typedGuess.slice(0, currentCountryName.length);
  guess.value = typedGuess;
  updateCircles(typedGuess);
});

//FUNCTION - handling the enter key
guess.addEventListener("keydown", (e) => {
  let currentCountryName = currentCountry.name.toUpperCase().replace(/\s+/g, "").trim();
  const typedGuess = guess.value.toUpperCase().replace(/\s+/g, "").trim();
  if (e.key === "Enter" && typedGuess.length === currentCountryName.length) {
    checkGuess(typedGuess);
  }
});

//FUNCTION - handling and showing a correct guess
const showCorrectGuessMessage = () => {
  const inputCircles = inputLetters.querySelectorAll(".letter-circle");
  inputCircles.forEach(input => {
    input.classList.add("correct");
  });
  correctAnswerMessage.classList.add("active");
  countryGirlImage.classList.add("hide");
};

//FUNCTION - hiding the correct message
const hideCorrectGuessMessage = () => {
  correctAnswerMessage.classList.remove("active");
  countryGirlImage.classList.remove("hide");
};

//FUNCTION - showing the incorrect message
const showIncorrectMessage = () => {
  wrongAnswerMessage.classList.add("active");
  countryGirlImage.classList.add("hide");
};

//FUNCTION - hide the incorrect message
const hideIncorrectMessage = () => {
  wrongAnswerMessage.classList.remove("active");
  countryGirlImage.classList.remove("hide");
};

//FUNCTION - updating the lives once the guess is failed
const updateLivesTablo = () => {
  const heartItem = document.querySelectorAll(".heart-item");
  heartItem[lives - 1].style.display = "none";
  livesLostContainer.classList.add("lost");
  lives--;
};

//FUNCTION - if the guess is correct
const correctGuessCase = () => {
  score+=attemptsLeft;
  scoreCounter.textContent = score;
  showCorrectGuessMessage();

  if (remainingCountries.length === 0) {
    const youWonMessage = document.querySelector(".you-won-image");
    setTimeout(() => {
      youWonMessage.classList.add("active");
      countryGirlImage.classList.add("hide");
      correctAnswerMessage.classList.remove("active");
    }, 2000);

    setTimeout(() => {
      window.location.href = "./index.html";
    }, 4000);
    return;
  } 
    // set timeout when to show the next country,
    setTimeout(() => {
      hideCorrectGuessMessage();
      countryGirlImage.classList.add("active");
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
      endGameMessage.classList.add("active");
      countryGirlImage.classList.add("hide");
  
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 4000);
    } else {
      showCountry();
    }
  }, 2000);
};

//FUNCTION - mark correct letter green, other existing letters in yellow.
const markLetters = (typedGuess, currentCountryName) => {
  const inputCircles = document.querySelectorAll(".letter-circle");
  let correctLetters = [];
  for (let i = 0; i < currentCountryName.length; i++) {
    inputCircles[i].classList.remove("correct", "present");
    if(typedGuess[i]) {
      inputCircles[i].value = typedGuess[i].toUpperCase();
    }
    if (typedGuess[i] === currentCountryName[i]) {
      inputCircles[i].classList.add("correct");
      correctLetters[i] = typedGuess[i];
    } else if (currentCountryName.includes(typedGuess[i])){
      inputCircles[i].classList.add("present");
    }
  }
};

//FUNCTION - checking the guess
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

//START THE GAME
showCountry();
livesGenerator();