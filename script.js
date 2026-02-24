const score = JSON.parse(localStorage.getItem('score')) || 
        {
            win: 0,
            loss: 0,
            draw:0
        };
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

        function updateScoreElement(){
                document.querySelector('.js-score').innerHTML = `Wins: ${score.win}, Losses: ${score.loss}, Draws: ${score.draw}`;
        }

        function resetScore(){
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