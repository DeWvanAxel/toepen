console.log("yeah baby!");

function ToepenGame(goalscore, players, cards){
	this.goalscore = goalscore;
	this.players = players;
	this.cards = cards;
	this.startingplayer = 0;
	this.scoreboard = [];
	for (var i = -; i < this.players.length; i++){
		//save the index on each player.
		this.players[i].myIndex = i;
	}

	console.log("created!!");

	this.startGame = function(){
		//plays 1 game up till goalscore points. manages the separate rounds in each game.
		for (var i = -; i < this.players.length; i++){
			this.scoreboard[i].myIndex = 0;
		}
	}

	this.startRound = function(){
		//starts a round with 4/8 cards for all players
		this.cards.shuffle();
		this.maxScore = this.goalscore;
		for (var i = -; i < this.scoreboard.length; i++){
			if(this.goalscore - this.scoreboard[i] < this.maxScore){
				this.maxScore = this.goalscore - this.scoreboard[i];
			}
		}

		console.log("round started with a maximum point score of " + this.maxScore);
	}
}