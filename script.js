import {
  reactQuestions,
  sqlQuestions,
  gitQuestions,
  commandLineQuestions,
  javascriptQuestions,
  pythonQuestions,
  htmlQuestions,
  cssQuestions,
} from "./questions.js";

const category = document.getElementById("category");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const categoryButtons = document
  .getElementById("category")
  .querySelectorAll("button");
const nextButton = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const submitButton = document.getElementById("submit-btn");
const questionTitle = document.getElementById("question-title");
const intro = document.getElementById("intro");
const difficultyDiv = document.getElementById("difficulty");
const difficultyButtons = document
  .getElementById("difficulty")
  .querySelectorAll("button");
const showResultButton = document.getElementById("submit-btn");

let shuffledQuestions,
  currentQuestionIndex,
  score,
  difficulty,
  categoryName,
  questions;

startButton.addEventListener("click", () => {
  category.classList.remove("hide");
  difficultyDiv.classList.remove("hide");
  intro.classList.add("hide");
});

difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    difficulty = button.id;
    difficultyButtons.forEach((btn) => {
      btn.classList.remove("selected");
    });
    button.classList.add("selected");
  });
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!difficulty) {
      alert("Please select a difficulty level!");
    } else {
      category.classList.add("hide");
      difficultyDiv.classList.add("hide");
      quizContainer.classList.remove("hide");
      categoryName = button.id;
      switch (button.id) {
        case "html":
          questions = htmlQuestions[difficulty];
          break;
        case "css":
          questions = cssQuestions[difficulty];
          break;
        case "javascript":
          questions = javascriptQuestions[difficulty];
          break;
        case "python":
          questions = pythonQuestions[difficulty];
          break;
        case "react":
          questions = reactQuestions[difficulty];
          break;
        case "sql":
          questions = sqlQuestions[difficulty];
          break;
        case "git":
          questions = gitQuestions[difficulty];
          break;
        case "commandline":
          questions = commandLineQuestions[difficulty];
          break;
      }
      startGame();
    }
  });
});

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

restartButton.addEventListener("click", () => {
  category.classList.remove("hide");
  difficultyDiv.classList.remove("hide");
  quizContainer.classList.add("hide");
  resultContainer.classList.add("hide");
  questionContainer.classList.remove("hide");
});

function startGame() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  shuffledQuestions.forEach((question) => {
    question.answers.sort(() => Math.random() - 0.5);
  });
  currentQuestionIndex = 0;
  score = 0;
  setNextQuestion();
}

function setNextQuestion() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionTitle.innerText = `Question ${currentQuestionIndex + 1}`;
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  Array.from(answerButtonsElement.children).forEach((button) => {
    button.removeEventListener("click", selectAnswer);
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
      button.innerHTML += " ✔️";
    } else {
      button.classList.add("wrong");
      button.innerHTML += " ✖️";
    }
  });
  if (correct) {
    score++;
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    submitButton.classList.remove("hide");
  }
}

showResultButton.addEventListener("click", function () {
  questionContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  submitButton.classList.add("hide");
  if (score === 10) {
    scoreElement.innerText = `Congratulations! You got a perfect score on ${categoryName} at ${difficulty} level! 🎉`;
  } else if (score >= 7) {
    scoreElement.innerText = `Well done! You scored ${score} out of 10 on ${categoryName} at ${difficulty} level! 🎉`;
  } else if (score >= 4) {
    scoreElement.innerText = `Not bad! You scored ${score} out of 10 on ${categoryName} at ${difficulty} level! 👏`;
  } else {
    scoreElement.innerText = `Better luck next time! You scored ${score} out of 10 on ${categoryName} at ${difficulty} level! 👍`;
  }
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    document.title = "Hey! Stop cheating 🤨";
  } else {
    document.title = "Quiz Game";
  }
});
