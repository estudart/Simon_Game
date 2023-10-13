var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = 0;

function nextSequence () {
    var randomNumber = Math.round(Math.random() * 3);
    $("h1").text("Level " + level);
    level++;
    return randomNumber;
}

function firstSequence () {
    var randomNumber = Math.round(Math.random() * 3);
    $("h1").text("Level " + level);
    return randomNumber;
}

function firstChosen () {
    return buttonColors[firstSequence()];
}

function randomChosenColour () {
    return buttonColors[nextSequence()];
}


function soundButton () {
    if (start === 1) {
        var idSelector = this.id;
        makeSound(idSelector);
        $("#" + idSelector).fadeOut().fadeIn();

        var that = $(this);
        that.addClass('pressed');
        setTimeout(function(){that.removeClass('pressed');},100);

        nextSequence();

    } if (start > 1) {
        var idSelector = this.id;
        makeSound(idSelector);
        $("#" + idSelector).fadeOut().fadeIn();

        var that = $(this);
        that.addClass('pressed');
        setTimeout(function(){that.removeClass('pressed');},100);
    };
}


for (var i = 0; i < document.querySelectorAll(".btn").length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", soundButton); 
}


function makeSound (idSelector) {
    switch (idSelector) {

        case 'yellow':
            var crash = new Audio('./sounds/yellow.mp3');
            crash.play();
            break;

        case 'red':
            var kick = new Audio('./sounds/red.mp3');
            kick.play();
            break;
        
        case 'green':
            var snare = new Audio('./sounds/green.mp3');
            snare.play();
            break;

        case 'blue':
            var tom1 = new Audio('./sounds/blue.mp3');
            tom1.play();
            break;
        
        case 'wrong':
            var wrong = new Audio('./sounds/wrong.mp3')
            wrong.play();
            break;

        default: console.log(buttonInnerHTML);
    }
}

var click = -1;
$(".btn").on("click", function (event) {
    start++;
    click++;
    var userChosenColour = $(event.target).attr('id');
    if (start >= 1) {       
        userClickedPattern.push(userChosenColour);
        checkAwnswer(level);
    };   
});


$("body").on("keypress", function (event) {
    var key = event.key;
    // nextSequence();
    console.log(event);
    start++;
    if (start >= 1) {
        $("body").off("keypress");
        var firstColour = firstChosen();
        gamePattern.push(firstColour);
        $("#" + firstColour).fadeOut().fadeIn();
    };
});

var equalsChecks = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}

var notEqualsChecks = (a, b) => {
    return JSON.stringify(a) !== JSON.stringify(b);
}

function checkAwnswer (level) {
    if (userClickedPattern.length === level && equalsChecks(gamePattern, userClickedPattern)) {
        userClickedPattern = [];
        click = -1;
        lastColour = randomChosenColour();
        gamePattern.push(lastColour);
        $("#" + lastColour).fadeOut().fadeIn();
        console.log(gamePattern); 
    } else if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[click]) {
        console.log(userClickedPattern);
        console.log(gamePattern);
        $("h1").text("You lost!");
        $(".btn").off("click");
        makeSound('wrong');
        for (var i = 0; i < document.querySelectorAll(".btn").length; i++) {
            document.querySelectorAll(".btn")[i].removeEventListener("click", soundButton); 
        }
    };
}


    
