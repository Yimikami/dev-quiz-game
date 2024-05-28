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
const colorBlindCheckbox = document.getElementById("colorblind-checkbox");
const difficultyDiv = document.getElementById("difficulty");
const difficultyButtons = document
  .getElementById("difficulty")
  .querySelectorAll("button");

let shuffledQuestions, currentQuestionIndex, score, colorBlind, difficulty;

colorBlindCheckbox.addEventListener("change", () => {
  colorBlind = colorBlindCheckbox.checked;
});

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

// if difficulty is not selected, show alert
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!difficulty) {
      alert("Please select a difficulty level!");
    } else {
      category.classList.add("hide");
      difficultyDiv.classList.add("hide");
      quizContainer.classList.remove("hide");
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
  // also shuffle answers
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
      if (colorBlind) {
        button.classList.add("color-blind");
      } else {
        button.classList.add("correct");
      }
      button.innerHTML += " ✔️";
    } else {
      if (colorBlind) {
        button.classList.add("color-blind");
      } else {
        button.classList.add("wrong");
      }
      button.innerHTML += " ❌";
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

function showResult() {
  questionContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  submitButton.classList.add("hide");
  if (score === 10) {
    scoreElement.innerText = `Congratulations! You got a perfect score! 🎉`;
  } else if (score >= 7) {
    scoreElement.innerText = `Well done! You scored ${score} out of 10! 🎉`;
  } else if (score >= 4) {
    scoreElement.innerText = `Not bad! You scored ${score} out of 10! 👏`;
  } else {
    scoreElement.innerText = `Better luck next time! You scored ${score} out of 10! 👍`;
  }
}

const javascriptQuestions = {
  easy: [
    {
      question: "What keyword is used to declare a variable in JavaScript?",
      answers: [
        { text: "var", correct: true },
        { text: "int", correct: false },
        { text: "float", correct: false },
        { text: "double", correct: false },
      ],
    },
    {
      question: "Which company developed JavaScript?",
      answers: [
        { text: "Microsoft", correct: false },
        { text: "Apple", correct: false },
        { text: "Netscape", correct: true },
        { text: "Google", correct: false },
      ],
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      answers: [
        { text: "msgBox('Hello World');", correct: false },
        { text: "alert('Hello World');", correct: true },
        { text: "alertBox('Hello World');", correct: false },
        { text: "msg('Hello World');", correct: false },
      ],
    },
    {
      question:
        "What is the correct syntax for referring to an external script called 'xxx.js'?",
      answers: [
        { text: "<script name='xxx.js'>", correct: false },
        { text: "<script src='xxx.js'>", correct: true },
        { text: "<script href='xxx.js'>", correct: false },
        { text: "<script file='xxx.js'>", correct: false },
      ],
    },
    {
      question: "Which event occurs when the user clicks on an HTML element?",
      answers: [
        { text: "onchange", correct: false },
        { text: "onclick", correct: true },
        { text: "onmouseclick", correct: false },
        { text: "onmouseover", correct: false },
      ],
    },
    {
      question: "How do you declare a JavaScript variable?",
      answers: [
        { text: "v carName;", correct: false },
        { text: "variable carName;", correct: false },
        { text: "var carName;", correct: true },
        { text: "const carName;", correct: false },
      ],
    },
    {
      question: "Which operator is used to assign a value to a variable?",
      answers: [
        { text: "*", correct: false },
        { text: "=", correct: true },
        { text: "-", correct: false },
        { text: "x", correct: false },
      ],
    },
    {
      question: "What will the following code return: Boolean(10 > 9)?",
      answers: [
        { text: "false", correct: false },
        { text: "true", correct: true },
        { text: "NaN", correct: false },
        { text: "undefined", correct: false },
      ],
    },
    {
      question: "Which of the following is a JavaScript package manager?",
      answers: [
        { text: "Node.js", correct: false },
        { text: "TypeScript", correct: false },
        { text: "npm", correct: true },
        { text: "React", correct: false },
      ],
    },
    {
      question: "What does DOM stand for?",
      answers: [
        { text: "Document Object Model", correct: true },
        { text: "Display Object Management", correct: false },
        { text: "Digital Ordinance Model", correct: false },
        { text: "Desktop Oriented Mode", correct: false },
      ],
    },
  ],
  medium: [
    {
      question:
        "Which method is used to round a number to the nearest integer in JavaScript?",
      answers: [
        { text: "Math.ceil()", correct: false },
        { text: "Math.floor()", correct: false },
        { text: "Math.round()", correct: true },
        { text: "Math.random()", correct: false },
      ],
    },
    {
      question: "What does JSON stand for?",
      answers: [
        { text: "JavaScript Oriented Notation", correct: false },
        { text: "JavaScript Object Notation", correct: true },
        { text: "JavaScript Online Notation", correct: false },
        { text: "JavaScript Object Network", correct: false },
      ],
    },
    {
      question: "Which symbol is used for single line comments in JavaScript?",
      answers: [
        { text: "/*", correct: false },
        { text: "//", correct: true },
        { text: "<!--", correct: false },
        { text: "#", correct: false },
      ],
    },
    {
      question: "Which JavaScript method is used to write HTML output?",
      answers: [
        { text: "document.write()", correct: true },
        { text: "console.log()", correct: false },
        { text: "window.alert()", correct: false },
        { text: "document.createElement()", correct: false },
      ],
    },
    {
      question: "How can you add a comment in a JavaScript?",
      answers: [
        { text: "'This is a comment", correct: false },
        { text: "<!--This is a comment-->", correct: false },
        { text: "// This is a comment", correct: true },
        { text: "/* This is a comment */", correct: false },
      ],
    },
    {
      question: "How do you find the number with the highest value of x and y?",
      answers: [
        { text: "Math.max(x, y)", correct: true },
        { text: "Math.ceil(x, y)", correct: false },
        { text: "top(x, y)", correct: false },
        { text: "ceil(x, y)", correct: false },
      ],
    },
    {
      question: "Which event occurs when the user clicks on an HTML element?",
      answers: [
        { text: "onmouseover", correct: false },
        { text: "onchange", correct: false },
        { text: "onmouseclick", correct: false },
        { text: "onclick", correct: true },
      ],
    },
    {
      question: "How do you call a function named 'myFunction'?",
      answers: [
        { text: "call myFunction()", correct: false },
        { text: "call function myFunction()", correct: false },
        { text: "myFunction()", correct: true },
        { text: "None of the above", correct: false },
      ],
    },
    {
      question: "How to write an IF statement in JavaScript?",
      answers: [
        { text: "if i == 5 then", correct: false },
        { text: "if i = 5 then", correct: false },
        { text: "if (i == 5)", correct: true },
        { text: "if i = 5", correct: false },
      ],
    },
    {
      question:
        "What is the correct JavaScript syntax to change the content of the HTML element below?\n<p id='demo'>This is a demonstration.</p>",
      answers: [
        {
          text: "document.getElementByName('p').innerHTML = 'Hello World!';",
          correct: false,
        },
        {
          text: "document.getElement('p').innerHTML = 'Hello World!';",
          correct: false,
        },
        { text: "#demo.innerHTML = 'Hello World!';", correct: false },
        {
          text: "document.getElementById('demo').innerHTML = 'Hello World!';",
          correct: true,
        },
      ],
    },
  ],
  hard: [
    {
      question:
        "Which method is used to remove the last element from an array in JavaScript?",
      answers: [
        { text: "pop()", correct: true },
        { text: "push()", correct: false },
        { text: "shift()", correct: false },
        { text: "unshift()", correct: false },
      ],
    },
    {
      question: "What is the output of `typeof NaN` in JavaScript?",
      answers: [
        { text: "'number'", correct: true },
        { text: "'NaN'", correct: false },
        { text: "'undefined'", correct: false },
        { text: "'object'", correct: false },
      ],
    },
    {
      question:
        "Which method is used to merge two or more arrays in JavaScript?",
      answers: [
        { text: "concat()", correct: true },
        { text: "merge()", correct: false },
        { text: "append()", correct: false },
        { text: "join()", correct: false },
      ],
    },
    {
      question: "How can you convert a string to a number in JavaScript?",
      answers: [
        { text: "parseInt()", correct: true },
        { text: "convertToNumber()", correct: false },
        { text: "parseNumber()", correct: false },
        { text: "NumberFormat()", correct: false },
      ],
    },
    {
      question:
        "Which method is used to add one or more elements to the end of an array?",
      answers: [
        { text: "push()", correct: true },
        { text: "pop()", correct: false },
        { text: "shift()", correct: false },
        { text: "unshift()", correct: false },
      ],
    },
    {
      question:
        "Which JavaScript method returns the character at the specified index?",
      answers: [
        { text: "charAt()", correct: true },
        { text: "getCharAt()", correct: false },
        { text: "characterAt()", correct: false },
        { text: "getCharacterAt()", correct: false },
      ],
    },
    {
      question: "What is the correct syntax for a 'for' loop in JavaScript?",
      answers: [
        { text: "for i=1 to 5", correct: false },
        { text: "for (i <= 5; i++)", correct: false },
        { text: "for (i = 0; i <= 5)", correct: false },
        { text: "for (i = 0; i <= 5; i++)", correct: true },
      ],
    },
    {
      question: "What is the result of '2' + 2 in JavaScript?",
      answers: [
        { text: "22", correct: true },
        { text: "4", correct: false },
        { text: "'4'", correct: false },
        { text: "NaN", correct: false },
      ],
    },
    {
      question: "Which of the following is not a reserved word in JavaScript?",
      answers: [
        { text: "interface", correct: false },
        { text: "throws", correct: false },
        { text: "program", correct: true },
        { text: "short", correct: false },
      ],
    },
    {
      question:
        "Which JavaScript method is used to access an HTML element by id?",
      answers: [
        { text: "getElementById()", correct: true },
        { text: "getElementByClass()", correct: false },
        { text: "getElement()", correct: false },
        { text: "getId()", correct: false },
      ],
    },
  ],
};

const pythonQuestions = {
  easy: [
    {
      question: "What is the correct file extension for Python files?",
      answers: [
        { text: ".pt", correct: false },
        { text: ".pyt", correct: false },
        { text: ".pyth", correct: false },
        { text: ".py", correct: true },
      ],
    },
    {
      question:
        "How do you create a variable with the numeric value 5 in Python?",
      answers: [
        { text: "x = 5", correct: true },
        { text: "x == 5", correct: false },
        { text: "x : 5", correct: false },
        { text: "x <- 5", correct: false },
      ],
    },
    {
      question: "How do you insert COMMENTS in Python code?",
      answers: [
        { text: "/*This is a comment*/", correct: false },
        { text: "//This is a comment", correct: false },
        { text: "#This is a comment", correct: true },
        { text: "!--This is a comment--!", correct: false },
      ],
    },
    {
      question: "Which one is NOT a legal variable name in Python?",
      answers: [
        { text: "my_var", correct: false },
        { text: "my-var", correct: true },
        { text: "_myvar", correct: false },
        { text: "myvar2", correct: false },
      ],
    },
    {
      question: "How do you create a function in Python?",
      answers: [
        { text: "create myFunction():", correct: false },
        { text: "def myFunction():", correct: true },
        { text: "function myFunction():", correct: false },
        { text: "myFunction() =>", correct: false },
      ],
    },
    {
      question: "How do you call a function named 'myFunction' in Python?",
      answers: [
        { text: "myFunction()", correct: true },
        { text: "call myFunction()", correct: false },
        { text: "call function myFunction()", correct: false },
        { text: "run myFunction()", correct: false },
      ],
    },
    {
      question: "Which statement is used to stop a loop in Python?",
      answers: [
        { text: "return", correct: false },
        { text: "exit", correct: false },
        { text: "stop", correct: false },
        { text: "break", correct: true },
      ],
    },
    {
      question: "What is the output of print(2 * 3 ** 3)?",
      answers: [
        { text: "54", correct: false },
        { text: "54", correct: false },
        { text: "54", correct: false },
        { text: "54", correct: true },
      ],
    },
    {
      question: "Which keyword is used to create a class in Python?",
      answers: [
        { text: "class", correct: true },
        { text: "def", correct: false },
        { text: "function", correct: false },
        { text: "method", correct: false },
      ],
    },
    {
      question:
        "What is the correct way to import a module named 'math' in Python?",
      answers: [
        { text: "import.math", correct: false },
        { text: "import math", correct: true },
        { text: "math import", correct: false },
        { text: "import(math)", correct: false },
      ],
    },
  ],
  medium: [
    {
      question:
        "What is the output of the following code: \nprint(type([]) is list)",
      answers: [
        { text: "True", correct: true },
        { text: "False", correct: false },
        { text: "list", correct: false },
        { text: "None", correct: false },
      ],
    },
    {
      question: "What is the correct way to write a comment in Python?",
      answers: [
        { text: "// This is a comment", correct: false },
        { text: "/* This is a comment */", correct: false },
        { text: "# This is a comment", correct: true },
        { text: "<!-- This is a comment -->", correct: false },
      ],
    },
    {
      question: "What is the output of the following code: \nprint(bool(0))",
      answers: [
        { text: "True", correct: false },
        { text: "False", correct: true },
        { text: "0", correct: false },
        { text: "None", correct: false },
      ],
    },
    {
      question:
        "Which method can be used to return a string in upper case letters?",
      answers: [
        { text: "uppercase()", correct: false },
        { text: "upperCase()", correct: false },
        { text: "upper()", correct: true },
        { text: "toUpperCase()", correct: false },
      ],
    },
    {
      question: "Which method can be used to replace parts of a string?",
      answers: [
        { text: "replace()", correct: true },
        { text: "switch()", correct: false },
        { text: "replaceString()", correct: false },
        { text: "repl()", correct: false },
      ],
    },
    {
      question: "Which of these collections defines a LIST?",
      answers: [
        { text: "{1, 2, 3}", correct: false },
        { text: "[1, 2, 3]", correct: true },
        { text: "(1, 2, 3)", correct: false },
        { text: "{1: 'one', 2: 'two', 3: 'three'}", correct: false },
      ],
    },
    {
      question:
        "What is the correct syntax to output the type of a variable or object in Python?",
      answers: [
        { text: "print(typeof x)", correct: false },
        { text: "print(typeOf(x))", correct: false },
        { text: "print(type(x))", correct: true },
        { text: "print(type x)", correct: false },
      ],
    },
    {
      question: "Which function can generate a range of values?",
      answers: [
        { text: "range()", correct: true },
        { text: "values()", correct: false },
        { text: "randrange()", correct: false },
        { text: "enumerate()", correct: false },
      ],
    },
    {
      question: "What is the correct way to create a dictionary in Python?",
      answers: [
        { text: "{ 'one': 1, 'two': 2 }", correct: true },
        { text: "[ 'one': 1, 'two': 2 ]", correct: false },
        { text: "( 'one': 1, 'two': 2 )", correct: false },
        { text: "{ 'one', 1, 'two', 2 }", correct: false },
      ],
    },
    {
      question: "Which operator is used to multiply numbers in Python?",
      answers: [
        { text: "^", correct: false },
        { text: "x", correct: false },
        { text: "*", correct: true },
        { text: "#", correct: false },
      ],
    },
  ],
  hard: [
    {
      question:
        "What is the output of the following code: \nprint([i for i in range(5)])",
      answers: [
        { text: "[0, 1, 2, 3, 4]", correct: true },
        { text: "[1, 2, 3, 4, 5]", correct: false },
        { text: "[0, 1, 2, 3, 4, 5]", correct: false },
        { text: "[1, 2, 3, 4]", correct: false },
      ],
    },
    {
      question:
        "What is the output of the following code: \nx = ['ab', 'cd']\nprint(len(list(map(list, x))))",
      answers: [
        { text: "4", correct: false },
        { text: "2", correct: true },
        { text: "3", correct: false },
        { text: "1", correct: false },
      ],
    },
    {
      question:
        "What is the output of the following code: \nprint(type(lambda: None))",
      answers: [
        { text: "<class 'function'>", correct: true },
        { text: "<class 'lambda'>", correct: false },
        { text: "<class 'NoneType'>", correct: false },
        { text: "<class 'object'>", correct: false },
      ],
    },
    {
      question:
        "What will be the output of the following code: \nprint('hello' + 1)",
      answers: [
        { text: "hello1", correct: false },
        { text: "TypeError", correct: true },
        { text: "1hello", correct: false },
        { text: "None", correct: false },
      ],
    },
    {
      question:
        "What is the output of the following code: \nx = [1, 2, 3, 4]\nprint([x**2 for x in x])",
      answers: [
        { text: "[1, 4, 9, 16]", correct: true },
        { text: "[2, 3, 4, 5]", correct: false },
        { text: "[1, 2, 3, 4]", correct: false },
        { text: "[4, 9, 16, 25]", correct: false },
      ],
    },
    {
      question:
        "Which of the following is the correct way to declare a variable in Python?",
      answers: [
        { text: "var x = 10", correct: false },
        { text: "let x = 10", correct: false },
        { text: "x = 10", correct: true },
        { text: "int x = 10", correct: false },
      ],
    },
    {
      question: "Which of the following is not a built-in data type in Python?",
      answers: [
        { text: "list", correct: false },
        { text: "dictionary", correct: false },
        { text: "tuple", correct: false },
        { text: "array", correct: true },
      ],
    },
    {
      question: "What is the output of the following code: \nprint(type({}))",
      answers: [
        { text: "<class 'set'>", correct: false },
        { text: "<class 'dict'>", correct: true },
        { text: "<class 'tuple'>", correct: false },
        { text: "<class 'list'>", correct: false },
      ],
    },
    {
      question:
        "What is the output of the following code: \nprint(2 ** 3 ** 2)",
      answers: [
        { text: "512", correct: true },
        { text: "64", correct: false },
        { text: "16", correct: false },
        { text: "256", correct: false },
      ],
    },
    {
      question: "Which of the following statements is true?",
      answers: [
        { text: "Lists are immutable", correct: false },
        { text: "Tuples are immutable", correct: true },
        { text: "Dictionaries are immutable", correct: false },
        { text: "Sets are immutable", correct: false },
      ],
    },
  ],
};

const htmlQuestions = {
  easy: [
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "Hyper Text Preprocessor", correct: false },
        { text: "Hyper Text Markup Language", correct: true },
        { text: "Hyper Text Multiple Language", correct: false },
        { text: "Hyper Tool Multi Language", correct: false },
      ],
    },
    {
      question:
        "What is the correct sequence of HTML tags for starting a webpage?",
      answers: [
        { text: "Head, Title, HTML", correct: false },
        { text: "Title, Head, HTML", correct: false },
        { text: "HTML, Head, Title", correct: true },
        { text: "HTML, Title, Head", correct: false },
      ],
    },
    {
      question: "Which HTML tag is used to define an internal style sheet?",
      answers: [
        { text: "<css>", correct: false },
        { text: "<script>", correct: false },
        { text: "<style>", correct: true },
        { text: "<link>", correct: false },
      ],
    },
    {
      question: "Which HTML tag is used to define a paragraph?",
      answers: [
        { text: "<p>", correct: true },
        { text: "<para>", correct: false },
        { text: "<paragraph>", correct: false },
        { text: "<text>", correct: false },
      ],
    },
    {
      question: "Which HTML tag is used to define an unordered list?",
      answers: [
        { text: "<ul>", correct: true },
        { text: "<ol>", correct: false },
        { text: "<li>", correct: false },
        { text: "<list>", correct: false },
      ],
    },
    {
      question: "Which HTML attribute is used to define inline styles?",
      answers: [
        { text: "style", correct: true },
        { text: "class", correct: false },
        { text: "styles", correct: false },
        { text: "font", correct: false },
      ],
    },
    {
      question:
        "Which HTML attribute is used to specify an alternate text for an image, if the image cannot be displayed?",
      answers: [
        { text: "alt", correct: true },
        { text: "src", correct: false },
        { text: "title", correct: false },
        { text: "longdesc", correct: false },
      ],
    },
    {
      question: "How can you make a numbered list?",
      answers: [
        { text: "<ul>", correct: false },
        { text: "<ol>", correct: true },
        { text: "<dl>", correct: false },
        { text: "<list>", correct: false },
      ],
    },
    {
      question: "What is the correct HTML for making a checkbox?",
      answers: [
        { text: "<input type='check'>", correct: false },
        { text: "<checkbox>", correct: false },
        { text: "<check>", correct: false },
        { text: "<input type='checkbox'>", correct: true },
      ],
    },
    {
      question: "What is the correct HTML for adding a background color?",
      answers: [
        { text: "<body bg='yellow'>", correct: false },
        { text: "<body style='background-color:yellow;'>", correct: true },
        { text: "<background>yellow</background>", correct: false },
        { text: "<body background='yellow'>", correct: false },
      ],
    },
  ],
  medium: [
    {
      question:
        "Which HTML element is used to specify a footer for a document or section?",
      answers: [
        { text: "<bottom>", correct: false },
        { text: "<footer>", correct: true },
        { text: "<section>", correct: false },
        { text: "<foot>", correct: false },
      ],
    },
    {
      question: "Which HTML element defines navigation links?",
      answers: [
        { text: "<nav>", correct: true },
        { text: "<navigation>", correct: false },
        { text: "<navbar>", correct: false },
        { text: "<links>", correct: false },
      ],
    },
    {
      question:
        "Which HTML element is used to specify a header for a document or section?",
      answers: [
        { text: "<head>", correct: false },
        { text: "<header>", correct: true },
        { text: "<h1>", correct: false },
        { text: "<top>", correct: false },
      ],
    },
    {
      question:
        "Which HTML element is used to specify a block of text that has been quoted from another source?",
      answers: [
        { text: "<q>", correct: false },
        { text: "<blockquote>", correct: true },
        { text: "<quote>", correct: false },
        { text: "<cite>", correct: false },
      ],
    },
    {
      question: "Which HTML element is used to define a table row?",
      answers: [
        { text: "<th>", correct: false },
        { text: "<td>", correct: false },
        { text: "<tr>", correct: true },
        { text: "<table>", correct: false },
      ],
    },
    {
      question: "Which HTML element is used to define a table header?",
      answers: [
        { text: "<head>", correct: false },
        { text: "<th>", correct: true },
        { text: "<h1>", correct: false },
        { text: "<top>", correct: false },
      ],
    },
    {
      question: "What is the correct HTML for creating a hyperlink?",
      answers: [
        { text: "<a href='http://www.example.com'>Example</a>", correct: true },
        {
          text: "<a name='http://www.example.com'>Example</a>",
          correct: false,
        },
        {
          text: "<link url='http://www.example.com'>Example</link>",
          correct: false,
        },
        {
          text: "<a link='http://www.example.com'>Example</a>",
          correct: false,
        },
        {
          text: "<hyperlink='http://www.example.com'>Example</hyperlink>",
          correct: false,
        },
      ],
    },
    {
      question: "Which HTML element is used to define a list item?",
      answers: [
        { text: "<li>", correct: true },
        { text: "<ul>", correct: false },
        { text: "<ol>", correct: false },
        { text: "<list>", correct: false },
      ],
    },
    {
      question: "How do you create a hyperlink in HTML?",
      answers: [
        { text: "<a href='http://www.example.com'>Example</a>", correct: true },
        {
          text: "<hyperlink>http://www.example.com</hyperlink>",
          correct: false,
        },
        {
          text: "<link url='http://www.example.com'>Example</link>",
          correct: false,
        },
        {
          text: "<a link='http://www.example.com'>Example</a>",
          correct: false,
        },
      ],
    },
  ],
  hard: [
    {
      question:
        "Which HTML element defines the description of an item in a list?",
      answers: [
        { text: "<description>", correct: false },
        { text: "<item>", correct: false },
        { text: "<dt>", correct: true },
        { text: "<detail>", correct: false },
      ],
    },
    {
      question:
        "Which attribute is used to specify that an input field must be filled out?",
      answers: [
        { text: "validate", correct: false },
        { text: "required", correct: true },
        { text: "placeholder", correct: false },
        { text: "mandatory", correct: false },
      ],
    },
    {
      question:
        "Which HTML element is used to display a scalar measurement within a range?",
      answers: [
        { text: "<meter>", correct: true },
        { text: "<scale>", correct: false },
        { text: "<range>", correct: false },
        { text: "<gauge>", correct: false },
      ],
    },
    {
      question: "What is the correct HTML for making a text input field?",
      answers: [
        { text: "<input type='text'>", correct: true },
        { text: "<textfield>", correct: false },
        { text: "<textinput>", correct: false },
        { text: "<input type='input'>", correct: false },
      ],
    },
    {
      question: "Which HTML element is used to define important text?",
      answers: [
        { text: "<strong>", correct: true },
        { text: "<important>", correct: false },
        { text: "<b>", correct: false },
        { text: "<em>", correct: false },
      ],
    },
    {
      question:
        "Which HTML element is used to define the keyboard input in a form?",
      answers: [
        { text: "<input type='keyboard'>", correct: false },
        { text: "<keyboard>", correct: false },
        { text: "<input type='text' keyboard>", correct: false },
        { text: "<input type='text'>", correct: true },
      ],
    },
    {
      question: "Which HTML element is used to define navigation links?",
      answers: [
        { text: "<nav>", correct: true },
        { text: "<navigation>", correct: false },
        { text: "<navbar>", correct: false },
        { text: "<links>", correct: false },
      ],
    },
    {
      question: "What is the correct HTML for playing audio files?",
      answers: [
        { text: "<audio src='sound.mp3' controls>", correct: true },
        { text: "<sound src='sound.mp3' controls>", correct: false },
        { text: "<mp3 src='sound.mp3' controls>", correct: false },
        { text: "<music src='sound.mp3' controls>", correct: false },
      ],
    },
    {
      question: "What is the correct HTML for making a text area?",
      answers: [
        { text: "<input type='textarea'>", correct: false },
        { text: "<textarea>", correct: true },
        { text: "<input type='textbox'>", correct: false },
        { text: "<textinput>", correct: false },
      ],
    },
    {
      question: "What is the correct HTML for adding a background color?",
      answers: [
        { text: "<body bg='yellow'>", correct: false },
        { text: "<body style='background-color:yellow;'>", correct: true },
        { text: "<background>yellow</background>", correct: false },
        { text: "<body background='yellow'>", correct: false },
      ],
    },
  ],
};

