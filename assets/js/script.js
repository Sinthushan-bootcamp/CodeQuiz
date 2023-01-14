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
timerSpan = document.querySelector('#timer');
headSection = document.querySelector('header');

// initialize variables
var questionCount;
var timeLeft;
var timeInterval;
var score = 0;
var scores = []
var storedScores
// these functions work as the view functions, they add and remove elements necessary for their specific page
function displayQuestion() {
   // This function displays the questions using the data in the current question object

   //gets current question object and displays data based on key values
   question =  questions[questionCount]
   title.textContent = question.title
   questionSection.textContent = question.question
   // for each multiple choise option we want to create a button
   for (var i = 0; i < question.choices.length; i++) {
        choice = question.choices[i]
        buttonEl = document.createElement("button");
        buttonEl.textContent = choice
        buttonEl.setAttribute('class', 'btn-option ' + i);
        buttonEl.setAttribute('onclick','evaluateAnswer(this);') // once a button is clicked a function to check the answer will be called
        options.appendChild(buttonEl)
        
   }
}

function displayResults(){
    // this function displays the results page consisting of a confirmation of completion, the score 
    //and the option to add the score to the highscore list
    
    // set score equal to the time left
    score = timeLeft
    clearInterval(timeInterval) // stops the timer
    title.textContent = "All Done!"
    questionSection.textContent = 'your score was ' + score
    // creating input elements to allow user to add score to the highscore list
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

function displayHighscores(){
    // this function displays the high scores page
    // the page allows the user to go back to the start page and to clear the high scores
    clearChildren(options); // clears all the objects in the options section
    // depending on whether we arrive from the question section or we click the view highscore link
    // we may need to remove any exiting questions before displaying the highscores
    if (questionSection.parentNode){ // 
        headSection.removeChild(questionSection);
    }
    title.textContent = "Highscores"
    listEl = document.createElement("ol");
    listEl.setAttribute('id', 'scoresList');
    if (scores !== null) { //making sure the the list is not empty
        for (var i = 0; i < scores.length; i++) { // for each score we will create a list item with the name and the score
            listItem = document.createElement("li");
            listItem.textContent = scores[i].name + " " + scores[i].score
            listEl.appendChild(listItem);
        }
    }
    options.appendChild(listEl); //append the ordered list with the list items to the body section
    // creating the clear high scores button which will trigger the clearHighScores function when clicked
    clearHighScoresButton = document.createElement("button");
    clearHighScoresButton.textContent = "Clear High Scores";
    clearHighScoresButton.setAttribute('onclick', 'clearHighScores()')
    // creating the go back button
    GoBackButton = document.createElement("button");
    GoBackButton.textContent = "Go Back";
    //we utilize the location.reload to trigger a refresh event taking the user back to the starting location page
    GoBackButton.setAttribute('onclick', 'location.reload()') 
    options.appendChild(GoBackButton);
    options.appendChild(clearHighScoresButton);
}


// utility functions
function startQuestions(){
    // This function is triggere when the start button is clicked
    // the function will start the timer and display the first question
    questionCount = 0 //initiate question index to the index of the first question
    var storedScores = JSON.parse(localStorage.getItem("highscore")); //get all stored scores from the localStorage
    if (storedScores !== null) {
        scores = storedScores; //put the historical scores into the scores array
    }
    options.removeChild(startButton); //get rid of the start button
    timeLeft = 75; // initiate the timer to 75 seconds
    // every 1 second the timer function will be called
    // the last 1 corresponds to the increment parameter of the timer function
    // we will decrement the time by one
    timeInterval = setInterval(timer, 1000, 1) 
    displayQuestion();
}

function clearChildren(Element) {
    // utility function to clear all children of a given element
    // as the first child of a given element is removed,the index of the next child will become 0
    // this will keep running until the number of children is 0
    while (Element.childElementCount) {
        Element.removeChild(Element.children[0]);
    }
}


function evaluateAnswer(element){
    // this function gets the current question object and 
    // evaluates whether the answer matches the answer in the question object
    // the function gets the element as a parameter and looks at the text content to determine the users answer
    question =  questions[questionCount]
    revealSection = document.querySelector('#reveal')
    if (element.textContent == question.correctAnswer){
        revealSection.textContent = 'Correct Answer'
        setTimeout(clearReveal, 500); // will clear the evaluation using the clearReveal function after half a second
    } else {
        revealSection.textContent = 'Incorrect Answer'
        setTimeout(clearReveal, 500); // will clear the evaluation using the clearReveal function after half a second
        timer(10) // when an answer is wrong we call the timer function and set the decrement parameter to 10
    }
    questionCount++ // increment the counter so that when we call displayQuestion it will go to the next question
    clearChildren(options) // clear the options for the current question
    // check if we reached the end of the questions if so display the results
    // otherwise display the next question
    if (questionCount === questions.length){ 
        clearReveal()
        displayResults()
    } else {
        displayQuestion()
    }
    
}

function clearReveal(){
    // clears the evaluation "correct answer" or "incorrect answer"
    revealSection.textContent = ''
}

function timer(decrement) {
    // for a given decrement amount this function will decrease the time left and display it back
    timeLeft -= decrement;
    timerSpan.textContent ="Time: " + timeLeft;
    if(timeLeft === 0) { // if the timer runs out of time go to the results
      clearChildren(options)
      displayResults();
    }
}

function addToHighscore(){
    // this function is triggered when the user clicks on submit button on the results page
    // the function will take the input from the initials field and the users score
    // an object will be created with this information and added to the scores array
    // the highscore key in the local storage will be updated with the new scores
    input = document.querySelector('#initials')
    scores.push({name: input.value, score: score});
    localStorage.setItem('highscore', JSON.stringify(scores));
    displayHighscores()
}

function clearHighScores(){
    // this function is triggered when the user clicks on clear high scores button on the highscores page
    // the function first gets ordered list item and clears the children using our clearChildren function
    // The function will the clear the local storage of the highscores
    // finally the function set the scores array to an empty array
    listEl = document.querySelector('#scoresList');
    clearChildren(listEl);
    localStorage.removeItem('highscore');
    scores = []
}

// Event listeners
startButton.addEventListener("click", startQuestions); // when the start button is clicked the first question will be displayed