// Need a player class

// Two players, give their name
// They will have a wallet, containing all of their money
// They will be able to bet a current amount
// They will draw cards
// They will fold
// They will call or increase bet
// They will have cards in their hands

class player {
	constructor (playerName) {
		this.name = playerName,
		this.wallet = 1500,
		this.currentBet = 0,
		this.currentCards = [],
		this.currentHandValue = 0,
		this.usedCardsForHand = []
	}
	makeBet (amount) {
		this.currentBet = amount;
		this.wallet = this.wallet - amount;
		return this.currentBet
	}
	handEnd () {
		this.currentBet = 0;
	}
	winHand (amount) {
		this.wallet = this.wallet + amount;
	}
	handValue () {
		// ASSIGN A VALUE OF 8 for straight flush, 7 for 4 of a kind, 6 full house, 5 flush, 4 straight, 3 three of a kind, 2 two pair, 1 pair, 0 high card.
		// Need to capture card value of cards used, and return high to low.
		// Then need to return high to low of rest of cards

		// Straight flush: check flush, if flush, check for straight
		// full house: check 3 of a kind, then check pair
	}
}


// Game Object


const game= {
	cardsInPlay: [],
	remainingDeck: [],
	pot: 0,
	player1: null,
	player2: null,
	whosTurn: null,
	bettingRound: true,
	drawingRound: false,
	handNumber: 0,
	startGame () {
		this.player1 = new player($('#player1-name-input').val());
		this.player2 = new player($('#player2-name-input').val());
		$('#player-inputs').remove();
		$('#player-stats').css("visibility", "visible");
		$('#player-names').css("visibility", "visible");
		$("#button-bar").css("visibility", "visible");
		$('#hold-row').css("visibility", "visible");
		$('#card-location').css("visibility", "visible");
		$('#player1').text(`${this.player1.name}`);
		$('#player2').text(`${this.player2.name}`);
		$('#player1').css('color', 'red');
		$("#player1-stats").append(`<p>Wallet: ${this.player1.wallet}</br>Current Bet: ${this.player1.currentBet}</p>`);
		$("#player2-stats").append(`<p>Wallet: ${this.player2.wallet}</br>Current Bet: ${this.player2.currentBet}</p>`);
		this.whosTurn = 1;
	},
	checkHandValue () {
// COMPARE THE VALUE OF THE PLAYERS' HANDS
// If the values are the same, need to see which of highest used card
// 
	},
	dealCards () {
// NEEDS TO GIVE CARDS TO THE PLAYER
	},
	changeTurn () {
		if (this.whosTurn === 1) {
			this.whosTurn = 2;
			$('#player1').css('color', 'white');
			$('#player2').css('color', 'red');
		} else if (this.whosTurn === 2) {
			this.whosTurn = 1;
			$('#player2').css('color', 'white');
			$('#player1').css('color', 'red');
		}
	},
	makeBet () {
		let $betAmount = parseInt($('#bet-amount').val(), 10);
		if (this.whosTurn === 1) {
			this.player1.makeBet(this.player2.currentBet + $betAmount);
		} else if (this.whosTurn === 2) {
			this.player2.makeBet(this.player1.currentBet + $betAmount);
		}
		if (this.player1.currentBet - this.player2.currentBet > 0) {
			$('#call').text(`Call ${this.player1.currentBet - this.player2.currentBet}`);
		} else if (this.player1.currentBet - this.player2.currentBet < 0) {
			$('#call').text(`Call ${this.player2.currentBet - this.player1.currentBet}`);
		} else if (this.player1.currentBet - this.player2.currentBet === 0) {
			$('#call').text(`Check`);
		}
		this.pot = this.player1.currentBet + this.player2.currentBet;
		this.updateStats();
		this.changeTurn();
	},
	callOrDraw () {
		if ($('#call').text() === 'Draw') {
			console.log('draw');
			this.drawCards();
		} else {
			this.makeCall();
		}
	},
	makeCall () {
		if (this.player1.currentBet > this.player2.currentBet) {
			let $currentBet = this.player1.currentBet - this.player2.currentBet;
			this.player2.makeBet($currentBet + this.player2.currentBet);
		} else if (this.player1.currentBet < this.player2.currentBet) {
			let $currentBet = this.player2.currentBet - this.player1.currentBet;
			this.player1.makeBet($currentBet + this.player1.currentBet);
		} else if (this.player1.currentBet === this.player2.currentBet) {
			// NEED TO CHANGE TO THE HOLD CARD PHASE
		}
		this.pot = this.player1.currentBet + this.player2.currentBet;
		this.updateStats();
		this.changeTurn();
		this.becomeDrawRound();
	},
	makeFold () {
		if (this.whosTurn === 1) {
			this.player2.winHand(this.pot);
			this.pot = 0;
			this.player2.handEnd();
			this.player1.handEnd();
		} else {
			this.player1.winHand(this.pot);
			this.pot = 0;
			this.player2.handEnd();
			this.player1.handEnd();
		}
		this.updateStats();
	},
	allIn () {
		if (this.whosTurn === 1) {
			this.player1.makeBet(this.player1.wallet);
			$('#call').text(`Call ${this.player1.currentBet - this.player2.currentBet}`);
		} else {
			this.player2.makeBet(this.player2.wallet);
			$('#call').text(`Call ${this.player2.currentBet - this.player1.currentBet}`);
		}
		this.pot = this.player1.currentBet + this.player2.currentBet;
		this.updateStats();
		this.changeTurn();
	},
	becomeDrawRound () {
		$('.actions').css('visibility', 'hidden');
		$('#call').css('visibility', 'visible');
		$('#call').text('Draw');
		this.bettingRound = false;
		this.drawingRound = true;
	},
	drawCards () {

	},
	updateStats () {
		$('#player1-stats p').html(`<p>Wallet: ${this.player1.wallet}</br>Current Bet: ${this.player1.currentBet}</p>`);
		$('#player2-stats p').html(`<p>Wallet: ${this.player2.wallet}</br>Current Bet: ${this.player2.currentBet}</p>`);
	},
	holdCard (card) {
		const $cardClass = `.${$(card).attr('class')}`;
		if($($cardClass).css('color') != 'rgb(255, 0, 0)') {
			$($cardClass).css('color', 'red');
		} else if ($($cardClass).css('color') == 'rgb(255, 0, 0)') {
			$($cardClass).css('color', 'lightgray');
		}
	}
}

// Contains the current cards in play
// Contain the remaining cards
// Contains the pot
// Has the method for checking the value of a hand:
// Straight Flush
// 4 of a kind
// full house
// Flush
// Straight
// three of a kind
// 2 pair
// pair
// high card















// Listeners:
// need to listen for buttons of betting, drawing, folding
// need to listen for name
$('.name-input').on('keypress', (e) => {
	if(e.which === 13) {
		e.preventDefault();
	}
});

$('#player-inputs').on('submit', (e) => {
	e.preventDefault();
	game.startGame();
});

$('#bet-amount').on('keypress', (e) => {
	if(e.which === 13) {
		e.preventDefault();
		game.makeBet();
	}
});

$('#bet-submit').on('click', (e) => {
	e.preventDefault();
	game.makeBet();
});

$('#call').on('click', (e) => {
	e.preventDefault();
	game.callOrDraw();
});

$('#fold').on('click', (e) => {
	e.preventDefault();
	game.makeFold();
});

$('#all-in').on('click', (e) => {
	e.preventDefault();
	game.allIn();
})

$('img').on('click', (e) => {
	game.holdCard(e.target);
});
