let userSubmit = document.getElementById("logBut");
let betLow = document.getElementById("betLower");
let betHigh = document.getElementById("betHigher");
let cardSelect = document.getElementById("displayGrid");
let deckCounter = document.getElementById("deckcounter");
deckCounter.innerHTML = "Cards Remaining: 43";
let username, card, currSelect, chooseNext;
let betChoice = false;
let deck = [];
let lossCounter = 0;
let cardBack = [];
let deckInd = 9; // first 9 cards (0-8) used to create grid 
loadCardDeck();
loadFace(deck, 'a');
loadFace(deck, 'j');
loadFace(deck, 'q');
loadFace(deck, 'k');
deck = shuffle(deck);

printGrid(deck);

$(document).ready(function() {
    userSubmit.onclick = handleLogin;
    cardSelect.onclick = handleSelect;
    betLow.onclick = handleLow;
    betHigh.onclick = handleHigh;
});



/* IMAGES folder info:
    - named 'number''first letter of suite'.png
    - except 10: labeled with 1
    - face card + ace: labled with letter 
        - ['d', 's', 'c', 'h']

/* loading card deck into array
    - 1st index: card number 
        - 1: 10
        - a: ace
        - j: jack 
        - q: queen
        - k: king
    - 2nd index: card suit
        - c: clubs
        - d: diamonds
        - h: hearts
        - s: spades
    - once card is identified
        - elementID: card number + suit
        - class: suit

*/
function loadCardDeck(){ //adding all image elements to cardList array
    for (let i = 1; i < 10; i++) {
        //loading SPADE
        let scard = document.createElement('img'); 
        scard.setAttribute('src', './images/' + i + 's.png'); 
        scard.setAttribute('class','card');
        if (i == 1) {
            scard.setAttribute('id',i + '0 of Spades');
        }
        else {
            scard.setAttribute('id',i + 'of Spades');  
        }

        //loading DIAMOND
        let dcard = document.createElement('img');
        dcard.setAttribute('src', './images/' + i + 'd.png'); 
        dcard.setAttribute('class','card');
        if (i == 1) {
            dcard.setAttribute('id',i + '0 of Diamonds');
        }
        else {
            dcard.setAttribute('id',i + ' of Diamonds');  
        }

        //loading CLUB
        let ccard = document.createElement('img');
        ccard.setAttribute('src', './images/' + i + 'c.png'); 
        ccard.setAttribute('class','card');
        if (i == 1) {
            ccard.setAttribute('id',i + '0 of Clubs');
        }
        else {
            ccard.setAttribute('id',i + ' of Clubs');  
        }

        //loading HEART
        let hcard = document.createElement('img');
        hcard.setAttribute('src', './images/' + i + 'h.png');
        hcard.setAttribute('class','card');
        if (i == 1) {
            hcard.setAttribute('id',i + '0 of Hearts');
        }
        else {
            hcard.setAttribute('id',i + ' of Hearts');  
        }
        //let screen = document.getElementById('displayGrid');
        //screen.append(hcard,ccard,dcard,scard);
        deck.push(scard,dcard,hcard,ccard);
        scard,dcard,ccard,hcard = null;
    }
    //loading card back
    for (let i = 0; i < 9; i++){
        let back = document.createElement('img');
        back.setAttribute('src', './images/cardBack.png'); 
        back.setAttribute('class','flipped');
        cardBack.push(back);
    }
    
};

function loadFace(deck, char) {
    let checkFaceSuit = ['s','d','c','h'];
    let suitName = [' of Spades',' of Diamonds',' of Clubs',' of Hearts'];
    if(char =='a') {
        for (let i = 0; i < 4; i++) {
            let newCard = document.createElement('img');
            newCard.setAttribute('src', './images/' + char + checkFaceSuit[i] + '.png');
            newCard.setAttribute('id', "Ace" + suitName[i]);
            newCard.setAttribute('class','card');
            deck.push(newCard);
            newCard='';
        }
    }
    else if (char == 'j') {
        for (let i = 0; i < 4; i++) {
            let newCard = document.createElement('img');
            newCard.setAttribute('src', './images/' + char + checkFaceSuit[i] + '.png');
            newCard.setAttribute('class','card');
            newCard.setAttribute('id', "Jack" + suitName[i]);
            deck.push(newCard);
            newCard='';
        }
    }
    else if (char == 'q') {
        for (let i = 0; i < 4; i++) {
            let newCard = document.createElement('img');
            newCard.setAttribute('src', './images/' + char + checkFaceSuit[i] + '.png');
            newCard.setAttribute('id', "Queen" + suitName[i]);
            newCard.setAttribute('class','card');
            deck.push(newCard);
            newCard='';
        }
    }
    else if (char == 'k') {
        for (let i = 0; i < 4; i++) {
            let newCard = document.createElement('img');
            newCard.setAttribute('src', './images/' + char + checkFaceSuit[i] + '.png');
            newCard.setAttribute('id', "King" + suitName[i]);
            newCard.setAttribute('class','card');                    
            deck.push(newCard);
            newCard='';
        } 
    }
}

