let userSubmit = document.getElementById("logBut");
let cardSelect = document.getElementById("displayGrid");
let username, card;
let cardDeck = [];
loadCardDeck();

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

        //practice uploading images to the page
        console.log(scard,dcard,ccard,hcard);
        //let screen = document.getElementById('displayGrid');
        //screen.append(hcard,ccard,dcard,scard);
        cardDeck.push(scard,dcard,hcard,ccard);
        scard,dcard,ccard,hcard = null;
    }
    loadFace(cardDeck, 'a');
    loadFace(cardDeck, 'j');
    loadFace(cardDeck, 'q');
    loadFace(cardDeck, 'k');
    printGrid(cardDeck);
};

function loadFace(cardDeck, char) {
    let checkFaceSuit = ['s','d','c','h'];
    if(char =='a') {
        for (let i = 0; i < 4; i++) {
            let newCard = document.createElement('img');
            newCard.setAttribute('src', './images/' + char + checkFaceSuit[i] + '.png');
            newCard.setAttribute('class','card');
            console.log(newCard);
            cardDeck.push(newCard);
            newCard='';
        }
    }
    else if (char == 'j') {
        for (let i = 0; i < 4; i++) {
            let newCard = document.createElement('img');
            newCard.setAttribute('src', './images/' + char + checkFaceSuit[i] + '.png');
            newCard.setAttribute('class','card');
            console.log(newCard);
            cardDeck.push(newCard);
            newCard='';
        }
    }
    else if (char == 'q') {
        for (let i = 0; i < 4; i++) {
            let newCard = document.createElement('img');
            newCard.setAttribute('src', './images/' + char + checkFaceSuit[i] + '.png');
            newCard.setAttribute('class','card');
            console.log(newCard);
            cardDeck.push(newCard);
            newCard='';
        }
    }
    else if (char == 'k') {
        for (let i = 0; i < 4; i++) {
            let newCard = document.createElement('img');
            newCard.setAttribute('src', './images/' + char + checkFaceSuit[i] + '.png');
            newCard.setAttribute('class','card');                    
            console.log(newCard);
            cardDeck.push(newCard);
            newCard='';
        } 
    }
}

userSubmit.addEventListener("click", function getUserName(event) {
    event.preventDefault(); //prevent page reload
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
});

function printGrid(cardDeck) { //loading an array of images onto screen 
let dispGrid = document.getElementById("displayGrid");
    dispGrid.empty;
    //need to start with 3 ROWS --> each with 3 columns
    for (let i = 0; i < 9; i=i+3) { //CREATE THREE ROWS, but need to make sure index matches the indeces in displaySet(orig 12)
        let dispRow = document.createElement('tr');
        for(let j = 0; j < 3; j++) { //CREATE THREE COLUMNS
            let chooseRand = Math.floor(Math.random() * 52);
            console.log(chooseRand);
            //CHECK FOR REPEATS
            let cellCard = cardDeck[chooseRand];
            console.log(cellCard);

            let newCell = document.createElement('td');
            newCell.setAttribute('class', 'card');
            newCell.append(cellCard);
            dispRow.append(newCell);
        }
        dispGrid.append(dispRow);
    }
    /*for (let i = 0; i < 9; i=i++) { //CREATE THREE ROWS, but need to make sure index matches the indeces in displaySet(orig 12)
        let dispRow = document.createElement('tr');
        for(let j = 0; j < 3; j++) { //CREATE THREE COLUMNS
            let fromCard = cardDeck[i];
            let newCell = document.createElement('td');
            newCell.setAttribute('class', 'card');
            newCell.append(fromCard);
            dispRow.append(newCell);
        }
       toEmpty.append(dispRow);
    }
    */
};

cardSelect.addEventListener("click", function selectCard(e) {
    let currSelect = e.target;
    console.log(currSelect.className);
    if (currSelect.className == 'selected') {
        currSelect.setAttribute('class', 'card');
    }
    else {
        currSelect.setAttribute('class','selected');
    }
});