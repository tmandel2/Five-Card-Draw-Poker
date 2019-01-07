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
		this.currentCards = []
	}
	makeBet (amount) {
		this.currentBet = this.currentBet + amount;
		this.wallet = this.wallet - amount;
		return this.currentBet
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
		$("#player1-stats").append(`<p>Wallet: ${this.player1.wallet}</br>Current Bet: ${this.player1.currentBet}</p>`);
		$("#player2-stats").append(`<p>Wallet: ${this.player2.wallet}</br>Current Bet: ${this.player2.currentBet}</p>`);
		this.whosTurn = 1;
		// $('#player1-stats').text(`Wallet: ${this.player1.wallet}`);
		// $('#player2-stats').text(`Wallet: ${this.player2.wallet}`);
	},
	checkHandValue () {

	},
	changeTurn () {
		if (this.whosTurn === 1) {
			this.whosTurn = 2;
		} else if (this.whosTurn === 2) {
			this.whosTurn = 1;
		}
	},
	makeBet () {
		let $betAmount = $('#bet-amount').val();
		$('#call').text(`Call ${Math.abs(this.player1.currentBet - this.player2.currentBet)}`);
		if (this.whosTurn === 1) {
			this.player1.makeBet($betAmount);
		} else if (this.whosTurn === 2) {
			this.player2.makeBet($betAmount);
		}
		this.pot = this.player1.currentBet + this.player2.currentBet;
		this.updateStats();
		this.changeTurn();
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

$('#bet').on('submit', (e) => {
	e.preventDefault();
	game.makeBet();
});

$('img').on('click', (e) => {
	game.holdCard(e.target);
})
