var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var clicks=0;
var endGame=false;

// clicked button on screen handler
$(".btn").on("click",function(){
  clicks++;
  var choosenColor = this.className.split(/\s+/)[1];
  userClickedPattern.push(choosenColor);
  animateAndPlayMusicButton(choosenColor);
  if(level!==0){
    if(checkAnswer()){
      if (clicks===level) {
        setTimeout(function(){
          clicks=0;
          userClickedPattern = [];
          gamePattern.push(nextSequence());
          var lastState = gamePattern[gamePattern.length-1];
          animateAndPlayMusicButton(lastState);}, 1000);
      }
    } else{
      wrong();
    }
  }
});

//pressed 'a' or 'A' key on keyboard
$(document).on("keypress", function(event){
  if (event.key.toLowerCase()==='a' && endGame===false){
    startGame();
  }

  if(endGame===true){
    restartGame();
  }

});



function nextSequence(){
  level++;
  $("#level-title").html("level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  animateAndPlayMusicButton(randomChosenColour);
  return randomChosenColour;
}
//
function animateAndPlayMusicButton(choosenColor){
  playMusic(choosenColor);
  animateButton(choosenColor);
}

function playMusic(color){
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}

function animateButton(colorName){
  $("."+colorName).toggleClass("pressed");
  $("."+colorName).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  setTimeout(function(){ $("."+colorName).toggleClass("pressed"); }, 100);

}

function arrayIsEqual(array1,array2){
  return JSON.stringify(array1)==JSON.stringify(array2);
}

function checkAnswer(){
  // return arrayIsEqual(userClickedPattern,gamePattern);
  for (var i = 0; i < userClickedPattern.length; i++) {
    console.log(userClickedPattern[i]!=gamePattern[i]);
    if(userClickedPattern[i]!=gamePattern[i]) return false;
  }
  return true;
}

function wrong(){
  endGame=true;
  $("body").toggleClass("game-over");
  playMusic("wrong");
  setTimeout(function(){ $("body").toggleClass("game-over"); }, 200);
  $("#level-title").html("Game Over, Press Any Key to Restart");

}

function startGame(){
  $("#level-title").html("level "+(level+1));
  setTimeout(function(){
    if(level===0 && endGame===false){
      gamePattern.push(nextSequence());
      var lastState = gamePattern[gamePattern.length-1];
      animateAndPlayMusicButton(lastState);
    }
  }, 1000);
}

function restartGame(){
  gamePattern = [];
  userClickedPattern = [];
  level=0;
  clicks=0;
  endGame=false;
  startGame();
}
