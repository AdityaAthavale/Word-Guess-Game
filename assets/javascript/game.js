const superHeros = ["Iron Man", "Super Man", "Spider Man", "Ant Man", "Thor", "Bat Man", "Hulk"]

let userPressedKey = ""

// Generate Computers choice of superhero.
let computerChosenSuperhero = ""

//This is the string we will display on screen
let displayString = ""

let numberOfWins = 0
let numberOfLosses = 0
let numberOfAttempts = 0
let gameFinished = false

function startGame() {
    gameFinished = false;
    // When document is loaded make computers choice to start game.
    computerChosenSuperhero = superHeros[Math.floor(Math.random() * Math.floor(superHeros.length))]

    // After Creating display string, display thoese many underscores on the screen.
    document.getElementById("GameString").innerHTML = getDisplayString(computerChosenSuperhero, "");
    numberOfAttempts = 0
}

function finishGame(result) {
    if (result) {
        alert("Congratulations!");
    } else {
        alert("Better luck next time!");
    }
    gameFinished = true
    displayString = ""
    startGame()
}

//
document.addEventListener("DOMContentLoaded", function (event) {
    numberOfAttempts = 0
    startGame()
})


function getDisplayString(superHero, userInput) {
    let string = displayString
    var displayStringIndex = 0
    numberOfAttempts++;
    for (var i = 0; i < superHero.length; i++) {
        //if character is space then replace with 2 spaces else replace with _<space>{
        if (superHero[i].toUpperCase() !== userInput.toUpperCase()) {
            if ((superHero.length > displayString.length/2) || gameFinished) {
                string = string + "_ "
            }
        } else {
            if (string[displayStringIndex] !== userInput) {
                string = string.replaceAt(displayStringIndex, userInput) + " "
                numberOfAttempts--;
            }
        }
        displayStringIndex = displayStringIndex + 2;
        displayString = string;
    }
    return string;
}

document.onkeyup = function (event) {
    let userPressedKey = event.key

    document.getElementById("")

    //Now we need to find out if key pressed by user is present in superhero name.
    var displayStringIndex = 0
    for (var i = 0; i < computerChosenSuperhero.length; i++) {
        displayString = getDisplayString(computerChosenSuperhero, userPressedKey)
        displayStringIndex = displayStringIndex + 2;
    }
    document.getElementById("GameString").innerHTML = displayString;
    if (displayString.replace(/ /g, "").toUpperCase() === computerChosenSuperhero.replace(/ /g, "").toUpperCase()) {
        numberOfWins++
        alert("Congratulations!");
        finishGame(true)
    } else {
        // if (numberOfAttempts > 5) {
        //     numberOfLosses++
        //     alert("Sorry better luck next time!");
        //     startGame()
        // }
    }
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}