const cssQuestions = {
  easy: [
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Creative Style Sheets", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Colorful Style Sheets", correct: false },
      ],
    },
    {
      question:
        "Which property is used to change the background color of an element?",
      answers: [
        { text: "color", correct: false },
        { text: "bgcolor", correct: false },
        { text: "background-color", correct: true },
        { text: "background", correct: false },
      ],
    },
    {
      question: "Which CSS property controls the text size?",
      answers: [
        { text: "font-size", correct: true },
        { text: "text-style", correct: false },
        { text: "font-style", correct: false },
        { text: "text-size", correct: false },
      ],
    },
    {
      question: "How do you select an element with id 'demo'?",
      answers: [
        { text: ".demo", correct: false },
        { text: "#demo", correct: true },
        { text: "demo", correct: false },
        { text: "*demo", correct: false },
      ],
    },
    {
      question: "How do you select elements with class name 'test'?",
      answers: [
        { text: "#test", correct: false },
        { text: "*test", correct: false },
        { text: ".test", correct: true },
        { text: "test", correct: false },
      ],
    },
    {
      question: "Which property is used to change the font of an element?",
      answers: [
        { text: "font-family", correct: true },
        { text: "font-style", correct: false },
        { text: "font-weight", correct: false },
        { text: "font-size", correct: false },
      ],
    },
    {
      question:
        "Which CSS property is used to control the space between elements?",
      answers: [
        { text: "spacing", correct: false },
        { text: "margin", correct: true },
        { text: "padding", correct: false },
        { text: "float", correct: false },
      ],
    },
    {
      question:
        "Which CSS property is used to set the text color of an element?",
      answers: [
        { text: "text-color", correct: false },
        { text: "color", correct: true },
        { text: "font-color", correct: false },
        { text: "bgcolor", correct: false },
      ],
    },
    {
      question: "Which CSS property is used to make text bold?",
      answers: [
        { text: "font-weight", correct: true },
        { text: "text-style", correct: false },
        { text: "bold", correct: false },
        { text: "font-bold", correct: false },
      ],
    },
    {
      question: "Which property is used to add shadows to text?",
      answers: [
        { text: "text-shadow", correct: true },
        { text: "box-shadow", correct: false },
        { text: "shadow", correct: false },
        { text: "text-outline", correct: false },
      ],
    },
  ],
  medium: [
    {
      question:
        "Which CSS property is used to change the left margin of an element?",
      answers: [
        { text: "margin-left", correct: true },
        { text: "padding-left", correct: false },
        { text: "indent", correct: false },
        { text: "spacing-left", correct: false },
      ],
    },
    {
      question: "What does the 'em' unit represent in CSS?",
      answers: [
        { text: "Equal margin", correct: false },
        { text: "Element", correct: false },
        { text: "Emotion", correct: false },
        { text: "Font-size of the parent element", correct: true },
      ],
    },
    {
      question:
        "Which property is used to control the positioning of an element?",
      answers: [
        { text: "position", correct: true },
        { text: "place", correct: false },
        { text: "align", correct: false },
        { text: "display", correct: false },
      ],
    },
    {
      question: "What is the default value of the 'position' property?",
      answers: [
        { text: "static", correct: true },
        { text: "relative", correct: false },
        { text: "absolute", correct: false },
        { text: "fixed", correct: false },
      ],
    },
    {
      question:
        "Which property is used to create a floating effect for an element?",
      answers: [
        { text: "float", correct: true },
        { text: "align", correct: false },
        { text: "position", correct: false },
        { text: "display", correct: false },
      ],
    },
    {
      question: "What does the 'z-index' property do in CSS?",
      answers: [
        { text: "Controls the spacing between lines of text", correct: false },
        { text: "Controls the transparency of an element", correct: false },
        {
          text: "Specifies the order of an element along the z-axis",
          correct: true,
        },
        { text: "Controls the indentation of text", correct: false },
      ],
    },
    {
      question: "Which CSS property is used to create rounded corners?",
      answers: [
        { text: "border-radius", correct: true },
        { text: "corner-radius", correct: false },
        { text: "rounded", correct: false },
        { text: "curve", correct: false },
      ],
    },
    {
      question: "Which property is used to add a border to an element?",
      answers: [
        { text: "border", correct: true },
        { text: "border-style", correct: false },
        { text: "border-width", correct: false },
        { text: "border-color", correct: false },
      ],
    },
    {
      question:
        "Which CSS property is used to change the transparency of an element?",
      answers: [
        { text: "transparency", correct: false },
        { text: "opacity", correct: true },
        { text: "visibility", correct: false },
        { text: "transparent", correct: false },
      ],
    },
    {
      question: "What does the 'display: none;' property do in CSS?",
      answers: [
        { text: "Hides the element completely", correct: true },
        { text: "Makes the element partially transparent", correct: false },
        {
          text: "Displays the element as a block-level element",
          correct: false,
        },
        { text: "Centers the element on the page", correct: false },
      ],
    },
  ],
  hard: [
    {
      question:
        "Which CSS property is used to add a shadow effectto the border of an element?",
      answers: [
        { text: "border-shadow", correct: false },
        { text: "border-effect", correct: false },
        { text: "box-shadow", correct: true },
        { text: "shadow-border", correct: false },
      ],
    },
    {
      question: "What is the default value of the 'overflow' property?",
      answers: [
        { text: "visible", correct: false },
        { text: "auto", correct: false },
        { text: "hidden", correct: false },
        { text: "visible", correct: true },
      ],
    },
    {
      question:
        "Which property is used to control the stacking order of elements?",
      answers: [
        { text: "order", correct: false },
        { text: "stack", correct: false },
        { text: "z-index", correct: true },
        { text: "stacking-order", correct: false },
      ],
    },
    {
      question:
        "Which CSS property is used to specify the minimum height of an element?",
      answers: [
        { text: "min-height", correct: true },
        { text: "height-min", correct: false },
        { text: "min-height-size", correct: false },
        { text: "minimum-height", correct: false },
      ],
    },
    {
      question: "What does the 'flex' property do in CSS?",
      answers: [
        { text: "Controls the flexibility of an element", correct: true },
        { text: "Adds a shadow effect to an element", correct: false },
        { text: "Specifies the order of flex items", correct: false },
        { text: "Aligns elements horizontally", correct: false },
      ],
    },
    {
      question:
        "Which CSS property is used to control the order of flex items?",
      answers: [
        { text: "order", correct: true },
        { text: "flex-order", correct: false },
        { text: "item-order", correct: false },
        { text: "flex-align", correct: false },
      ],
    },
    {
      question: "What does the 'transform' property do in CSS?",
      answers: [
        { text: "Rotates an element", correct: true },
        { text: "Translates an element", correct: false },
        { text: "Scales an element", correct: false },
        { text: "Skews an element", correct: false },
      ],
    },
    {
      question: "Which CSS property is used to create an animation effect?",
      answers: [
        { text: "transition", correct: false },
        { text: "animation", correct: true },
        { text: "transform", correct: false },
        { text: "effect", correct: false },
      ],
    },
    {
      question: "What does the 'backface-visibility' property do in CSS?",
      answers: [
        {
          text: "Controls the visibility of the back face of an element",
          correct: true,
        },
        {
          text: "Controls the visibility of the front face of an element",
          correct: false,
        },
        { text: "Rotates an element", correct: false },
        {
          text: "Controls the visibility of both faces of an element",
          correct: false,
        },
      ],
    },
    {
      question:
        "Which CSS property is used to control the appearance of the cursor when hovering over an element?",
      answers: [
        { text: "cursor", correct: true },
        { text: "pointer", correct: false },
        { text: "hover-cursor", correct: false },
        { text: "mouse-cursor", correct: false },
      ],
    },
  ],
};

