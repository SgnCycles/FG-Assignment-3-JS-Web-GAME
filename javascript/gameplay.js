export let currentCountry;
export let hintUsed;
export function hintPenalty(){
  if (hintUsed) return;
  hintUsed = true;
  attemptsLeft = Math.max(2, attemptsLeft - 2);
  attemptsCounter.textContent = attemptsLeft;
};

export function livesGenerator(){
  let maxLives = 3;
  lives = maxLives;
  let livesContainer = document.querySelector(".life-score");

  for (let i = 0; i < maxLives; i++) {
    let heartItem = document.createElement("img");
    heartItem.classList.add("heart-item");
    heartItem.src = "./website_images/pixel_heart.webp";
    livesContainer.appendChild(heartItem);
  }
};

const scoreCounter = document.querySelector("#score-counter");
const attemptsCounter = document.querySelector("#attempts-counter");
let inputLetters = document.querySelector(".letter-generator");
let guess = document.querySelector(".typing-input");

// let isPlaying = true;
let score = 0;
// scoreCounter.textContent = 0;
scoreCounter.textContent = score;
let lives;
let attemptsLeft;
hintUsed = false;
// let currentCountry; 
let remainingCountries = Array.from(COUNTRIES);
let allMatchingLetters = [];

// FUNCTION - PICKING A RANDOM COUNTRY
const randomCountry = () => {
let randomIndex = Math.floor(Math.random() * remainingCountries.length);
currentCountry = remainingCountries[randomIndex];
// remainingCountries.splice(randomIndex, 1);
remainingCountries = remainingCountries.filter(country => country !== currentCountry);
return currentCountry; 
}

// FUNCTION - SHOW THE COUNTRY FLAG
const showCountryFlag = (currentCountry) => {
let flagImage = document.querySelector(".country-flag-image");
flagImage.src = currentCountry.flag; // Use this image file (the flag URL) as the picture for this <img> element
flagImage.alt = `${currentCountry.name} flag.`;
}

// FUNCTION - SHOW COUNTRY NAME CIRCLES
const countryNameGenerator = (currentCountry) => {
  let currentCountryName = currentCountry.name;
  let inputElement = "";

  console.log(currentCountryName); //testing
  //debugging
  // console.log("Country name:", currentCountryName); // See the full name
  // console.log("Country name length:", currentCountryName.length); // See total length
  for (let i = 0; i <currentCountryName.length; i++) {
    let countryLetter = currentCountryName[i].toLowerCase();
    if (countryLetter === " ") {
      inputElement += `<span class="letter-space"></span>`
    } else {
      inputElement += `<input type="text" class="letter-circle" name="country-letter" readonly>`; //for each letter add a circle on hmtl
    }
  };
  inputLetters.innerHTML = inputElement;
  // //debugging
  // console.log("Total inputs:", inputLetters.querySelectorAll("input").length);
  // console.log("Total spans:", inputLetters.querySelectorAll(".letter-space").length);   
}

// FUNCTION - STARTING THE GAME
const showCountry = () => {
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
}

// FUNCTION - generate the country name letter circles
const updateCircles = (typedGuess) => {
  const circles = inputLetters.querySelectorAll(".letter-circle");
  for (let i = 0; i < circles.length; i++) {
    if (typedGuess[i]) {
      circles[i].value = typedGuess[i];
    } else {
      circles[i].value = "";
    } 
  }
};

//FUNCTION - handling the input
guess.addEventListener("input", () => {
  let typedGuess = guess.value.toUpperCase();
  typedGuess = typedGuess.replace(/[^A-Z]/g, "");
  guess.value = typedGuess;
  updateCircles(typedGuess);
});

//FUNCTION - handling the enter key
guess.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const typedGuess = guess.value.toUpperCase();
    checkGuess(typedGuess);
  }
});

//FUNCTION - check if the guess is correct
const checkGuess = (typedGuess) => {
  const typedGuessToCheck = typedGuess.toLowerCase().replace(/\s+/g, "");
  const currentCountryToCheck = currentCountry.name.toLowerCase().replace(/\s+/g, "");
  if (typedGuessToCheck === currentCountryToCheck) {
    score+=attemptsLeft;
    scoreCounter.textContent = score;
    showCountry();
    return;
  }

  if (attemptsLeft > 1){
    attemptsLeft--;
    attemptsCounter.textContent = attemptsLeft;
    updateCircles("");
    guess.value = "";
    guess.focus();
    return;
  } 
  
  attemptsLeft = 0;
  attemptsCounter.textContent = attemptsLeft;

  let heartItem = document.querySelectorAll(".heart-item");
  let livesLostContainer = document.querySelector(".life-score");
  heartItem[lives - 1].style.display = "none";
  livesLostContainer.classList.add("lost");
  lives--;

  if (lives === 0) {
    alert("Game Over!");
    return;
  }

  attemptsLeft = 5;
  attemptsCounter.textContent = attemptsLeft;
  guess.value = "";
  showCountry();
}

//START THE GAME
showCountry();
livesGenerator();