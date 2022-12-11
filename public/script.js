let userSubmit = document.getElementById("logBut");
let betLow = document.getElementById("betLower");
let betHigh = document.getElementById("betHigher");
let cardSelect = document.getElementById("displayGrid");
let username, card, currSelect, chooseNext;
let betChoice = false;
let cardDeck = []; //array of card deck
let tracker = []; //keeps track of cards already loaded onto the page
loadCardDeck();
loadFace(cardDeck, 'a');
loadFace(cardDeck, 'j');
loadFace(cardDeck, 'q');
loadFace(cardDeck, 'k');
printGrid(cardDeck,tracker);

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
            scard.setAttribute('id',i + '0s');
        }
        else {
            scard.setAttribute('id',i + 's');  
        }

        //loading DIAMOND
        let dcard = document.createElement('img');
        dcard.setAttribute('src', './images/' + i + 'd.png'); 
        dcard.setAttribute('class','card');
        if (i == 1) {
            dcard.setAttribute('id',i + '0d');
        }
        else {
            dcard.setAttribute('id',i + 'd');  
        }

        //loading CLUB
        let ccard = document.createElement('img');
        ccard.setAttribute('src', './images/' + i + 'c.png'); 
        ccard.setAttribute('class','card');
        if (i == 1) {
            ccard.setAttribute('id',i + '0c');
        }
        else {
            ccard.setAttribute('id',i + 'c');  
        }

        //loading HEART
        let hcard = document.createElement('img');
        hcard.setAttribute('src', './images/' + i + 'h.png');
        hcard.setAttribute('class','card');
        if (i == 1) {
            hcard.setAttribute('id',i + '0h');
        }
        else {
            hcard.setAttribute('id',i + 'h');  
        }
        //let screen = document.getElementById('displayGrid');
        //screen.append(hcard,ccard,dcard,scard);
        cardDeck.push(scard,dcard,hcard,ccard);
        scard,dcard,ccard,hcard = null;
    }
};

function loadFace(cardDeck, char) {
    let checkFaceSuit = ['s','d','c','h'];
    if(char =='a') {
        for (let i = 0; i < 4; i++) {
            let newCard = document.createElement('img');
            newCard.setAttribute('src', './images/' + char + checkFaceSuit[i] + '.png');
            newCard.setAttribute('id', char + checkFaceSuit[i]);
            newCard.setAttribute('class','card');
            cardDeck.push(newCard);
            newCard='';
        }
    }
    else if (char == 'j') {
        for (let i = 0; i < 4; i++) {
            let newCard = document.createElement('img');
            newCard.setAttribute('src', './images/' + char + checkFaceSuit[i] + '.png');
            newCard.setAttribute('class','card');
            newCard.setAttribute('id', char + checkFaceSuit[i]);
            cardDeck.push(newCard);
            newCard='';
        }
    }
    else if (char == 'q') {
        for (let i = 0; i < 4; i++) {
            let newCard = document.createElement('img');
            newCard.setAttribute('src', './images/' + char + checkFaceSuit[i] + '.png');
            newCard.setAttribute('id', char + checkFaceSuit[i]);
            newCard.setAttribute('class','card');
            cardDeck.push(newCard);
            newCard='';
        }
    }
    else if (char == 'k') {
        for (let i = 0; i < 4; i++) {
            let newCard = document.createElement('img');
            newCard.setAttribute('src', './images/' + char + checkFaceSuit[i] + '.png');
            newCard.setAttribute('id', char + checkFaceSuit[i]);
            newCard.setAttribute('class','card');                    
            cardDeck.push(newCard);
            newCard='';
        } 
    }
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
    //chooseNextCard();
    let idVal = currSelect.id;
    let value = idVal.charAt(0);  
    switch (value) {
        case '1':
            value = 10;
        case 'j':
            value = 11;
        case 'q':
            value = 12;
        case 'k':
            value = 13;
        case 'a':
            value = 14;
    }
    let valueNext = chooseNextCard(tracker, cardDeck);
    
    if (valueNext <= value) {
        //WON THE BET
        window.alert("you won the bet -- keep going");
        betChoice = false;
        $(".selected").replaceWith(cardDeck[chooseNext]);
        console.log($(".selected"));

    }
    else {
        window.alert("GAME OVER");
        //GAME OVER
    }
    console.log("user is betting lower");
}

function handleHigh() {
    //chooseNextCard();
    let idVal = currSelect.id;
    let value = idVal.charAt(0);  
    switch (value) {
        case '1':
            value = 10;
        case 'j':
            value = 11;
        case 'q':
            value = 12;
        case 'k':
            value = 13;
        case 'a':
            value = 14;
    }
    let valueNext = chooseNextCard(tracker, cardDeck);
    if (valueNext >= value) {
        //WON THE BET
        window.alert("you won the bet -- keep going");
        betChoice = false;
        $(".selected").replaceWith(cardDeck[chooseNext]);
        console.log($(".selected"));
    }
    else {
        window.alert("GAME OVER");
        //GAME OVER
    }
    console.log("user is betting higher");
}

function chooseNextCard(tracker, cardDeck) {
    let fresh = true;

    while(fresh) {
        chooseNext = Math.floor(Math.random() * 52);
        //DUPLICATE TRACKER
        if(tracker.indexOf(chooseNext) == -1) {
            tracker.push(chooseNext);
            fresh = false;
        }
        else {
            continue;
        }
    }
    let idVal = cardDeck[chooseNext].id;
    let valueNext = idVal.charAt(0);  
    switch (valueNext) {
        case '1':
            valueNext = 10;
        case 'j':
            valueNext = 11;
        case 'q':
            valueNext = 12;
        case 'k':
            valueNext = 13;
        case 'a':
            valueNext = 14;
    }
    console.log(valueNext);
    return valueNext;
    //should shuffle through deck to get next on top
}
function printGrid(cardDeck, tracker) { //loading an array of images onto screen 
let dispGrid = document.getElementById("displayGrid");
    dispGrid.empty;
    //need to start with 3 ROWS --> each with 3 columns
    for (let i = 0; i < 9; i=i+3) { //CREATE THREE ROWS, but need to make sure index matches the indeces in displaySet(orig 12)
        let dispRow = document.createElement('tr');
        for(let j = 0; j < 3; j++) { //CREATE THREE COLUMNS
            let chooseRand = Math.floor(Math.random() * 52);
            
            //DUPLICATE TRACKER
            if(tracker.indexOf(chooseRand) == -1) {
                tracker.push(chooseRand);
            }
            else {
                j--;
                continue;
            }

            console.log(tracker);
            //CHECK FOR REPEATS
            let cellCard = cardDeck[chooseRand];
            //console.log(cellCard, j);
            //cardDeck.indexOf(cardDeck[chooseRand]);
            //delete cardDeck[chooseRand];

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
    if (currSelect.className == 'selected') {
        currSelect.setAttribute('class', 'card');
        betChoice = false;
    }
    else if (currSelect.className == 'card' && betChoice == true) {
        window.alert("Another card is already selected. Please make a bet, or unselect the card to choose another.");
    }
    else if(currSelect.className == 'card' && betChoice==false) {
        currSelect.setAttribute('class','selected');
        betChoice = true;
    }
}