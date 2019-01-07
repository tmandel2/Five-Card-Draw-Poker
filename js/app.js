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
		this.currentBet = 0
	}
}


// Game Object


const game= {
	cardsInPlay: [],
	remainingDeck: [],
	pot: 0,
	player1: null,
	player2: null,
	startGame () {
		this.player1 = new player($('#player1-name-input').val());
		this.player2 = new player($('#player2-name-input').val());
		$('#player-inputs').remove();
	},
	checkHandValue () {

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
