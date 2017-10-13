function renderQuiz() {
  beginQuiz();
  renderChoices();
  renderQuestionHead();
  resetQuiz();
  console.log('`renderquiz` ran');
} 


const questions = [
    {
    question : 'The family learns that Jerry is an actor in an alternate dimension because he starred in what movie?',
    choices : ['Avatar',
               'Forest Gump',
               'Cloud Atlas',
               'Planet of the Apes'],
    answer : 'Cloud Atlas'        
    },
    {
    question : 'What cereal is the Leprechaun eating before he is gutted and eaten alive by the two children in the forest?',
    choices : ['Strawberry Smiggles',
               'Golden Smackaroos',
               'Gazorpazorp Raisin Oats',
               'Not-so-Lucky Charms'],
    answer : 'Strawberry Smiggles'
    },
    {
    question: 'Who does detective Baby-Legs get partnered up with?',
    choices: ['Detective Long-Legs',
              'Rick Sanchez',
              'Regular-Legs',
              'Jan Michael Vincent'],
    answer: 'Regular-Legs'
    },
    {
    question: 'The judge refused to sign legislation allowing how many Jan Michael Vincents per precinct?',
    choices: ['2', 
              '8', 
              '4', 
              '12'],
    answer: '8'
    },
    {
    question: 'What creature rubs and then spits on the plumbus during manufacturing?',
    choices: ['Fleeb', 
              'Blamfs', 
              'Schlami', 
              'Jan Michael Vincent'],
    answer: 'Schlami'
    },
    {
    question: 'Who is the only person in the Universe that can have Eyeholes?',
    choices: ['Rick Sanchez', 'Morty', 'Eyehole-Man','Jan Michael Vincent'],
    answer: 'Eyehole-Man'
    },
    {
    question: 'What two brothers host two separate shows in the same studio at the same exact time?',
    choices: ['Phillip and Dillip',
              'Michael and Pichael',
              'Jimmy and Dimmy',
              'Jan and Dan Michael Vincent'],
    answer: 'Michael and Pichael'
    },
    {
    question: 'An odd looking woman with a mishappen head disappears and reappears in what game show?',
    choices: ['Where am I?',
              'How Did I Get Here?',
              'The Price is Wrong',
              'The Bachelorette'],
    answer: 'How Did I Get Here?'
    },
    {
    question: 'What zany character has his own show where he runs around and steals office supplies?',
    choices: ['Jan Michael Vincent',
              'Mr. Poopybutthole',
              'Mr. Stealy',
              'Noob Noob'],
    answer: 'Mr. Stealy'
    },
    {
    question: 'What restaurant promises to serve those with the smallest apetites, regardless of how big their head is?',
    choices: ['Jan Michael Vincent Grill',
              'Lil Bits',
              'WackDonalds',
              'Shoneys'],
    answer: 'Lil Bits'
    }
  ];
  
  
  let correctAnswers = 0;
  let currentQuestionIndex = 0;
  let questionsTotal = questions.length;

function checkAnswer(userInput){
  if (userInput == questions[currentQuestionIndex].answer) {
    correctAnswers++;
    renderQuestionFeedback(true);
    currentQuestionIndex++;
  }
  else if (userInput === undefined) {
    renderQuestionFeedback('unanswered');
  }
  else {
    renderQuestionFeedback(false);
    currentQuestionIndex++;
  }
  if (currentQuestionIndex == questionsTotal) {
    renderResults();
  }
  else {
    renderQuestionHead();
    renderChoices();
  }
}

$("#submit-answer-btn").click(function(e){
  e.preventDefault();
  let userInput = $('input[name="answerChoice"]:checked').val();//set userInput variable to the chosen radio button
  $('.modal').removeClass('hidden');//show modal
  checkAnswer(userInput);
  
});

//hide start button, show quiz
function beginQuiz() {
  $('#start-quiz-btn').click(function(e){
    $('.quiz-start').addClass('hidden');
    $('#my-quiz').removeClass('hidden');
  });
}

//hide reset quiz button, show quiz start button
function resetQuiz() {
  $('.quiz-restart-btn').click(function(e){
    $('#my-quiz').removeClass('hidden');
    $('.quiz-restart-btn').addClass('hidden');
    $('.js-results-text').text('');
    quizRestart();
    renderQuestionHead();
  });
}

//reset correctAnswers count to 0, and start question 1
function quizRestart() {
  currentQuestionIndex = 0;
  correctAnswers= 0;
}

//render question header
function renderQuestionHead() {
  $('#js-question-number').text('Question ' + (currentQuestionIndex+1) + ' of ' + questionsTotal + ' ');//render progress marker
  $("#js-question-text").text(questions[currentQuestionIndex].question);//render question text
}

function renderChoices(choices){
  $('#choices').empty(); //resets choices for every question
  let choicesTot = questions[currentQuestionIndex].choices.length;
  for (let i=0; i < choicesTot; i++)
  $("#choices").append(`<li><input type='radio' name='answerChoice' class='answerChoice' value='${questions[currentQuestionIndex].choices[i]}'> ${questions[currentQuestionIndex].choices[i]}</li>`);//loops through the choices, creating a radio button for each
}

//hide quiz, show results and restart quiz button
function renderResults () {
  $('#my-quiz').addClass('hidden');
  $('#results').removeClass('hidden');
  $('.js-results-text').append('<h2>' + 'You got ' + correctAnswers + ' out of ' + questionsTotal + ' right! ' + '</h2>');//remove questions and progress and show results page
}
  
  
//depending on the answer, this function will add to the h2
//in the modal-content as well as add a source to the img 
//element in the HTML

function renderQuestionFeedback(boolean) {
  let feedback = $('.modal-content');
  if (boolean === true){
    feedback.find('h2').text('RIGHT!!!!');
    feedback.find('img').attr('src', 'https://mrwgifs.com/wp-content/uploads/2016/03/I-Like-What-You-Got-Good-Job-On-Rick-and-Morty-Get-Schwifty.gif');
  } else if (boolean === false){
    feedback.find('h2').text('WRONG!!!!');
    feedback.find('img').attr('src', 'https://68.media.tumblr.com/5ebc4f38402eef780a4f0912917fbc06/tumblr_nu6tag0iTG1ucfegyo1_500.gif');
  } else if (boolean == 'unanswered'){
    feedback.find('h2').text('NOT COOL! MAKE A CHOICE!');
    feedback.find('img').attr('src', 'https://media3.giphy.com/media/26DOs997h6fgsCthu/giphy.gif');
  }
  $('.close').click(function(e) {
    $('.modal').addClass('hidden');//close the modal when clicking on the x
  });
}

 renderQuiz();

