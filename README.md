#Five Card Draw Poker with One Player Video Poker Mode

##Developed by, Timothy B. Mandel


###GAMEPLAY FOR FIVE CARD DRAW POKER

The game starts with the users being able to provide their name. It is a two player game, so two names entered.

A press of the start button will show a poker table with only card backs.

The users will have a wallet with a certain amount of money, and be able to bet what they want once they have been dealt.

The first player has their cards automatically dealt to them, alerting both users who should have the computer.

A betting round commences with each user getting turns betting until one player either calls or folds.

The drawing round has each player take a turn selecting which cards to "hold".

They can click on any or all of the five cards to "hold".

Upon clicking the "draw" button, the non-held cards will be replaced with new cards.

The application will then alert the player which user should have the computer.

A second round of betting commences, same as the first.

If both players are still in the hand at the end of the second betting round, the hands are compared.

The user wallets will be updated.

A second hand is then dealt, this time with the second user getting to bet first.

If at the end of a hand, a user has no money in their wallet, the game will display the winner.




#GAME CONTENTS

Deck Array:
	Will contain card objects each with value, image location, suit.

Player Class:
	Will contain wallet, name

Game object:
	Cards in play, current bet, methods for each type of winning hand, checking for win/lose.

The game will cycle through the winning hand methods from best hand (straight flush) to worst (single pair, 10 or higher) so that the most valuable hand is rewarded.