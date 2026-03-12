const score = JSON.parse(localStorage.getItem('score')) || 
{
    win: 0,
    loss: 0,
    draw:0
};

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playRound(0);
    });
document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playRound(1);
    });
document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playRound(2);
    });

document.body.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if(key === 'r'){
        playRound(0);
    } else if(key === 'p'){
        playRound(1);
    } else if(key === 's'){
        playRound(2);
    } else if(key === 'a'){
        autoPlay();
    } else if(key === 'x'){
        resetScore();
    }
});

function playRound (num)
{
    const choice = ['rock', 'paper', 'scissors'];
    const userChoice = num;
    const player = choice[userChoice];
    const max = 2;
    const min = 0;
    const computerChoice = Math.floor(Math.random() *(max-min+1))+min;
    const cpu = choice[computerChoice];

    let result = '';        
            
    if(player == 'rock' && cpu == 'paper'){
        result = 'You lose';
    }
    else if(player == 'rock' && cpu == 'scissors'){
        result = 'You win';
    }
    else if (player == 'paper' && cpu == 'rock'){
        result = 'You win'
    }
    else if (player == 'paper' && cpu == 'scissors'){
        result = 'You lose'
    }
    else if (player == 'scissors' && cpu == 'rock'){
        result = 'You lose';
    }
    else if (player == 'scissors' && cpu == 'paper'){
        result = 'You win'
    }
    else{
        result = 'Draw';
    }
        
    if(result === 'You lose'){
        score.loss++
    }
    else if(result === 'You win'){
        score.win++;
    }
    else{
    score.draw++;
    }
            
    updateResult(result);
    updateMoves(player, cpu);
    updateScoreElement();

    localStorage.setItem('score',JSON.stringify(score));
}
    
function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.win}, Losses: ${score.loss}, Draws: ${score.draw}`;
}

document.querySelector('.js-reset-button')
    .addEventListener('click', () =>{
        resetScore();        
    });

function resetScore() {
    score.win=0;
    score.loss=0;
    score.draw=0;
    document.querySelector('.js-score').innerHTML = `Wins: ${score.win}, Losses: ${score.loss}, Draws: ${score.draw}`;
    localStorage.removeItem('score');
}

function updateResult(result){
    document.querySelector('.js-result').innerHTML = `${result}`;
}

function updateMoves(player, cpu){
    document.querySelector('.js-moves').innerHTML = `You chose: <img src="images/${player}-emoji.png" class="move-icon">  Computer chose: <img src="images/${cpu}-emoji.png" class="move-icon">`;
}

let isAutoPlaying = false;
let autoPlayIntervalId;

document.querySelector('.js-autoplay-button')
    .addEventListener('click', () => {
        autoPlay();
    })
function autoPlay(){
    const button = document.querySelector('.js-autoplay-button');

    if(!isAutoPlaying){
        isAutoPlaying = true;

        button.classList.remove('inactive');
        button.classList.add('active');

        autoPlayIntervalId = setInterval(() => {
        const randomMove = Math.floor(Math.random() * 3);
        playRound(randomMove);
        }, 1000);   
    }   else{
            isAutoPlaying = false;

                button.classList.remove('active');
                button.classList.add('inactive');

                clearInterval(autoPlayIntervalId);
            }
}