//CREATE array of suits
const suits = ["S", "D", "C", "H"];
//CREATE array of possible card values
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
//CREATE empty deck array
const deck = [];
// INITIALIZE GAME ELEMENTS
let numberOfPlayers = 2;
let playersArray = [];
let playerTurn = 1;
let playerChoice = {};
let centerPile = [];

//COMBINE suits and values to create deck array
function createDeck() {
  for (suit in suits){
    for (value in values){
      let card = {
        cardSuit: suits[suit],
        cardValue: values[value]
      };
			deck.push(card);
    }
  }
  //SHUFFLE deck array
  for (i = deck.length - 1; i > 0; i--) {
    //GENERATE random number
    let j = Math.floor(Math.random() * (i + 1));
    //GIVE each card a new position in the deck randomly from the last card to the first one
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
   }
}
createDeck();

//GENERATE PLAYERS
class CardPlayers {
  constructor(playerNumber) {
    this.playerNumber = parseInt(playerNumber)
    //this.playerName = //prompt("Enter player's name","Enter player's name")
    this.hand = [];
  }
}
function createPlayers(){
  //numberOfPlayers = parseInt(prompt("Type number of players (1-10)"))
  for(i = 0; i < numberOfPlayers; i++){
    player = new CardPlayers(i + 1);
    playersArray.push(player);
  }
}
createPlayers();

//DEAL CARDS
function dealCards(){
  for(i = 0; i < 5; i++){
    for(player in playersArray){
      playersArray[player].hand.push(deck[Math.floor(Math.random() * (deck.length)) + 1])
      deck.shift()
    }
  }
  //FIRST CARD
  centerPile = deck.splice(0,1)
}
dealCards();

//PLAY
function play(){
  playerChoice = playersArray[0].hand[0];
  console.log(centerPile);
  console.log(playerChoice);
  if(playerChoice.cardSuit != centerPile.cardSuit){
    alert("You must choose a card of the same suit")
    playerChoice = []
  }else if(playerChoice.cardSuit === centerPile.cardSuit){
    centerPile.unshift(playerChoice);
    playerChoice = []
  }
}
play()
