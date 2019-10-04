const superHeros = ["Iron Man", "Super Man", "Spider Man", "Ant Man", "Thor", "Bat Man", "Hulk", "Wonder Girl", "Wasp", "Captain America", "Vision", "Black Panther", "She Hulk", "Hawkeye", "Falcon", "War Machine", "Scarlet Witch", "Nebula", "Gamora", "Rocket", "Groot", "Doctor Strange", "Wong", "Captain Marvel", "Thanos"]

let userPressedKey = ""

// Generate Computers choice of superhero.
let computerChosenSuperhero = ""

//This is the string we will display on screen
let displayString = ""

let numberOfWins = 0
let numberOfLosses = 0
let numberOfAttempts = 10
let gameFinished = false

function startGame() {
    gameFinished = false;
    // When document is loaded make computers choice to start game.
    computerChosenSuperhero = superHeros[Math.floor(Math.random() * Math.floor(superHeros.length))]

    // After Creating display string, display thoese many underscores on the screen.
    document.getElementById("GameString").textContent = getDisplayString(computerChosenSuperhero, "");
    numberOfAttempts = 10
}

function finishGame(result) {
    if (result) {
        alert("Congratulations!");
    } else {
        alert("Better luck next time!");
    }
    gameFinished = true
    displayString = ""
    let elements = document.getElementsByClassName("letterTile")
    for(let i = 0; i < elements.length; i++) {
        let element = elements[i]
        element.remove();
    }
    startGame()
}

//
document.addEventListener("DOMContentLoaded", function (event) {
    startGame()
})


function getDisplayString(superHero, userInput) {
    let string = displayString
    var displayStringIndex = 0
    for (var i = 0; i < superHero.length; i++) {
        //if character is space then replace with 2 spaces else replace with _<space>{
        if (superHero[i].toUpperCase() !== userInput.toUpperCase()) {
            if ((superHero.length > displayString.length/2) || gameFinished) {
                string = string + "_ "
            }
        } else {
            if (string[displayStringIndex] !== userInput) {
                string = string.replaceAt(displayStringIndex, userInput) + " "
            }
        }
        displayStringIndex = displayStringIndex + 2;
        displayString = string;
    }
    return string;
}

function checkIfWonOrLost() {
    if (displayString.replace(/ /g, "").toUpperCase() === computerChosenSuperhero.replace(/ /g, "").toUpperCase()) {
        numberOfWins++
        document.getElementById("wins").textContent = "Number of Wins: " + numberOfWins
        finishGame(true)
    } else if (numberOfAttempts == 0) {
        numberOfLosses++
        document.getElementById("losses").textContent = "Number of Losses: " + numberOfLosses
        finishGame(false)
    }
    numberOfAttempts--;
    document.getElementById("attempts").textContent = " Remaining Attempts: " + numberOfAttempts
}

document.onkeyup = function (event) {
    let userPressedKey = event.key

    let letterTile = document.createElement("h1")
    letterTile.className = "letterTile"
    letterTile.textContent = event.key.toUpperCase()
    document.getElementById("guessedLetters").append(letterTile)

    //Now we need to find out if key pressed by user is present in superhero name.
    var displayStringIndex = 0
    for (var i = 0; i < computerChosenSuperhero.length; i++) {
        displayString = getDisplayString(computerChosenSuperhero, userPressedKey)
        displayStringIndex = displayStringIndex + 2;
    }
    document.getElementById("GameString").textContent = displayString;
    checkIfWonOrLost()
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}