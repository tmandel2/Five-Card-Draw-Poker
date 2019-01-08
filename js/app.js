// Need a player class

// Two players, give their name
// They will have a wallet, containing all of their money
// They will be able to bet a current amount
// They will draw cards
// They will fold
// They will call or increase bet
// They will have cards in their hands

class Player {
	constructor (playerName, playerNumber) {
		this.name = playerName,
		this.number = playerNumber,
		this.wallet = 1500,
		this.currentBet = 0,
		this.currentCards = [],
		this.currentHandValue = [], //Will return a hand value in the form of something like [main hand, high card of used, high card of unused] Need to figure out how to do value of trips vs pair for full houses
		this.usedCardsForHand = [],
		this.hasDrawn = false,
		this.hasChecked = false,
		this.sortedCardValues = [],
		this.cardSuits = []
	}
	makeBet (amount) {
		if (amount <= this.wallet && amount > 0) {
			this.currentBet = amount;
			return this.currentBet
		} else {
			return false;
		}
	}
	handEnd () {
		this.currentBet = 0;
		this.currentCards = [];
	}
	winHand (amount) {
		this.wallet = this.wallet + amount;
	}
	loseHand (amount) {
		this.wallet = this.wallet - amount;
	}
	compareValues (num1, num2) {
		return num1 - num2;
	}
	handValue () {
		this.sortedCardValues = [];
		this.cardSuits = [];
		let cardAltValues = [];
		for (let i = 0; i <= this.currentCards.length - 1; i++) {
			// LOTS of nested for loops. Need to run through the 
			this.sortedCardValues[i] = this.currentCards[i].value;
			this.cardSuits[i] = this.currentCards[i].suit;
			cardAltValues[i] = this.currentCards[i].altValue;
		};
		this.sortedCardValues.sort(this.compareValues);
		cardAltValues.sort(this.compareValues);
		if (this.checkStraightFlush(this.sortedCardValues, cardAltValues, this.cardSuits)) {
			console.log('Straight Flush');
			return 8;
		} else if (this.checkFourOfAKind(this.sortedCardValues)) {
			console.log('Four of a Kind');
			return 7;
		} else if (this.checkFullHouse(this.sortedCardValues)) {
			console.log('Full House');
			return 6;
		} else if (this.checkFlush(this.cardSuits)) {
			console.log('Flush');
			return 5;
		} else if (this.checkStraight(this.sortedCardValues) || this.checkStraight(cardAltValues)) {
			console.log('Straight');
			return 4;
		} else if (this.checkThreeOfAKind(this.sortedCardValues)) {
			console.log('Three of a kind');
			return 3;
		} else if (this.checkTwoPair(this.sortedCardValues)) {
			console.log('Two Pair');
			return 2;
		} else if (this.checkPair(this.sortedCardValues)) {
			console.log('Pair');
			return 1;
		} else {
			console.log('Nothing');
			return 0;
		}
		// Need to capture card value of cards used, and return high to low.
		// Then need to return high to low of rest of cards
	}
	checkFlush (suitArray) {
		let suitCheck = 0;
		for (let i = 1; i <= suitArray.length - 1; i++) {
			if (suitArray[0] === suitArray[i]) {
				suitCheck++;
			}
		}
		if (suitCheck === suitArray.length - 1) {
			return true;
		} else {
			return false;
		}
	}
	checkStraight (cardValueArray) {
		let straightCheck = 0;
		for (let i = 0; i <= cardValueArray.length - 2; i++) {
			if (cardValueArray[i] === cardValueArray[i + 1] - 1) {
				straightCheck++;
			}
		}
		if (straightCheck === cardValueArray.length - 1) {
			return true;
		} else {
			return false;
		}
	}
	checkStraightFlush (cardValueArray, cardAltValueArray, suitArray) {
		if (this.checkFlush(suitArray) && this.checkStraight(cardValueArray)) {
			return true;
		} else if (this.checkFlush(suitArray) && this.checkStraight(cardAltValueArray)) {
			return true;
		} else {
			return false;
		}
	}
	checkFullHouse (cardValueArray) {
		let checkingArray = [];
		let isThereOne = false;
		for (let i = 0; i <= cardValueArray.length - 1; i++) {
			checkingArray.push(cardValueArray[i]);
		}
		for (let i = 2; i <= checkingArray.length - 1; i++) {
			if (checkingArray[i] === checkingArray[i - 1] && checkingArray[i] === checkingArray[i - 2]) {
				checkingArray.splice(i - 2, 3);
			}
		}
		if (checkingArray.length === 2 && checkingArray[0] === checkingArray[1]) {
			isThereOne = true;
		}
		return isThereOne;
	}
	checkFourOfAKind (cardValueArray) {
		let isThereOne = false;
		for (let i = 3; i <= cardValueArray.length - 1; i++) {
			if (cardValueArray[i] === cardValueArray[i - 1] && cardValueArray[i] === cardValueArray[i - 2] && cardValueArray[i] === cardValueArray[i - 3]) {
				isThereOne = true;
			}
		}
		return isThereOne;
	}
	checkThreeOfAKind (cardValueArray) {
		let isThereOne = false;
		for (let i = 2; i <= cardValueArray.length - 1; i++) {
			if (cardValueArray[i] === cardValueArray[i - 1] && cardValueArray[i] === cardValueArray[i - 2]) {
				isThereOne = true;
			}
		}
		return isThereOne;
	}
	checkTwoPair (cardValueArray) {
		let pairCheck = 0;
		for (let i = 1; i <= cardValueArray.length - 1; i++) {
			if (cardValueArray[i] === cardValueArray[i - 1]) {
				pairCheck++;
			}
		}
		if (pairCheck === 2) {
			return true;
		} else {
			return false;
		}
	}
	checkPair (cardValueArray) {
		let pairCheck = false;
		for (let i = 1; i <= cardValueArray.length - 1; i++) {
			if (cardValueArray[i] === cardValueArray[i - 1]) {
				pairCheck = true;
			}
		}
		return pairCheck;
	}
	ifTie (handValue) {
		if (handValue === 8) {
			// need to compare the corresponding values of the specific places in the sortedCardValue
		}
	}
}


