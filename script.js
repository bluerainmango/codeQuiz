// Data to be used
var state = {
    currentQuestion: 0,
    remainingTime: questions.length * 15, // from questions.js file
    timer: 0,
    timeOut: 0,
    timePenalty: 15,
    highScores:[] // [{initials: , score: }]
}

/****************************
          FUNCTIONS
*****************************/

// Initiating func
function init(){

    // Get data from localStorage
    var fromLocal = localStorage.getItem('highScores');
        if(fromLocal){ state.highScores = JSON.parse(fromLocal); }

    // Initiate page
    document.querySelector('#intro').setAttribute('style','display:block;');
    document.querySelector('#scores').setAttribute('style','display:none;');

    // Initiate data
    state.currentQuestion = 0;
    state.remainingTime = questions.length * 15;
    state.timer = 0;
    state.timeOut = 0;
    document.querySelector('#time__num').innerText = state.remainingTime;
}
// Questions page(get one key-value set of question as a param)
function quizRender(data){

    document.querySelector('#quiz').setAttribute('style','display:block;');

// Render heading
    var question = "<h2>" + data.title + "</h2>"
        document.querySelector('.quiz__title').innerHTML= question;

// Render buttons
    // 1. Delete previous question's btns
    var choicesDOM = document.querySelector('.quiz__choices');
        deleteChild(choicesDOM); // Func deleting all children

    // 2. Create btns
    for(var i=0; i < data.choices.length; i++){

        var choice = document.createElement('button');
            choice.innerText = (i+1) + '. ' + data.choices[i];
            choice.classList.add("choiceBtn", "btn", "btn-success" ); // classes for style, bootstrap

        // Set data attr to check the correct answer later
        var answer = ( data.answer === data.choices[i] ) ? "correct" : "wrong";
            choice.setAttribute('data-answer', answer);

        choicesDOM.appendChild(choice);
    }
}
// Timer & Timeout
function timerFunc(){
    
    // Func clearing timer and timeout that previously executed and currently running
    clearTime();

    var timeDOM = document.querySelector('#time__num');
        timeDOM.innerText = state.remainingTime; 
    
    state.timer = setInterval(function(){
                    state.remainingTime --;
                    timeDOM.innerText = state.remainingTime; // countdown
                },1000)

    state.timeOut = setTimeout(function(){
                        clearInterval(state.timer);
                        result(); // func rendering result page
                    }, state.remainingTime * 1000)
}
// Result page
function result(){
    
    document.querySelector('#quiz').setAttribute('style','display:none;');
    document.querySelector('#result').setAttribute('style','display:block;');
    document.querySelector('.result__score').innerText = state.remainingTime;

    clearInterval(state.timer);
}
// Render highscores page
function renderHighScores(){

    // 1. Sort scores(high score -> low score)
    state.highScores.sort( function(a,b){return b.score - a.score} );

    // 2. Delete all remaining scores that previously printed in page
    var scoresDOM = document.querySelector('#scores__ranking');
                    deleteChild(scoresDOM);
    
    // 3. Newly render
    state.highScores.forEach( function(el,i){

        var rank = document.createElement('p')
            rank.innerText = (i+1) + ". " + el.initials + " - " + el.score;
            
            scoresDOM.appendChild(rank);
 
    });
}
// Render 'right' or 'correct' notification(get a param for a word saved as data attr in each choice DOM)
function verdict(word){

    document.querySelector('#verdict__word').innerText = word;
    document.querySelector('#verdict').setAttribute('style','opacity:1;');

    setTimeout(function(){
        document.querySelector('#verdict').setAttribute('style','opacity:0;');
    },1000);
}
// Utility - delete children
function deleteChild(DOM){
    if(DOM.children){
            Array.from( DOM.children ).forEach( function(el){ el.remove(); } );
    }
}
// Utility - clear timer and timeout
function clearTime(){
    if(state.timer > 0) { clearInterval(state.timer); }
    if(state.timeOut > 0) { clearTimeout(state.timeOut); }
}

/****************************
   BUTTONS & EVENT HANDLER
*****************************/

// Start quiz button
document.querySelector('#startBtn').addEventListener('click',function(e){
    // 1. Hide intro section
    document.querySelector('#intro').setAttribute('style', 'display: none;')
    // 2. Quiz render
    quizRender(questions[state.currentQuestion]);
    // 3. Start timer
    timerFunc();
});
// Question's each choice btn
document.querySelector('.quiz__choices').addEventListener('click',function(e){
    
    // 1. Check if answer is wrong
    if( e.target.getAttribute('data-answer') !== "correct" ){

        state.remainingTime -= state.timePenalty;
        timerFunc();
        verdict("Wrong!");
    }
    else{
        verdict("Correct!");
    }

    // 2. Move to next question
    state.currentQuestion ++;

    // 3. When there is remaining question
    if(state.currentQuestion < questions.length){
        quizRender(questions[state.currentQuestion]);
    }
    else{
        result();
        clearTimeout(state.timeOut);
    }
    
})
// Submit btn 
document.querySelector('#submitBtn').addEventListener('click', function(){

    document.querySelector('#result').setAttribute('style','display:none;');
    document.querySelector('#scores').setAttribute('style','display:block;');

    // 1. Save user's info to state data obj & localStorage
    var currentScore = {};
        currentScore.initials = document.querySelector('#initials').value;
        currentScore.score = state.remainingTime;
        
        state.highScores.push(currentScore);

        localStorage.setItem('highScores', JSON.stringify(state.highScores));

    // 2. Render highscores page
    renderHighScores()
});
// Go back & Clear Highscores btns
document.querySelector('.scores__btn').addEventListener('click',function(e){

    // 1. Go back btn
    if(e.target.matches('#gobackBtn')){
        init();
    }

    // 2. Clear Highscores btn
    else if(e.target.matches('#clearBtn')){

        // a. Delete state data obj
        state.highScores = [];
        
        // b. Clear rendered score list
        var scoresDOM = document.querySelector('#scores__ranking');
                        deleteChild(scoresDOM);
        
        // c. Clear localStorage
        localStorage.removeItem('highScores');
    }
});
// View highscores button
document.querySelector('#viewScores').addEventListener('click', function(){

    document.querySelector('#result').setAttribute('style','display:none;');
    document.querySelector('#quiz').setAttribute('style','display:none;');
    document.querySelector('#intro').setAttribute('style','display:none;');
    document.querySelector('#scores').setAttribute('style','display:block;');
    
    // Clear time when clicked while proceeding quiz
    clearTime();

    renderHighScores();
});

init();