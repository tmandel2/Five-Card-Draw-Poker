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
		this.hasDrawn = false,
		this.hasChecked = false,
		this.sortedCardValues = [],
		this.cardSuits = [],
		this.lastHand = '',
		this.previousCards = []
	}
	makeBet (amount) {
		if (amount <= this.wallet && amount > 0) {
			this.currentBet = amount;
			return this.currentBet;
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
			this.sortedCardValues[i] = this.currentCards[i].value;
			this.cardSuits[i] = this.currentCards[i].suit;
			cardAltValues[i] = this.currentCards[i].altValue;
		};
		this.sortedCardValues.sort(this.compareValues);
		cardAltValues.sort(this.compareValues);
		if (this.checkStraightFlush(this.sortedCardValues, cardAltValues, this.cardSuits)) {
			this.lastHand = 'Straight Flush';
			return 8;
		} else if (this.checkFourOfAKind(this.sortedCardValues)) {
			this.lastHand = 'Four of a Kind';
			return 7;
		} else if (this.checkFullHouse(this.sortedCardValues)) {
			this.lastHand = 'Full House';
			return 6;
		} else if (this.checkFlush(this.cardSuits)) {
			this.lastHand = 'Flush';
			return 5;
		} else if (this.checkStraight(this.sortedCardValues) || this.checkStraight(cardAltValues)) {
			this.lastHand = 'Straight';
			return 4;
		} else if (this.checkThreeOfAKind(this.sortedCardValues)) {
			this.lastHand = 'Three of a kind';
			return 3;
		} else if (this.checkTwoPair(this.sortedCardValues)) {
			this.lastHand = 'Two Pair';
			return 2;
		} else if (this.checkPair(this.sortedCardValues)) {
			this.lastHand = 'Pair';
			return 1;
		} else {
			this.lastHand = 'High Card';
			return 0;
		}
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
	makeTwoPairArray () {
		let twoPairArray = [];
		for (let i = 4; i >= 1; i--) {
			if (this.sortedCardValues[i] === this.sortedCardValues[i - 1]) {
				twoPairArray.unshift(this.sortedCardValues[i]);
				this.sortedCardValues.splice(i, 1);
			}
		}
		return twoPairArray;
	}
	cardValueTotal () {
		let runningTotal = 0;
		for (let i = 0; i <= this.sortedCardValues.length - 1; i++) {
			runningTotal = runningTotal + this.sortedCardValues[i];
		}
		return runningTotal;
	}
	makeOnePairArray () {
		let onePairArray = []; //Will display cards as [pairCardValue, high, med, low]
		for (let i = 4; i >= 0; i--) {
			if (this.sortedCardValues[i] === this.sortedCardValues[i - 1]) {
				onePairArray.unshift(this.sortedCardValues[i]);
				this.sortedCardValues.splice(i - 1, 1);
			} else {
				onePairArray.push(this.sortedCardValues[i]);
			}
		}
		return onePairArray;
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
		$('#hold-row').css("visibility", "visible");
		$('#card-location').css("visibility", "visible");
		$('.previous-hand').css("visibility", "visible");
		$('#player1').text(`${this.player1.name}`);
		$('#player2').text(`${this.player2.name}`);
		// $('#player1').css('color', 'red');
		$("#player1-stats").append(`<p id='P1-wallet'>Wallet: ${this.player1.wallet}</p>`);
		$("#player1-stats").append(`<p id='P1-bet'>Current Bet: ${this.player1.currentBet}</p>`);
		$("#player1-stats").append(`<p id='P1-hand'>Last Shown Hand: ${this.player1.lastHand}</p>`);
		$("#player1-stats").append(`<p id='P1-previous-hand'></p>`);
		$("#player2-stats").append(`<p id='P2-wallet'>Wallet: ${this.player2.wallet}</p>`);
		$("#player2-stats").append(`<p id='P2-bet'>Current Bet: ${this.player2.currentBet}</p>`);
		$("#player2-stats").append(`<p id='P2-hand'>Last Shown Hand: ${this.player2.lastHand}</p>`);
		$("#player2-stats").append(`<p id='P2-previous-hand'></p>`);
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
		this.player1.previousCards = this.player1.currentCards;
		this.player2.previousCards = this.player2.currentCards;
		if (this.player1.handValue() > this.player2.handValue()) {
			this.player1Wins();
		} else if (this.player2.handValue() > this.player1.handValue()) {
			this.player2Wins();
		} else if (this.player1.handValue() === this.player2.handValue()) { //TIEBREAKER SCENARIOS
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
			} else if (this.player1.handValue() === 7) { //Four of a kind. The 4th card in the sort, is always a part of the 4 of a kind, so the tie breaker is the value of the 4 of a kind (any index of 1 through 3 would work here)
				if (this.player1.sortedCardValues[3] > this.player2.sortedCardValues[3]) {
					this.player1Wins();
					return this.endHand();
				} else if (this.player2.sortedCardValues[3] > this.player1.sortedCardValues[3]) {
					this.player2Wins();
					return this.endHand();
				}
			} else if (this.player1.handValue() === 6 || this.player1.handValue() === 3) { //Full House and 3 of a kind. The third card in the sorted values will ALWAYS be a part of the 3 of a kind. This is the tie breaker for the two types of hands.
				if (this.player1.sortedCardValues[2] > this.player2.sortedCardValues[2]) {
					this.player1Wins();
					return this.endHand();
				} else if (this.player2.sortedCardValues[2] > this.player1.sortedCardValues[2]) {
					this.player2Wins();
					return this.endHand();
				}
			} else if (this.player1.handValue() === 2) {	//Two pairs. Compare the value of high pair, then low pair, then remaining card.
				for (let i = 1; i >= 0; i--) {
					if (this.player1.makeTwoPairArray()[i] > this.player2.makeTwoPairArray()[i]) {
						this.player1Wins();
						return this.endHand();
					} else if (this.player2.makeTwoPairArray()[i] > this.player1.makeTwoPairArray()[i]) {
						this.player2Wins();
						return this.endHand();
				} 
				if (this.player1.cardValueTotal() > this.player2.cardValueTotal()) {
					this.player1Wins();
					return this.endHand();
				} else if (this.player2.cardValueTotal() > this.player1.cardValueTotal()) {
					this.player2Wins();
					return this.endHand();
					}
				}
			} else if (this.player1.handValue() === 1) { //One Pair. Made an array. Check which cards are worth more in pair, then high cards on through.
				for (let i = 0; i <= 4; i++) {
					if (this.player1.makeOnePairArray()[i] > this.player2.makeOnePairArray()[i]) {
						this.player1Wins();
						return this.endHand();
					} else if (this.player2.makeOnePairArray()[i] > this.player1.makeOnePairArray()[i]) {
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
			let randomPlayer1 = this.randomCard();
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
			this.showPlayer2Info();
			window.setTimeout(() => {
				this.showPlayer2Cards()
			}, 5000);
		} else {
			this.whosTurn = 1;
			this.showPlayer1Info();
			window.setTimeout(() => {
				this.showPlayer1Cards()
			}, 5000);
		}
		this.bettingRound2 = false;
		this.player1.hasChecked = false;
		this.player2.hasChecked = false;
		this.updateStats();
		$('#hand-information').text(`Hand Number: ${this.handNumber}`);
	},
	changeTurn () {
		if (this.whosTurn === 1) {
			this.whosTurn = 2;
			this.showPlayer2Info();
			window.setTimeout(() => {
				this.showPlayer2Cards()
			}, 5000);
		} else if (this.whosTurn === 2) {
			this.whosTurn = 1;
			this.showPlayer1Info();
			window.setTimeout(() => {
				this.showPlayer1Cards()
			}, 5000);
		}
	},
	makeBet () {
		let $betAmount = parseInt($('#bet-amount').val(), 10);
		if (this.whosTurn === 1) {
			if (this.player1.currentBet + $betAmount > this.player1.wallet) {
				return;
			}
			if ((this.player1.currentBet + $betAmount) > this.player2.wallet) {
				this.player1.makeBet(this.player2.wallet - this.player1.currentBet);
			} else {
				this.player1.makeBet(this.player2.currentBet + $betAmount);
			}
		} else if (this.whosTurn === 2) {
			if (this.player2.currentBet + $betAmount > this.player2.wallet) {
				return;
			}
			if ((this.player2.currentBet + $betAmount) > this.player1.wallet) {
				this.player2.makeBet(this.player1.wallet - this.player2.currentBet);
			} else {
				this.player2.makeBet(this.player1.currentBet + $betAmount);
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
			} else {
				this.pot = this.player1.currentBet + this.player2.currentBet;
				this.updateStats();
				this.changeTurn();
				this.becomeDrawRound();
			}
		} else if (this.player1.currentBet < this.player2.currentBet) {
			let $currentBet = this.player2.currentBet - this.player1.currentBet;
			this.player1.makeBet($currentBet + this.player1.currentBet);
			if (this.bettingRound2 === true) {
				this.checkHandValue();
			} else {
				this.pot = this.player1.currentBet + this.player2.currentBet;
				this.updateStats();
				this.changeTurn();
				this.becomeDrawRound();
			}
		} else if (this.player1.currentBet === this.player2.currentBet) {
			if (this.player1.hasChecked && this.bettingRound2) {
				this.checkHandValue();
			} else if (this.player1.hasChecked) {
				this.changeTurn();
				this.becomeDrawRound();
			} else {
				this.player1.hasChecked = true;
				this.player2.hasChecked = true;
				this.changeTurn();
			}
		}
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
		if (this.player2.currentBet === this.player2.wallet || this.player1.currentBet === this.player1.wallet) {
				console.log('option1');
				return this.makeCall();
			}
		if (this.whosTurn === 1) {
			this.player1.makeBet(Math.min(this.player1.wallet, this.player2.wallet));
			$('#call').text(`Call ${this.player1.currentBet - this.player2.currentBet}`);
		} else {
			this.player2.makeBet(Math.min(this.player1.wallet, this.player2.wallet));
			$('#call').text(`Call ${this.player2.currentBet - this.player1.currentBet}`);
		}
		this.pot = this.player1.currentBet + this.player2.currentBet;
		this.updateStats();
		this.changeTurn();
	},
	becomeDrawRound () {
		$('.actions').css('visibility', 'hidden');
		$('#call').text('Draw');
		this.player1.hasChecked = false;
		this.player2.hasChecked = false;
		this.drawingRound = true;
		$('#hand-information').text(`Click on Card to Hold It`);
	},
	becomeBetRound () {
		$('.actions').css('visibility', '');
		$('#call').text('Check');
		this.drawingRound = false;
		this.bettingRound2 = true;
		$('#hand-information').text(`Hand Number: ${this.handNumber}`);
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
		} else {
			for (let i = 0; i <= 4; i++) {
				if (this.player2.currentCards[i].held === false) {
					let drawnCard = this.randomCard();
					this.player2.currentCards.splice(i, 1, drawnCard);
					this.cardsInPlay.push(drawnCard);
				}
			}
			this.player2.hasDrawn = true;
		}
		if (this.player1.hasDrawn && this.player2.hasDrawn) {
			this.changeTurn();
			return this.becomeBetRound();
		}
		this.changeTurn();
	},
	updateStats () {
		$('#P1-wallet').text(`Wallet: ${this.player1.wallet - this.player1.currentBet}`);
		$('#P1-bet').text(`Current Bet: ${this.player1.currentBet}`);
		$('#P1-hand').text(`Last Shown Hand: ${this.player1.lastHand}`);
		$('#P2-wallet').text(`Wallet: ${this.player2.wallet - this.player2.currentBet}`);
		$('#P2-bet').text(`Current Bet: ${this.player2.currentBet}`);
		$('#P2-hand').text(`Last Shown Hand: ${this.player2.lastHand}`);
		if (this.player1.previousCards.length > 0) {
			$('#P1-previous-hand').text(`${this.player1.previousCards[0].name}, ${this.player1.previousCards[1].name}, ${this.player1.previousCards[2].name}, ${this.player1.previousCards[3].name}, ${this.player1.previousCards[4].name}`);
			$('#P2-previous-hand').text(`${this.player2.previousCards[0].name}, ${this.player2.previousCards[1].name}, ${this.player2.previousCards[2].name}, ${this.player2.previousCards[3].name}, ${this.player2.previousCards[4].name}`);
		}
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
	showPlayer1Info () {
		this.showCardBacks();
		for (let i = 1; i <= 5; i++) {
			if (this.player1.currentCards[i - 1].held === true) {
				$(`#hold${i}`).css('color', 'red');
			} else if (this.player1.currentCards[i - 1].held === false) {
				$(`#hold${i}`).css('color', 'lightgray');
			}
		}
		// $('#player2').css('color', 'white');
		// $('#player1').css('color', 'red');
		$('#player1-stats').css('border', '1px dashed red');
		$('#player2-stats').css('border', '');
		// $('#player1-stats').css('background-color', 'salmon');
		// $('#player2-stats').css('background-color', 'lightgray');
		$('#user-alerts').css('visibility', 'visible');
		$('#button-bar').css('visibility', 'hidden');
		$('#call').css('visibility', 'hidden');
		$('#user-alerts').text(`It\'s ${this.player1.name}\'s turn. You have 5 seconds to give them the computer. Cards are coming!`);
		$('#player2-stats')
			.velocity({opacity: .5}, {duration: 3500})
			.velocity({backgroundColor: "#D3D3D3"}, {
				queue: false,
				duration: 3500
			});
		$('#player1-stats')
			.velocity({opacity: 1}, {duration: 3500})
			.velocity({backgroundColor: "#FA8072"}, {
				queue: false,
				duration: 3500
			});
		$('#player2')
			.velocity({opacity: .5}, {duration: 3500})
			.velocity({color: "#FFFFFF"}, {
				queue: false,
				duration: 3500
			});
		$('#player1')
			.velocity({opacity: 1}, {duration: 3500})
			.velocity({color: "#FF0000"}, {
				queue: false,
				duration: 3500
			});
	},
	showPlayer1Cards () {
		$('#button-bar').css('visibility', 'visible');
		$('#call').css('visibility', 'visible');
		$('#user-alerts').css('visibility', 'hidden');
		for (let i = 1; i <= 5; i++) {
			$(`img:nth-child(${i})`).attr('src', this.player1.currentCards[i - 1].image);
		}
	},
	showPlayer2Cards () {
		$('#button-bar').css('visibility', 'visible');
		$('#call').css('visibility', 'visible');
		$('#user-alerts').css('visibility', 'hidden');
		for (let i = 1; i <= 5; i++) {
			$(`img:nth-child(${i})`).attr('src', this.player2.currentCards[i - 1].image);
		}
	},
	showPlayer2Info () {
		this.showCardBacks();
		for (let i = 1; i <= 5; i++) {
			if (this.player2.currentCards[i - 1].held === true) {
				$(`#hold${i}`).css('color', 'red');
			} else if (this.player2.currentCards[i - 1].held === false) {
				$(`#hold${i}`).css('color', 'lightgray');
			}
		}
		// $('#player1').css('color', 'white');
		// $('#player2').css('color', 'red');
		$('#player2-stats').css('border', '1px dashed red');
		$('#player1-stats').css('border', '');
		// $('#player1-stats').css('background-color', 'lightgray');
		// $('#player2-stats').css('background-color', 'salmon');
		$('#user-alerts').css('visibility', 'visible');
		$('#button-bar').css('visibility', 'hidden');
		$('#call').css('visibility', 'hidden');
		$('#user-alerts').text(`It\'s ${this.player2.name}\'s turn. You have 5 seconds to give them the computer. Cards are coming!`);
		$('#player1-stats')
			.velocity({opacity: .5}, {duration: 3500})
			.velocity({backgroundColor: "#D3D3D3"}, {
				queue: false,
				duration: 3500
			});
		$('#player2-stats')
			.velocity({opacity: 1}, {duration: 3500})
			.velocity({backgroundColor: "#FA8072"}, {
				queue: false,
				duration: 3500
			});
		$('#player1')
			.velocity({opacity: .5}, {duration: 3500})
			.velocity({color: "#FFFFFF"}, {
				queue: false,
				duration: 3500
			});
		$('#player2')
			.velocity({opacity: 1}, {duration: 3500})
			.velocity({color: "#FF0000"}, {
				queue: false,
				duration: 3500
			});
	},
	endHand () {
		this.replaceCardsInDeck();
		this.pot = 0;
		this.player2.handEnd();
		this.player1.handEnd();
		$('#call').text(`Check`);
		this.updateStats();
		if(this.checkWin()) {
			return;
		}
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
		$('#card1')
			.velocity("reverse")
			.velocity("fadeIn", {duration: 3500 })
			.velocity({rotateY: "360deg"}, {
				delay: 1500,
				duration: 50
			});
		$('#card2')
			.velocity("reverse")
			.velocity("fadeIn", {duration: 3500 })
			.velocity({rotateY: "360deg"}, {
				delay: 1500,
				duration: 50
			});
		$('#card3')
			.velocity("reverse")
			.velocity("fadeIn", {duration: 3500 })
			.velocity({rotateY: "360deg"}, {
				delay: 1500,
				duration: 50
			});
		$('#card4')
			.velocity("reverse")
			.velocity("fadeIn", {duration: 3500 })
			.velocity({rotateY: "360deg"}, {
				delay: 1500,
				duration: 50
			});
		$('#card5')
			.velocity("reverse")
			.velocity("fadeIn", {duration: 3500 })
			.velocity({rotateY: "360deg"}, {
				delay: 1500,
				duration: 50
			});
	},
	checkWin() {
		if (this.player1.wallet === 0) {
			$('#player1').css('color', 'white');
			$('#player2').css('color', 'red');
			$('#player2-stats').css('border', '5px solid red');
			return true;
		}
		if (this.player2.wallet === 0) {
			$('#player2').css('color', 'white');
			$('#player1').css('color', 'red');
			$('#player1-stats').css('border', '5px solid red');
			return true;
		}
	}
}

// Listeners:

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
	game.makeBet();
});

$('#call').on('click', (e) => {
	game.callOrDraw();
});

$('#fold').on('click', (e) => {
	game.makeFold();
});

$('#all-in').on('click', (e) => {
	game.allIn();
})

$('img').on('click', (e) => {
	game.holdCard(e.target);
});

// $('#player1-previous').on('click', (e) => {
// 	game.player1Previous();
// });

// $('#player2-previous').on('click', (e) => {
// 	game.player2Previous();
// })
