// create objects for each question
questionOne = {
    title:'Question 1',
    question: "Where do you put the parameters of a function?",
    choices: ['Square Brackets', 'Parentheses', 'Curly Brackets', 'Angle Brackets'],
    correctAnswer: 'Parentheses'
}

questionTwo = {
    title:'Question 2',
    question: "How do you reference a class in CSS?",
    choices: ['.', '#', '$', 'Blank'],
    correctAnswer: '.'
}

questionThree = {
    title:'Question 3',
    question: "How do you reference an ID in CSS?",
    choices: ['.', '#', '$', 'Blank'],
    correctAnswer: '#'
}

questionFour = {
    title:'Question 4',
    question: "How do you determine the orientation of the children items of a flex container?",
    choices: ['flex-wrap', 'justify-content', 'flex-direction', 'display'],
    correctAnswer: 'flex-direction'
}

questionFive = {
    title:'Question 5',
    question: "If the flex direction is set to column what to I use to control the vertical positioning?",
    choices: ['align-items', 'justify-content', 'text-align', 'display'],
    correctAnswer: 'justify-content'
}

// Put questions in array
questions = [questionOne, questionTwo, questionThree, questionFour, questionFive];

// get elements from DOM
startButton = document.querySelector('#startQuiz');
title = document.querySelector('#mainHeader');
questionSection = document.querySelector('#info');
options = document.querySelector('#buttonSection');
// initialize variables
var questionCount;

function addToHighscore(){
    input = document.querySelector('#initials')
    console.log(input.value);
}

function displayQuestion() {
   question =  questions[questionCount]
   title.textContent = question.title
   questionSection.textContent = question.question
   for (var i = 0; i < question.choices.length; i++) {
        choice = question.choices[i]
        buttonEl = document.createElement("button");
        buttonEl.textContent = choice
        buttonEl.setAttribute('class', 'btn-option ' + i);
        buttonEl.setAttribute('onclick','evaluateAnswer(this);')
        options.appendChild(buttonEl)
        
   }
}

function displayResults(){
    title.textContent = "All Done!"
    questionSection.textContent = 'your score was'
    inputEl = document.createElement("input");
    labelEl = document.createElement("label");
    submitEl = document.createElement("button");
    inputEl.setAttribute('name', 'initials');
    inputEl.setAttribute('id', 'initials');
    labelEl.setAttribute('for', 'initials');
    labelEl.textContent = 'Please enter your initials:';
    submitEl.setAttribute('onclick', 'addToHighscore()')
    submitEl.textContent = 'Submit'
    options.appendChild(labelEl);
    options.appendChild(inputEl);
    options.appendChild(submitEl);

}

function evaluateAnswer(element){
    question =  questions[questionCount]
    if (element.textContent == question.correctAnswer){
        console.log('Correct Answer')
    } else {
        console.log('Incorrect Answer')
    }
    questionCount++
    choiceButtons = document.querySelectorAll('.btn-option');
    for (var i=0; i<choiceButtons.length; i++) {
        options.removeChild(choiceButtons[i]);
    }
    if (questionCount === 5){
        displayResults()
    } else {
        displayQuestion()
    }
    
}



startButton.addEventListener("click", function() {
    questionCount = 0
    options.removeChild(startButton);
    displayQuestion();
});