



// Variable to link Javascript to the HTML Elements
var questionContainer = document.querySelector('#question-container');
var currentQuestion = document.querySelector('.current-question');
var questionEl = document.querySelector('.question');
var quizStartScreen = document.querySelector('#start-screen');
var quizEndScreen = document.querySelector('#end-screen')
var rightWrong = document.querySelector('#right-or-wrong')
var startBtnEl = document.querySelector('#start-btn');
var timerEl = document.querySelector('#time-left');
var questionBtn = document.querySelectorAll('.question-btn');
var formEl = document.querySelector('#initials')
var submitBtnEl = document.querySelector('#submit-btn');
var scoreEl = 0;
var numOfQuestions = 6
var timeLeft = 60;


questionContainer.style.display = 'none';
quizEndScreen.style.display = 'none'


//Function that handles the timer element
function handleTimer() {
    var timeLeft = 60;
    var timerStart = setInterval(function () {
        timeLeft--;
        timerEl.textContent = 'Time: ' + timeLeft + ' second(s) left';
        if (timeLeft <= 0) {
            clearInterval(timerStart);
            endQuiz()
        } else if (numOfQuestions === 0) {
            clearInterval(timerStart);
        }
    }, 1000);
}


// Functons and Event Listeners to handle the Quiz Start functionality
function handleStartBtn(event) {
    quizStart();
    handleTimer();
}
startBtnEl.addEventListener('click', handleStartBtn);

function quizStart() {
    quizStartScreen.style.display = 'none';
    var firstQuestion = document.querySelector('.question')
    firstQuestion.setAttribute('class', 'current-question');
    questionContainer.style.display = 'flex';
    var currentQuestion = document.querySelector('.current-question');
    currentQuestion.style.display = 'flex';
    currentQuestion.nextElementSibling.style.display = 'none'
}


//Function that handles the mutiple-choice questions display, scorekeeping, and time penalty for wrong answers   
function handleQuestionOptions(event) {


    // If statement that controls the score keeping and moving on to the next quection
    if (event.target.id === 'correct-answer' && numOfQuestions > 0) {
        scoreEl += 5;
        numOfQuestions--
        event.target.parentNode.setAttribute('class', 'question');
        event.target.parentNode.style.display = 'none';
        event.target.parentNode.nextElementSibling.setAttribute('class', 'current-question');
        event.target.parentNode.nextElementSibling.setAttribute('style', 'display: flex;');
    } else if (event.target.id != 'correct-answer' && numOfQuestions > 0) {
        numOfQuestions--
        event.target.parentNode.setAttribute('class', 'question');
        event.target.parentNode.style.display = 'none';
        event.target.parentNode.nextElementSibling.setAttribute('class', 'current-question');
        event.target.parentNode.nextElementSibling.setAttribute('style', 'display: flex;');
    }


    //If statement that creates a text box with the "Right" or "Wrong" 
    if (event.target.id === 'correct-answer') {
        if (rightWrong.childElementCount > 0) {
            rightWrong.removeChild(rightWrong.firstElementChild);
        }
        var correct = document.createElement('p');
        rightWrong.appendChild(correct);
        correct.setAttribute('class', 'alert alert-success');
        correct.textContent = 'Correct!! Great Job!';
    } else if (event.target.id != 'correct-answer') {
        if (rightWrong.childElementCount > 0) {
            rightWrong.removeChild(rightWrong.firstElementChild);
        }
        var incorrect = document.createElement('p');
        rightWrong.appendChild(incorrect);
        incorrect.setAttribute('class', 'alert alert-danger');
        incorrect.textContent = 'Wrong!! Keep going!';
    }

    if (numOfQuestions === 0) {
        endQuiz();
    }
}

//Event listener for question buttons
questionBtn.forEach(questionBtn => {
    questionBtn.addEventListener('click', handleQuestionOptions);
});

//Function that handles the end of the quiz
function endQuiz() {
    questionContainer.style.display = 'none';
    rightWrong.style.display = 'none';
    console.log('END QUIZ');
    quizEndScreen.style.display = 'flex'
    document.getElementById('score').innerHTML = scoreEl;
}
function submitScore(event) {
    event.preventDefault();
    var highScores = JSON.parse(localStorage.getItem('scores')) || []
    var newScore = {
        initials: formEl.value,
        score: scoreEl
    }
    highScores.push(newScore)
    localStorage.setItem('scores', JSON.stringify(highScores))
    document.location.assign('./scores.html')
}

submitBtnEl.addEventListener('click', submitScore)