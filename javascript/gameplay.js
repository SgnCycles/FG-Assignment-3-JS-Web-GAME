export let currentCountry;
export let hintUsed;
export const hintPenalty = () => {
  if (hintUsed) return;
  hintUsed = true;
  attemptsLeft = Math.max(2, attemptsLeft - 2);
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
let inputLetters = document.querySelector(".letter-generator");
let guess = document.querySelector(".typing-input");

let score = 0;
scoreCounter.textContent = score;
let lives;
let attemptsLeft;
hintUsed = false;
let remainingCountries = Array.from(COUNTRIES);

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

  for (let i = 0; i <currentCountryName.length; i++) {
    let countryLetter = currentCountryName[i].toLowerCase();
    if (countryLetter === " ") {
      inputElement += `<span class="letter-space"></span><br>`
    } else {
      inputElement += `<input type="text" class="letter-circle" name="country-letter" readonly>`; //for each letter add a circle on hmtl
    }
  };
  inputLetters.innerHTML = inputElement;
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

  //if the guess is correct:
  if (typedGuessToCheck === currentCountryToCheck) {
    score+=attemptsLeft;
    scoreCounter.textContent = score;

    // show the feedback, make circles green and change animation:
    const InputCircles = inputLetters.querySelectorAll(".letter-circle");
    InputCircles.forEach(input => {
      input.classList.add("correct");
    });

    const correctAnswerMessage = document.querySelector(".girl-correct-image");
    const countryGirlImage = document.querySelector(".country-girl-image");

    correctAnswerMessage.classList.add("active");
    countryGirlImage.classList.add("hide");

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
      correctAnswerMessage.classList.remove("active");
      countryGirlImage.classList.remove("hide");
      countryGirlImage.classList.add("active");
      showCountry();
    }, 1000);
      return; //break
    }

    // if the guess is not correct
  if (attemptsLeft > 1){
    attemptsLeft--;
    attemptsCounter.textContent = attemptsLeft;
    updateCircles("");
    guess.value = "";
    guess.focus();
    const wrongAnswerMessage = document.querySelector(".girl-incorrect-image");
    const countryGirlImage = document.querySelector(".country-girl-image");

    wrongAnswerMessage.classList.add("active");
    countryGirlImage.classList.add("hide");

    setTimeout(() => {
      wrongAnswerMessage.classList.remove("active");
      countryGirlImage.classList.remove("hide");
      countryGirlImage.classList.add("active");
    }, 1000);
    return; //break
  } 
  
  attemptsLeft = 0;
  attemptsCounter.textContent = attemptsLeft;

  let heartItem = document.querySelectorAll(".heart-item");
  let livesLostContainer = document.querySelector(".life-score");
  heartItem[lives - 1].style.display = "none";
  livesLostContainer.classList.add("lost");
  lives--;

  if (lives === 0) {
    const endGameMessage = document.querySelector(".you-loose-image");
    const countryGirlImage = document.querySelector(".country-girl-image");
    endGameMessage.classList.add("active");
    countryGirlImage.classList.add("hide");

    setTimeout(() => {
      window.location.href = "./index.html";
    }, 2000);
  }

  attemptsLeft = 5;
  attemptsCounter.textContent = attemptsLeft;
  guess.value = "";
  showCountry();
}

//START THE GAME
showCountry();
livesGenerator();
