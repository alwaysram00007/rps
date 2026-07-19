let score = JSON.parse(localStorage.getItem('score')); //{wins:0,losses:0,ties:0};



function computerPickFun() {
    let randomValue = Math.random();
    let computerPick;
    
    if (randomValue < 1/3) {
        computerPick = 'rock';
    }else if (randomValue < 2/3) {
        computerPick = 'paper';
    }else {
        computerPick = 'scissors';
    };
    return computerPick;
};

const movesPara = document.querySelector('.moves-para');
const resultPara = document.querySelector('.result-para');

let result;
function rockFun() {
    let computerPick = computerPickFun();

    if (computerPick === 'rock') {
        result = 'Tie.'
    }else if (computerPick === 'paper') {
        result = 'You Lose.'
    }else {
        result = 'You Win.'
    };

    movesPara.innerHTML = `You <img src="IMAGES/rock-emoji.png" class="small-img"> <img src="IMAGES/${computerPick}-emoji.png" class="small-img"> Computer.`;
    updateScore();
    render();
};

function paperFun() {
    let computerPick = computerPickFun();

    if (computerPick === 'rock') {
        result = 'You Win.'
    }else if (computerPick === 'paper') {
        result = 'Tie.'
    }else {
        result = 'You Lose.'
    };

    movesPara.innerHTML = `You <img src="IMAGES/paper-emoji.png" class="small-img"> <img src="IMAGES/${computerPick}-emoji.png" class="small-img"> Computer.`;
    updateScore();
    render();
};

function scissorsFun() {
    let computerPick = computerPickFun();

    if (computerPick === 'rock') {
        result = 'You Lose.'
    }else if (computerPick === 'paper') {
        result = 'You Win.'
    }else {
        result = 'Tie.'
    };

    movesPara.innerHTML = `You <img src="IMAGES/scissors-emoji.png" class="small-img"> <img src="IMAGES/${computerPick}-emoji.png" class="small-img"> Computer.`;
    updateScore();
    render();
};

function render() {
    resultPara.innerHTML = result;
    document.querySelector('.score-para').innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
};

function updateScore() {
    if (result === 'You Win.') {
        score.wins +=1;
    }else if (result === 'You Lose.') {
        score.losses +=1;
    }else {
        score.ties +=1;
    };

    localStorage.setItem('score',JSON.stringify(score));
};

function resetScoreFun() {
    score = {wins:0,losses:0,ties:0};

    render();
    resultPara.innerHTML = '';
    movesPara.innerHTML = '';
};

function autoPlayFun() {
    let playerPick = computerPickFun();

    if (playerPick === 'rock') {
        rockFun();
    }else if (playerPick === 'paper') {
        paperFun();
    }else {
        scissorsFun();
    };
};

let autoPlaying;
let intervalId;

let autoPlayBtn = document.querySelector('.js-autoPlay-btn');

function autoPlay() {
    if (!autoPlaying) {
        intervalId = setInterval(autoPlayFun,1000);  // OR setInterval(() => {autoPlayFun()},1000); 
        autoPlayBtn.innerHTML = 'Stop Playing';
        autoPlaying = true;                
    }else {
        clearInterval(intervalId);
        autoPlayBtn.innerHTML = 'Auto Play';
        autoPlaying = false;
    };
};

autoPlayBtn.addEventListener('click',autoPlay);



const reserPara = document.querySelector('.js-reset-para');
function resetScore() {
    reserPara.innerHTML = `<p class="reset-para">Are you sure you want to reset the score?
     <button title="Press Enter" class="yes-btn">Yes</button> <button title="Press N" class="no-btn">No</button></p>`;
     
    document.querySelector('.yes-btn').addEventListener('click',() => {
        resetScoreFun();
        reserPara.innerHTML = '';
    });
    
    document.querySelector('.no-btn').addEventListener('click', () => {
        reserPara.innerHTML = '';
    });
};

document.querySelector('.js-reset-btn').addEventListener('click',resetScore);
document.querySelector('.js-rock-btn').addEventListener('click',rockFun);
document.querySelector('.js-paper-btn').addEventListener('click',paperFun);
document.querySelector('.js-scissors-btn').addEventListener('click',scissorsFun);

document.body.addEventListener('keydown', event => {
    if (event.key === 'r') {
        rockFun();
        //console.log(event.key)
    }else if (event.key === 'p') {
        paperFun();
        //console.log(event.key)
    }else if (event.key === 's') {
        scissorsFun();
    }else if (event.key === 'a') {
        autoPlay();
    }else if (event.key === 'Backspace') {
        resetScore();
    }else if (event.key === 'Enter') {
        resetScoreFun();
        reserPara.innerHTML = '';
    }else if (event.key === 'n') {
        reserPara.innerHTML = '';
    }
});



