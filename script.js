// start btn event
// intro display none
// show quiz 1 arr[0]
// time countdown 75 func

// data
// quiz 5 array []
// each quiz: {title, choices, answer}

// quiz render
// title
// btn - choicese
// btn event, delegation
// btn check if last question, show all done page
// verdit 

var state = {
    currentQuestion: 0,
    remainingTime: questions.length * 15,
    timer: 0,
    timeOut: 0,
    timePenalty: 15,
    highScores:[] // [{initials: , score: }]
}

// Questions page
function quizRender(data){

    document.querySelector('#quiz').setAttribute('style','display:block;');

// Heading
    var question = "<h2>" + data.title + "</h2>"
        document.querySelector('.quiz__title').innerHTML= question;

// Button
// 1. Delete previous question's btns
    var choicesDOM = document.querySelector('.quiz__choices');
    deleteChild(choicesDOM);

// 2. Create btns
    for(var i=0; i < data.choices.length; i++){

        var choice = document.createElement('button');
            choice.innerText = (i+1) + '. ' + data.choices[i];
            choice.classList.add("choiceBtn");

        var answer = ( data.answer === data.choices[i] ) ? "correct" : "wrong";
            choice.setAttribute('data-answer', answer);
        
        choicesDOM.appendChild(choice);
    }
}
// Timer & Timeout
function timerFunc(){
    
    clearTime();

    var timeDOM = document.querySelector('#time__num');
        timeDOM.innerText = state.remainingTime;
    
    state.timer = setInterval(function(){
                    state.remainingTime --;
                    timeDOM.innerText = state.remainingTime;
                },1000)

    state.timeOut = setTimeout(function(){
                        console.log("time ended");
                        clearInterval(state.timer);
                        result()
                    },state.remainingTime * 1000)
}
// Result page
function result(){
    document.querySelector('#quiz').setAttribute('style','display:none;');
    document.querySelector('#result').setAttribute('style','display:block;');
    document.querySelector('.result__score').innerText = state.remainingTime;
    clearInterval(state.timer);
}
// Initiating func
function init(){

    var fromLocal = localStorage.getItem('highScores');
        
    if(fromLocal){ state.highScores = JSON.parse(fromLocal); }

    document.querySelector('#intro').setAttribute('style','display:block;');
    document.querySelector('#scores').setAttribute('style','display:none;');
    state.currentQuestion = 0;
    state.remainingTime = questions.length * 15;
    state.timer = 0;
    state.timeOut = 0;
    document.querySelector('#time__num').innerText = state.remainingTime;
}
// Utility - delete child
function deleteChild(DOM){
    if(DOM.children){
            Array.from(DOM.children).forEach(function(el){
                el.remove();
            })
        }
}
function renderHighScores(){
    // Print out
    // 1. Sorting(high score -> low score)
    state.highScores.sort( function(a,b){return b.score - a.score} );

    var scoresDOM = document.querySelector('#scores__ranking');
                    deleteChild(scoresDOM);
    
    // 2. Rendering
    state.highScores.forEach(function(el,i){
        var rank = document.createElement('p')
            rank.innerText = (i+1) + ". " + el.initials + " - " + el.score;
            scoresDOM.appendChild(rank);
            // console.log(rank)
    });
}
function clearTime(){
    if(state.timer > 0) { clearInterval(state.timer); }
    if(state.timeOut > 0) { clearTimeout(state.timeOut); }
}

// Start quiz button
document.querySelector('#startBtn').addEventListener('click',function(e){
    // Hide intro
    document.querySelector('#intro').setAttribute('style', 'display: none;')
    // Quiz render
    quizRender(questions[state.currentQuestion]);
    // Start timer
    timerFunc();
});
// Each choice btn
document.querySelector('.quiz__choices').addEventListener('click',function(e){
    
    // Check if answer is wrong
    if( e.target.getAttribute('data-answer') !== "correct" ){
        // console.log("wrong answer");
        state.remainingTime -= state.timePenalty;
        timerFunc();
    }
    // Move to next question
    state.currentQuestion ++;

    // When there is remaining question
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

    // Data save
    var currentScore = {};
        currentScore.initials = document.querySelector('#initials').value;
        currentScore.score = state.remainingTime;
        
        state.highScores.push(currentScore);
        // console.log(state.highScores);

        localStorage.setItem('highScores', JSON.stringify(state.highScores));

        renderHighScores()
});
// Go back & Clear Highscores btns
document.querySelector('.scores__btn').addEventListener('click',function(e){

    // Go back btn
    if(e.target.matches('.gobackBtn')){
        // console.log('back btn pressed')
        init();
    }
    // Clear Highscores btn
    else if(e.target.matches('.clearBtn')){
        // console.log('clear btn pressed')
        state.highScores = [];
        
        var scoresDOM = document.querySelector('#scores__ranking');
                        deleteChild(scoresDOM);

        localStorage.removeItem('highScores');
    }
});
// View highscores button
document.querySelector('#score').addEventListener('click', function(){

    document.querySelector('#result').setAttribute('style','display:none;');
    document.querySelector('#quiz').setAttribute('style','display:none;');
    document.querySelector('#intro').setAttribute('style','display:none;');
    document.querySelector('#scores').setAttribute('style','display:block;');
    
    clearTime();
});

init();