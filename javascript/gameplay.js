export let currentCountry;

window.addEventListener('load', function () {  

  let isPlaying = true;
  let score;
  let lives;
  // let attemptsLeft;
  
  // let currentCountry; 
  let remainingCountries = Array.from(COUNTRIES);
  let allMatchingLetters = [];
  
  let inputLetters = document.querySelector(".letter-generator");
  let guess = document.querySelector(".typing-input");
  let scoreCounter;
  let attemptsCounter;
  let livesCounter;


  // FUNCTION - PICKING A RANDOM COUNTRY

  const randomCountry = () => {
    let randomIndex = Math.floor(Math.random() * remainingCountries.length);
    currentCountry = remainingCountries[randomIndex];
    remainingCountries.splice(randomIndex, 1);
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
      //debugging
      // console.log("Country name:", currentCountryName); // See the full name
      // console.log("Country name length:", currentCountryName.length); // See total length
      for (let i = 0; i <currentCountryName.length; i++) {
        let countryLetter = currentCountryName[i].toLowerCase();
        console.log(countryLetter); //testing
        if (countryLetter === " ") {
          inputElement += `<span class="letter-space"></span>`
        } else {
          inputElement += `<input type="text" class="letter-circle">`; //for each letter add a circle on hmtl
        }
      }
      inputLetters.innerHTML = inputElement;
      // //debugging
      // console.log("Total inputs:", inputLetters.querySelectorAll("input").length);
      // console.log("Total spans:", inputLetters.querySelectorAll(".letter-space").length);   
  }

  // FUNCTION - STARTING THE GAME
    const showCountry = () => {
      randomCountry();
      showCountryFlag(currentCountry);
      countryNameGenerator(currentCountry);
      guess.value = "";
      guess.focus();
    }

// FUNCTION - handling the input
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
    
    //handling the input
    guess.addEventListener("input", () => {
      let typedGuess = guess.value.toUpperCase();
      typedGuess = typedGuess.replace(/[^A-Z]/g, "");
      guess.value = typedGuess;

      updateCircles(typedGuess);
    });

    //handling the enter key
    guess.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const typedGuess = guess.value.toUpperCase();
        checkGuess(typedGuess);
      }
    });

    const checkGuess = (typedGuess) => {
      const typedGuessToCheck = typedGuess.toLowerCase().replace(/\s+/g, "");
      const currentCountryToCheck = currentCountry.name.toLowerCase().replace(/\s+/g, "");
      if (typedGuessToCheck === currentCountryToCheck) {
        score+=attemptsLeft;
        showCountry();
      } else {
        attemptsLeft--;
      }
    }

  //START THE GAME
  // showCountry();
  
  while(isPlaying) {
    scoreCounter = document.querySelector("#score-counter");
    attemptsCounter = document.querySelector("#attempts-counter");
    livesCounter = document.querySelector("#attempts-counter");
    attemptsCounter = 5;
    livesCounter = 3;
    scoreCounter = 0;
    showCountry();
      while (attemptsCounter > 0) {
        checkGuess();
      }
  }
  });