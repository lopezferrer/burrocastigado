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
        id: "",
        playedBy: "House",
        playable: false,
        front: "images/cards/" + (values[value]+suits[suit]).replace(/[^a-z0-9]/gi, '_')+".png",
        rear: "images/cards/ga-card.png",
        selected: false,
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
  let cardClass = ""
  for(i = 0; i < 5; i++){
    for(let player in playersArray){
      cardId = String("player" + (parseInt(player) + 1) + "-card" + (i));
      deck[0].id = String("player" + (parseInt(player) + 1) + "-card" + (4-i));
      deck[0].playedBy = parseInt(player) + 1;
      playersArray[player].hand.unshift(deck.shift(0));
      cardImage = String(playersArray[player].hand[0].rear);
      cardClass = String("player" + (parseInt(player) + 1) + "-cards");
      playerContainer = String("player" + playersArray[player].playerNumber + "-container")
      newElement = document.createElement('img');
      newElement.setAttribute('src', cardImage);
      newElement.setAttribute('id', cardId);
      newElement.setAttribute('class', 'card-format');
      newElement.classList.add(cardClass);
      playerContainer = document.getElementById(playerContainer);
      playerContainer.appendChild(newElement);
    }
    document.getElementById("deck-container").style.cursor = "grab"
  }
  playerContainer = String("player" + playersArray[playerTurn - 1].playerNumber + "-container")
  document.getElementById(playerContainer).style.border = "6px solid black";

  //FIRST CARD
  centerPile = [deck.shift()];
  centerPile[0].playedBy = "House";
  document.getElementById("center-1").src = centerPile[0].front
  //MAKE ONLY PLAYER ONE'S CARDS PLAYABLE
  let takeCard = ""
  for(i = 0; i <= playersArray[playerTurn-1].hand.length - 1; i++){
    playersArray[playerTurn - 1].hand[i].playable = true;
    cardId = String("player" + playerTurn + "-card" + (i));
    takeCard = document.getElementById(cardId);
    cardImage = String(playersArray[playerTurn].hand[i].front);
    takeCard.setAttribute('src', cardImage);
    takeCard.style.cursor = "grab";
    playerTurn = 1;
  }
}

//-----------
//PICK CARD
function pickCard(){
  let cards = document.querySelectorAll("." + "player" + playerTurn + "-" + "cards");
  for (i of cards) {
    i.addEventListener('click', function() {
      cardPicked = this.id;
      function pickId(card){
        return card.id === cardPicked
      }
      playersHand = playersArray[playerTurn - 1].hand
      playerChoice = playersHand.find(pickId);
      console.log(playerChoice)
    });
  }
}

//----------------
function uncover(){
  if(deck.length === 0){
    alert("No cards left in the pile");
  }else{
    // move to player's hand
    playersArray[playerTurn-1].hand.playedBy = playerTurn;
    playersArray[playerTurn-1].hand.unshift(deck.shift(0));
    cardImage = String(playersArray[playerTurn-1].hand[0].front);
    cardId = String("player" + playerTurn + "-card" + (playersArray[playerTurn-1].hand.length - 1));
    playersArray[playerTurn-1].hand[0].id = cardId;
    playerContainer = String("player" + playerTurn + "-container");
    cardClass = String("player" + playerTurn + "-cards");
    newElement = document.createElement('img');
    newElement.setAttribute('src', cardImage);
    newElement.setAttribute('id', cardId);
    newElement.setAttribute('class', 'card-format');
    playerContainer = document.getElementById(playerContainer);
    playerContainer.appendChild(newElement);
    newElement.classList.add(cardClass);
    newElement.style.cursor = "grab";
    if(deck.length === 3){
      document.getElementById("deck-container").style.boxShadow = "2px 2px 0.5px #eee, 3px 3px 0.5px black,5px 5px 0.5px #eee,6px 6px 0.5px black";
    }else if(deck.length === 2){
      document.getElementById("deck-container").style.boxShadow = "2px 2px 0.5px #eee, 3px 3px 0.5px black";
    }else if(deck.length === 1){
      document.getElementById("deck-container").style.boxShadow = "none"
    }else if(deck.length === 0){
      document.getElementById("deck-container").remove()
    }
  }
  //pickCard()
}

/*
//PLAY
function play(){
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
*/
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
  //console.log(playersArray[0].hand)
  dealCards(); //this include the first card in the center of the table
  pickCard()
  //console.log(playerChoice)
  //play();
  //player 2 choses card**********
  //Scoring
}
game();

//ANIMATIONS/CHANGES/TRANSITIONS
function howToPlay() {
  alert("The game is for two players.\nIt starts with five cards being dealt to each player.\nThe goal is to run out of cards at the end.\n\nTo open the game, a card is placed face up.\nEach player throws one card of the same suit\n(if you don't have one, you must draw from\nthe deck until you get one), looking for \nthe biggest card and win that hand, which \ngives you the right to throw first in the \nsecond hand and establish the suit in which\neveryone must play in the next round. As the\nhands go by, the player who manages to run out\nof cards wins.")
}
