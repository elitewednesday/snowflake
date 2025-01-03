// Selecting all required elements
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const optionList = document.querySelector(".option_list");
const timeLine = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

let timeValue = 15;
let queCount = 0;
let queNumb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// Function to shuffle and pick a random batch of questions
function getRandomQuestions(batchSize) {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, batchSize);
}

// Initialize the quiz with random questions
let selectedQuestions = getRandomQuestions(5);

// Buttons functionality
startBtn.onclick = () => {
  infoBox.classList.add("activeInfo"); // Show info box
};

exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); // Hide info box
};

continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo"); // Hide info box
  quizBox.classList.add("activeQuiz"); // Show quiz box
  initializeQuiz(); // Initialize quiz
};

const restartQuizBtn = resultBox.querySelector(".buttons .restart");
const quitQuizBtn = resultBox.querySelector(".buttons .quit");
const nextBtn = document.querySelector("footer .next_btn");
const bottomQuesCounter = document.querySelector("footer .total_que");

restartQuizBtn.onclick = () => {
  resultBox.classList.remove("activeResult"); // Hide result box
  quizBox.classList.add("activeQuiz"); // Show quiz box
  resetQuiz();
  initializeQuiz();
};

quitQuizBtn.onclick = () => {
  window.location.reload(); // Reload the page
};

nextBtn.onclick = () => {
  if (queCount < selectedQuestions.length - 1) {
    queCount++;
    queNumb++;
    updateQuiz();
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResult(); // Show result box
  }
};

// Initialize the quiz with the first question and timers
function initializeQuiz() {
  showQuestions(queCount);
  queCounter(queNumb);
  startTimer(timeValue);
  startTimerLine(widthValue);
}

// Reset quiz variables
function resetQuiz() {
  timeValue = 15;
  queCount = 0;
  queNumb = 1;
  userScore = 0;
  widthValue = 0;
  selectedQuestions = getRandomQuestions(5); // Pick new random questions
}

// Update the quiz with the next question and reset timers
function updateQuiz() {
  showQuestions(queCount);
  queCounter(queNumb);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timeText.textContent = "Time Left";
  nextBtn.classList.remove("show");
}

// Show questions and options
function showQuestions(index) {
  const queText = document.querySelector(".que_text");
  let queTag = `<span>${selectedQuestions[index].numb}. ${selectedQuestions[index].question}</span>`;
  let optionTag = selectedQuestions[index].options.map(option => `<div class="option"><span>${option}</span></div>`).join('');
  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;

  optionList.querySelectorAll(".option").forEach(option => {
    option.onclick = () => optionSelected(option);
  });
}

// Handle option selection
function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = selectedQuestions[queCount].answer;
  let allOptions = optionList.children.length;

  if (userAns === correctAns) {
    userScore++;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);
    highlightCorrectAnswer(correctAns);
  }

  disableOptions();
  nextBtn.classList.add("show");
}

// Highlight the correct answer
function highlightCorrectAnswer(correctAns) {
  for (let i = 0; i < optionList.children.length; i++) {
    if (optionList.children[i].textContent === correctAns) {
      optionList.children[i].classList.add("correct");
      optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag);
    }
  }
}

// Disable all options
function disableOptions() {
  for (let i = 0; i < optionList.children.length; i++) {
    optionList.children[i].classList.add("disabled");
  }
}

// Show result box
function showResult() {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");
  const scoreText = resultBox.querySelector(".score_text");
  let scoreTag = '';

  if (userScore > 3) {
    scoreTag = `<span>and congrats! , You got <p>${userScore}</p> out of <p>${selectedQuestions.length}</p></span>`;
  } else if (userScore > 1) {
    scoreTag = `<span>and nice , You got <p>${userScore}</p> out of <p>${selectedQuestions.length}</p></span>`;
  } else {
    scoreTag = `<span>and sorry , You got only <p>${userScore}</p> out of <p>${selectedQuestions.length}</p></span>`;
  }

  scoreText.innerHTML = scoreTag;
}

// Start the timer for the quiz
function startTimer(time) {
  counter = setInterval(() => {
    timeCount.textContent = time > 9 ? time : `0${time}`;
    time--;
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Time Off";
      highlightCorrectAnswer(selectedQuestions[queCount].answer);
      disableOptions();
      nextBtn.classList.add("show");
    }
  }, 1000);
}

function startTimerLine(time) {
  const totalTime = 550; // Total time for the timer in milliseconds
  counterLine = setInterval(() => {
    time += 1;
    let progressPercentage = (time / totalTime) * 100;
    timeLine.style.width = `${progressPercentage}%`;
    if (time >= totalTime) {
      clearInterval(counterLine);
    }
  }, 29);
}

// Update the question counter
function queCounter(index) {
  let totalQueCounTag = `<span><p>${index}</p> of <p>${selectedQuestions.length}</p> Questions</span>`;
  bottomQuesCounter.innerHTML = totalQueCounTag;
}

// Tick and cross icons
const tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
const crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
