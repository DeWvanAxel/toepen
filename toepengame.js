
function ToepenGame(){



	this.startGame = function(goalscore, players, cards){
		//starts a new game for players towards a certain goalscore.
		this.goalscore = goalscore;
		this.players = players;
		this.cards = cards;
		this.startingplayer = Math.floor(Math.random()*this.players.length); //randomly determines the first player 
		this.scoreboard = [];
		this.orderofthings = [];

		for (var i = 0; i < this.players.length; i++){
			//save the index on each player.
			this.players[i].myIndex = i;
			//all players start the game with 0 points
			this.scoreboard[i] = 0;
		}

		// start round
		this.startRound(this.startingplayer);
		//game has started.

	}

	this.startRound = function(turnPlayer){
		//starts a round with 4/8 cards for all players

		// geef iedereen 4 of 8 kaarten
		this.deck = new cards.Deck(); 
		this.deck.addCards(this.cards.all);
		

		this.deck = shuffle1(this.deck);







		
		this.lastToep = -1; //at the start of the game, no one has toeped yet.
		this.turnPlayer = turnPlayer;
		this.totalTricks = player.length == 2 ? 8 : 4; //a round has 4 or 8 tricks/cards, depending on the number of players.
		this.trickStarter = this.turnPlayer;
		this.trickStarterWent = false;

		this.players4images = [];
		
		//figure out how often someone can toep in this game.
		this.maxScore = this.goalscore;
		for (var i = 0; i < this.scoreboard.length; i++){
			if(this.goalscore - this.scoreboard[i] < this.maxScore){
				this.maxScore = this.goalscore - this.scoreboard[i];
			}
		}

		this.orderofthings = ["ask4images"];
		for (var i = 0 ; i < this.totalTricks; i++){
			this.orderofthings.push("turn");
		}
		this.orderofthings.push("endround");

		//start the round
		this.whatsnext();
		

	}



	this.whatsnext = function(){
		//this function can handle what is the next this that needs to happen. updates the orderofthings and turnPlayer accordingly.
		if(this.turnPlayer == this.trickStarter && this.trickStarterWent){
			//apparently we have finished this action. everyone has had their chance
			if(this.orderofthings[0] == "ask4images"){
				//we have asked everyone if they wanted to change their cards.
				this.orderofthings = ["check4images"].concat( this.orderofthings.slice(1) );
			}
			if(this.orderofthings[0] == "check4images"){
				//someone has traded cards and everyone has decided if they want to see it or not.
				if(this.players4images.length > 0){
					
				}
			}
			if(this.orderofthings[0] == "turn"){
				//determine who won this trick and make him the starting player.
				
				this.orderofthings = this.orderofthings.slice(1);
			}


			this.trickStarterWent = false;
			//move on to the next thing.
			
			return this.whatsnext();
		} else{
			if (this.orderofthings[0] == "ask4images"){
				this.ask4imageslist[this.turnPlayer] = this.players[this.turnPlayer].ask4images();
				if(this.players[this.turnPlayer] == "ai"){
					this.whatsnext();
				}
			}

		}
	}
}

	function shuffle1(deck) {
        //Fisher yates shuffle
        //console.log(deck[0], deck[1],deck[2], deck[3],deck[4], deck[5]);
		var deck2 = new cards.Deck();

        var i = deck.length;
        if (i == 0) return;
        while (--i) {
            var j = Math.floor(Math.random() * (i + 1));
            deck2.addCards([deck[j]]);
        }
        //console.log(deck[0]);
        deck2.addCards([deck[0]]);
        //console.log(deck2[0], deck2[1],deck2[2], deck2[3],deck2[4], deck2[5]);
        return deck2;
    }
