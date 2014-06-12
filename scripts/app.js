'use strict';


/* Todo: Need to refactor da code, 
	cache jQuery objects
	Turn Function expressions into functions
	Objectify the Quiz, sexy.
	reduce number of variables
Prevent errors if JSON isn't loaded/fails,
MVC organize everything, probably with Backbone
Maybe throw in a graph of the results at the end
Create a whole new tool to create quiz questions */

var currentQuestion = {};
var numCorrect = 0;
var history = [];
var currentIndex = 0;
var quiz = {};


var questions, totalQuestions;



/* Loads a question into view, customizes elements around question 
 * @params: Question Object 
 */
function loadQuestion(question){
	if(question){
		currentQuestion = question;
	} else { 
		currentQuestion = questions.splice(Math.floor(Math.random()* questions.length), 1)[0];
	}
	if(currentQuestion.hasOwnProperty('selectedAnswer')){
		$('tr').each(function(index, el){
			if($('el').find('span').text() == currentQuestion.selectedAnswer){
				$('el').addClass('info');
			}
		});
	}

	if (history.length > 0) {$('#backBtn').fadeIn();};
	$('tr').removeClass('info');
	$('button').removeClass('btn-success btn-danger');

	$('#question').html(currentQuestion.question);
	for(var i = 0; i < currentQuestion.choices.length; i++){
		$('#'+ (i+1)).html(currentQuestion.choices[i]);
	}
}

// Gets quesiton before the current one
function getLastQuestion(){
	if(currentIndex !== 0){
		loadQuestion(history[currentIndex - 1]);
		return;
	}
	return false;
}

/*  Checks selected answer with correct answer in the currentQuesiton, adjusts numCorrect, gives user feedback */
function checkAnswer(){
	if (!hasInput()){
		$('#nextBtn').addClass('btn-danger');
		setTimeout(function(){$('#nextBtn').removeClass('btn-danger')},500);
		return;
	}
	var selectedChoice = $('.info').find('span').text();
	if (selectedChoice == currentQuestion.answer) {
		console.log("Answer was correct");
		numCorrect++;
	} else {
		console.log("Answer was incorrect");
	}
	currentQuestion.selectedAnswer = $('.info').find('span').text();
	history.push(currentQuestion);

	if(questions.length == 0){
		calcTotal();
	} else {
		currentIndex++;
		loadQuestion(questions.splice(Math.floor(Math.random()* questions.length), 1)[0]);
	}
}

/*Validates user selected an answer */
function hasInput(){
	return $('.info').length !== 0 ? true : false;
};

/* Calculates the Users choices, and displays it on the screen */
function calcTotal(){
	var percentage = Math.round(numCorrect / totalQuestions * 100);
	$('button').remove();
	$('div').html("<h2>You answered " + numCorrect + " question(s) out of " + totalQuestions + " correctly. For a total percentage of " + percentage + "%</h2>");
};

/* Event Listeners */
$('tr').on('click', function(){
	$('tr').removeClass('info');
	$(this).addClass('info');
	$('#nextBtn').addClass('btn-success');
});
$('#nextBtn').on('click', checkAnswer);
$('#backBtn').on('click', getLastQuestion);


/* Main */
function init(){
	$('#forwardBtn').hide();
	$('#backBtn').hide();
	$.getJSON("scripts/quiz.json", function(data){
		quiz = data;
		questions = quiz.questions;
		totalQuestions = quiz.questions.length;
		loadQuestion();
	});
}

init();