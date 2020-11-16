//Update the page title
var level = 0;
var isStarted = false;

$("body").keypress(function() {
  if (!isStarted) {
  $("#level-title").text("Level " + level);
  nextSequence();
  isStarted = true;
  }
});


//Create a new pattern
var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];


//User's input
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});


//Check the User's input against the game sequence
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success!");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout (function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over! Press Any Key to Restart");
    startOver();
  }
};


//Game's sequence
function nextSequence() {
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  level++;

  $("#level-title").text("Level " + level);
};


//Restarts game
function startOver() {
  level = 0;
  gamePattern = [];
  isStarted = false;
};


//Adds sounds based on the colors
function playSound(name) {
  var sound = new Audio(name + ".mp3");
  sound.play();
};


//Animates the button on click
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};
