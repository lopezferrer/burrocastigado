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
  for (let suit in suits){
    for (let value in values){
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


//GENERATE PLAYERS
class CardPlayers {
  constructor(playerNumber) {
    this.playerNumber = parseInt(playerNumber);
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


//DEAL CARDS
function dealCards(){
  for(i = 0; i < 5; i++){
    for(let player in playersArray){
      deck[i].playedBy = parseInt(player) + 1;
      playersArray[player].hand.push(deck[i]);
      deck.shift();
    }
  }
  //FIRST CARD
  centerPile = [deck.shift()];
  centerPile[0].playedBy = "House";

  //MAKE ONLY PLAYER ONE'S CARDS PLAYABLE
  for(i = 0; i <= playersArray[0].hand.length - 1; i++){
    playersArray[0].hand[i].playable = true;
  }
}

//PICK CARD
//*********

//PLAY
function play(){
 //TEMPORARY**
  playerChoice = {
        cardSuit: "H",
        cardValue: "A",
        playedBy: 1,
        playable: true
      };
  //TEMPORARY**
  if(playerChoice.playable != true){
    alert(`You must choose a card from Player${playerTurn}'s hand`);
    playerChoice = [];
  }else if(playerChoice.playable === true && playerChoice.cardSuit != centerPile[0].cardSuit){
    //alert("You must choose a card of the same suit")
    playerChoice = [];
  }else if(playerChoice.playable === true && playerChoice.cardSuit === centerPile[0].cardSuit){
    playerChoice.playable = false;
    centerPile.unshift(playerChoice);
    playerChoice = [];
    for(i = 0; i <= playersArray[playerTurn - 1].hand.length - 1; i++){
        playersArray[playerTurn - 1].hand[i].playable = false;
      }
    if(playerTurn <= numberOfPlayers){
      playerTurn += 1;
      for(i = 0; i <= playersArray[playerTurn - 1].hand.length - 1; i++){
        playersArray[playerTurn - 1].hand[i].playable = true;
      }
    }else{
      playerTurn = 1;
      for(i = 0; i <= playersArray[0].hand.length - 1; i++){
        playersArray[playerTurn - 1].hand[i].playable = true;
      }
    }
    for(i = 0; i < centerPile.length; i++){
        centerPile[i].playable = false;
    }
  }
}

/*
function finishRound(){
  if(centerPile[0] >= centerPile[1]){
    playersArray[centerPile[0].playedBy].push(centerPile[0])
  }else{
    playersArray[centerPile[0].playedBy].push(centerPile[1])
  }
  for(player in playersArray){
    if(player.hand === []) {
      console.log(`Player ${player.playerNumber} won this game!`)
    }
  }
}
*/
//finishRound()

function game(){
  createDeck(); //creates and shuffles the deck of cards (I'll have to assign to filenames later to link them with the visuals)
  console.log(deck.length);
  console.log(deck[12]);
  createPlayers();
  //console.log(playersArray)
  dealCards(); //this include the first card in the center of the table
  //console.log(playersArray[0])
  //playerOne choses card********
  play();
  //player 2 choses card**********
  play();
  //Scoring
}
game();


//ANIMATIONS/CHANGES/TRANSITIONS
function howToPlay() {
  alert("The game is for two players.\nIt starts with five cards being dealt to each player.\nThe goal is to run out of cards at the end.\n\nTo open the game, a card is placed face up.\nEach player throws one card of the same suit\n(if you don't have one, you must draw from\nthe deck until you get one), looking for \nthe biggest card and win that hand, which \ngives you the right to throw first in the \nsecond hand and establish the suit in which\neveryone must play in the next round. As the\nhands go by, the player who manages to run out\nof cards wins.")
}

function uncover(){
  document.getElementById("deck1").src = 'images/cards/7H.png';
  let cardName = document.getElementById("deck1").src.replace(/^.*[\\\/]/, '');
  cardName = cardName.split('.').slice(0,-1).join('.')
  document.getElementById("deck1").setAttribute("alt", cardName);
  document.getElementById("deck1").style.cursor = "grab";
}
