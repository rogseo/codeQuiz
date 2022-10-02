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

}
];




var score = 0;
var isStart = true;
var selectedOption = NaN;
var index = 0; //order of quiz

const elm_countdown = document.getElementById("countdown");
const elm_options = document.getElementsByClassName("options");

const elm_start_button = document.getElementById("start");
const elm_start_container=document.getElementById("start-container");

elm_start_button.addEventListener("click", () => {
  console.log("started");
  elm_start_container.setAttribute("style", "display:none");
  showNextQuestion();
  isStart = false;
  countdown();
})



function showNextQuestion() {
  console.log("clicked");

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
  console.log(selectedElement);
  if(selectedElement.matches(".options")){
    console.log(selectedElement.dataset.number);
    checkAnswer(selectedElement.dataset.number);
    if(index<(Questions.length-1))
    {
      index++; //next question
      showNextQuestion();
    }
    else{
      endQuiz();
    }
    
  }

});



function endQuiz() {
  console.log("end");

  const elm_quizContainer=document.getElementById("quiz-container");
  console.log("quiz container display none")
  elm_quizContainer.setAttribute("style","display:none");

  const elm_finalResult=document.getElementById("final-container");
  console.log(elm_finalResult);
  elm_finalResult.setAttribute("style", "display: block");
  console.log("erase");

  var tag = document.createElement("p");
  // Adds text content to created tag
  tag.textContent = "Your Score : " + score + ".";
  
  // Appends tag as child 
  elm_finalResult.appendChild(tag);


}

function checkAnswer(selectedOption) {

  const elm_result = document.getElementById("result");
  console.log(`selected Option:${selectedOption},index:${index}`);
  elm_result.setAttribute("style","display:block; border-top:2px solid gray;");

  if (Questions[index].a[selectedOption-1].isCorrect) {
    score++;
    elm_result.textContent = "Correct!"
  }
  else {
    elm_result.textContent = "Wrong!"
  }


}


function countdown() {
  var timeLeft = 100;

  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {

    elm_countdown.textContent = "Time: " + timeLeft;
    timeLeft--;

    if (timeLeft === 0) {
      clearInterval(timeInterval);
      //displayMessage();
      endQuiz();
    }
  }, 1000);
}
var highScores=[];

const elm_submit=document.getElementById("submit");
elm_submit.addEventListener("click",function(event){
  highScores.push()
  event.preventDefault();
  saveHighScore();
  //renderHighScore();

});

function saveHighScore(){
  const saveInitial=document.getElementById("initial");

  var highScore={
    initial:saveInitial.value,
    score:score
  }
  console.log(highScore);
  localStorage.setItem("highScore",JSON.stringify(highScore))

}

function renderHighScore(){
  var lastHighScore = JSON.parse(localStorage.getItem("highScore"));
  if (lastHighScore !== null) {
    // document.querySelector(".message").textContent = lastGrade.student + 
    // " received a/an " + lastGrade.grade
  }

}