const reactQuestions = {
  easy: [
    {
      question: "What does JSX stand for?",
      answers: [
        { text: "JavaScript XML", correct: true },
        { text: "JavaScript Extension", correct: false },
        { text: "JavaScript Syntax XML", correct: false },
        { text: "JavaScript External XML", correct: false },
      ],
    },
    {
      question: "Which command is used to create a new React app?",
      answers: [
        { text: "create-react-app", correct: true },
        { text: "new-react-app", correct: false },
        { text: "react-create-app", correct: false },
        { text: "make-react-app", correct: false },
      ],
    },
    {
      question: "What is the entry point of a React application?",
      answers: [
        { text: "index.js", correct: true },
        { text: "app.js", correct: false },
        { text: "main.js", correct: false },
        { text: "root.js", correct: false },
      ],
    },
    {
      question:
        "Which function is used to render a React component to the DOM?",
      answers: [
        { text: "ReactDOM.render()", correct: true },
        { text: "React.render()", correct: false },
        { text: "renderComponent()", correct: false },
        { text: "componentRender()", correct: false },
      ],
    },
    {
      question: "What is the purpose of the useState hook in React?",
      answers: [
        { text: "To manage state in functional components", correct: true },
        { text: "To create reusable components", correct: false },
        { text: "To handle side effects", correct: false },
        { text: "To perform data fetching", correct: false },
      ],
    },
    {
      question:
        "Which method is used to update the state in a class component?",
      answers: [
        { text: "setState()", correct: true },
        { text: "updateState()", correct: false },
        { text: "modifyState()", correct: false },
        { text: "changeState()", correct: false },
      ],
    },
    {
      question: "In React, props are __________.",
      answers: [
        { text: "immutable", correct: true },
        { text: "mutable", correct: false },
        { text: "optional", correct: false },
        { text: "required", correct: false },
      ],
    },
    {
      question:
        "Which component lifecycle method is called after a component is rendered for the first time?",
      answers: [
        { text: "componentDidMount()", correct: true },
        { text: "componentDidRender()", correct: false },
        { text: "componentWillMount()", correct: false },
        { text: "componentWillReceiveProps()", correct: false },
      ],
    },
    {
      question: "What is the purpose of keys in React lists?",
      answers: [
        { text: "To identify unique list items", correct: true },
        { text: "To style list items", correct: false },
        { text: "To filter list items", correct: false },
        { text: "To sort list items", correct: false },
      ],
    },
    {
      question: "Which React method is used to handle user input in forms?",
      answers: [
        { text: "onChange", correct: true },
        { text: "onSubmit", correct: false },
        { text: "onClick", correct: false },
        { text: "onInput", correct: false },
      ],
    },
  ],
  medium: [
    {
      question: "What is the purpose of the useEffect hook in React?",
      answers: [
        {
          text: "To perform side effects in functional components",
          correct: true,
        },
        { text: "To manage state in functional components", correct: false },
        { text: "To create reusable components", correct: false },
        { text: "To handle routing in React applications", correct: false },
      ],
    },
    {
      question: "What is the difference between state and props in React?",
      answers: [
        {
          text: "State is mutable and controlled by the component itself, while props are immutable and controlled by the parent component",
          correct: true,
        },
        {
          text: "State is immutable and controlled by the parent component, while props are mutable and controlled by the component itself",
          correct: false,
        },
        {
          text: "State is used for functional components, while props are used for class components",
          correct: false,
        },
        {
          text: "State is used for class components, while props are used for functional components",
          correct: false,
        },
      ],
    },
    {
      question: "What is a React fragment?",
      answers: [
        {
          text: "A way to group multiple elements without adding an extra DOM node",
          correct: true,
        },
        { text: "A reusable component in React", correct: false },
        { text: "A component that renders nothing", correct: false },
        { text: "A way to define inline styles in React", correct: false },
      ],
    },
    {
      question: "What does the useCallback hook do in React?",
      answers: [
        {
          text: "Memoizes a callback function to prevent unnecessary re-renders",
          correct: true,
        },
        {
          text: "Rerenders a component when its dependencies change",
          correct: false,
        },
        { text: "Performs an effect after rendering", correct: false },
        { text: "Updates the state of a component", correct: false },
      ],
    },
    {
      question: "What is the purpose of the useRef hook in React?",
      answers: [
        {
          text: "To create a mutable reference to a DOM element or a value",
          correct: true,
        },
        { text: "To manage state in functional components", correct: false },
        {
          text: "To perform data fetching in functional components",
          correct: false,
        },
        {
          text: "To handle side effects in functional components",
          correct: false,
        },
      ],
    },
    {
      question: "What is a higher-order component (HOC) in React?",
      answers: [
        {
          text: "A function that takes a component and returns a new component",
          correct: true,
        },
        { text: "A component that renders other components", correct: false },
        { text: "A component that only accepts props", correct: false },
        { text: "A component that only renders children", correct: false },
      ],
    },
    {
      question: "What is the purpose of the useMemo hook in React?",
      answers: [
        {
          text: "Memoizes a value to prevent unnecessary re-computations",
          correct: true,
        },
        { text: "Performs an effect after rendering", correct: false },
        { text: "Updates the state of a component", correct: false },
        {
          text: "Rerenders a component when its dependencies change",
          correct: false,
        },
      ],
    },
    {
      question: "What is the Context API in React used for?",
      answers: [
        {
          text: "To pass data through the component tree without having to pass props down manually at every level",
          correct: true,
        },
        { text: "To manage state in functional components", correct: false },
        { text: "To create reusable components", correct: false },
        { text: "To handle routing in React applications", correct: false },
        {
          text: "To handle asynchronous operations in React components",
          correct: false,
        },
      ],
    },
    {
      question:
        "What is the purpose of the componentDidCatch lifecycle method in React?",
      answers: [
        { text: "To catch errors that occur during rendering", correct: true },
        { text: "To fetch data from a remote server", correct: false },
        {
          text: "To update the state of a component after rendering",
          correct: false,
        },
        {
          text: "To perform cleanup after a component is unmounted",
          correct: false,
        },
      ],
    },
    {
      question: "What does React.memo do?",
      answers: [
        {
          text: "Memoizes a component to prevent unnecessary re-renders",
          correct: true,
        },
        { text: "Performs an effect after rendering", correct: false },
        { text: "Updates the state of a component", correct: false },
        {
          text: "Rerenders a component when its dependencies change",
          correct: false,
        },
      ],
    },
    {
      question: "What is the purpose of the useCallback hook in React?",
      answers: [
        {
          text: "Memoizes a callback function to prevent unnecessary re-renders",
          correct: true,
        },
        {
          text: "Rerenders a component when its dependencies change",
          correct: false,
        },
        { text: "Performs an effect after rendering", correct: false },
        { text: "Updates the state of a component", correct: false },
      ],
    },
  ],
  hard: [
    {
      question:
        "What are the differences between class components and functional components in React?",
      answers: [
        {
          text: "Class components use the 'class' keyword and have lifecycle methods, while functional components are defined using functions and do not have lifecycle methods",
          correct: true,
        },
        {
          text: "Class components are faster than functional components",
          correct: false,
        },
        {
          text: "Functional components have access to 'this' keyword, while class components do not",
          correct: false,
        },
        {
          text: "Functional components use the 'class' keyword and have lifecycle methods, while class components are defined using functions and do not have lifecycle methods",
          correct: false,
        },
      ],
    },
    {
      question: "What is the purpose of React portals?",
      answers: [
        {
          text: "To render children into a DOM node that exists outside of the DOM hierarchy of the parent component",
          correct: true,
        },
        { text: "To create reusable components in React", correct: false },
        { text: "To handle state in functional components", correct: false },
        { text: "To handle routing in React applications", correct: false },
      ],
    },
    {
      question: "What is the significance of the 'key' prop in React lists?",
      answers: [
        {
          text: "It helps React identify which items have changed, are added, or are removed",
          correct: true,
        },
        {
          text: "It specifies the order of elements in a list",
          correct: false,
        },
        {
          text: "It applies unique styling to each item in a list",
          correct: false,
        },
        { text: "It prevents re-rendering of list items", correct: false },
      ],
    },
    {
      question: "What is the purpose of the useRef hook in React?",
      answers: [
        {
          text: "To create a mutable reference to a DOM element or a value",
          correct: true,
        },
        { text: "To manage state in functional components", correct: false },
        {
          text: "To perform data fetching in functional components",
          correct: false,
        },
        {
          text: "To handle side effects in functional components",
          correct: false,
        },
      ],
    },
    {
      question:
        "What is the difference between 'controlled' and 'uncontrolled' components in React?",
      answers: [
        {
          text: "Controlled components have their state managed by React and their value is controlled by React, while uncontrolled components have their state managed by the DOM and their value is not controlled by React",
          correct: true,
        },
        {
          text: "Controlled components are faster than uncontrolled components",
          correct: false,
        },
        {
          text: "Uncontrolled components have access to 'this' keyword, while controlled components do not",
          correct: false,
        },
        {
          text: "Uncontrolled components use the 'class' keyword and have lifecycle methods, while controlled components are defined using functions and do not have lifecycle methods",
          correct: false,
        },
      ],
    },
    {
      question:
        "What is the purpose of the shouldComponentUpdate lifecycle method in React?",
      answers: [
        {
          text: "To let React know if a component's output is not affected by the current change in state or props, and thus should not re-render",
          correct: true,
        },
        { text: "To fetch data from a remote server", correct: false },
        {
          text: "To update the state of a component after rendering",
          correct: false,
        },
        {
          text: "To perform cleanup after a component is unmounted",
          correct: false,
        },
      ],
    },
  ],
};