// Game Object


const game = {
	cardsInPlay: [],
	remainingDeck: [],
	pot: 0,
	player1: null,
	player2: null,
	whosTurn: null,
	drawingRound: false,
	bettingRound2: false,
	handNumber: 1,
	startGame () {
		this.player1 = new Player($('#player1-name-input').val(), 1);
		this.player2 = new Player($('#player2-name-input').val(), 2);
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
		this.dealCards();
	},
	player1Wins () {
		this.player1.winHand(this.player1.currentBet);
		this.player2.loseHand(this.player2.currentBet);
	},
	player2Wins () {
		this.player2.winHand(this.player2.currentBet);
		this.player1.loseHand(this.player1.currentBet);
	},
	checkHandValue () {
		if (this.player1.handValue() > this.player2.handValue()) {
			this.player1Wins();
		} else if (this.player2.handValue() > this.player1.handValue()) {
			this.player2Wins();
		} else if (this.player1.handValue() === this.player2.handValue()) {
			if (this.player1.handValue() === 8 || this.player1.handValue() === 5 || this.player1.handValue() === 4 || this.player1.handValue() === 0) {  //Straight Flushes, flushes, straights, no hand all have a tie breaker of high card, then second high card, then third high card, etc.
				for (let i = 4; i >= 0; i--) {
					if (this.player1.sortedCardValues[i] > this.player2.sortedCardValues[i]) {
						this.player1Wins();
						return this.endHand();
					} else if (this.player2.sortedCardValues[i] > this.player1.sortedCardValues[i]) {
						this.player2Wins();
						return this.endHand();
					}
				}
			}
		}
		this.endHand();
	},
	dealCards () {
		this.player1.hasDrawn = false;
		this.player1.hasDrawn = false;
		for (let i = 0; i <= 4; i++) {
			let randomPlayer1 = this.randomCard();		//Random cards dealt, but not removed from DECK yet
			let randomPlayer2 = this.randomCard();
			this.player1.currentCards[i] = randomPlayer1;
			this.player2.currentCards[i] = randomPlayer2;
			this.player1.currentCards[i].inPlay = true;
			this.player2.currentCards[i].inPlay = true;
			this.cardsInPlay.push(randomPlayer1);
			this.cardsInPlay.push(randomPlayer2);
		}
		if (this.handNumber % 2 === 0) {
			this.whosTurn = 2;
			this.showCardBacks();
			window.setTimeout(() => {
				this.showPlayer2()
			}, 5000);
		} else {
			this.whosTurn = 1;
			this.showCardBacks();
			window.setTimeout(() => {
				this.showPlayer1()
			}, 5000);
		}
		this.bettingRound2 = false;
		this.player1.hasChecked = false;
		this.player2.hasChecked = false;
		this.updateStats();
	},
	changeTurn () {
		if (this.whosTurn === 1) {
			this.whosTurn = 2;
			this.showCardBacks();
			window.setTimeout(() => {
				this.showPlayer2()
			}, 5000);
		} else if (this.whosTurn === 2) {
			this.whosTurn = 1;
			this.showCardBacks();
			window.setTimeout(() => {
				this.showPlayer1()
			}, 5000);
		}
	},
	makeBet () {
		let $betAmount = parseInt($('#bet-amount').val(), 10);
		if (this.whosTurn === 1) {
			this.player1.makeBet(this.player2.currentBet + $betAmount);
			if (this.player1.makeBet(this.player2.currentBet + $betAmount) === false) {
				return;
			}
		} else if (this.whosTurn === 2) {
			this.player2.makeBet(this.player1.currentBet + $betAmount);
			if (this.player2.makeBet(this.player1.currentBet + $betAmount) === false) {
				return;
			}
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
			this.drawCards();
		} else {
			this.makeCall();
		}
	},
	makeCall () {
			if (this.player1.currentBet > this.player2.currentBet) {
				let $currentBet = this.player1.currentBet - this.player2.currentBet;
				this.player2.makeBet($currentBet + this.player2.currentBet);
				if (this.bettingRound2 === true) {
					this.checkHandValue();
					return;
				}
			} else if (this.player1.currentBet < this.player2.currentBet) {
				let $currentBet = this.player2.currentBet - this.player1.currentBet;
				this.player1.makeBet($currentBet + this.player1.currentBet);
				if (this.bettingRound2 === true) {
					this.checkHandValue();
					return;
				}
			} else if (this.player1.currentBet === this.player2.currentBet) {
				if (this.player1.hasChecked && this.bettingRound2) {
					this.checkHandValue();
					return;
				} else if (this.player1.hasChecked) {
					this.changeTurn();
					this.becomeDrawRound();
					return;
				} else {
					this.player1.hasChecked = true;
					this.player2.hasChecked = true;
					this.changeTurn();
					return;
				}
			}
			this.pot = this.player1.currentBet + this.player2.currentBet;
			this.updateStats();
			this.changeTurn();
			this.becomeDrawRound();
	},
	makeFold () {
		if (this.whosTurn === 1) {
			this.player2.winHand(this.player1.currentBet);
			this.player1.loseHand(this.player1.currentBet);
		} else {
			this.player1.winHand(this.player2.currentBet);
			this.player2.loseHand(this.player2.currentBet);
		}
		this.endHand();
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
		this.player1.hasChecked = false;
		this.player2.hasChecked = false;
		this.drawingRound = true;
	},
	becomeBetRound () {
		$('.actions').css('visibility', 'visible');
		$('#call').text('Check');
		this.drawingRound = false;
		this.bettingRound2 = true;
	},
	drawCards () {
		if (this.whosTurn === 1) {
			for (let i = 0; i <= 4; i++) {
				if (this.player1.currentCards[i].held === false) {
					let drawnCard = this.randomCard();
					this.player1.currentCards.splice(i, 1, drawnCard);
					this.cardsInPlay.push(drawnCard);
				}
			}
			this.player1.hasDrawn = true;
			this.showCardBacks();
			window.setTimeout(() => {
				this.showPlayer1()
			}, 5000);
			//INSERT DELAY
		} else {
			for (let i = 0; i <= 4; i++) {
				if (this.player2.currentCards[i].held === false) {
					let drawnCard = this.randomCard();
					this.player2.currentCards.splice(i, 1, drawnCard);
					this.cardsInPlay.push(drawnCard);
				}
			}
			this.player2.hasDrawn = true;
			this.showCardBacks();
			window.setTimeout(() => {
				this.showPlayer2()
			}, 5000);
			//INSERT DELAY
		}
		if (this.player1.hasDrawn && this.player2.hasDrawn) {
			this.becomeBetRound();
		}
		this.changeTurn();
	},
	updateStats () {
		$('#player1-stats p').html(`<p>Wallet: ${this.player1.wallet - this.player1.currentBet}</br>Current Bet: ${this.player1.currentBet}</p>`);
		$('#player2-stats p').html(`<p>Wallet: ${this.player2.wallet -this.player2.currentBet}</br>Current Bet: ${this.player2.currentBet}</p>`);
	},
	holdCard (card) {
		const $cardClass = `.${$(card).attr('class')}`;
		const whichCard = parseInt($cardClass.substring(5), 10);
		if (this.drawingRound === true) {
			if (this.whosTurn === 1) {
				if (this.player1.currentCards[whichCard - 1].held === false) {
					this.player1.currentCards[whichCard - 1].held = true;
					$($cardClass).css('color', 'red');
				} else if (this.player1.currentCards[whichCard - 1]) {
					this.player1.currentCards[whichCard - 1].held = false;
					$($cardClass).css('color', 'lightgray');
				}
			} else if (this.whosTurn === 2) {
				if (this.player2.currentCards[whichCard - 1].held === false) {
					this.player2.currentCards[whichCard - 1].held = true;
					$($cardClass).css('color', 'red');
				} else if (this.player2.currentCards[whichCard - 1]) {
					this.player2.currentCards[whichCard - 1].held = false;
					$($cardClass).css('color', 'lightgray');
				}
			}
		}
	},
	randomCard () {
		let randomNumber = Math.floor(Math.random() * deck.length);
		let dealtCard = deck.slice(randomNumber, randomNumber + 1);
		deck.splice(randomNumber, 1);
		return dealtCard[0];
	},
	showPlayer1 () {
		for (let i = 1; i <= 5; i++) {
			$(`img:nth-child(${i})`).attr('src', this.player1.currentCards[i - 1].image);
			if (this.player1.currentCards[i - 1].held === true) {
				$(`#hold${i}`).css('color', 'red');
			} else if (this.player1.currentCards[i - 1].held === false) {
				$(`#hold${i}`).css('color', 'lightgray');
			}
		}
		$('#player2').css('color', 'white');
		$('#player1').css('color', 'red');
	},
	showPlayer2 () {
		for (let i = 1; i <= 5; i++) {
			$(`img:nth-child(${i})`).attr('src', this.player2.currentCards[i - 1].image);
			if (this.player2.currentCards[i - 1].held === true) {
				$(`#hold${i}`).css('color', 'red');
			} else if (this.player2.currentCards[i - 1].held === false) {
				$(`#hold${i}`).css('color', 'lightgray');
			}
		}
		$('#player1').css('color', 'white');
		$('#player2').css('color', 'red');
	},
	endHand () {
		this.replaceCardsInDeck();
		this.pot = 0;
		this.player2.handEnd();
		this.player1.handEnd();
		$('#call').text(`Check`);
		this.updateStats();
		this.handNumber++;
		this.dealCards();
	},
	replaceCardsInDeck () {
		for (let i = 0; i <= this.cardsInPlay.length -1 ; i++) {
			this.cardsInPlay[i].held = false;
			deck.push(this.cardsInPlay[i]);
		}
		this.cardsInPlay = [];
	},
	showCardBacks () {
		for (let i = 1; i <= 5; i++) {
			$(`img:nth-child(${i})`).attr('src', 'images/Playing_Cards/playing-cards/card_back.png');
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
	e.preventDefault();
	game.holdCard(e.target);
});
