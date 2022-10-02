const Questions = [{
  id: 0,
  q: "Commonly used data types DO Not Include ?",
  a: [{ text: "1. strings", isCorrect: false },
  { text: "2. booleans", isCorrect: false },
  { text: "3. alert", isCorrect: true },
  { text: "4. numbers", isCorrect: false }
  ]

},
{
  id: 1,
  q: "The condition in an if/ else statement is enclosed with ______.",
  a: [{ text: "1. quotes", isCorrect: false },
  { text: "2. curly brackets", isCorrect: true },
  { text: "3. parenthesis", isCorrect: false },
  { text: "4. square brackets", isCorrect: false }
  ]

},
{
  id: 2,
  q: "String values must be enclosed within _______ when being assigned to variables",
  a: [{ text: "1. commas", isCorrect: false },
  { text: "2. curly brackets", isCorrect: false },
  { text: "3. quotes", isCorrect: true },
  { text: "4. parenthesis", isCorrect: false }
  ]

},
{
  id: 3,
  q: "Commonly used data types DO Not Include ?",
  a: [{ text: "1. strings", isCorrect: false },
  { text: "2. booleans", isCorrect: false },
  { text: "3. alert", isCorrect: true },
  { text: "4. numbers", isCorrect: false }
  ]

},
{
  id: 4,
  q: "The condition in an if/ else statement is enclosed with ______.",
  a: [{ text: "1. quotes", isCorrect: false },
  { text: "2. curly brackets", isCorrect: true },
  { text: "3. parenthesis", isCorrect: false },
  { text: "4. square brackets", isCorrect: false }
  ]

}

];


var isStart = false;
var index = 0; //order of quiz
var timeLeft = 75;
var highScores=[]; //to save to local storage

const elm_countdown = document.getElementById("countdown");
const elm_options = document.getElementsByClassName("options");

const elm_start_button = document.getElementById("start");
const elm_start_container=document.getElementById("start-container");

elm_start_button.addEventListener("click", () => {
  elm_start_container.setAttribute("style", "display:none");
  showNextQuestion();
  isStart = true;
  countdown();
})



function showNextQuestion() {

  if (index < Questions.length) {
    const elm_result = document.getElementById("result");
    const elm_question = document.getElementById("question");
    elm_question.textContent = Questions[index].q; //write question
    

    for (var i = 0; i < elm_options.length; i++) {
      elm_options[i].setAttribute("style", "display: block");
      elm_options[i].textContent = Questions[index].a[i].text;
    }

  }

 }
//Options Event Lister

var elm_answerContainer=document.getElementById("answer-container");
elm_answerContainer.addEventListener("click", function(event){
  
  var selectedElement=event.target;
  if(selectedElement.matches(".options")){
    checkAnswer(selectedElement.dataset.number);
    if(index<(Questions.length-1))
    {
      index++; //next question
      showNextQuestion();
    }
    else{
      isStart=false; //End Quiz
    }
    
  }

});



function endQuiz() {

  const elm_quizContainer=document.getElementById("quiz-container");
  elm_quizContainer.setAttribute("style","display:none");

  const elm_finalResult=document.getElementById("final-container");
  elm_finalResult.setAttribute("style", "display: block");
  const showScore=document.getElementById("showScore");


  var tag = document.createElement("p");
  // Adds text content to created tag
  tag.textContent = "Your Score : " + timeLeft ;
  
  // Appends tag as child 
  showScore.appendChild(tag);
}

function checkAnswer(selectedOption) {

  const elm_result = document.getElementById("result");
  elm_result.setAttribute("style","display:block; border-top:2px solid gray;");

  if (Questions[index].a[selectedOption-1].isCorrect) {
    elm_result.textContent = "Correct!"
  }
  else {
    elm_result.textContent = "Wrong!"
    if(timeLeft<10){ //prevent timeLeft<0
      timeLeft=0;
    }
    else{
      timeLeft=timeLeft-10;
    }
  }
}


function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {

    elm_countdown.textContent = "Time: " + timeLeft;
    
    //When View High Score is clicked, quiz automatically ends
    if(timeLeft>0 && index<(Questions.length-1) && (isStart===false)){
      clearInterval(timeInterval);
    }
    else if(timeLeft <= 0 || isStart===false) {
      clearInterval(timeInterval);
      endQuiz();
    }
    else{
      timeLeft--;
    }
  }, 1000);
}


const elm_submit=document.getElementById("submit");
elm_submit.addEventListener("click",function(event){
  event.preventDefault();
  const saveInitial=document.getElementById("initial");

  if (saveInitial.value === undefined) {
     saveInitial.value="N/A";
  }

  const finalContainer=document.getElementById("final-container");
  const viewHighScore=document.getElementById("HighScore-container");
  const result=document.getElementById("result");
  const header=document.querySelector("header");

  header.setAttribute("style","display:none");
  result.setAttribute("style","display:none");
  finalContainer.setAttribute("style","display:none");
  viewHighScore.setAttribute("style","display:block");
  storeHighScore();
  renderHighScore();

});

function storeHighScore(){
  const saveInitial=document.getElementById("initial");
  var highScore={
    initial:saveInitial.value.toUpperCase(),
    score:timeLeft}
  highScores.push(highScore);
  localStorage.setItem("highScores",JSON.stringify(highScores));

}

function renderHighScore(){
  const elm_highScore=document.querySelector("#highScore");
  elm_highScore.innerHTML = "";
  // var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
  // if (storedHighScores !== null) {
  //        highScores = storedHighScores;
  //    }
  // TODO: Describe the functionality of the following `for` loop.
  for (var i = 0; i < highScores.length; i++) {  
    var highScore = highScores[i];
    var li = document.createElement("li");
    var str=`Initial: ${highScore.initial}- Score: ${highScore.score}`;
    li.textContent =str;
    elm_highScore.appendChild(li);}

}

init();

function init() {
  console.log("init happen");
  // TODO: What is the purpose of the following line of code?
  var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
  // TODO: Describe the functionality of the following `if` statement.
  if (storedHighScores !== null) {
    highScores = storedHighScores;
  }
  // TODO: Describe the purpose of the following line of code.
  renderHighScore();
}

const elm_HighScore=document.querySelector("#HighScore-container");

elm_HighScore.addEventListener("click",function(event){
  if(event.target.matches("#clearHighScore")){
    event.preventDefault();
    highScores=[];
    localStorage.setItem("highScores",JSON.stringify(highScores));
    renderHighScore();
    
  }
  else if(event.target.matches("#goBack"))
  {
    console.log("reload page");
    window.location.reload();

  }
});

//when viewhighscore is clicked
const viewHighScore=document.querySelector("#viewHighScore");
//Event handler
viewHighScore.addEventListener("click",function(event){
  isStart=false;
  const finalContainer=document.getElementById("final-container");
  const viewHighScore=document.getElementById("HighScore-container");
  const result=document.getElementById("result");
  const header=document.querySelector("header");
  const quiz=document.querySelector("#quiz-container");
  const start=document.querySelector("#start-container");

  start.setAttribute("style","display:none");
  quiz.setAttribute("style","display:none");
  header.setAttribute("style","display:none");
  result.setAttribute("style","display:none");
  finalContainer.setAttribute("style","display:none");
  viewHighScore.setAttribute("style","display:block");
  storeHighScore();
  renderHighScore();

});