const sqlQuestions = {
  easy: [
    {
      question: "What does SQL stand for?",
      answers: [
        { text: "Structured Query Language", correct: true },
        { text: "Sequential Query Language", correct: false },
        { text: "Standardized Query Language", correct: false },
        { text: "Sequential Query Logic", correct: false },
      ],
    },
    {
      question: "Which SQL keyword is used to retrieve data from a database?",
      answers: [
        { text: "GET", correct: false },
        { text: "SELECT", correct: true },
        { text: "RETRIEVE", correct: false },
        { text: "FETCH", correct: false },
      ],
    },
    {
      question: "Which SQL keyword is used to filter results?",
      answers: [
        { text: "FILTER", correct: false },
        { text: "SEARCH", correct: false },
        { text: "WHERE", correct: true },
        { text: "CONDITION", correct: false },
      ],
    },
    {
      question: "Which SQL keyword is used to sort results in ascending order?",
      answers: [
        { text: "ASC", correct: true },
        { text: "SORT", correct: false },
        { text: "ORDER", correct: false },
        { text: "ASCENDING", correct: false },
      ],
    },
    {
      question: "Which SQL keyword is used to delete data from a database?",
      answers: [
        { text: "DELETE", correct: true },
        { text: "REMOVE", correct: false },
        { text: "DROP", correct: false },
        { text: "ERASE", correct: false },
      ],
    },
    {
      question: "Which SQL keyword is used to update data in a database?",
      answers: [
        { text: "UPDATE", correct: true },
        { text: "MODIFY", correct: false },
        { text: "CHANGE", correct: false },
        { text: "ALTER", correct: false },
      ],
    },
    {
      question: "Which SQL keyword is used to insert data into a database?",
      answers: [
        { text: "INSERT", correct: true },
        { text: "ADD", correct: false },
        { text: "PUT", correct: false },
        { text: "CREATE", correct: false },
      ],
    },
    {
      question:
        "Which SQL keyword is used to count the number of records in a table?",
      answers: [
        { text: "COUNT", correct: true },
        { text: "SUM", correct: false },
        { text: "TOTAL", correct: false },
        { text: "SIZE", correct: false },
      ],
    },
    {
      question:
        "Which SQL keyword is used to group rows together based on a column?",
      answers: [
        { text: "GROUP", correct: false },
        { text: "ARRANGE", correct: false },
        { text: "GROUP BY", correct: true },
        { text: "COMBINE", correct: false },
      ],
    },
    {
      question: "Which SQL keyword is used to join tables together?",
      answers: [
        { text: "JOIN", correct: true },
        { text: "COMBINE", correct: false },
        { text: "MERGE", correct: false },
        { text: "CONNECT", correct: false },
      ],
    },
  ],
  medium: [
    {
      question:
        "Which SQL clause is used to filter the results of a query based on a specified condition?",
      answers: [
        { text: "FILTER", correct: false },
        { text: "WHERE", correct: true },
        { text: "SORT", correct: false },
        { text: "GROUP BY", correct: false },
      ],
    },
    {
      question:
        "Which SQL function is used to find the maximum value in a column?",
      answers: [
        { text: "MAX()", correct: true },
        { text: "LARGEST()", correct: false },
        { text: "BIGGEST()", correct: false },
        { text: "TOP()", correct: false },
      ],
    },
    {
      question:
        "Which SQL function is used to find the minimum value in a column?",
      answers: [
        { text: "MIN()", correct: true },
        { text: "SMALLEST()", correct: false },
        { text: "TINIEST()", correct: false },
        { text: "BOTTOM()", correct: false },
      ],
    },
    {
      question:
        "Which SQL keyword is used to return unique values from a query?",
      answers: [
        { text: "UNIQUE", correct: false },
        { text: "DISTINCT", correct: true },
        { text: "SINGULAR", correct: false },
        { text: "ONLY", correct: false },
      ],
    },
    {
      question:
        "Which SQL function is used to calculate the average value of a column?",
      answers: [
        { text: "AVERAGE()", correct: false },
        { text: "MEAN()", correct: false },
        { text: "AVG()", correct: true },
        { text: "MIDDLE()", correct: false },
      ],
    },
    {
      question:
        "Which SQL clause is used to specify the order in which rows should be returned in a query?",
      answers: [
        { text: "ORDER BY", correct: true },
        { text: "SORT BY", correct: false },
        { text: "ARRANGE BY", correct: false },
        { text: "RANK BY", correct: false },
      ],
    },
    {
      question:
        "Which SQL function is used to concatenate two or more strings?",
      answers: [
        { text: "CONCAT()", correct: true },
        { text: "JOIN()", correct: false },
        { text: "MERGE()", correct: false },
        { text: "COMBINE()", correct: false },
      ],
    },
    {
      question:
        "Which SQL clause is used to limit the number of rows returned by a query?",
      answers: [
        { text: "LIMIT", correct: true },
        { text: "ROW LIMIT", correct: false },
        { text: "TOP", correct: false },
        { text: "MAX ROWS", correct: false },
      ],
    },
    {
      question: "Which SQL function is used to format dates?",
      answers: [
        { text: "FORMATDATE()", correct: false },
        { text: "TO_DATE()", correct: false },
        { text: "DATE_FORMAT()", correct: false },
        { text: "DATE()", correct: true },
      ],
    },
    {
      question:
        "Which SQL clause is used to remove duplicate rows from the result of a SELECT statement?",
      answers: [
        { text: "UNIQUE", correct: false },
        { text: "DISTINCT", correct: true },
        { text: "REMOVE DUPLICATES", correct: false },
        { text: "DEDUPLICATE", correct: false },
      ],
    },
  ],
  hard: [
    {
      question: "What is a subquery in SQL?",
      answers: [
        { text: "A query within another query", correct: true },
        {
          text: "A query that retrieves all records from a table",
          correct: false,
        },
        {
          text: "A query that updates multiple records in a table",
          correct: false,
        },
        {
          text: "A query that deletes all records from a table",
          correct: false,
        },
      ],
    },
    {
      question: "What is a self-join in SQL?",
      answers: [
        {
          text: "A join that combines two tables with a foreign key",
          correct: false,
        },
        { text: "A join that combines a table with itself", correct: true },
        { text: "A join that combines three or more tables", correct: false },
        {
          text: "A join that excludes common records from two tables",
          correct: false,
        },
      ],
    },
    {
      question: "What is a primary key in SQL?",
      answers: [
        { text: "A unique identifier for a table", correct: true },
        { text: "A key that allows NULL values", correct: false },
        { text: "A key that references another table", correct: false },
        { text: "A key that is used for sorting", correct: false },
      ],
    },
    {
      question: "What is an index in SQL?",
      answers: [
        {
          text: "A data structure that improves the speed of data retrieval",
          correct: true,
        },
        { text: "A key that ensures data integrity", correct: false },
        { text: "A key that allows NULL values", correct: false },
        { text: "A key that references another table", correct: false },
      ],
    },
    {
      question: "What is the purpose of the HAVING clause in SQL?",
      answers: [
        { text: "To filter rows before grouping", correct: false },
        { text: "To filter rows after grouping", correct: true },
        { text: "To join tables together", correct: false },
        { text: "To sort rows in ascending order", correct: false },
      ],
    },
    {
      question: "What is a foreign key in SQL?",
      answers: [
        { text: "A key that ensures data integrity", correct: false },
        {
          text: "A key that references another table's primary key",
          correct: true,
        },
        { text: "A key that is used for sorting", correct: false },
        { text: "A unique identifier for a table", correct: false },
      ],
    },
    {
      question: "What is the purpose of the UNION operator in SQL?",
      answers: [
        {
          text: "To combine the results of two or more SELECT statements into a single result set",
          correct: true,
        },
        {
          text: "To exclude the common records from two tables",
          correct: false,
        },
        { text: "To delete records from a table", correct: false },
        { text: "To update records in a table", correct: false },
      ],
    },
    {
      question: "What is a correlated subquery in SQL?",
      answers: [
        {
          text: "A subquery that is not dependent on the outer query",
          correct: false,
        },
        {
          text: "A subquery that references a column from the outer query",
          correct: true,
        },
        { text: "A subquery that returns multiple columns", correct: false },
        { text: "A subquery that uses the UNION operator", correct: false },
      ],
    },
  ],
};