function shuffle(array) {
    let currentInd = array.length,  randomIndex;
  
    while (currentInd != 0) {
      randomIndex = Math.floor(Math.random() * currentInd);
      currentInd--;
      [array[currentInd], array[randomIndex]] = [
        array[randomIndex], array[currentInd]];
    }
    return array;
  }


function handleLogin(e) {
    e.preventDefault(); //prevent page reload
    let newUser = document.getElementById("userLog");
    username = newUser.value;
    console.log(username);
    newUser.value = '';
    let dispUser = document.createElement('p');
    dispUser.setAttribute('id', 'currUser');
    let classUser = document.getElementById("currentUser2");
    dispUser.innerHTML = username;
    classUser.append(dispUser);
    window.alert("Login success!");
}

function handleLow() {
    let value = getVal(currSelect.id)
    let valueNext = getVal(deck[deckInd].id);
    if (valueNext <= value) {
        //WON THE BET
        // window.alert("you won the bet -- keep going");
        betChoice = false;
        $(".selected").replaceWith(deck[deckInd]);
    }
    else {
        //flip stack over, show card back
        $(".selected").replaceWith(cardBack[lossCounter]);
        window.alert("you lost the bet -- the next card - " + deck[deckInd].id + " - is higher");
        betChoice = false;
        lossCounter++;
        if (lossCounter >= 9){
            window.alert("You Lost!");
        }
    }
    currSelect = null;
    deckInd++;
    let remcards = 52 - deckInd;
    deckCounter.innerHTML = "Cards Remaining: " + remcards;
    if (deckInd >= 52 && lossCounter < 9){
        window.alert("Congratulations, you have won!");
    }
}

function handleHigh() {
    let value = getVal(currSelect.id)
    let valueNext = getVal(deck[deckInd].id);
    if (valueNext >= value) {
        //WON THE BET
        // window.alert("you won the bet -- keep going");
        betChoice = false;
        $(".selected").replaceWith(deck[deckInd]);
    }
    else {
        //flip stack over, show card back
        $(".selected").replaceWith(cardBack[lossCounter]);
        window.alert("you lost the bet -- the next card - " + deck[deckInd].id + " - is lower");
        betChoice = false;
        lossCounter++;
        if (lossCounter >= 9){
            window.alert("You Lost!");
        }
    }
    currSelect = null;
    deckInd++;
    let remcards = 52 - deckInd;
    deckCounter.innerHTML = "Cards Remaining: " + remcards;
    if (deckInd >= 52 && lossCounter < 9){
        window.alert("Congratulations, you have won!");
    }
}

function getVal(idVal) {
    let valueNext = idVal.charAt(0);  
    switch (valueNext) {
        case '1':
            valueNext = 10;
            break;
        case 'j':
            valueNext = 11;
            break;
        case 'q':
            valueNext = 12;
            break;
        case 'k':
            valueNext = 13;
            break;
        case 'a':
            valueNext = 14;
            break;
    }
    return valueNext;
}
function printGrid(deck) { //loading an array of images onto screen 
let dispGrid = document.getElementById("displayGrid");
    dispGrid.empty;
    //need to start with 3 ROWS --> each with 3 columns
    for (let i = 0; i < 9; i=i+3) { //CREATE THREE ROWS, but need to make sure index matches the indeces in displaySet(orig 12)
        let dispRow = document.createElement('tr');
        for(let j = 0; j < 3; j++) { //CREATE THREE COLUMNS
            
            let cellCard = deck[i + j];

            let newCell = document.createElement('td');
            newCell.setAttribute('class', 'card');
            newCell.append(cellCard);
            dispRow.append(newCell);
            console.log(newCell.id);
        }
        dispGrid.append(dispRow);
    }
};

function handleSelect(event) {
    currSelect = event.target;
    if (currSelect.className == 'flipped'){
        currSelect = null;
        return;
    }
    else if (currSelect.className == 'selected') {
        currSelect.setAttribute('class', 'card');
        currSelect = null;
        betChoice = false;
    }
    else if (currSelect.className == 'card' && betChoice == true) {
        window.alert("Another card is already selected. Please make a bet, or unselect the card to choose another.");
    }
    else if(currSelect.className == 'card') {
        currSelect.setAttribute('class','selected');
        betChoice = true;
    }
    console.log(currSelect);
}