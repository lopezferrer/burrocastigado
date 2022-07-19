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
        cardValue: values[value],
        playedBy: "House",
        playable: false
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
      deck[i].playedBy = parseInt(player) + 1
      playersArray[player].hand.push(deck[i])
      deck.shift()
    }
  }
  //FIRST CARD
  centerPile = [deck.shift()]
  centerPile[0].playedBy = "House"

  //MAKE ONLY PLAYER ONE'S CARDS PLAYABLE
  for(i = 0; i <= playersArray[0].hand.length - 1; i++){
    playersArray[0].hand[i].playable = true
  }
}
dealCards();

//PICK CARD
//*********

console.log(playersArray[1])
//PLAY
function play(){
  playerChoice = {
        cardSuit: "H",
        cardValue: "A",
        playedBy: 1,
        playable: true
      };
  if(playerChoice.playable != true){
    alert(`You must choose a card from Player${playerTurn}'s hand`)
    playerChoice = []
  }else if(playerChoice.playable === true && playerChoice.cardSuit != centerPile[0].cardSuit){
    //alert("You must choose a card of the same suit")
    playerChoice = []
  }else if(playerChoice.playable === true && playerChoice.cardSuit === centerPile[0].cardSuit){
    playerChoice.playable = false
    centerPile.unshift(playerChoice);
    playerChoice = []
    for(i = 0; i <= playersArray[playerTurn - 1].hand.length - 1; i++){
        playersArray[playerTurn - 1].hand[i].playable = false
      }
    if(playerTurn <= numberOfPlayers){
      playerTurn += 1;
      for(i = 0; i <= playersArray[playerTurn - 1].hand.length - 1; i++){
        playersArray[playerTurn - 1].hand[i].playable = true
      }
    }else{
      playerTurn = 1
      for(i = 0; i <= playersArray[0].hand.length - 1; i++){
        playersArray[playerTurn - 1].hand[i].playable = true
      }
    }
    for(i = 0; i < centerPile.length; i++){
        centerPile[i].playable = false
    }
  }
}
play()
