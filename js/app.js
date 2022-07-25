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

let deckContainer = document.getElementById("deck-container");

//COMBINE suits and values to create deck array
function createDeck() {
  for (let suit in suits){
    for (let value in values){
      let card = {
        cardSuit: suits[suit],
        cardValue: values[value],
        playedBy: "House",
        playable: false,
        front: "images/cards/" + (values[value]+suits[suit]).replace(/[^a-z0-9]/gi, '_')+".png",
        rear: "images/cards/ga-card.png",
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
    this.score = 0;
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
  let playerContainer = "";
  let newElement = "";
  let cardImage = "";
  let cardId = ""
  for(i = 0; i < 5; i++){
    for(let player in playersArray){
      deck[0].playedBy = parseInt(player) + 1;
      playersArray[player].hand.unshift(deck.shift(0));
      cardImage = String(playersArray[player].hand[0].rear);
      cardId = String("player" + (parseInt(player) + 1) + "-" + (i));
      playerContainer = String("player" + playersArray[player].playerNumber + "-container")
      newElement = document.createElement('img');
      newElement.setAttribute('src', cardImage);
      newElement.setAttribute('id', cardId);
      newElement.setAttribute('class', 'card-format');
      playerContainer = document.getElementById(playerContainer);
      playerContainer.appendChild(newElement);
    }
  }

  playerContainer = String("player" + playersArray[playerTurn - 1].playerNumber + "-container")
  document.getElementById(playerContainer).style.border = "6px solid black";

  //FIRST CARD
  centerPile = [deck.shift()];
  centerPile[0].playedBy = "House";
  document.getElementById("center-1").src = centerPile[0].front
  //MAKE ONLY PLAYER ONE'S CARDS PLAYABLE
  let takeCard = ""
  for(i = 0; i <= playersArray[0].hand.length - 1; i++){
    playersArray[0].hand[i].playable = true;
    cardId = String("player1-" + (i));
    takeCard = document.getElementById(cardId);
    cardImage = String(playersArray[0].hand[i].front);
    takeCard.setAttribute('src', cardImage);
    playerTurn = 1;
  }
}


function uncover(){
  if(deck.length === 0){
    alert("No cards left in the pile");
  }else{
    //cardName = String(document.getElementById("deck").src.replace(/^.*[\\\/]/, ''));
    //cardName = cardName.split('.').slice(0,-1).join('.');
    // move to player's hand
    playersArray[playerTurn-1].hand.playedBy = playerTurn
    playersArray[playerTurn-1].hand.unshift(deck.shift(0));
    if(deck.length === 0){
      document.getElementById("deck-container").remove()
    }
    cardImage = String(playersArray[playerTurn-1].hand[0].front);
    console.log(playersArray[playerTurn-1].hand[0].front);
    cardId = String("player" + playerTurn + "-" + (playersArray[playerTurn-1].hand.length -1));
    playerContainer = String("player" + playerTurn + "-container");
    newElement = document.createElement('img');
    newElement.setAttribute('src', cardImage);
    newElement.setAttribute('id', cardId);
    newElement.setAttribute('class', 'card-format');
    playerContainer = document.getElementById(playerContainer);
    playerContainer.appendChild(newElement);
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
