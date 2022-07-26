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
let score1 = 0
let score2 = 0
//---------Create deck array----------//
function createDeck() {
  for (let suit in suits){
    for (let value in values){
      let card = {
        cardValue: values[value],
        cardSuit: suits[suit],
        realValue: values[value],
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
  for (card in deck){
    if(deck[card].cardValue === "A"){
      deck[card].realValue = 14;
    }else if(deck[card].realValue === "J"){
      deck[card].realValue = 11;
    }else if(deck[card].realValue === "Q"){
      deck[card].realValue = 12;
    }else if(deck[card].realValue === "K"){
      deck[card].realValue = 13;
    }
  }
//---------SHUFFLE deck array-----------//
  for (i = deck.length - 1; i > 0; i--) {
    //GENERATE random number
    let j = Math.floor(Math.random() * (i + 1));
    //GIVE each card a new position in the deck randomly from the last card to the first one
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
   }
 }
//-------GENERATE PLAYERS----------
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
//-----------DEAL CARDS------------//
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
      newElement.classList.add('player-hand');
      playerContainer = document.getElementById(playerContainer);
      playerContainer.appendChild(newElement);
    }
    document.getElementById("deck-container").style.cursor = "grab"
  }
//-------FIRST CARD IN CENTER-----------//
/*
  centerPile = [deck.shift()];
  centerPile[0].playedBy = "House";
  document.getElementById("center-1").src = centerPile[0].front;
*/
//-----MAKE ONLY PLAYER ONE'S CARDS PLAYABLE--------//
  let takeCard = ""
  for(i = 0; i <= playersArray[playerTurn-1].hand.length - 1; i++){
    playersArray[playerTurn - 1].hand[i].playable = true;
    cardImageId = String("player" + playerTurn + "-card" + (i));
    takeCard = document.getElementById(cardImageId);
    cardImageFile = String(playersArray[playerTurn-1].hand[i].front);
    takeCard.setAttribute('src', cardImageFile);
    takeCard.style.cursor = "grab";
  }
  playerContainer = String("player" + playersArray[playerTurn - 1].playerNumber + "-container")
  document.getElementById(playerContainer).style.border = "6px solid black";
}
//------PLAY LOGIC ------------------//
function play(){
  if(centerPile.length < 2 && playerChoice === undefined){
    alert(`It is Player-${playerTurn}'s turn!\nYou must choose a card from Player-${playerTurn}'s hand.`)
    return
  }else if(centerPile.length === 1 && playerChoice.cardSuit != centerPile[0].cardSuit){
    alert("You must choose a card of the same suit")
  }else if(centerPile.length < 2 || playerChoice.cardSuit === centerPile[0].cardSuit){
    cardIdString = String(playerChoice.id)
    cardId = document.getElementById(playerChoice.id);
    document.getElementById(cardIdString).style.cursor = "auto"
    centerPile.unshift(playerChoice);
    for(let i = 0; i <= playersArray[playerTurn-1].hand.length - 1; i++){
      if(playersArray[playerTurn-1].hand[i].id === cardIdString){
        playersArray[playerTurn-1].hand.splice(i,1)
      }
    }
    newCardIdString = String("centerPile-card" + playerTurn);
    cardId.setAttribute('id', newCardIdString);
    centerContainer = document.getElementById("center-container");
    centerContainer.appendChild(cardId);
    playerChoice.id = newCardIdString;
    playerChoice = {}
    if(playerTurn === numberOfPlayers){
      playerContainer = String("player" + playersArray[playerTurn - 1].playerNumber + "-container")
      document.getElementById(playerContainer).style.border = "2px solid black";
      let playersHand = playersArray[playerTurn-1].hand;
      for(let i = 0; i <= playersHand.length - 1; i++){
        cardId = document.getElementById(playersHand[i].id);
        cardImageFile = String(playersHand[i].rear);
        cardId.style.cursor = "auto";
        cardId.setAttribute('src', cardImageFile);
      }
      playerTurn = 1;
      playersHand = playersArray[playerTurn-1].hand;
      setTimeout(function() {
        for(let i = 0; i <= playersHand.length - 1; i++){
          cardId = document.getElementById(playersHand[i].id);
          cardImageFile = String(playersHand[i].front);
          cardId.style.cursor = "grab";
          cardId.setAttribute('src', cardImageFile);
        }
      },1000)
      playerContainer = String("player" + playersArray[playerTurn - 1].playerNumber + "-container")
      document.getElementById(playerContainer).style.border = "6px solid black";
    }else{
      playerContainer = String("player" + playersArray[playerTurn - 1].playerNumber + "-container")
      document.getElementById(playerContainer).style.border = "2px solid black";
      let playersHand = playersArray[playerTurn-1].hand;
      for(let i = 0; i <= playersHand.length - 1; i++){
        cardId = document.getElementById(playersHand[i].id);
        cardImageFile = String(playersHand[i].rear);
        cardId.style.cursor = "auto";
        cardId.setAttribute('src', cardImageFile);
      }
      playerTurn += 1;
      playersHand = playersArray[playerTurn-1].hand;
      setTimeout(function() {
        for(let i = 0; i <= playersHand.length - 1; i++){
          cardId = document.getElementById(playersHand[i].id);
          cardImageFile = String(playersHand[i].front);
          cardId.style.cursor = "grab";
          cardId.setAttribute('src', cardImageFile);
        }
      }, 1000)
      let cards = document.querySelectorAll("." + "player" + (playerTurn-1) + "-" + "cards");
      let cardPicked = "";
      playerContainer = String("player" + playersArray[playerTurn - 1].playerNumber + "-container")
      document.getElementById(playerContainer).style.border = "6px solid black";
    }
  }
}

