var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }    
    else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
      
            setTimeout(function () {
              $("body").removeClass("game-over");
            }, 200);
      
            startOver();
          }
    
}




$(".btn").click(function(event){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    $("#"+userChoosenColor).fadeOut(100).fadeIn(100);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber =  Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}
function playSound(name){
    var audioFile = new Audio("sounds/"+name+".mp3");
    audioFile.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
  }
  