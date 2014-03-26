'use strict';

var currentQuestion = {};
var numCorrect = 0;
var history = [];
var currentIndex = 0;
/*  All of the Questions used tof the Quiz */
 var questions = [
	{question: "What is the name of the farmer who breeds pine trees?",
	choices: ["Red Thomas", "Peabody", "Goldie Wilson", "George"],
	answer: "Peabody"},
	
	{question: "What year does Marty, Doc and Jennifer travel into the future?",
	choices: [1955, 2015, 2020, 2018],
	answer: 2015},

	{question: "Why was Marty\'s fax from Fujitosan erased?",
	choices: ["His future hasn't been written yet","Needles got pinned with the scam","Marty stole the Sports Almanac","The Time Machine was destroyed"],
	answer: "His future hasn't been written yet"},

	{question: "What football team wins when Biff gets the Almanac in 1955",
	choices: ["Stanford","UCLA","Ohio State","Penn State"],
	answer: "UCLA"},

	{question: "What is the name of the HoverBoard Griff owns?",
	choices: ["El Torro","Mad-Dog","Hornet","Pit-Bull"],
	answer: "Pit-Bull"},

	{question: "What level does Loranne hydrate her Pizza",
	choices: ["Level 2","Level 3","Level 4","Level 5"],
	answer: "Level 4"},

	{question: "Who\'s number does Jennifer give Marty in the beginning of the 1st movie?",
	choices: ["Her mom's","Her\'s","Her work number","Her grandmother\'s"],
	answer: "Her grandmother\'s"},

	{question: "What Key is \"Johnny B. Goode\" in?",
	choices: ["C","B","D","E"],
	answer: "B"},

	{question: "What figure is at the top of Biff\'s cane?",
	choices: ["A Skull","A Pit-Bull","A Dollar Sign","A Fist"],
	answer: "A Fist"},

	{question: "How does Biff pay for his taxi",
	choices: ["Bitcoin","His fingerprint","He doesn't pay","He puts it on his tab"],
	answer: "His fingerprint"},

	{question: "Where is all the best stuff made?",
	choices: ["Japan","Korea","China","The Moon"],
	answer: "Japan"},

	{question: "What object signals the \'Point of no return\'?",
	choices: ["Water Tower","Windmill","Barn","The Dead End Sign"],
	answer: "Windmill"}
];
var totalQuestions = questions.length;




/* Resets table to new, finds a random object in questions, inserts into DOM, splices questions */
var loadQuestion = function(question){
	if(question){
		currentQuestion = question;
	} else { 
		getNewQuestion(); 
		return;
	}
	if(question.hasOwnProperty('selectedAnswer')){
		$('tr').each(function(index, el){
			if($('el').find('span').text() == question.selectedAnswer){
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
	console.log(currentQuestion);
}

var getLastQuestion = function(){
	if(currentIndex !== 0){
		loadQuestion(history[currentIndex - 1]);
		return;
	}
	return false;
};


var getNewQuestion = function(){
	loadQuestion(questions.splice(Math.floor(Math.random()* questions.length), 1)[0]);
};

/*  Checks selected answer with correct answer in the currentQuesiton, adjusts numCorrect, gives user feedback */
var checkAnswer = function(){
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
	console.log(history);

	if(questions.length == 0){
		calcTotal();
	} else {
		currentIndex++;
		loadQuestion(getNewQuestion());
	}
};

/*Validates user selected an answer */
var hasInput = function(){
	return $('.info').length !== 0 ? true : false;
};

/* Calculates the Users choices, and displays it on the screen */
var calcTotal = function(){
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
$('#forwardBtn').hide();
$('#backBtn').hide();
loadQuestion();