function verify(){
  if(centerPile.length <= 1){
    setTimeout (function(){
      alert(`Pick your card, Player ${playerTurn}`);
    }, 100)
  }else if(centerPile.length === 2){
    if(centerPile[0].realValue > centerPile[1].realValue){
      setTimeout(function() {
        alert(`Player ${centerPile[0].playedBy} wins!`);
      }, 50);
      score2 += 1
      document.getElementById('score2').innerHTML = score2
      //let loser = centerPile[1].playedBy
      loserContainerString = String("player" + centerPile[1].playedBy + "-container")
      let centerCard1 = document.getElementById(centerPile[0].id)
      let centerCard2 = document.getElementById(centerPile[1].id)
      let targetContainer = document.getElementById(loserContainerString)
      let targetArray = playersArray[centerPile[1].playedBy-1].hand
      targetArray.push(centerPile.splice(0,2))
      targetContainer.appendChild(centerCard1)
      targetContainer.appendChild(centerCard2)
      playerChoice = {}
      playerTurn = 1
      //-------
      if(playersArray[centerPile[0].playedBy-1].hand.length === undefined || playersArray[centerPile[0].playedBy-1].hand.length === 0){
        alert(`Player ${centerPile[0].playedBy} wins the game!`);
      }
      //----------
    }else if(centerPile[1].realValue > centerPile[0].realValue){
      setTimeout(function() {
        alert(`Player ${centerPile[1].playedBy} wins!`);
      }, 50);
      score1 += 1
      document.getElementById('score1').innerHTML = score1
      if(playersArray[centerPile[1].playedBy-1].hand.length === 0){
        alert(`Player ${centerPile[1].playedBy} wins the game!`)
      }
    }
  }
}
//------PICK CARD FROM HAND----------//
function selectCard(){
  playerChoice = {}
  let cards = document.querySelectorAll("." + "player-hand");
  let cardPicked = "";
  for (i of cards) {
    i.addEventListener('click', function() {
      cardPicked = this.id;
      function pickId(card){
        return card.id === cardPicked;
      }
      playerChoice = playersArray[playerTurn - 1].hand.find(pickId);
      play()
      verify()
    });
  }
}
//-----TAKE CARD FROM PILE-------//
function uncover(){
  if(deck.length === 0){
    alert("No cards left in the pile");
  }else{
    // move to player's hand
    deck[0].playedBy = playerTurn;
    playersArray[playerTurn-1].hand.unshift(deck.shift(0));
    playersArray[playerTurn-1].hand[0].playedBy = playerTurn;
    cardImage = String(playersArray[playerTurn-1].hand[0].front);
    cardId = String("player" + playerTurn + "-card" + (playersArray[playerTurn-1].hand.length));
    playersArray[playerTurn-1].hand[0].id = cardId;
    playersArray[playerTurn-1].hand[0].playable = true
    playerContainer = String("player" + playerTurn + "-container");
    cardClass = String("player" + playerTurn + "-cards");
    newElement = document.createElement('img');
    newElement.setAttribute('src', cardImage);
    newElement.setAttribute('id', cardId);
    newElement.setAttribute('class', 'card-format');
    newElement.addEventListener('click', function() {
      cardPicked = this.id;
      function pickId(card){
        return card.id === cardPicked
      }
      playerChoice = playersArray[playerTurn - 1].hand.find(pickId);
      play()
      verify()
    });
    playerContainer = document.getElementById(playerContainer);
    playerContainer.appendChild(newElement);
    newElement.classList.add(cardClass);
    newElement.classList.add('player-hand');
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
}

function game(){
  createDeck();
  createPlayers();
  dealCards();
  setTimeout(function(){
    alert(`Pick your card, Player ${playerTurn}`);
  }, 500);
  selectCard();
}
game();

//ANIMATIONS/CHANGES/TRANSITIONS
function howToPlay() {
  alert("The game is for two players.\nIt starts with five cards being dealt to each player.\nThe goal is to run out of cards at the end.\n\nTo open the game, a card is placed face up.\nEach player throws one card of the same suit\n(if you don't have one, you must draw from\nthe deck until you get one), looking for \nthe biggest card and win that hand, which \ngives you the right to throw first in the \nsecond hand and establish the suit in which\neveryone must play in the next round. As the\nhands go by, the player who manages to run out\nof cards wins.")
}
