$(document).ready(function() {
    var legacyOptions = [
        new player("Russell", "Wilson", "Quarterback", "2012-Present"), 
        new player("Doug", "Baldwin", "Wide Reciever", "2011-Present"),
        new player("Matt", "Hasselbeck", "Quarterback", "2001-2010"),
        new player("Lofa", "Tatupu", "Middle Linebacker", "2005-2010"),
        new player("Shaun", "Alexander", "Half Back", "200-2007"),
        new player("Steve", "Largent", "Wide Reciever", "1976-1989"),
        new player("Walter", "Jones", "Left Tackle", "1997-2009"),
        new player("Richard", "Sherman", "Cornerback", "2011-2017"),
        new player("Marshawn", "Lynch", "Half Back", "2010-2015"),
        new player("Kam", "Chancellor", "Strong Safety", "2010-Present"),
        new player("Earl", "Thomas", "Free Safety", "2010-Present"),
        new player("Bobby", "Wagner", "Middle Linebacker", "2012-Present"),
        new player("Joey", "Galloway", "Wide Reciever", "1995-1999"),
        new player("Darrell", "Jackson", "Wide Reciever", "2000-2006"),
        new player("Chad", "Brown", "Outside Linebacker", "1997-2004"),
        new player("Kenny", "Easley", "Strong Safety", "1981-1987"),
        new player("Michael", "Bennett", "Defensive End", "2013-2017"),
        new player("John", "Williams", "Full Back", "1986-1993"),
        new player("Marcus", "Trufant", "Cornerback", "2003-2012"),
        new player("Steve", "Hutchinson", "Guard", "2001-2005"),
        new player("Curt", "Warner", "Half Back", "1983-1989"),
        new player("Jacob", "Green", "Defensive End", "1980-1991"),
        new player("Joe", "Nash", "Defensive Tackle", "1982-1996"),
        new player("Cortez", "Kennedy", "Defensive Tackle", "1990-2000"),
        new player("Golden", "Tate", "Wide Reciever", "2010-2013"),
        new player("Tyler", "Lockett", "Wide Reciever", "2015-Present"),
        new player("Jimmy", "Graham", "Tight End", "2015-2017"),
        new player("Malcolm", "Smith", "Outside Linebacker", "2011-2014"),
        new player("Frank", "Clark", "Defensive End", "2015-Present"),
        new player("Cliff", "Avril", "Defensive End", "2013-2017"),
        new player("Red", "Bryant", "Defensive Tackle", "2008-2013"),
        new player("KJ", "Wright", "Outside Linebacker", "2011-Present"),
        new player("Chris", "Carson", "Half Back", "2017-Present"),
        new player("Byron", "Maxwell", "Cornerback", "2011-2014, 2017-2018"),
        new player("Jon", "Ryan", "Punter", "2008-2017"),
        new player("Steven", "Hauschka", "Kicker", "2011-2016"),
        new player("Michael", "Dickson", "Punter", "2018-Present"),
        new player("Pete", "Carroll", "Head Coach", "2010-Present"),
        new player("Mike", "Holmgren", "Head Coach", "1999-2008")
    ];
    var modernOptions = [
        new player("Russell", "Wilson", "Quarterback", "2012-Present"), 
        new player("Doug", "Baldwin", "Wide Reciever", "2011-Present"),
        new player("Richard", "Sherman", "Cornerback", "2011-2017"),
        new player("Marshawn", "Lynch", "Half Back", "2010-2015"),
        new player("Kam", "Chancellor", "Strong Safety", "2010-Present"),
        new player("Earl", "Thomas", "Free Safety", "2010-Present"),
        new player("Bobby", "Wagner", "Middle Linebacker", "2012-Present"),
        new player("Michael", "Bennett", "Defensive End", "2013-2017"),
        new player("Golden", "Tate", "Wide Reciever", "2010-2013"),
        new player("Tyler", "Lockett", "Wide Reciever", "2015-Present"),
        new player("Jimmy", "Graham", "Tight End", "2015-2017"),
        new player("Malcolm", "Smith", "Outside Linebacker", "2011-2014"),
        new player("Frank", "Clark", "Defensive End", "2015-Present"),
        new player("Cliff", "Avril", "Defensive End", "2013-2017"),
        new player("Red", "Bryant", "Defensive Tackle", "2008-2013"),
        new player("KJ", "Wright", "Outside Linebacker", "2011-Present"),
        new player("Chris", "Carson", "Half Back", "2017-Present"),
        new player("Byron", "Maxwell", "Cornerback", "2011-2014, 2017-2018"),
        new player("Jon", "Ryan", "Punter", "2008-2017"),
        new player("Steven", "Hauschka", "Kicker", "2011-2016"),
        new player("Michael", "Dickson", "Punter", "2018-Present"),
        new player("Pete", "Carroll", "Head Coach", "2010-Present")
    ];
    // State of the current word. Used for guess checking and is printed to the screen
    var wordState = [];
    // Difficulty level. Can be adjusted by user
    var difficult = false;
    // Number of guesses or "lives" remaining. Updated when the user guesses or when the game is reset
    var guessesLeft = 0;
    // The Seahawk player object chosen by the game that the player will guess
    var selectedPlayer = null;
    // Number of wins recorded
    var totalWins = 0;
    // Number of losses recorded
    var totalLosses = 0;
    // Toggle between including legacy players or not. Defaults to modern era only
    var legacy = false;
    // Alllows or disallows letter guessing. Guessing is locked when the game is over
    var guessLock = false;
    // Stores the letters the user has guessed. This is displayed and users cannot guess the same letter twice
    var guessedLetters = "";
    // Stores which of the hints have been used
    var hintsUsed = [];
    // Initializes first game
    resetGame();
    
    // Defines a player object. Last Name is the guess objective, while the other fields are used in the hint system
    function player(firstName, lastName, position, seahawkCareer) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position
        this.seahawkCareer = seahawkCareer;
    }

    // Logic for resetting game state
    // If the user has guessed a letter but not the whole word, a reset will count as a loss.
    function resetGame() {
        wordState.length = 0;
        hintsUsed.length = 0;
        guessedLetters = "";
        if(legacy) {
            selectedPlayer = legacyOptions[Math.floor(Math.random() * legacyOptions.length)];
        } else {
            selectedPlayer = modernOptions[Math.floor(Math.random() * modernOptions.length)];
        }
        for(var i = 0; i < selectedPlayer.lastName.length - 1; i++) {
            wordState.push("_");
            wordState.push(" ");
        }
        wordState.push("_");
        getWordStateForPrinting();
        calculateTotalGuesses(selectedPlayer);
        guessLock = false;
        document.getElementById("any-key").textContent = "Guess a letter to get started!";
        document.getElementById("current-guessed-letters").textContent = "";
        document.getElementById("career-hint").textContent = "";
        document.getElementById("position-hint").textContent = "";
        document.getElementById("first-name-hint").textContent = "";
        document.getElementById("win-or-lose").textContent = "";
        document.getElementById("img-caption").textContent = "";
        document.getElementById("player-image").src = "assets/images/helmet.jpg";
    }

    // Initializes the user's total guesses based on chosen difficulty and the length of the player's name
    // A longer name to guess comes with fewer guesses (since it is more likely that a user's guess will be part of the name)
    function calculateTotalGuesses(seahawk) {
        var nameLen = seahawk.lastName.length;
        if(!difficult) {
            guessesLeft = Math.ceil(11 - (nameLen * .6));
        } else {
            guessesLeft = Math.ceil(9 - (nameLen * .75));
        }
        document.getElementById("current-guesses").textContent = guessesLeft;
    }

    // Handles game win and loss logic
    function gameOver(winner) {
        guessLock = true;
        if(winner) {
            if(hintsUsed.length < 2) {
              totalWins++;
              document.getElementById("wins").textContent = "Wins " + totalWins;
              document.getElementById("win-or-lose").textContent = "You've Won!";
            } else {
              document.getElementById("win-or-lose").textContent = "Too Many Hints!";
            }
        } else {
            totalLosses++;
            document.getElementById("losses").textContent = "Losses " + totalLosses;
            document.getElementById("win-or-lose").textContent = "You've Lost...";
        }
        document.getElementById("any-key").textContent = "Hit reset or change any option to play again!"; 
        document.getElementById("img-caption").textContent = selectedPlayer.firstName + " " + selectedPlayer.lastName;
        document.getElementById("player-image").src = "assets/images/" + selectedPlayer.lastName.toLowerCase() + ".jpg";
    }

    // Checks if the passed string is a lowercase letter in the English alphabet using simple regex
    function isLetter(str) {
        return str.length === 1 && str.match(/[A-Za-z]/i);
    }

    // Handles a user's letter guess
    $(document).on("keypress", function guess(e) {
        if(!guessLock) {
            var validGuess = true;
            var letter = e.key.toLowerCase();
            if(guessedLetters === "" && isLetter(letter)) {
                guessedLetters += letter;
            } else if(guessedLetters.indexOf(letter) === -1 && isLetter(letter)) {
                guessedLetters += " " + letter;
            } else {
                validGuess = false;
            }
            document.getElementById("current-guessed-letters").textContent = guessedLetters.toUpperCase();
            if(validGuess) {
              var indicesOfGuess = [];
              var position = selectedPlayer.lastName.toLowerCase().indexOf(letter);
              while(position !== -1) {
                  indicesOfGuess.push(position);
                  position = selectedPlayer.lastName.toLowerCase().indexOf(letter, position + 1);
              }
              // Incorrect Guess
              if(indicesOfGuess.length === 0) {
                  guessesLeft --;
                  document.getElementById("current-guesses").textContent = guessesLeft;
                  // Check if user has any remaining guesses. If not, user has lost
                  if(guessesLeft === 0) {
                      gameOver(false);
                  }
              } 
              // Correct Guess
              else {
                  indicesOfGuess.forEach(function(index) {
                      wordState[index * 2] = letter;
                      getWordStateForPrinting();
                  });
                  // Check if there are any unguessed letters. If not, user has won
                  if(wordState.indexOf("_") === -1) {
                      gameOver(true);
                  }
              }
            }
        }
    });

    // Turns Legacy mode on and resets the game
    document.getElementById("legacy").onclick = function() {
        if(!legacy) {
            if(confirmWithUser()) {
                legacy = true;
                updateLosees();
                resetGame();
            }
        }
    }

    // Turns Modern Only mode on and resets the game
    document.getElementById("modern").onclick = function() {
      if(legacy) {
          if(confirmWithUser()) {
              legacy = false;
              updateLosees();
              resetGame();
          }
      }
   }

   // Changes the difficulty to "Difficult"
   document.getElementById("difficult").onclick = function() {
    if(!difficult) {
        if(confirmWithUser()) {
            difficult = true;
            updateLosees();
            resetGame();
        }
    }
  }

  // Changes the difficulty to "Normal"
  document.getElementById("normal").onclick = function() {
    if(difficult) {
        if(confirmWithUser()) {
            difficult = false;
            updateLosees();
            resetGame();
        }
    }
  }

  // Reveals the player's first name
  document.getElementById("hint-first-name").onclick = function() {
    if(hintsUsed.indexOf(1) === -1) {
      hintsUsed.push(1);
      document.getElementById("first-name-hint").textContent = selectedPlayer.firstName;
    }
  }

  // Reveals the player's football position
  document.getElementById("hint-position").onclick = function() {
    if(hintsUsed.indexOf(2) === -1) {
      hintsUsed.push(2);
      document.getElementById("position-hint").textContent = selectedPlayer.position;
    }
  }

  // Reveals the player's career with the Seahawks
  document.getElementById("hint-career").onclick = function() {
    if(hintsUsed.indexOf(3) === -1) {
      hintsUsed.push(3);
      document.getElementById("career-hint").textContent = selectedPlayer.seahawkCareer;
    }
  }

  // Resets the game without changing any settings
  document.getElementById("reset").onclick = function() {
    if(confirmWithUser()) {
      updateLosees();
      resetGame();
    }
  }

  // Asks the user if they're okay with resetting the game when picking a change of option
  function confirmWithUser() {
      var userY = confirm("This will reset the game, which will count as a loss if you've guessed any letters. Change anyway?");
      return userY;
  }

  // Adds a loss to the user's tally
  function updateLosees() {
    if(guessedLetters.length !== 0 && !guessLock) {
      totalLosses++;
      document.getElementById("losses").textContent = "Losses: " + totalLosses;
    }
  }

  // Prints the current word state
  function getWordStateForPrinting() {
    var strToPrint = wordState[0].toUpperCase();
    for(var i = 1; i < wordState.length; i++) {
      strToPrint += wordState[i];
    }
    document.getElementById("current-word").textContent = strToPrint;
  }
});