const gitQuestions = {
  easy: [
    {
      question: "What is Git?",
      answers: [
        { text: "Version control system", correct: true },
        { text: "Database management system", correct: false },
        { text: "Operating system", correct: false },
        { text: "Programming language", correct: false },
      ],
    },
    {
      question: "What is GitHub?",
      answers: [
        { text: "Web-based Git repository hosting service", correct: true },
        { text: "Version control software", correct: false },
        { text: "Integrated development environment", correct: false },
        { text: "Programming language", correct: false },
      ],
    },
    {
      question: "Which command is used to initialize a new Git repository?",
      answers: [
        { text: "git init", correct: true },
        { text: "git clone", correct: false },
        { text: "git add", correct: false },
        { text: "git commit", correct: false },
      ],
    },
    {
      question: "Which command is used to stage changes for commit in Git?",
      answers: [
        { text: "git add", correct: true },
        { text: "git commit", correct: false },
        { text: "git push", correct: false },
        { text: "git pull", correct: false },
      ],
    },
    {
      question:
        "Which command is used to commit changes to the local repository in Git?",
      answers: [
        { text: "git commit", correct: true },
        { text: "git add", correct: false },
        { text: "git push", correct: false },
        { text: "git pull", correct: false },
      ],
    },
    {
      question: "Which command is used to view the commit history in Git?",
      answers: [
        { text: "git log", correct: true },
        { text: "git status", correct: false },
        { text: "git diff", correct: false },
        { text: "git show", correct: false },
      ],
    },
    {
      question: "What is a pull request in GitHub?",
      answers: [
        {
          text: "A request to merge changes from one branch into another",
          correct: true,
        },
        { text: "A request to revert changes in a repository", correct: false },
        { text: "A request to delete a repository", correct: false },
        { text: "A request to create a new branch", correct: false },
      ],
    },
    {
      question: "What is a repository in GitHub?",
      answers: [
        { text: "A storage location where projects are stored", correct: true },
        { text: "A code editor provided by GitHub", correct: false },
        { text: "A collaboration tool for teams", correct: false },
        { text: "A version control system", correct: false },
      ],
    },
    {
      question: "What is a branch in Git?",
      answers: [
        { text: "A separate line of development", correct: true },
        { text: "A collection of commits", correct: false },
        { text: "A single commit", correct: false },
        { text: "A directory in a repository", correct: false },
      ],
    },
    {
      question: "Which command is used to switch to a different branch in Git?",
      answers: [
        { text: "git checkout", correct: true },
        { text: "git switch", correct: false },
        { text: "git branch", correct: false },
        { text: "git merge", correct: false },
      ],
    },
  ],
  medium: [
    {
      question: "What is the purpose of the 'git push' command?",
      answers: [
        {
          text: "To upload local repository content to a remote repository",
          correct: true,
        },
        { text: "To fetch changes from a remote repository", correct: false },
        {
          text: "To merge changes from one branch into another",
          correct: false,
        },
        { text: "To create a new branch", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'git pull' command?",
      answers: [
        {
          text: "To fetch changes from a remote repository and merge them into the current branch",
          correct: true,
        },
        {
          text: "To upload local repository content to a remote repository",
          correct: false,
        },
        { text: "To switch to a different branch", correct: false },
        { text: "To create a new branch", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'git merge' command?",
      answers: [
        {
          text: "To integrate changes from one branch into another",
          correct: true,
        },
        {
          text: "To upload local repository content to a remote repository",
          correct: false,
        },
        { text: "To fetch changes from a remote repository", correct: false },
        { text: "To switch to a different branch", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'git clone' command?",
      answers: [
        {
          text: "To create a local copy of a remote repository",
          correct: true,
        },
        { text: "To fetch changes from a remote repository", correct: false },
        {
          text: "To integrate changes from one branch into another",
          correct: false,
        },
        { text: "To switch to a different branch", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'git checkout' command?",
      answers: [
        {
          text: "To switch branches or restore working tree files",
          correct: true,
        },
        { text: "To create a new branch", correct: false },
        {
          text: "To integrate changes from one branch into another",
          correct: false,
        },
        {
          text: "To upload local repository content to a remote repository",
          correct: false,
        },
      ],
    },
    {
      question: "What is the purpose of the 'git branch' command?",
      answers: [
        { text: "To list, create, or delete branches", correct: true },
        { text: "To switch branches", correct: false },
        {
          text: "To merge changes from one branch into another",
          correct: false,
        },
        {
          text: "To upload local repository content to a remote repository",
          correct: false,
        },
      ],
    },
    {
      question: "What is the purpose of the 'git remote' command?",
      answers: [
        { text: "To manage remote repositories", correct: true },
        { text: "To switch branches", correct: false },
        {
          text: "To merge changes from one branch into another",
          correct: false,
        },
        { text: "To list branches", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'git fetch' command?",
      answers: [
        {
          text: "To download objects and refs from another repository",
          correct: true,
        },
        {
          text: "To integrate changes from one branch into another",
          correct: false,
        },
        { text: "To switch branches", correct: false },
        { text: "To list branches", correct: false },
        { text: "To manage remote repositories", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'git log' command?",
      answers: [
        { text: "To view the commit history", correct: true },
        { text: "To list branches", correct: false },
        {
          text: "To merge changes from one branch into another",
          correct: false,
        },
        { text: "To switch branches", correct: false },
      ],
    },
  ],
  hard: [
    {
      question: "What is a Git rebase?",
      answers: [
        {
          text: "Rewriting commit history by moving or combining commits",
          correct: true,
        },
        {
          text: "Creating a new branch from an existing branch",
          correct: false,
        },
        {
          text: "Merging changes from one branch into another",
          correct: false,
        },
        { text: "Deleting a branch", correct: false },
      ],
    },
    {
      question: "What is a Git stash?",
      answers: [
        {
          text: "A temporary storage area for changes that are not ready to be committed",
          correct: true,
        },
        { text: "A command to permanently delete a branch", correct: false },
        {
          text: "A command to merge changes from one branch into another",
          correct: false,
        },
        { text: "A command to switch branches", correct: false },
      ],
    },
    {
      question: "What is a Git tag?",
      answers: [
        {
          text: "A marker used to label specific points in history",
          correct: true,
        },
        { text: "A command to list branches", correct: false },
        { text: "A command to switch branches", correct: false },
        {
          text: "A command to merge changes from one branch into another",
          correct: false,
        },
      ],
    },
    {
      question: "What is a Git submodule?",
      answers: [
        {
          text: "A repository embedded within another repository",
          correct: true,
        },
        {
          text: "A command to merge changes from one branch into another",
          correct: false,
        },
        { text: "A command to switch branches", correct: false },
        { text: "A command to list branches", correct: false },
      ],
    },
    {
      question: "What is Git bisect?",
      answers: [
        {
          text: "A command to find the commit that introduced a bug",
          correct: true,
        },
        {
          text: "A command to merge changes from one branch into another",
          correct: false,
        },
        { text: "A command to switch branches", correct: false },
        { text: "A command to list branches", correct: false },
      ],
    },
    {
      question: "What is Git cherry-pick?",
      answers: [
        {
          text: "A command to apply a single commit from one branch to another",
          correct: true,
        },
        {
          text: "A command to merge changes from one branch into another",
          correct: false,
        },
        { text: "A command to switch branches", correct: false },
        { text: "A command to list branches", correct: false },
      ],
    },
    {
      question: "What is Git squash?",
      answers: [
        {
          text: "A command to combine multiple commits into a single commit",
          correct: true,
        },
        {
          text: "A command to merge changes from one branch into another",
          correct: false,
        },
        { text: "A command to switch branches", correct: false },
        { text: "A command to list branches", correct: false },
      ],
    },
    {
      question: "What is Git revert?",
      answers: [
        {
          text: "A command to undo a commit by creating a new commit",
          correct: true,
        },
        {
          text: "A command to merge changes from one branch into another",
          correct: false,
        },
        { text: "A command to switch branches", correct: false },
        { text: "A command to list branches", correct: false },
      ],
    },
  ],
};

const commandLineQuestions = {
  easy: [
    {
      question:
        "What is the command to list files and directories in the current directory?",
      answers: [
        { text: "ls", correct: true },
        { text: "dir", correct: false },
        { text: "list", correct: false },
        { text: "show", correct: false },
      ],
    },
    {
      question: "What is the command to change the current directory?",
      answers: [
        { text: "cd", correct: true },
        { text: "change", correct: false },
        { text: "dir", correct: false },
        { text: "switch", correct: false },
      ],
    },
    {
      question: "What is the command to create a new directory?",
      answers: [
        { text: "mkdir", correct: true },
        { text: "newdir", correct: false },
        { text: "makedir", correct: false },
        { text: "createdir", correct: false },
      ],
    },
    {
      question: "What is the command to remove a file?",
      answers: [
        { text: "rm", correct: true },
        { text: "remove", correct: false },
        { text: "delete", correct: false },
        { text: "del", correct: false },
      ],
    },
    {
      question: "What is the command to remove a directory?",
      answers: [
        { text: "rm -r", correct: true },
        { text: "remove", correct: false },
        { text: "delete", correct: false },
        { text: "del", correct: false },
      ],
    },
    {
      question: "What is the command to copy a file?",
      answers: [
        { text: "cp", correct: true },
        { text: "copy", correct: false },
        { text: "mv", correct: false },
        { text: "xcopy", correct: false },
      ],
    },
    {
      question: "What is the command to move a file or directory?",
      answers: [
        { text: "mv", correct: true },
        { text: "move", correct: false },
        { text: "cp", correct: false },
        { text: "copy", correct: false },
      ],
    },
    {
      question: "What is the command to display the contents of a file?",
      answers: [
        { text: "cat", correct: true },
        { text: "display", correct: false },
        { text: "show", correct: false },
        { text: "contents", correct: false },
      ],
    },
    {
      question: "What is the command to create a new file?",
      answers: [
        { text: "touch", correct: true },
        { text: "newfile", correct: false },
        { text: "create", correct: false },
        { text: "makefile", correct: false },
      ],
    },
    {
      question: "What is the command to clear the terminal screen?",
      answers: [
        { text: "clear", correct: true },
        { text: "cls", correct: false },
        { text: "clean", correct: false },
        { text: "clr", correct: false },
      ],
    },
  ],
  medium: [
    {
      question:
        "What is the command to display the current user's home directory?",
      answers: [
        { text: "echo ~", correct: true },
        { text: "home", correct: false },
        { text: "pwd", correct: false },
        { text: "homedir", correct: false },
      ],
    },
    {
      question: "What is the command to search for files or directories?",
      answers: [
        { text: "find", correct: true },
        { text: "search", correct: false },
        { text: "locate", correct: false },
        { text: "grep", correct: false },
      ],
    },
    {
      question: "What is the command to display the manual page for a command?",
      answers: [
        { text: "man", correct: true },
        { text: "help", correct: false },
        { text: "info", correct: false },
        { text: "manual", correct: false },
      ],
    },
    {
      question:
        "What is the command to create a symbolic link to a file or directory?",
      answers: [
        { text: "ln -s", correct: true },
        { text: "link", correct: false },
        { text: "symlink", correct: false },
        { text: "shortcut", correct: false },
      ],
    },
    {
      question: "What is the command to compress files or directories?",
      answers: [
        { text: "tar", correct: true },
        { text: "zip", correct: false },
        { text: "compress", correct: false },
        { text: "gzip", correct: false },
      ],
    },
    {
      question: "What is the command to decompress files or directories?",
      answers: [
        { text: "tar -x", correct: true },
        { text: "unzip", correct: false },
        { text: "decompress", correct: false },
        { text: "gunzip", correct: false },
      ],
    },
    {
      question: "What is the command to list environment variables?",
      answers: [
        { text: "env", correct: true },
        { text: "listenv", correct: false },
        { text: "vars", correct: false },
        { text: "envlist", correct: false },
      ],
    },
    {
      question: "What is the command to set an environment variable?",
      answers: [
        { text: "export", correct: true },
        { text: "set", correct: false },
        { text: "env", correct: false },
        { text: "define", correct: false },
      ],
    },
    {
      question: "What is the command to unset an environment variable?",
      answers: [
        { text: "unset", correct: true },
        { text: "remove", correct: false },
        { text: "clear", correct: false },
        { text: "delete", correct: false },
      ],
    },
    {
      question: "What is the command to display the last few lines of a file?",
      answers: [
        { text: "tail", correct: true },
        { text: "head", correct: false },
        { text: "last", correct: false },
        { text: "end", correct: false },
      ],
    },
  ],
  hard: [
    {
      question: "What is the command to run a command as another user?",
      answers: [
        { text: "sudo", correct: true },
        { text: "su", correct: false },
        { text: "runas", correct: false },
        { text: "executeas", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'chmod' command?",
      answers: [
        { text: "To change file permissions", correct: true },
        { text: "To change file ownership", correct: false },
        { text: "To change file content", correct: false },
        { text: "To change file location", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'chown' command?",
      answers: [
        { text: "To change file ownership", correct: true },
        { text: "To change file permissions", correct: false },
        { text: "To change file content", correct: false },
        { text: "To change file location", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'grep' command?",
      answers: [
        { text: "To search for patterns in files", correct: true },
        { text: "To display the contents of a file", correct: false },
        { text: "To list files and directories", correct: false },
        { text: "To compress files or directories", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'awk' command?",
      answers: [
        { text: "To manipulate text files", correct: true },
        { text: "To search for patterns in files", correct: false },
        { text: "To display the contents of a file", correct: false },
        { text: "To list files and directories", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'sed' command?",
      answers: [
        { text: "To perform text transformations", correct: true },
        { text: "To manipulate text files", correct: false },
        { text: "To search for patterns in files", correct: false },
        { text: "To display the contents of a file", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'tee' command?",
      answers: [
        {
          text: "To read from standard input and write to standard output and files",
          correct: true,
        },
        { text: "To display the contents of a file", correct: false },
        { text: "To search for patterns in files", correct: false },
        { text: "To manipulate text files", correct: false },
      ],
    },
    {
      question: "What is the purpose of the 'cron' command?",
      answers: [
        { text: "To schedule tasks at specific times", correct: true },
        { text: "To perform text transformations", correct: false },
        { text: "To change file permissions", correct: false },
        {
          text: "To read from standard input and write to standard output and files",
          correct: false,
        },
      ],
    },
    {
      question: "What is the purpose of the 'nohup' command?",
      answers: [
        { text: "To run a command immune to hangups", correct: true },
        { text: "To schedule tasks at specific times", correct: false },
        { text: "To change file ownership", correct: false },
        {
          text: "To read from standard input and write to standard output and files",
          correct: false,
        },
      ],
    },
    {
      question: "What is the purpose of the 'watch' command?",
      answers: [
        { text: "To execute a command periodically", correct: true },
        { text: "To run a command immune to hangups", correct: false },
        { text: "To manipulate text files", correct: false },
        { text: "To change file ownership", correct: false },
      ],
    },
  ],
};
